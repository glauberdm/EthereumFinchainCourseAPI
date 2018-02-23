var
    web3 = require('./web3/provider').web3(),
    tokenBalance = require('./web3/tokenBalance'),
    responseHelper = require('../helpers/response'),
    BigNumber = require('bignumber.js'),
    _ = require('lodash');

BigNumber.config({
    EXPONENTIAL_AT: 50
})

var ethBalanceOf = async (address) => {
    var wei = await web3.eth.getBalance(address)
    var ether = await web3.utils.fromWei(wei, 'ether')
    return Number(ether)
}

var tokenBalanceOf = async (address) => {
    return await tokenBalance.balanceOf(address)
}

var balanceAsync = async (req, res) => {
    var response

    var data = {
        amount: {
            ETH: null,
            ETHFC: null
        }
    }

    try {
        var address = req.get('x-access-token')
        data.amount.ETHFC = await tokenBalanceOf(address)
        data.amount.ETH = await ethBalanceOf(address)

        response = responseHelper.success({
            title: "Balance of user",
            message: "Balance of user in DYN",
            messageId: 511
        }, data)
    } catch (error) {
        response = responseHelper.fail({
            title: "Balance of user",
            message: `Balance of user in DYN no have possible to get (${error.message})`,
            messageId: 510
        }, data)
    } finally {
        res.json(response)
    }
}

module.exports.balance = (req, res) => {
    balanceAsync(req, res).then()
}