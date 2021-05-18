// SPDX-License-Identifier: MIT
// @unsupported: ovm
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

// This import path is different from what it should be if imported form NPM, then it would be "@eth-optimism/contracts/OVM/..."
import {
    OVM_ExecutionManager
} from "@eth-optimism/contracts/contracts/optimistic-ethereum/OVM/execution/OVM_ExecutionManager.sol";

contract NewExecutionManager is OVM_ExecutionManager {
    constructor(
        address _libAddressManager,
        GasMeterConfig memory _gasMeterConfig,
        GlobalContext memory _globalContext
    )
        OVM_ExecutionManager(_libAddressManager, _gasMeterConfig, _globalContext)
    {}
    function karen()
        external
        pure
        returns(
            string memory
        )
    {
        return "can I speak to the manager";
    }
}
