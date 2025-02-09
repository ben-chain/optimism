import { injectL2Context } from '@eth-optimism/core-utils'
import { Wallet, BigNumber, Contract } from 'ethers'
import { ethers } from 'hardhat'
import chai, { expect } from 'chai'
import {
  sleep,
  l2Provider,
  GWEI,
  encodeSolidityRevertMessage,
} from './shared/utils'
import chaiAsPromised from 'chai-as-promised'
import { OptimismEnv } from './shared/env'
import {
  TransactionReceipt,
  TransactionRequest,
} from '@ethersproject/providers'
import { solidity } from 'ethereum-waffle'
chai.use(chaiAsPromised)
chai.use(solidity)

describe('Basic RPC tests', () => {
  let env: OptimismEnv
  let wallet: Wallet

  const DEFAULT_TRANSACTION = {
    to: '0x' + '1234'.repeat(10),
    gasLimit: 4000000,
    gasPrice: 0,
    data: '0x',
    value: 0,
  }

  const provider = injectL2Context(l2Provider)

  let Reverter: Contract
  let revertMessage: string
  let revertingTx: TransactionRequest
  let revertingDeployTx: TransactionRequest

  before(async () => {
    env = await OptimismEnv.new()
    wallet = env.l2Wallet
    const Factory__Reverter = await ethers.getContractFactory(
      'Reverter',
      wallet
    )
    Reverter = await Factory__Reverter.connect(env.l2Wallet).deploy()
    await Reverter.deployTransaction.wait()
    revertMessage = await Reverter.revertMessage()
    revertingTx = {
      to: Reverter.address,
      data: Reverter.interface.encodeFunctionData('doRevert'),
    }
    const Factory__ConstructorReverter = await ethers.getContractFactory(
      'ConstructorReverter',
      wallet
    )
    revertingDeployTx = {
      data: Factory__ConstructorReverter.bytecode,
    }
  })

  describe('eth_sendRawTransaction', () => {
    it('should correctly process a valid transaction', async () => {
      const tx = DEFAULT_TRANSACTION
      const nonce = await wallet.getTransactionCount()
      const result = await wallet.sendTransaction(tx)

      expect(result.from).to.equal(wallet.address)
      expect(result.nonce).to.equal(nonce)
      expect(result.gasLimit.toNumber()).to.equal(tx.gasLimit)
      expect(result.gasPrice.toNumber()).to.equal(tx.gasPrice)
      expect(result.data).to.equal(tx.data)
    })

    it('should not accept a transaction with the wrong chain ID', async () => {
      const tx = {
        ...DEFAULT_TRANSACTION,
        chainId: (await wallet.getChainId()) + 1,
      }

      await expect(
        provider.sendTransaction(await wallet.signTransaction(tx))
      ).to.be.rejectedWith('invalid transaction: invalid sender')
    })

    it('should not accept a transaction without a chain ID', async () => {
      const tx = {
        ...DEFAULT_TRANSACTION,
        chainId: null, // Disables EIP155 transaction signing.
      }

      await expect(
        provider.sendTransaction(await wallet.signTransaction(tx))
      ).to.be.rejectedWith('Cannot submit unprotected transaction')
    })

    it('should accept a transaction with a value', async () => {
      const tx = {
        ...DEFAULT_TRANSACTION,
        chainId: await env.l2Wallet.getChainId(),
        data: '0x',
        value: ethers.utils.parseEther('5'),
      }

      const balanceBefore = await provider.getBalance(env.l2Wallet.address)
      const result = await env.l2Wallet.sendTransaction(tx)
      const receipt = await result.wait()
      expect(receipt.status).to.deep.equal(1)

      expect(await provider.getBalance(env.l2Wallet.address)).to.deep.equal(
        balanceBefore.sub(ethers.utils.parseEther('5'))
      )
    })

    it('should reject a transaction with higher value than user balance', async () => {
      const balance = await env.l2Wallet.getBalance()
      const tx = {
        ...DEFAULT_TRANSACTION,
        chainId: await env.l2Wallet.getChainId(),
        data: '0x',
        value: balance.add(ethers.utils.parseEther('1')),
      }

      await expect(env.l2Wallet.sendTransaction(tx)).to.be.rejectedWith(
        'invalid transaction: insufficient funds for gas * price + value'
      )
    })
  })

  describe('eth_call', () => {
    let expectedReverterRevertData: string

    before(async () => {
      expectedReverterRevertData = encodeSolidityRevertMessage(revertMessage)
    })

    it('should correctly return solidity revert data from a call', async () => {
      const revertData = await provider.call(revertingTx)
      const expectedRevertData = encodeSolidityRevertMessage(revertMessage)
      expect(revertData).to.eq(expectedRevertData)
    })

    it('should produce error when called from ethers', async () => {
      await expect(Reverter.doRevert()).to.be.revertedWith(revertMessage)
    })

    it('should correctly return revert data from contract creation', async () => {
      const revertData = await provider.call(revertingDeployTx)

      expect(revertData).to.eq(expectedReverterRevertData)
    })

    it('should return the correct error message when attempting to deploy unsafe initcode', async () => {
      // PUSH1 0x00 PUSH1 0x00 SSTORE
      const unsafeCode = '0x6000600055'
      const tx: TransactionRequest = {
        data: unsafeCode,
      }
      const result = await provider.call(tx)
      const expected = encodeSolidityRevertMessage(
        'Contract creation code contains unsafe opcodes. Did you use the right compiler or pass an unsafe constructor argument?'
      )
      expect(result).to.eq(expected)
    })
  })

  describe('eth_getTransactionReceipt', () => {
    it('correctly exposes revert data for contract calls', async () => {
      const req: TransactionRequest = {
        ...revertingTx,
        gasLimit: 8_999_999, // override gas estimation
      }

      const tx = await wallet.sendTransaction(req)

      let errored = false
      try {
        await tx.wait()
      } catch (e) {
        errored = true
      }
      expect(errored).to.be.true

      const receipt: TransactionReceipt = await provider.getTransactionReceipt(
        tx.hash
      )

      expect(receipt.status).to.eq(0)
    })

    it('correctly exposes revert data for contract creations', async () => {
      const req: TransactionRequest = {
        ...revertingDeployTx,
        gasLimit: 8_999_999, // override gas estimation
      }

      const tx = await wallet.sendTransaction(req)

      let errored = false
      try {
        await tx.wait()
      } catch (e) {
        errored = true
      }
      expect(errored).to.be.true

      const receipt: TransactionReceipt = await provider.getTransactionReceipt(
        tx.hash
      )

      expect(receipt.status).to.eq(0)
    })
  })

  describe('eth_getTransactionByHash', () => {
    it('should be able to get all relevant l1/l2 transaction data', async () => {
      const tx = DEFAULT_TRANSACTION
      const result = await wallet.sendTransaction(tx)
      await result.wait()

      const transaction = (await provider.getTransaction(result.hash)) as any
      expect(transaction.txType).to.equal('EIP155')
      expect(transaction.queueOrigin).to.equal('sequencer')
      expect(transaction.transactionIndex).to.be.eq(0)
      expect(transaction.gasLimit).to.be.deep.eq(BigNumber.from(tx.gasLimit))
    })
  })

  describe('eth_getBlockByHash', () => {
    it('should return the block and all included transactions', async () => {
      // Send a transaction and wait for it to be mined.
      const tx = DEFAULT_TRANSACTION
      const result = await wallet.sendTransaction(tx)
      const receipt = await result.wait()

      const block = (await provider.getBlockWithTransactions(
        receipt.blockHash
      )) as any

      expect(block.number).to.not.equal(0)
      expect(typeof block.stateRoot).to.equal('string')
      expect(block.transactions.length).to.equal(1)
      expect(block.transactions[0].txType).to.equal('EIP155')
      expect(block.transactions[0].queueOrigin).to.equal('sequencer')
      expect(block.transactions[0].l1TxOrigin).to.equal(null)
    })
  })

  describe('eth_getBlockByNumber', () => {
    // There was a bug that causes transactions to be reingested over
    // and over again only when a single transaction was in the
    // canonical transaction chain. This test catches this by
    // querying for the latest block and then waits and then queries
    // the latest block again and then asserts that they are the same.
    it('should return the same result when new transactions are not applied', async () => {
      // Get latest block once to start.
      const prev = await provider.getBlockWithTransactions('latest')

      // Over ten seconds, repeatedly check the latest block to make sure nothing has changed.
      for (let i = 0; i < 5; i++) {
        const latest = await provider.getBlockWithTransactions('latest')
        expect(latest).to.deep.equal(prev)
        await sleep(2000)
      }
    })
  })

  describe('eth_getBalance', () => {
    it('should get the OVM_ETH balance', async () => {
      const rpcBalance = await provider.getBalance(env.l2Wallet.address)
      const contractBalance = await env.ovmEth.balanceOf(env.l2Wallet.address)
      expect(rpcBalance).to.be.deep.eq(contractBalance)
    })
  })

  describe('eth_chainId', () => {
    it('should get the correct chainid', async () => {
      const { chainId } = await provider.getNetwork()
      expect(chainId).to.be.eq(420)
    })
  })

  describe('eth_gasPrice', () => {
    it('gas price should be 1 gwei', async () => {
      expect(await provider.getGasPrice()).to.be.deep.equal(GWEI)
    })
  })

  describe('eth_estimateGas (returns the fee)', () => {
    it('should return a gas estimate that grows with the size of data', async () => {
      const dataLen = [0, 2, 8, 64, 256]
      const l1GasPrice = await env.l1Wallet.provider.getGasPrice()

      // 96 bytes * 16 per non zero byte
      const onesCost = BigNumber.from(96).mul(16)
      const expectedCost = dataLen
        .map((len) => BigNumber.from(len).mul(4))
        .map((zerosCost) => zerosCost.add(onesCost))

      // Repeat this test for a series of possible transaction sizes.
      for (let i = 0; i < dataLen.length; i++) {
        const estimate = await l2Provider.estimateGas({
          ...DEFAULT_TRANSACTION,
          data: '0x' + '00'.repeat(dataLen[i]),
          from: '0x' + '1234'.repeat(10),
        })

        // we normalize by gwei here because the RPC does it as well, since the
        // user provides a 1gwei gas price when submitting txs via the eth_gasPrice
        // rpc call. The smallest possible value for the expected cost is 21000
        let expected = expectedCost[i].mul(l1GasPrice).div(GWEI)
        if (expected.lt(BigNumber.from(21000))) {
          expected = BigNumber.from(21000)
        }
        expect(estimate).to.be.deep.eq(expected)
      }
    })

    it('should fail for a reverting call transaction', async () => {
      await expect(provider.send('eth_estimateGas', [revertingTx])).to.be
        .reverted
    })

    it('should fail for a reverting deploy transaction', async () => {
      await expect(provider.send('eth_estimateGas', [revertingDeployTx])).to.be
        .reverted
    })
  })
})
