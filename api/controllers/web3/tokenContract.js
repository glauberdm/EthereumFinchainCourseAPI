var fs = require('fs'),
    path = require('path'),
    provider = require('./provider'),
    truffle = require('truffle-contract'),
    empty = require('is-empty'),
    token = undefined;

module.exports.instance = () => {
    if (empty(token)) {
        var tokenPath = path.join(config.appRoot, 'resources/contracts/EthereumFinchainCourse.json')
        var TokenArtifact = require('jsonfile').readFileSync(tokenPath)
        var Token = truffle(TokenArtifact)
        Token.setProvider(provider.web3Provider())

        token = Token.at(global.config.tokenAddress)
    }

    return token;
}