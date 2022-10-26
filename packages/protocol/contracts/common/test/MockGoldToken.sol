pragma solidity ^0.5.13;
// solhint-disable no-unused-vars

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title A mock GoldToken for testing.
 */
contract MockGoldToken {
  using SafeMath for uint256;

  uint8 public constant decimals = 18;
  uint256 public totalSupply;
  mapping(address => uint256) balances;

  function setTotalSupply(uint256 value) external {
    totalSupply = value;
  }

  function transfer(address to, uint256 amount) external returns (bool) {
    return _transfer(msg.sender, to, amount);
  }

  function transferFrom(address from, address to, uint256 amount) external returns (bool) {
    return _transfer(from, to, amount);
  }

  function _transfer(address from, address to, uint256 amount) internal returns (bool) {
    if (balances[from] < amount) {
      return false;
    }
    balances[from] -= amount;
    balances[to] += amount;
    return true;
  }

  function setBalanceOf(address a, uint256 value) external {
    balances[a] = value;
  }

  function balanceOf(address a) external view returns (uint256) {
    return balances[a];
  }

  function mint(address to, uint256 value) external returns (bool) {
    require(to != address(0), "0 is a reserved address");
    balances[to] = balances[to].add(value);
    totalSupply = totalSupply.add(value);
    return true;
  }

}
