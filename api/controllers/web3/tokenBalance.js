var
    token = require('./tokenContract').instance(),
    BigNumber = require('bignumber.js');

BigNumber.config({
    EXPONENTIAL_AT: 50
})

module.exports.balanceOf = async (address) => {
    let decimals = await token.decimals()
    let balance = await token.balanceOf(address)
    return balance / Math.pow(10, decimals)
}