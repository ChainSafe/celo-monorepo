pragma solidity ^0.5.13;

import "./StableToken.sol";
import "./StableTokenEUR.sol";
import "./StableTokenBRL.sol";

/**
 * @title contract that lists what stable coins are deployed as part of Celo's Stability protocol.
 */
contract StableTokenRegistry {
  mapping(string => string) public stableTokens;
  string[] public fiatTickers;

  /**
  * @notice Sets initialized == true on implementation contracts
  * @param test Set to true to skip implementation initialization
  */
  constructor(bool test) public Initializable(test) {}

  /**
  * @notice adds fiat currencies to fiatTickers collection
  * @param currencyType the type of currency we're trying to push into the collection  
  */
  function addFiatTickers(string currencyType) external onlyOwner {
    //also check if it already exists in the array, if it does then don't add
    //so I can make sure there are no dublicates
    require(!stableTokens[currencyType], "Stable token hasn't been issued");
    stableTokens[currencyType] = true;
    fiatTickers.push(currencyType);
  }
}