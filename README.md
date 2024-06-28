# GreenChain Bank
#### Video Demo:  (https://youtu.be/1LACMGpHMJo)
#### Description:
So first I want to acknowledge the artificial intelligence tools I used to create this project. The logo image was generated by a prompt I entered into a program called Copilot Designer by Microsoft. I then used Code Copilot from ChatGPT to assist me with creating the project.

The title of my project is GreenChain Bank. I wanted to create my own cryptocurrency wallet away from the exchanges. A wallet that provides the user their mnemonic and private key for their wallet. This way it is truly private as my program only allows the user to see it once. In my research, I learned that writing down this information is safer than storing it on the computer. This is because if written down, generally only the people around you can access it, whereas if you keep it on the computer, you open the possibility for a bigger audience to steal said information. Creating what is called a cold storage wallet. This simply means you store the wallet information offline away from threats, which is ideal for long-term protection.

Originally, I wanted to create a Bitcoin wallet because it was the type of cryptocurrency I was most familiar with using in the past. I downloaded bitcoinjs-lib, a JavaScript library for Bitcoin applications. To run this library correctly, I needed to use two other technologies. The first was a package manager called npm, which helped install and manage dependencies from a node_modules directory. The second was a tool called Webpack, which bundles JavaScript files to optimize code for web applications. While using these tools, I encountered many errors due to library expectations, node module issues, and Content Security Policy (CSP) errors in my manifest.json file. This would often lead to an inactive service worker, which made the program difficult to debug. I struggled with these issues for a couple of weeks. Eventually, I realized that current Bitcoin transaction fees are very high, around $20, whereas Ethereum transaction fees are much lower, around $0.50, making them more affordable for testing purposes. For this reason, I reluctantly decided to rebuild my wallet as an Ethereum wallet instead of the Bitcoin wallet I originally envisioned.

Honestly, this was a very good decision for me as everything just fell into place after that. Working with the Bitcoin wallet previously, I already had an idea of how I wanted to design the extension with its purpose of simplicity and security. Now that my wallet was running on Ethereum, I had to change libraries. I am now using the ethers.js library, which no longer requires me to use tools like Webpack or npm to function. This decluttered my project folder by removing files like the Webpack configuration file and all the bundle files that were generated. My root folder is now made up of two folders and four files, not including this readme file.

The first folder is the images folder, holding the application logo in the three expected sizes for a Chrome extension. Next is the lib folder, which holds the file ethers-5.2.umd.min.js, which is a minified ethers.js library. This library allows the application to interact with the blockchain and Ethereum ecosystem, enabling actions such as sending transactions and managing wallets. After that, the four files remaining are manifest.json, background.js, popup.html, and popup.js. The manifest.json file provides the configuration of the extension. The background script points to background.js, and the extension's action, triggered by clicking the toolbar icon, opens popup.html. The background.js file is the service worker as defined by manifest.json and handles lifecycle events like installation. When the installation occurs, it logs the message "Extension Installed" to the console. The popup.js file is where the functionality of the wallet comes from. Here there are event listeners for buttons that allow the user to interact with the extension with a few basic functions. First, it allows you to create a wallet, which generates a wallet address, mnemonic, and private key. It alerts you that you will only see this information once and to write it down. It then saves the mnemonic to local Chrome storage so when you close the extension and open it back up, your wallet is still active in the extension. It then goes on to the import wallet function, which prompts the user to enter the wallet mnemonic to retrieve any wallet using the ethers.js library, as long as no mnemonic is currently being stored locally in Chrome. Next, the file goes into the send transaction function of the wallet. This allows the user to send a specified amount of Ethereum to any Ethereum wallet address provided. It does this not only using the ethers.js library but also an API from my Infura blockchain service account, which operates without the need to run your own nodes, adding more simplicity compared to the Bitcoin wallet design. The transaction will then send from the wallet being stored locally. The wallet then updates the balance of the stored wallet after the transaction completes. If no wallet exists, a message is displayed saying one must be created or imported to show wallet info. When a wallet is being stored and wallet info is displayed, the code also offers a delete function. Doing so removes the mnemonic from Chrome storage and removes wallet info from display. The file then ends with a line to ensure wallet info will be displayed if one is being stored locally. Finally, the fourth and last file is popup.html. This file provides the design of the extension with button placement, green text color on a black background, and a yellow border around it. The file also includes the ethers.js library and the popup.js script to handle wallet operations and interactions.

I am happy with my outcome as this wallet runs well and allows true privacy once the wallet is deleted and you have the wallet information stored away safely. I learned a lot, even through the process of working with the bitcoinjs-lib and Webpack bundles. Though using Ethereum seems to be the better choice as the Infura API allowed me to work without running my own nodes, and the ethers.js library did not introduce as many complications in comparison. This concludes my final project for the CS50 course.