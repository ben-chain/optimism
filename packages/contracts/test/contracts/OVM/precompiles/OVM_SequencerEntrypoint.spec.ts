import { expect } from '../../../setup'

/* External Imports */
import { waffle, ethers } from 'hardhat'
import { ContractFactory, Wallet, Contract, Signer } from 'ethers'
import { smockit, MockContract, unbind } from '@eth-optimism/smock'
import { toPlainObject } from 'lodash'

/* Internal Imports */
import { DEFAULT_EIP155_TX } from '../../../helpers'
import { getContractInterface, getContractFactory } from '../../../../src'

describe('OVM_SequencerEntrypoint', () => {
  const iOVM_ECDSAContractAccount = getContractInterface(
    'OVM_ECDSAContractAccount'
  )

  let wallet: Wallet
  before(async () => {
    const provider = waffle.provider
    ;[wallet] = provider.getWallets()
  })

  let signer: Signer
  before(async () => {
    ;[signer] = await ethers.getSigners()
  })

  let Mock__OVM_ExecutionManager: MockContract
  before(async () => {
    Mock__OVM_ExecutionManager = await smockit('OVM_ExecutionManager', {
      address: predeploys.OVM_ExecutionManagerWrapper,
    })

    Mock__OVM_ExecutionManager.smocked.ovmCHAINID.will.return.with(420)
    Mock__OVM_ExecutionManager.smocked.ovmCREATEEOA.will.return()
  })

  let Factory__OVM_SequencerEntrypoint: ContractFactory
  before(async () => {
    Factory__OVM_SequencerEntrypoint = await ethers.getContractFactory(
      'OVM_SequencerEntrypoint'
    )
  })

  let OVM_SequencerEntrypoint: Contract
  beforeEach(async () => {
    OVM_SequencerEntrypoint = await Factory__OVM_SequencerEntrypoint.deploy()
  })

  describe('fallback()', async () => {
    it('should call EIP155', async () => {
      const transaction = DEFAULT_EIP155_TX
      const encodedTransaction = await wallet.signTransaction(transaction)

      await Helper_PredeployCaller.callPredeploy(
        OVM_SequencerEntrypoint.address,
        encodedTransaction
      )

      const expectedEOACalldata = iOVM_ECDSAContractAccount.encodeFunctionData(
        'execute',
        [encodedTransaction]
      )
      const ovmCALL: any = Mock__OVM_ExecutionManager.smocked.ovmCALL.calls[0]
      expect(ovmCALL._address).to.equal(await wallet.getAddress())
      expect(ovmCALL._calldata).to.equal(expectedEOACalldata)
    })

    it('should send correct calldata if tx is a create', async () => {
      const transaction = { ...DEFAULT_EIP155_TX, to: '' }
      const encodedTransaction = await wallet.signTransaction(transaction)

      await Helper_PredeployCaller.callPredeploy(
        OVM_SequencerEntrypoint.address,
        encodedTransaction
      )

      const expectedEOACalldata = iOVM_ECDSAContractAccount.encodeFunctionData(
        'execute',
        [encodedTransaction]
      )
      const ovmCALL: any = Mock__OVM_ExecutionManager.smocked.ovmCALL.calls[0]
      expect(ovmCALL._address).to.equal(await wallet.getAddress())
      expect(ovmCALL._calldata).to.equal(expectedEOACalldata)
    })

    it(`should call ovmCreateEOA when ovmEXTCODESIZE returns 0`, async () => {
      let isFirstCheck = true
      Mock__OVM_ExecutionManager.smocked.ovmEXTCODESIZE.will.return.with(() => {
        if (isFirstCheck) {
          isFirstCheck = false
          return 0
        } else {
          return 1
        }
      })

      const transaction = DEFAULT_EIP155_TX
      const encodedTransaction = await wallet.signTransaction(transaction)

      await Helper_PredeployCaller.callPredeploy(
        OVM_SequencerEntrypoint.address,
        encodedTransaction
      )

      const call: any = Mock__OVM_ExecutionManager.smocked.ovmCREATEEOA.calls[0]
      const eoaAddress = ethers.utils.recoverAddress(call._messageHash, {
        v: call._v + 27,
        r: call._r,
        s: call._s,
      })

      expect(eoaAddress).to.equal(await wallet.getAddress())
    })
  })
})
