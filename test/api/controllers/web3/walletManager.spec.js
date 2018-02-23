var
test = require('../../../../config/test')
, app = require('../../../../app').listen()
, expect = require('chai').expect
;

describe('controllers', () => {
    describe('web3', () => {
        describe('wallet', () => {
            
            it('Should create account - wallet', () => {
                var walletManager = require('../../../../api/controllers/web3/walletManager')

                var phrase = "test@flowbtc.com.br"+"test@test"
                
                var wallet = walletManager.create(phrase)

                expect(wallet).to.have.all.keys('address', 'privateKey', 'encrypt', 'sign', 'signTransaction')
            });
            
        });
    });
});