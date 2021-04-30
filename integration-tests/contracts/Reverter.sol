// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

contract Reverter {
    string constant public revertMessage = "This is a simple reversion.";

    function doRevert() external pure {
        revert(revertMessage);
    }
}
