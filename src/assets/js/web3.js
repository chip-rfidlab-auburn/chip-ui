
const Web3 = require('web3');
import axios from 'axios';
import * as IPFS from 'ipfs-core'
import {create} from 'ipfs-http-client';
import config from './config.json'
import { BACKEND_URL, IPFS_PROJECT_ID, IPFS_PROJECT_SECRET } from './constants';
import { Buffer } from 'buffer';
const NODE_URL = process.env.REACT_APP_NODE_URL;
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(config.ABI, config.CONTRACT);
//const ACCOUNT = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
const ACCOUNT = web3.eth.accounts.wallet.add(process.env.REACT_APP_PRIVATE_KEY_3);
const auth = 'Basic ' + Buffer.from(IPFS_PROJECT_ID + ':' + IPFS_PROJECT_SECRET).toString('base64');
const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
})

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
    return wallet;
    /*
    const txn = {
        "from": ACCOUNT.address,
        "to": wallet.address,
        "value": web3.utils.toHex(web3.utils.toWei("1", "ether")),
        "gas": 300000
    }
    try{
        const signedTxn = await web3.eth.accounts.signTransaction(txn,ACCOUNT.privateKey);
        await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
        return wallet;
    } catch (err) {
        console.log(err);
    }
    */
}

export async function uploadToIpfs(file) {
    const result = await ipfsClient.add(file);
    return result.path;
}

export async function addItemToChain(cid, addr, file, status, sender){
    console.log(cid, addr, file, status);
    const id = await contract.methods.getSupplyChainId().call();
    console.log(id);
    //TODO: GET THE PRIVATE KEY OF SENDER
    //TODO: SIGN AND SUBMIT THE TRANSACTION HERE
    const privateKey = await axios.get(`${BACKEND_URL}/users?username=${sender.split('@')[0]}`);
    if(privateKey.data.users.length > 0) {
        const ACC = web3.eth.accounts.wallet.add(privateKey.data.users[0].wallet.private_key);
        try{
            await contract.methods.updateSupplyChainMovement(id,cid,addr,file,status).send({from: ACC.address, gas: 3000000});
            return true;
        } catch(err) {
            console.log(err);
            return false;

        }
    }
}

export async function getSupplyChainInformation(){
    const id = await contract.methods.getSupplyChainId().call();
    for(let i=0; i<id; i++){
        const itemState = await contract.methods.getSupplyChainInformation(id).call();
    }
}

export async function getIdentity(){
    const info = await contract.methods.getIdentity('0xc092a7b7384159C68Ac44Ef157Ab48f6F20B1028').call();
}