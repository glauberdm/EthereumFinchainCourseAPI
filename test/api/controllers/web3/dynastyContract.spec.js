var
    test = require('../../../../config/test')
    , app = require('../../../../app').listen()
    , expect = require('chai').expect
    , BigNumber = require('bignumber.js')
;

describe('controllers', () => {
    describe('web3', () => {
        describe('dynastyContract', () => {
            
            it('Should instance Dynasty contract', async () => {
                var dynastyContract = require('../../../../api/controllers/web3/dynastyContract')
                // var instance = dynastyContract.instance()

                // expect(instance).to.not.be.undefined

                // var contractName = await instance.name()
                // expect(contractName).to.deep.equal("Dynasty")

                // var contractSymbol = await instance.symbol()
                // expect(contractSymbol).to.deep.equal("DYN")

                // var contractDecimals = await instance.decimals()
                // expect(contractDecimals).to.deep.equal(new BigNumber(18))
            });
            
        });
    });
});