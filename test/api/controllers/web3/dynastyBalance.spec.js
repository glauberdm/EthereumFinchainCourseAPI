var
    test = require('../../../../config/test')
    , app = require('../../../../app').listen()
    , expect = require('chai').expect
;



describe('controllers', () => {
    describe('web3', () => {
        describe('dynastyBalance', () => {
            describe('balanceOf', () => {
                it('Should dynasty balance of', async () => {
                    var address = "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"
                    var dynastyBalance = require('../../../../api/controllers/web3/dynastyBalance')
                
                    var balance = await dynastyBalance.balanceOf(address)
                
                    expect(Number(balance)).to.be.a('number')
                });
            });
        });
    });
});


