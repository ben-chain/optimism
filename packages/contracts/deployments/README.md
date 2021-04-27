# Optimism Regenesis Deployments
## LAYER 2

### Chain IDs:
- Mainnet: 10
- Kovan: 69
- Goerli: 420
*The contracts relevant for the majority of developers are `OVM_ETH` and the cross-domain messengers. The L2 addresses don't change.*

### Predeploy contracts:
|Contract|Address|
|--|--|
|OVM_ETH: | `0x4200000000000000000000000000000000000006`
|OVM_L2CrossDomainMessenger: | `0x4200000000000000000000000000000000000007`
|OVM_L2ToL1MessagePasser: | `0x4200000000000000000000000000000000000000`
|OVM_L1MessageSender: | `0x4200000000000000000000000000000000000001`
|OVM_DeployerWhitelist: | `0x4200000000000000000000000000000000000002`
|OVM_ECDSAContractAccount: | `0x4200000000000000000000000000000000000003`
|OVM_SequencerEntrypoint: | `0x4200000000000000000000000000000000000005`
|Lib_AddressManager: | `0x4200000000000000000000000000000000000008`
|ERC1820Registry: | `0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24`

---
---

## LAYER 1

## MAINNET

Network : __mainnet (chain id: 1)__

|Contract|Address|
|--|--|
|Lib_AddressManager|[0x668E5b997b9aE88a56cd40409119d4Db9e6d752E](https://etherscan.io/address/0x668E5b997b9aE88a56cd40409119d4Db9e6d752E)|
|OVM_CanonicalTransactionChain|[0xa88e220c7FC7F0D845D2624a5dF1DfD6874B9a44](https://etherscan.io/address/0xa88e220c7FC7F0D845D2624a5dF1DfD6874B9a44)|
|OVM_ChainStorageContainer-CTC-batches|[0x28157e8a8E6d22A367c63Ad61dD56d9E6bDCE905](https://etherscan.io/address/0x28157e8a8E6d22A367c63Ad61dD56d9E6bDCE905)|
|OVM_ChainStorageContainer-CTC-queue|[0xD68670eD8800c856613FD3e4C55539A2Ff53cCb3](https://etherscan.io/address/0xD68670eD8800c856613FD3e4C55539A2Ff53cCb3)|
|OVM_ChainStorageContainer-SCC-batches|[0x7B8af5f008A7C5eFD319e68Fd5C9A68008519Caf](https://etherscan.io/address/0x7B8af5f008A7C5eFD319e68Fd5C9A68008519Caf)|
|OVM_ExecutionManager|[0x3f5FA555c434b49D946042955013966Fd108DaC3](https://etherscan.io/address/0x3f5FA555c434b49D946042955013966Fd108DaC3)|
|OVM_FraudVerifier|[0x169CC2f69Cc16da17B71Df2dce6161ef57991bB9](https://etherscan.io/address/0x169CC2f69Cc16da17B71Df2dce6161ef57991bB9)|
|OVM_L1CrossDomainMessenger|[0x598F2b19e983910529affAb7D219724a019339CC](https://etherscan.io/address/0x598F2b19e983910529affAb7D219724a019339CC)|
|OVM_L1ETHGateway|[0x40c9067ec8087EcF101FC10d2673636955b81A32](https://etherscan.io/address/0x40c9067ec8087EcF101FC10d2673636955b81A32)|
|OVM_L1MultiMessageRelayer|[0xc34F5B7279A9276A9D02491c59630fa725B7c36B](https://etherscan.io/address/0xc34F5B7279A9276A9D02491c59630fa725B7c36B)|
|OVM_SafetyChecker|[0xD87eFbBb82f1B7d25469641ee2E0E513f144394C](https://etherscan.io/address/0xD87eFbBb82f1B7d25469641ee2E0E513f144394C)|
|OVM_StateCommitmentChain|[0x6786EB419547a4902d285F70c6acDbC9AefAdB6F](https://etherscan.io/address/0x6786EB419547a4902d285F70c6acDbC9AefAdB6F)|
|OVM_StateManagerFactory|[0xA4C213C1E2bF5594baB0BCdF071ed5B0E946b19e](https://etherscan.io/address/0xA4C213C1E2bF5594baB0BCdF071ed5B0E946b19e)|
|OVM_StateTransitionerFactory|[0xAe4ef5e45C42dA513d2B48E184B64A05c18d8154](https://etherscan.io/address/0xAe4ef5e45C42dA513d2B48E184B64A05c18d8154)|
|Proxy__OVM_L1CrossDomainMessenger|[0x902e5fF5A99C4eC1C21bbab089fdabE32EF0A5DF](https://etherscan.io/address/0x902e5fF5A99C4eC1C21bbab089fdabE32EF0A5DF)|
|Proxy__OVM_L1ETHGateway|[0xe681F80966a8b1fFadECf8068bD6F99034791c95](https://etherscan.io/address/0xe681F80966a8b1fFadECf8068bD6F99034791c95)|
|mockOVM_BondManager|[0x90c5F8d045bBcCc99d907f30E8707F06D95d065b](https://etherscan.io/address/0x90c5F8d045bBcCc99d907f30E8707F06D95d065b)|
---
## KOVAN

Network : __kovan (chain id: 42)__

|Contract|Address|
|--|--|
|Lib_AddressManager|[0x72e6F5244828C10737cbC9659378B207246D26B2](https://kovan.etherscan.io/address/0x72e6F5244828C10737cbC9659378B207246D26B2)|
|OVM_CanonicalTransactionChain|[0x0ecB7253Aef93dD936E2a9BCEb49bc2fA683Ee65](https://kovan.etherscan.io/address/0x0ecB7253Aef93dD936E2a9BCEb49bc2fA683Ee65)|
|OVM_ChainStorageContainer:CTC:batches|[0x095744753D5353C1FC43EFb1ab81D06f3e2F4630](https://kovan.etherscan.io/address/0x095744753D5353C1FC43EFb1ab81D06f3e2F4630)|
|OVM_ChainStorageContainer:CTC:queue|[0xFCE31EC2Bc82553FaA4A9a6DF36c9b0DFDAdD4B8](https://kovan.etherscan.io/address/0xFCE31EC2Bc82553FaA4A9a6DF36c9b0DFDAdD4B8)|
|OVM_ChainStorageContainer:SCC:batches|[0xcFf7ed66bC3C1eA64c6394FEBb2408D16c6cBC5E](https://kovan.etherscan.io/address/0xcFf7ed66bC3C1eA64c6394FEBb2408D16c6cBC5E)|
|OVM_L1CrossDomainMessenger|[0x19da6C4945f18F5E720054FECC50D6b5E015bd40](https://kovan.etherscan.io/address/0x19da6C4945f18F5E720054FECC50D6b5E015bd40)|
|OVM_StateCommitmentChain|[0x2AAbAf6799822Efc77865401E05CE02897ecf520](https://kovan.etherscan.io/address/0x2AAbAf6799822Efc77865401E05CE02897ecf520)|
|Proxy__OVM_L1CrossDomainMessenger|[0xb89065D5eB05Cac554FDB11fC764C679b4202322](https://kovan.etherscan.io/address/0xb89065D5eB05Cac554FDB11fC764C679b4202322)|
|mockOVM_BondManager|[0x3Ff73EBc1d916a1A976521160ad92dFDF6a06d1f](https://kovan.etherscan.io/address/0x3Ff73EBc1d916a1A976521160ad92dFDF6a06d1f)|
---
## GOERLI-V3

Network : __goerli (chain id: 5)__

|Contract|Address|
|--|--|
|Lib_AddressManager|[0xE3d08F0D900A2D53cB794cf82d7127764BcC3092](https://goerli.etherscan.io/address/0xE3d08F0D900A2D53cB794cf82d7127764BcC3092)|
|OVM_CanonicalTransactionChain|[0x266534680e632Ce9425d8E5a991C43B3531C7818](https://goerli.etherscan.io/address/0x266534680e632Ce9425d8E5a991C43B3531C7818)|
|OVM_ChainStorageContainer:CTC:batches|[0x7b439CD647b76F45252858C19093a53b4c5FD4B4](https://goerli.etherscan.io/address/0x7b439CD647b76F45252858C19093a53b4c5FD4B4)|
|OVM_ChainStorageContainer:CTC:queue|[0xeD5fF8cFFba09fa5fF3104a63bA321733c4553d9](https://goerli.etherscan.io/address/0xeD5fF8cFFba09fa5fF3104a63bA321733c4553d9)|
|OVM_ChainStorageContainer:SCC:batches|[0x2A622E327D7A204b39355202d41BD9B752C8df54](https://goerli.etherscan.io/address/0x2A622E327D7A204b39355202d41BD9B752C8df54)|
|OVM_ExecutionManager|[0x45B459295d6b08D7dA3B9daae541D5F75E1CF818](https://goerli.etherscan.io/address/0x45B459295d6b08D7dA3B9daae541D5F75E1CF818)|
|OVM_FraudVerifier|[0xfA590cE7fE1d80D4b286e23f3f6e9f9357D6A90b](https://goerli.etherscan.io/address/0xfA590cE7fE1d80D4b286e23f3f6e9f9357D6A90b)|
|OVM_L1CrossDomainMessenger|[0x27BdfF69C72d29493bfD2152DbE28657f8Ddd5df](https://goerli.etherscan.io/address/0x27BdfF69C72d29493bfD2152DbE28657f8Ddd5df)|
|OVM_L1ETHGateway|[0x746E840b94cC75921D1cb620b83CFd0C658B2852](https://goerli.etherscan.io/address/0x746E840b94cC75921D1cb620b83CFd0C658B2852)|
|OVM_L1MultiMessageRelayer|[0x737557d97f7f2ccb0263C4b55f0D735D52c2D385](https://goerli.etherscan.io/address/0x737557d97f7f2ccb0263C4b55f0D735D52c2D385)|
|OVM_SafetyChecker|[0x71D4ea896C9a2D4a973CC5c7E347B6707691ECa0](https://goerli.etherscan.io/address/0x71D4ea896C9a2D4a973CC5c7E347B6707691ECa0)|
|OVM_StateCommitmentChain|[0x5c3e321947C99698027108351ee736823Bd157D8](https://goerli.etherscan.io/address/0x5c3e321947C99698027108351ee736823Bd157D8)|
|OVM_StateManagerFactory|[0x8E63CD1CfDBe5d34a7a91B97E0A2AeA23D0e585D](https://goerli.etherscan.io/address/0x8E63CD1CfDBe5d34a7a91B97E0A2AeA23D0e585D)|
|OVM_StateTransitionerFactory|[0x543021950Af9250443EEdc681755e0bdBd3Fc81d](https://goerli.etherscan.io/address/0x543021950Af9250443EEdc681755e0bdBd3Fc81d)|
|Proxy__OVM_L1CrossDomainMessenger|[0xFec83764acDeEc2ac338d4cc1f12bBE3cCDf551E](https://goerli.etherscan.io/address/0xFec83764acDeEc2ac338d4cc1f12bBE3cCDf551E)|
|Proxy__OVM_L1ETHGateway|[0xA721CF3e39E5cB4CfEEc0e32EE05B3D05AA9aE39](https://goerli.etherscan.io/address/0xA721CF3e39E5cB4CfEEc0e32EE05B3D05AA9aE39)|
|mockOVM_BondManager|[0x35a7735F9f517d071d5cFf89D11Ab4488bc5Df8C](https://goerli.etherscan.io/address/0x35a7735F9f517d071d5cFf89D11Ab4488bc5Df8C)|
---
## GOERLI-V2

Network : __goerli (chain id: 5)__

|Contract|Address|
|--|--|
|Lib_AddressManager|[0x9933d137bBF050Cf3D7555fE1beC91eF698814e5](https://goerli.etherscan.io/address/0x9933d137bBF050Cf3D7555fE1beC91eF698814e5)|
|OVM_CanonicalTransactionChain|[0x557057458Ba57F03e3191ddA69118DFe42a7295d](https://goerli.etherscan.io/address/0x557057458Ba57F03e3191ddA69118DFe42a7295d)|
|OVM_ChainStorageContainer:CTC:batches|[0x648D625eCa2A2491547d2D702e21070675518E4a](https://goerli.etherscan.io/address/0x648D625eCa2A2491547d2D702e21070675518E4a)|
|OVM_ChainStorageContainer:CTC:queue|[0xe7C69bfEC244EC659871E5685fc17D86eaFB8305](https://goerli.etherscan.io/address/0xe7C69bfEC244EC659871E5685fc17D86eaFB8305)|
|OVM_ChainStorageContainer:SCC:batches|[0x96bD3A792Cc288C51C55A33BC8089026c7009bfd](https://goerli.etherscan.io/address/0x96bD3A792Cc288C51C55A33BC8089026c7009bfd)|
|OVM_ExecutionManager|[0x3212027673655d3047c13139e3233ccd4A78417c](https://goerli.etherscan.io/address/0x3212027673655d3047c13139e3233ccd4A78417c)|
|OVM_FraudVerifier|[0x08BB26333Ed18CcF632e2d68DdC9B5aFfb2EE687](https://goerli.etherscan.io/address/0x08BB26333Ed18CcF632e2d68DdC9B5aFfb2EE687)|
|OVM_L1CrossDomainMessenger|[0x7910D57c49fAE4F7c896A6cd185aB1e6196D8161](https://goerli.etherscan.io/address/0x7910D57c49fAE4F7c896A6cd185aB1e6196D8161)|
|OVM_L1ETHGateway|[0x2C9573A5c0d94075601dB745255645FE5D2e5f7C](https://goerli.etherscan.io/address/0x2C9573A5c0d94075601dB745255645FE5D2e5f7C)|
|OVM_L1MultiMessageRelayer|[0x120b44cC54e9b7E79b3583BE6B797D36DF9fD90a](https://goerli.etherscan.io/address/0x120b44cC54e9b7E79b3583BE6B797D36DF9fD90a)|
|OVM_SafetyChecker|[0x97203a63AC85D811b75575bc5F7Ddc414548B287](https://goerli.etherscan.io/address/0x97203a63AC85D811b75575bc5F7Ddc414548B287)|
|OVM_StateCommitmentChain|[0xc983d52292DCBBEE53a0730C6A3EEb61c6F19129](https://goerli.etherscan.io/address/0xc983d52292DCBBEE53a0730C6A3EEb61c6F19129)|
|OVM_StateManagerFactory|[0x625Ee9D6a8486FDc0c70b1793F37d368f4698014](https://goerli.etherscan.io/address/0x625Ee9D6a8486FDc0c70b1793F37d368f4698014)|
|OVM_StateTransitionerFactory|[0x28f8A0877c2DC85b3Aa269bD772CaCc6e92D7371](https://goerli.etherscan.io/address/0x28f8A0877c2DC85b3Aa269bD772CaCc6e92D7371)|
|Proxy__OVM_L1CrossDomainMessenger|[0x03F6221792451CAD23dF17fF4D702bF93978a9b3](https://goerli.etherscan.io/address/0x03F6221792451CAD23dF17fF4D702bF93978a9b3)|
|Proxy__OVM_L1ETHGateway|[0x499223f87451F2dcC638c506ff7549838A3ee00e](https://goerli.etherscan.io/address/0x499223f87451F2dcC638c506ff7549838A3ee00e)|
|mockOVM_BondManager|[0x1e4f220d5CDD25e2C0E60e0B2f56a7CCC25719C1](https://goerli.etherscan.io/address/0x1e4f220d5CDD25e2C0E60e0B2f56a7CCC25719C1)|
---
## GOERLI

Network : __goerli (chain id: 5)__

|Contract|Address|
|--|--|
|Lib_AddressManager|[0xE3d08F0D900A2D53cB794cf82d7127764BcC3092](https://goerli.etherscan.io/address/0xE3d08F0D900A2D53cB794cf82d7127764BcC3092)|
|OVM_CanonicalTransactionChain|[0x266534680e632Ce9425d8E5a991C43B3531C7818](https://goerli.etherscan.io/address/0x266534680e632Ce9425d8E5a991C43B3531C7818)|
|OVM_ChainStorageContainer-CTC-batches|[0x7b439CD647b76F45252858C19093a53b4c5FD4B4](https://goerli.etherscan.io/address/0x7b439CD647b76F45252858C19093a53b4c5FD4B4)|
|OVM_ChainStorageContainer-CTC-queue|[0xeD5fF8cFFba09fa5fF3104a63bA321733c4553d9](https://goerli.etherscan.io/address/0xeD5fF8cFFba09fa5fF3104a63bA321733c4553d9)|
|OVM_ChainStorageContainer-SCC-batches|[0x2A622E327D7A204b39355202d41BD9B752C8df54](https://goerli.etherscan.io/address/0x2A622E327D7A204b39355202d41BD9B752C8df54)|
|OVM_ExecutionManager|[0x45B459295d6b08D7dA3B9daae541D5F75E1CF818](https://goerli.etherscan.io/address/0x45B459295d6b08D7dA3B9daae541D5F75E1CF818)|
|OVM_FraudVerifier|[0xfA590cE7fE1d80D4b286e23f3f6e9f9357D6A90b](https://goerli.etherscan.io/address/0xfA590cE7fE1d80D4b286e23f3f6e9f9357D6A90b)|
|OVM_L1CrossDomainMessenger|[0x27BdfF69C72d29493bfD2152DbE28657f8Ddd5df](https://goerli.etherscan.io/address/0x27BdfF69C72d29493bfD2152DbE28657f8Ddd5df)|
|OVM_L1ETHGateway|[0x746E840b94cC75921D1cb620b83CFd0C658B2852](https://goerli.etherscan.io/address/0x746E840b94cC75921D1cb620b83CFd0C658B2852)|
|OVM_L1MultiMessageRelayer|[0x737557d97f7f2ccb0263C4b55f0D735D52c2D385](https://goerli.etherscan.io/address/0x737557d97f7f2ccb0263C4b55f0D735D52c2D385)|
|OVM_SafetyChecker|[0x71D4ea896C9a2D4a973CC5c7E347B6707691ECa0](https://goerli.etherscan.io/address/0x71D4ea896C9a2D4a973CC5c7E347B6707691ECa0)|
|OVM_StateCommitmentChain|[0x5c3e321947C99698027108351ee736823Bd157D8](https://goerli.etherscan.io/address/0x5c3e321947C99698027108351ee736823Bd157D8)|
|OVM_StateManagerFactory|[0x8E63CD1CfDBe5d34a7a91B97E0A2AeA23D0e585D](https://goerli.etherscan.io/address/0x8E63CD1CfDBe5d34a7a91B97E0A2AeA23D0e585D)|
|OVM_StateTransitionerFactory|[0x543021950Af9250443EEdc681755e0bdBd3Fc81d](https://goerli.etherscan.io/address/0x543021950Af9250443EEdc681755e0bdBd3Fc81d)|
|Proxy__OVM_L1CrossDomainMessenger|[0xFec83764acDeEc2ac338d4cc1f12bBE3cCDf551E](https://goerli.etherscan.io/address/0xFec83764acDeEc2ac338d4cc1f12bBE3cCDf551E)|
|Proxy__OVM_L1ETHGateway|[0xA721CF3e39E5cB4CfEEc0e32EE05B3D05AA9aE39](https://goerli.etherscan.io/address/0xA721CF3e39E5cB4CfEEc0e32EE05B3D05AA9aE39)|
|mockOVM_BondManager|[0x35a7735F9f517d071d5cFf89D11Ab4488bc5Df8C](https://goerli.etherscan.io/address/0x35a7735F9f517d071d5cFf89D11Ab4488bc5Df8C)|
---
