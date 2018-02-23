var
    provider = require('./web3/provider'),
    tokenTransaction = require('./web3/tokenTransaction'),
    responseHelper = require('../helpers/response'),
    BigNumber = require('bignumber.js');

BigNumber.config({
    EXPONENTIAL_AT: 50
})

var sendDynastyToken = async (wallet, to, amount) => {
    return await tokenTransaction.transferToken(wallet, to, amount)
}

var sendTokenAsync = async (req, res) => {
    var response
    var transfer = req.body
    //transfer.to
    //transfer.amount
    var privateKey = req.get('x-access-token')

    try {
        if (!privateKey) {
            throw new Error(`Need x-access-token parameter`)
        }

        var wallet = {
            privateKey: privateKey
        }

        transfer.txHash = await sendDynastyToken(wallet, transfer.to, transfer.amount)
        transfer.viewTxHash = "https://ropsten.etherscan.io/tx/" + transfer.txHash

        response = responseHelper.success({
            title: "Send token",
            message: `${transfer.amount} tokens ETHFC was sended to ${transfer.to}`,
            messageId: 521
        }, transfer)
    } catch (error) {
        response = responseHelper.fail({
            title: "Send token",
            message: `Token ETHFC was not sended (${error.message})`,
            messageId: 520
        }, transfer)
    } finally {
        res.json(response)
    }
}

module.exports.sendToken = (req, res) => {
    sendTokenAsync(req, res).then()
}