pragma solidity ^0.4.24;

// Import the library 'Roles'
import "../../node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// import "../../node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol";

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract DistributorRole is AccessControlEnumerable {
    // Define 2 events, one for Adding, and other for Removing
    event DistributorAdded();
    event DistributorRemoved();

    bytes32 public constant DISTRIBUTOR = keccak256("DISTRIBUTOR");

    // Define a struct 'distributors' by inheriting from 'Roles' library, struct Role
    struct distributors {
        string name;
    }

    // In the constructor make the address that deploys this contract the 1st distributor
    constructor() public {
        _addDistributor(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier isDistributor() {
        require(isDistributor(msg.sender));
        _;
    }

    //??
    modifier onlyDistributor() {
        require(hasRole(msg.sender));
        _;
    }

    // Define a function 'isDistributor' to check this role
    function isDistributor(address account) public view returns (bool) {
        return hasRole(DISTRIBUTOR, account);
    }

    // Define a function 'addDistributor' that adds this role
    function addDistributor(address account) public onlyDistributor {
        _addDistributor(account);
    }

    // Define a function 'renounceDistributor' to renounce this role
    function renounceDistributor() public {
        _removeDistributor(msg.sender);
    }

    // Define an internal function '_addDistributor' to add this role, called by 'addDistributor'
    function _addDistributor(address account) internal {
        _grantRole(DISTRIBUTOR, account);
        emit RoleGranted(DISTRIBUTOR, account, msg.sender);
    }

    // Define an internal function '_removeDistributor' to remove this role, called by 'removeDistributor'
    function _removeDistributor(address account) internal {
        __revokeRole(Distributor, account);
        emit RoleRevoked(Distributor, account, msg.sender);
    }
}