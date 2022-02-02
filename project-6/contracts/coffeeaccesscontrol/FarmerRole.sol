// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Import the library 'Roles'
// import "./Roles.sol";
import "../../node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract FarmerRole is AccessControlEnumerable {
    // using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event FarmerAdded(address indexed account);
    event FarmerRemoved(address indexed account);

    // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
    // Roles.Role private farmers;
    bytes32 public constant FARMER = keccak256("FARMER");

    // In the constructor make the address that deploys this contract the 1st farmer
    constructor() {
        // testing don't pass when i use this function
        addFarmer(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyFarmer() {
        require(isFarmer(msg.sender));
        _;
    }

    // Define a function 'isFarmer' to check this role
    function isFarmer(address account) public view returns (bool) {
        return hasRole(FARMER, account);
        // return farmers.has(account);
    }

    // Define a function 'addFarmer' that adds this role
    function addFarmer(address account) public onlyFarmer {
        _addFarmer(account);
    }

    // Define a function 'renounceFarmer' to renounce this role
    function renounceFarmer() public {
        _removeFarmer(msg.sender);
    }

    // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
    function _addFarmer(address account) internal {
        grantRole(FARMER, account);
        emit RoleGranted(FARMER, account, msg.sender);
    }

    // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
    function _removeFarmer(address account) internal {
        revokeRole(FARMER, account);
        emit RoleRevoked(FARMER, account, msg.sender);
    }
}
