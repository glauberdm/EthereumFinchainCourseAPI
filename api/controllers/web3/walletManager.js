var
    provider = require('./provider'),
    web3 = provider.web3();

var userPhrase = (user) => {
    return web3.eth.accounts.hashMessage(user.email + user.idNumber)
}

module.exports.userPhrase = userPhrase

module.exports.create = (user) => {
    var hashPhrase = userPhrase(user)

    var wallet = web3.eth.accounts.create(hashPhrase)

    return wallet
}