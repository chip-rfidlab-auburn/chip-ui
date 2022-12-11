
const Web3 = require('web3');
import * as IPFS from 'ipfs-core'
import config from './config.json'

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

export async function createIdentity(key, address) {
    const ipfs = await IPFS.create();
    const result = await ipfs.add(JSON.stringify(key));
    
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(config.ABI, config.CONTRACT);
    try{
        await contract.methods.createIdentity(result.path).send({from: address});
    }catch(err) {
        console.log(err)
    } finally {
        return ({success: true})
    }

}