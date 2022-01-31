// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Import the library 'Roles'
import "../../node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole is AccessControlEnumerable {
    // Define 2 events, one for Adding, and other for Removing
    event ConsumerAdded();
    event ConsumerRemoved();

    bytes32 public constant CONSUMER = keccak256("CONSUMER");

    // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
    struct consumers {
        string name;
    }

    // In the constructor make the address that deploys this contract the 1st consumer
    constructor() {
        // _addConsumer(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyConsumer() {
        require(isConsumer(msg.sender));
        _;
    }

    // Define a function 'isConsumer' to check this role
    function isConsumer(address account) public view returns (bool) {
        return hasRole(CONSUMER, account);
    }

    // Define a function 'addConsumer' that adds this role
    function addConsumer(address account) public onlyConsumer {
        _addConsumer(account);
    }

    // Define a function 'renounceConsumer' to renounce this role
    function renounceConsumer() public {
        _removeConsumer(msg.sender);
    }

    // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
    function _addConsumer(address account) internal {
        grantRole(CONSUMER, account);
        emit RoleGranted(CONSUMER, account, msg.sender);
    }

    // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
    function _removeConsumer(address account) internal {
        revokeRole(CONSUMER, account);
        emit RoleRevoked(CONSUMER, account, msg.sender);
    }
}
