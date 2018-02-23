var
test = require('../../../../config/test')
, app = require('../../../../app').listen()
, expect = require('chai').expect
;

describe('controllers', () => {
    describe('web3', () => {
        describe('provider', () => {
            it('Should has web provider', async () => {
                var web3Provider = require('../../../../api/controllers/web3/provider').web3Provider()

                expect(web3Provider).to.deep.include({host:"https://ropsten.infura.io/glauberdm"})
            });

        });
    });
});