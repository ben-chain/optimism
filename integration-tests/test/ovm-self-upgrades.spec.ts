import { expect } from 'chai'
import { Wallet, utils, BigNumber, Contract } from 'ethers'
import { Direction } from './shared/watcher-utils'

import { OptimismEnv } from './shared/env'

import { getContractInterface } from '@eth-optimism/contracts'
import { l2Provider, OVM_ETH_ADDRESS } from './shared/utils'


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

// Just an array of the above two instruction types.
type ChugSplashInstructions = Array<SetCodeInstruction | SetStorageInstruction>

describe('OVM Self-Upgrades', async () => {
  let env: OptimismEnv
  let l2Wallet: Wallet
  let OVM_UpgradeExecutor: Contract

  before(async () => {
    console.log('in before')
    env = await OptimismEnv.new()
    l2Wallet = env.l2Wallet
    console.log('got env')
    // OVM_UpgradeExecutor = new Contract(
    //   '0x420000000000000000000000000000000000000a',
    //   getContractInterface('OVM_UpgradeExecutor', true),
    //   l2Wallet
    // )
  })

  describe('setCode', () => {
    it('Should estimate gas for ETH transfer', async () => {
    //   console.log('attempting storage set')

    //   const res = await OVM_UpgradeExecutor.setStorage(
    //     OVM_ETH_ADDRESS,
    //     '0x1234123412341234123412341234123412341234123412341234123412341234',
    //     '0x1234123412341234123412341234123412341234123412341234123412341234'
    //   )

    //   console.log('attempted storage set')

    //   await res.wait()

    //   console.log('waited for storage set')

    //   const newStorage = await l2Provider.getStorageAt(
    //     OVM_ETH_ADDRESS,
    //     '0x1234123412341234123412341234123412341234123412341234123412341234'
    //   )

    //   console.log('new storage is', newStorage)
    // })
  })
})
