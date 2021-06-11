// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

/* Interface Imports */
import { iOVM_ECDSAContractAccount } from "../../iOVM/accounts/iOVM_ECDSAContractAccount.sol";

/* Library Imports */
import { Lib_EIP155Tx } from "../../libraries/codec/Lib_EIP155Tx.sol";
import { Lib_ExecutionManagerWrapper } from "../../libraries/wrappers/Lib_ExecutionManagerWrapper.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { OVM_ETH } from "../predeploys/OVM_ETH.sol";

/* External Imports */
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { Math } from "@openzeppelin/contracts/math/Math.sol";

/**
 * @title OVM_ECDSAContractAccount
 * @dev The ECDSA Contract Account can be used as the implementation for a ProxyEOA deployed by the
 * ovmCREATEEOA operation. It enables backwards compatibility with Ethereum's Layer 1, by
 * providing EIP155 formatted transaction encodings.
 *
 * Compiler used: optimistic-solc
 * Runtime target: OVM
 */
contract OVM_ECDSAContractAccount is iOVM_ECDSAContractAccount {

    /*************
     * Libraries *
     *************/

    using Lib_EIP155Tx for Lib_EIP155Tx.EIP155Tx;


    /*************
     * Constants *
     *************/

    // TODO: should be the amount sufficient to cover the gas costs of all of the transactions up
    // to and including the CALL/CREATE which forms the entrypoint of the transaction.
    uint256 constant EXECUTION_VALIDATION_GAS_OVERHEAD = 25000;


    /*********************
     * Private Functions *
     *********************/

    /**
     * Compute the intrinsic gas of a transaction
     * @param _encodedTransaction Signed EIP155 transaction bytes.
     * @param _isCreate Whether the transaction creates a contract
     * @return The amount of intrinsic gas
     */
    function _intrinsicGas(
        bytes memory _encodedTransaction,
        bool _isCreate
    )
        private
        returns (
            uint256
        )
    {
        uint256 intrinsicGas = SafeMath.mul(
            _encodedTransaction.length,
            16
        );
        if (_isCreate) {
            intrinsicGas = SafeMath.add(
                intrinsicGas,
                53000
            );
        } else {
            intrinsicGas = SafeMath.add(
                intrinsicGas,
                21000
            );
        }
        return intrinsicGas;
    }


    /********************
     * Public Functions *
     ********************/

    /**
     * No-op fallback mirrors behavior of calling an EOA on L1.
     */
    fallback()
        external
        payable
    {
        return;
    }

    /**
     * Executes a signed transaction.
     * @param _transaction Signed EIP155 transaction.
     * @return Whether or not the call returned (rather than reverted).
     * @return Data returned by the call.
     */
    function execute(
        Lib_EIP155Tx.EIP155Tx memory _transaction
    )
        override
        public
        returns (
            bool,
            bytes memory
        )
    {

        // Decode the L2 gas limit. It is scaled and serialized in the lower
        // order bits of transaction.gasLimit. See:
        // https://github.com/ethereum-optimism/optimism/blob/0c18e1903f8a33a607f782c0081a8fb5071b71ef/l2geth/rollup/fees/rollup_fee.go#L56
        uint256 gasLimit = SafeMath.mul((transaction.gasLimit % 10000), 10000);
        // Need to make sure that the gas is sufficient to execute the transaction.
        require(
            gasleft() >= gasLimit + intrinsicGas,
            "Gas is not sufficient to execute the transaction."
        );

        // Address of this contract within the ovm (ovmADDRESS) should be the same as the
        // recovered address of the user who signed this message. This is how we manage to shim
        // account abstraction even though the user isn't a contract.
        require(
            _transaction.sender() == Lib_ExecutionManagerWrapper.ovmADDRESS(),
            "Signature provided for EOA transaction execution is invalid."
        );

        require(
            _transaction.chainId == Lib_ExecutionManagerWrapper.ovmCHAINID(),
            "Transaction signed with wrong chain ID"
        );

        // Need to make sure that the transaction nonce is right.
        require(
            _transaction.nonce == Lib_ExecutionManagerWrapper.ovmGETNONCE(),
            "Transaction nonce does not match the expected nonce."
        );

        // Transfer fee to relayer.
        require(
            OVM_ETH(Lib_PredeployAddresses.OVM_ETH).transfer(
                Lib_PredeployAddresses.SEQUENCER_FEE_WALLET,
                SafeMath.mul(_transaction.gasLimit, _transaction.gasPrice)
            ),
            "Fee was not transferred to relayer."
        );

        if (transaction.isCreate) {
            (address created, bytes memory revertdata) = Lib_ExecutionManagerWrapper.ovmCREATE(
                _transaction.data,
                gasLimit
            );

            // Return true if the contract creation succeeded, false w/ revertdata otherwise.
            if (created != address(0)) {
                return (true, abi.encode(created));
            } else {
                return (false, revertdata);
            }
        } else {
            // We only want to bump the nonce for `ovmCALL` because `ovmCREATE` automatically bumps
            // the nonce of the calling account. Normally an EOA would bump the nonce for both
            // cases, but since this is a contract we'd end up bumping the nonce twice.
            Lib_ExecutionManagerWrapper.ovmINCREMENTNONCE();

            // NOTE: Upgrades are temporarily disabled because users can, in theory, modify their EOA
            // so that they don't have to pay any fees to the sequencer. Function will remain disabled
            // until a robust solution is in place.
            require(
                _transaction.to != Lib_ExecutionManagerWrapper.ovmADDRESS(),
                "Calls to self are disabled until upgradability is re-enabled."
            );

            return _transaction.to.call{value: _transaction.value}(_transaction.data);
        }
    }
}
