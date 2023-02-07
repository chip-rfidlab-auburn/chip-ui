
const Web3 = require('web3');
import * as IPFS from 'ipfs-core'
import config from './config.json'
const NODE_URL = process.env.REACT_APP_NODE_URL;
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(config.ABI, config.CONTRACT);
//const ACCOUNT = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
const ACCOUNT = web3.eth.accounts.wallet.add(process.env.REACT_APP_PRIVATE_KEY_3);

export async function Connect() {
    /*
    let ethAccounts;
    if (window.ethereum) {
        ethAccounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);    
    } else {
        //no eth
    }
    */
    return [ACCOUNT.address]
    //return ethAccounts;
}

export async function createIdentity(key) {
    const ipfs = await IPFS.create();
    const result = await ipfs.add(JSON.stringify(key));
    console.log(result.path);
    try{
        const txn = await contract.methods.createIdentity(result.path).send({from: ACCOUNT.address, gas: 300000});
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    
    
}

export async function createWallet() {
    const wallet = await web3.eth.accounts.create();
    const txn = {
        "from": ACCOUNT.address,
        "to": wallet.address,
        "value": web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
        "gas": 300000
    }
    try{
        const signedTxn = await web3.eth.accounts.signTransaction(txn,ACCOUNT.privateKey);
        await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
        return wallet;
    } catch (err) {
        console.log(err);
    }
}

export async function uploadToIpfs(file) {
    const ipfs = await IPFS.create();
    const result = await ipfs.add(file);
    return result.path;
}

export async function addItemToChain(cid, addr, file, status, sender){
    const id = await contract.methods.getSupplyChainId().call();
    //TODO: GET THE PRIVATE KEY OF SENDER
    //TODO: SIGN AND SUBMIT THE TRANSACTION HERE
}