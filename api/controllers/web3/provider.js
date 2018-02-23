var
    Web3 = require('web3')
    , web3 = undefined
    , web3Provider = undefined
    , empty = require('is-empty')
;

function init(){
    if(empty(web3Provider) || empty(web3)){
        var provider_url = global.config.providerUrl
        web3Provider = new Web3.providers.HttpProvider(provider_url);
        web3 = new Web3(web3Provider)
    }
}

module.exports.web3 = () => {
    init()

    return web3
}

module.exports.web3Provider = () => {
    init()

    return web3Provider;
}