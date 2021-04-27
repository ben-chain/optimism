import { expect } from 'chai'
import { Wallet, utils, BigNumber, Contract } from 'ethers'
import { Direction } from './shared/watcher-utils'

import { OptimismEnv } from './shared/env'

import { getContractInterface } from '@eth-optimism/contracts'
import { l2Provider, OVM_ETH_ADDRESS } from './shared/utils'
import { ethers } from 'hardhat'


// TODO: use actual imported Chugsplash type

interface SetCodeInstruction {
	target: string // address
	code: string // bytes memory
}

interface SetStorageInstruction {
	target: string // address
	key: string // bytes32
	value: string // bytes32
}

type ChugsplashInstruction = SetCodeInstruction | SetStorageInstruction

// Just an array of the above two instruction types.
type ChugSplashInstructions = Array<ChugsplashInstruction>

const isSetStorageInstruction = (instr: ChugsplashInstruction): instr is SetStorageInstruction => {
  return !instr["code"]
}

describe('OVM Self-Upgrades', async () => {
  let env: OptimismEnv
  let l2Wallet: Wallet
  let OVM_UpgradeExecutor: Contract

  const applyChugsplashInstructions = async (instructions: ChugSplashInstructions) => {
    for (const instruction of instructions) {
      // TODO: remove this try.  The TX errors for the same reason that deposits appear to fail
      try {  
        let res
        if (isSetStorageInstruction(instruction)) {
          res = await OVM_UpgradeExecutor.setStorage(
            instruction.target,
            instruction.key,
            instruction.value
          )
        } else {
          res = await OVM_UpgradeExecutor.setCode(
            instruction.target,
            instruction.code
          )
        }
        await res.wait() // TODO: promise.all
      } catch (e) {
        console.log('failedinstruction')
        console.log(e)
      }
    }
  }

  const checkChugsplashInstructionsApplied = async (instructions: ChugSplashInstructions) => {
    for (const instruction of instructions) {
      // TODO: promise.all this for with a map for efficiency
      if (isSetStorageInstruction(instruction)) {
        const actualStorage = await l2Provider.getStorageAt(
          instruction.target,
          instruction.key
        )
        expect(actualStorage).to.deep.eq(instruction.value)
      } else {
        const actualCode = await l2Provider.getCode(
          instruction.target
        )
        expect(actualCode).to.deep.eq(instruction.code)
      }
    }
  }

  const applyAndVerifyUpgrade = async (instructions: ChugSplashInstructions) => {
    await applyChugsplashInstructions(instructions)
    await checkChugsplashInstructionsApplied(instructions)
  }

  before(async () => {
    env = await OptimismEnv.new()
    l2Wallet = env.l2Wallet

    OVM_UpgradeExecutor = new Contract(
      '0x420000000000000000000000000000000000000a',
      getContractInterface('OVM_UpgradeExecutor', true),
      l2Wallet
    )
  })

  describe('setStorage and setCode show up in L2Geth RPC', () => {
    it('Should execute a basic storage upgrade', async () => {
      const basicStorageUpgrade: ChugSplashInstructions = [
        {
          target: OVM_ETH_ADDRESS,
          key: '0x1234123412341234123412341234123412341234123412341234123412341234',
          value: '0x6789123412341234123412341234123412341234123412341234678967896789',
        }
      ]
      await applyAndVerifyUpgrade(basicStorageUpgrade)
    })

    it.only('Should execute a basic code upgrade', async () => {
      const DummyContract = await (
        await ethers.getContractFactory('SimpleStorage', l2Wallet)
      ).deploy()

      const basicStorageUpgrade: ChugSplashInstructions = [
        {
          target: DummyContract.address,
          code: '0x1234123412341234123412341234123412341234123412341234123412341234',
        }
      ]
      await applyAndVerifyUpgrade(basicStorageUpgrade)
    })
  })
})
