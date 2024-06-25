let contractAddress = "0x789fb234Ab14571d97d013705D735296a23Eb442";

let abi = null;
let degenContract = null;

let contentEl = document.getElementById("content");
let connectBtnEl = document.getElementById("connect-btn");
let addressEl = document.getElementById("account");
let accountBalanceEl = document.getElementById("balance");
let buyBtnsEl = document.querySelectorAll('.buy-btn'); 
let recieverEl = document.getElementById("reciever");
let transferAmountEl = document.getElementById("amount-transfer");
let mintAmountEl = document.getElementById("amount-mint");
let recieverMintEl = document.getElementById("reciever-mint");
let mintBtnEl = document.getElementById("mint-btn");
let transferBtnEl = document.getElementById("transfer-btn");
let btnBurn = document.getElementById("btn-burn");
let btnBurnAmount = document.getElementById("amount-burn");
let itemsEl = document.getElementById("items"); 

mintBtnEl.addEventListener("click", () => mint());
transferBtnEl.addEventListener("click", () => transfer());
btnBurn.addEventListener("click", () => burn());
buyBtnsEl.forEach(btn => btn.addEventListener("click", (event) => redeemToken(event)));

let isConnected = false;



if (!isConnected) {
    hideContent();
    fetchABI();
    tryConnection();

} else {
    displayError("Connect To MetaMask", true);
}

function hideContent() {
    contentEl.classList.add("hide");
    document.getElementById("connect-btn-hover").classList.remove("disable");
    connectBtnEl.innerHTML = "Connect your Account";
    connectBtnEl.disabled = false;
    buyBtnsEl.forEach(btn => btn.disabled = true);
}

function fetchABI() {
    fetch("https://bhardwajrizul.github.io/DegenToken-Metacrafters/artifacts/contracts/DegenToken.sol/DegenToken.json")
        .then((response) => response.json())
        .then((data) => {
            abi = data.abi;
        })
        .catch((error) => {
            displayError("Cannot fetch ABI", false, error);
        });
}

function tryConnection() {
    if (window.ethereum && window.ethereum.isMetaMask) {
        isConnected = true;
        connectBtnEl.addEventListener("click", () => connectWallet());
        window.ethereum.on('accountsChanged', (accounts) => {
            window.location.reload();
          });
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });
    } else {
        displayError("Please install MetaMask!", true);
    }
}

async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        degenContract = getDegenContract();
        updateContent(accounts[0]);
    } catch(error) {
        displayError("Could not connect to MetaMask", true, error)
    }
}

function getDegenContract() {
    if (window.ethereum && window.ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        return contract;
    }

}

async function updateContent(account) {
    addressEl.innerText = account;
    try {
        let balance = await degenContract.balanceOf(account);
        let items = await degenContract.getPurchases(account);
        accountBalanceEl.innerText = balance.toString();
        itemsEl.innerText = items.join(", "); 
        displayContent();
    }
    catch (error) {
        displayError("Cannot access contract, try later!", true, error);
    }
}

function displayError(message=null, show, error=null) {
    console.log(error || message);
    isConnected = false;
    contentEl.innerHTML = show
        ? message : "Something went wrong try again later!.";
    setTimeout(() => {
        window.location.reload();
        displayContent();
    }, 10000);
}


function displayContent() {
    contentEl.classList.remove("hide");
    document.getElementById("connect-btn-hover").classList.add("disable");
    connectBtnEl.innerHTML = "Connected";
    connectBtnEl.disabled = true;
    buyBtnsEl.forEach(btn => btn.disabled = false);
}

async function transfer() {
    let receiverAddress = recieverEl.value.trim();
    let amountValue = transferAmountEl.value.trim();
  
    if (receiverAddress && amountValue) {
      try {
        const contract = getDegenContract(); 
        const tx = await contract.transfer(receiverAddress, amountValue);
        console.log(tx);
        contract.on("Transfer", (value) => {
            updateContent(addressEl.innerText);
            console.log("Tx sucessful with amount : ",value);
        });
        

      } catch (error) {
        displayError("Cannot transfer", true, error);
      }
    } else {
      displayError("Please fill all fields properly", true);
    }
    hideModal();
}
async function mint() {
    let address = recieverMintEl.value.trim();
    let amountValue = mintAmountEl.value.trim();
    if (amountValue && address) {
      try {
        const contract = getDegenContract(); 
        const tx = await contract.mint(address, amountValue);
        console.log(tx);
        contract.on("Mint", (value) => {
            updateContent(addressEl.innerText);
            console.log("Minting sucessful with amount : ",value);
        });
        

      } catch (error) {
        displayError("You are not authorized to perform this operation", true, error);
      }
    } else {
      displayError("Please fill all fields properly", true);
    }
    hideModal();
}

async function burn() {
    let amountValue = btnBurnAmount.value.trim();
    if (amountValue) {
        try {
            const contract = getDegenContract();
            const tx = await contract.burn(amountValue);
            console.log(tx);
            contract.on("Burn", (value) => {
                updateContent(addressEl.innerText);
                console.log("Burning sucessful with amount : ",value);
            });
        } catch (error) {
            displayError("Something went wrong!", true, error);
        }
    } else {
        displayError("Please fill all fields properly", true);
    }
    hideModal();
}

async function redeemToken(e) {
    let amount = e.target.value;
    let itemName = e.target.getAttribute('data-item');
    let degenContract = getDegenContract();
    if (!amount || !itemName) {
        displayError("Enter Proper Data!", true);
        return;
    }
    try {
        const tx = await degenContract.redeem(itemName, amount);
        console.log(tx);
        degenContract.on("Transfer", (value) => {
            updateContent(addressEl.innerText);
            console.log("Redeem sucessful with amount : ",value);
        });
    } catch {
        displayError("Something went wrong!", true);
    }
    hideModal();
}

function hideModal() {
    document.querySelectorAll('.btn-close').forEach(btnClose => {
        btnClose.click();
    });
}
