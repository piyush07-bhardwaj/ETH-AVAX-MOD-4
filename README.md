Degen Gaming Token (ERC20)

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![Solidity](https://img.shields.io/badge/Solidity-0.8.0-blue.svg)](https://solidity.readthedocs.io/en/v0.8.0/) [![Avalanche](https://img.shields.io/badge/Avalanche-Fuji_Network-red.svg)](https://www.avalabs.org/) [![My Badge](https://img.shields.io/badge/Metacrafters-yellow.svg)](https://www.metacrafters.io/) [![Website Status](https://img.shields.io/website-up-down-green-red/https/bhardwajrizul.github.io/DegenToken-Metacrafters.svg)](https://bhardwajrizul.github.io/DegenToken-Metacrafters/)
> 🎮 A unique token for Degen Gaming Studio to reward players and enhance their gaming experience using the Avalanche blockchain. 
>**🛒** Players can redeem tokens for various items, transfer tokens, and burn tokens through the Degen Mart website. 
---
##### IMPORTANT: Make sure you have metamask installed and are on [avalanche fuji chain](https://chainlist.org/chain/43113?testnets=true) before using the webiste. You also need some test-AVAX in your account for gas fees.
---

## Description 📑
The Degen Gaming Token (DGN) is a custom ERC20 token designed for Degen Gaming Studio. It enables players to earn rewards while playing the game and transfer or redeem these tokens for various items on the dengen mart webiste.
## Application Preview 📸
[![main.png](https://i.postimg.cc/g209w9Ph/main.png)](https://postimg.cc/TpBNS412)
## Website Details 🛍️
The Degen Gaming website allows you to redeem tokens for special items, transfer DGN tokens to other accounts, and burn tokens for removal. It provides a seamless experience for managing and utilizing your DGN tokens within the game ecosystem.
## Contract Details 📃
The DegenToken contract is implemented in Solidity version 0.8. It inherits from the `IERC20` interface, providing standard ERC20 functionality. The contract has the following features:
- Token name: _DegenToken_
- Token symbol: _DGN_
### Token Functionality 🪙
1. `totalSupply()`: Returns the total supply of DegenTokens.
2. `balanceOf(address account)`: Returns the token balance of the specified account.
3. `transfer(address to, uint256 value)`: Transfers tokens from the sender's account to the specified recipient.
4. `burn(uint256 value)`: Burns tokens from the sender's account, reducing the total supply.
5. `mint(address to, uint256 value)`: Mints new tokens and assigns them to the specified recipient. Only the contract owner can perform this operation.
6. `getPurchases(address account)`: Retrieves the list of purchases made by the specified account.
7. `redeem(string memory itemName, uint256 value)`: Allows the sender to redeem tokens for an item in the in-game store.
8. `allowance(address owner, address spender)`: Returns the amount of tokens that the spender is allowed to spend on behalf of the owner.
9. `approve(address spender, uint256 value)`: Approves the spender to transfer a specific amount of tokens from the sender's account.
10. `transferFrom(address from, address to, uint256 value)`: Transfers tokens from one address to another on behalf of a specified address.
## Local Installation 🧑‍💻
To see how the Degen Mart Webiste and DegenToken contract were developed using the Avalanche network, you can follow these steps:
1. Install the required dependencies: [Hardhat](https://hardhat.org/getting-started/) and [Ethers.js](https://docs.ethers.io/v5/getting-started/).
2. Clone the repository: `git clone https://github.com/bhardwajrizul/DegenToken-Metacrafters.git`
3. Navigate to the project directory: `cd DegenToken-Metacrafters`
4. Install the project dependencies: `npm install`
5. Set up your Avalanche network provider and account credentials in the Hardhat configuration file(`hardaht.config.js`).
6. Deploy the contract to the Avalanche network using Hardhat:
`npx hardhat run scripts/deploy.js --network fuji`
**Note:** Make sure to provide your private key inside `hardaht.config.js`
7. Start the webiste using `npm run dev`
8. Interact with the deployed contract by using the webiste that utilizes Ethers.js.
9. 
## Contributing
Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request. For major changes, please open an issue first to discuss the proposed changes.
## Acknowledgements 🤝
This project was developed with the guidance and support of [Metacrafters](https://www.metacrafters.io/) as part of their comprehensive web3 avax course.


### Author
Piyush Bhardwaj
