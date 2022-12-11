
const Web3 = require('web3');

export async function Connect() {
    let ethAccounts;
    if (window.ethereum) {
        ethAccounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);    
    } else {
        //no eth
    }
    return ethAccounts;
}

export async function createIdentity(hash, address) {
    
}