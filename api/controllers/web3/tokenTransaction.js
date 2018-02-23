var
    provider = require('./provider'),
    web3 = provider.web3(),
    token = require('./tokenContract').instance(),
    BigNumber = require('bignumber.js');

var signTransaction = async (tx, wallet) => {
    return await web3.eth.accounts.signTransaction(tx, wallet.privateKey)
}

var createTransaction = async (to, amount) => {
    amount *= Math.pow(10, await token.decimals())
    var requestTransfer = await token.transfer.request(to, amount)
    var data = requestTransfer.params[0].data

    var estimatedGas = await web3.eth.estimateGas({
        to: to,
        data: data
    })
    var estimatedGasHex = await web3.utils.toHex(estimatedGas)

    var gas = 100000 // estimatedGas // 51711 // 100000 // 
    var gasHex = await web3.utils.toHex(gas)

    var gasPrice = 21000000000 // await web3.eth.getGasPrice() //  
    var gasPriceHex = await web3.utils.toHex(gasPrice)

    var tx = {
        gasPrice: gasPriceHex,
        gas: gasHex, //Non-optional
        to: token.address,
        value: '0x00',
        data: data,
        chainId: await web3.eth.net.getId() //Default
    }

    return tx
}

function sendSignedTransaction(tx) {
    return new Promise((resolve, reject) => {
        web3.eth.sendSignedTransaction(tx, (error, txHash) => {
            if (!txHash) {
                throw error
            } else {
                resolve(txHash);
            }
        })
    })
}

module.exports.transferToken = async (wallet, to, amount) => {
    var rawTransaction = await createTransaction(to, amount)
    console.log('RAW TRANSACTION ', JSON.stringify(rawTransaction, null, 2))
    var signedTx = await signTransaction(rawTransaction, wallet)
    console.log('SIGNED TRANSACTION ', JSON.stringify(signedTx, null, 2))
    var rawTransactionSigned = signedTx.rawTransaction
    var txHash = await sendSignedTransaction(rawTransactionSigned)

    return txHash
}