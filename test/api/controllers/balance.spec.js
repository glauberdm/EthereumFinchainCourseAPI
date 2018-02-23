var
    test = require('../../../config/test')
    , app = require('../../../app').listen()
    , mockgoose = require('../helpers/mockgoose')
    , balanceControllerWired = undefined
    , rewire = require('rewire')
    , BigNumber = require('bignumber.js')
    , request = require('supertest')
    , path = config.path
    , mongoose = require('mongoose')
    , User = mongoose.model('User')
    , Transfer = mongoose.model('Transfer')
    , expect = require('chai').expect
;


describe('controllers', () => {
    describe('balance', () => {
        describe('balanceOf', () => {

            beforeEach(() => {
                var balanceControllerPath = global.config.appRoot + '/api/controllers/balance.js' 
                balanceControllerWired = (func) => {
                    return rewire(balanceControllerPath).__get__(func)
                } 
            })

            //TODO: make test ethBalanceOf
        });
        
        describe('POST /balance', () => {
            let UserFrom
            let UserTo

            beforeEach((done) => {
                var user = {
                    email: "tester@finchain.com.br",
                    password: "taA84dliXwiAve3Y70srcz55F4Ujx_sw5jEvz7hsd5LsjqbUaGL",
                    name: "Finchain Tester",
                    idNumber: "123.456.789-00",
                    phone: "+55 11 98877-6655",
                    wallet: {
                      address:"0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8",
                      privateKey:"0xb933df6eae711ad9dd8708ebd74bd4a571f3036292a6c1ea0b8650923fcd915d"
                    }
                  };
            
                UserFrom = new User(user)
                UserFrom.save()

                var userTo = {
                    email: "tester2@finchain.com.br",
                    password: "taA84dliXwiAve3Y70srcz55F4Ujx_sw5jEvz7hsd5LsjqbUaGL",
                    name: "Finchain Tester 2",
                    idNumber: "123.456.789-00",
                    phone: "+55 11 98877-6655",
                    wallet: {
                      address:"0xcDe1DAf4F47D958E2a891B1B6437aA97569c6c7E",
                      privateKey:"0xb933df6eae711ad9dd8708ebd74bd4a571f3036292a6c1ea0b8650923fcd915d"
                    }
                  };
          
                UserTo = new User(userTo)
                UserTo.save()

                done()
            });

            describe('balance whitout transfers', () => {
                it('Should balance of', (done) => {
                    var token = "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"
    
                    var expectedResponse = {
                        data: {
                            amount: {
                                ETH: "1.496949539",
                                DYN: "19999999999999999999966"
                            }
                        },
                        success: true,
                        message:  {
                            title: "Balance of user",
                            message: "Balance of user in DYN",
                            messageId: 511
                        } 
                    };
    
                    request(app)
                        .post(path('/balance'))
                        .set('x-access-token', token)
                        .send({})
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body.message).to.deep.equal(expectedResponse.message)
                            expect(res.body.success).to.be.true
                            
                            var data = res.body.data
                            var amount = data.amount
                            expect(Number(amount.DYN)).to.be.a('number')
                            expect(Number(amount.ETH)).to.be.a('number')
                            expect(data.balance).to.be.empty
                            done()
                        })
                        ;
                });
            });

            describe('balance whith pendent transfers', () => {
                var token = "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"

                beforeEach((done) => {
                    var Transfer1 = new Transfer({
                        amount: 1000,
                        date: new Date(2017, 10, 28),
                        description: 'Transfer 1',
                        hash: '0x0b7cf45610f50df8130697450c287937139910e5f34625117ff6d39d580a9ec1',
                        from: UserFrom,
                        to: UserTo
                    })
                    Transfer1.save()

                    var Transfer2 = new Transfer({
                        amount: 2000,
                        date: new Date(2017, 10, 29),
                        description: 'Transfer 2',
                        hash: '0x0b7cf45610f50df8130697450c287937139910e5f34625117ff6d39d580a9ec2',
                        from: UserFrom,
                        to: UserTo,
                        status: 'SUCCESS'
                    })
                    Transfer2.save()
                    
                    var Transfer3 = new Transfer({
                        amount: 3000,
                        date: new Date(2017, 10, 30),
                        description: 'Transfer 3',
                        hash: '0x98fcfb34ff776cfab57ece44a94c9eb80916f12d4cd4511f37db00e7f43c1d3f',
                        from: UserFrom,
                        to: UserTo,
                    })
                    Transfer3.save()

                    var Transfer4 = new Transfer({
                        amount: 4000,
                        date: new Date(2017, 10, 30),
                        description: 'Transfer 4',
                        hash: '0x0b7cf45610f50df8130697450c287937139910e5f34625117ff6d39d580a9ec2',
                        from: UserFrom,
                        to: UserTo,
                    })
                    Transfer4.save()

                    done()
                });

                it('Should balance of', (done) => {
    
                    var expectedResponse = {
                        data: {
                            amount: {
                                ETH: 1.496949539,
                                DYN: 1999999999.9999999999966
                            },
                            balance: [
                                {
                                    amount: 1000,
                                    date: "2017-11-28T02:00:00.000Z",
                                    description: "Transfer 1",
                                    hash: "0x0b7cf45610f50df8130697450c287937139910e5f34625117ff6d39d580a9ec1",
                                    from: {
                                        email: "tester@finchain.com.br",
                                        name: "Finchain Tester",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"
                                    },
                                    to: {
                                        email: "tester2@finchain.com.br",
                                        name: "Finchain Tester 2",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0xcDe1DAf4F47D958E2a891B1B6437aA97569c6c7E"
                                    },
                                    status: "PENDENT"
                                },
                                {
                                    amount: 2000,
                                    date: "2017-11-29T02:00:00.000Z",
                                    description: "Transfer 2",
                                    hash: "0x0b7cf45610f50df8130697450c287937139910e5f34625117ff6d39d580a9ec2",
                                    from: {
                                        email: "tester@finchain.com.br",
                                        name: "Finchain Tester",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"
                                    },
                                    to: {
                                        email: "tester2@finchain.com.br",
                                        name: "Finchain Tester 2",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0xcDe1DAf4F47D958E2a891B1B6437aA97569c6c7E"
                                    },
                                    status: "SUCCESS"
                                },
                                {
                                    amount: 3000,
                                    date: "2017-11-30T02:00:00.000Z",
                                    description: "Transfer 3",
                                    hash: "0x98fcfb34ff776cfab57ece44a94c9eb80916f12d4cd4511f37db00e7f43c1d3f",
                                    from: {
                                        email: "tester@finchain.com.br",
                                        name: "Finchain Tester",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"
                                    },
                                    to: {
                                        email: "tester2@finchain.com.br",
                                        name: "Finchain Tester 2",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0xcDe1DAf4F47D958E2a891B1B6437aA97569c6c7E"
                                    },
                                    status: "SUCCESS"
                                },
                                {
                                    amount: 4000,
                                    date: "2017-11-30T02:00:00.000Z",
                                    description: "Transfer 4",
                                    hash: "0x0b7cf45610f50df8130697450c287937139910e5f34625117ff6d39d580a9ec2",
                                    from: {
                                        email: "tester@finchain.com.br",
                                        name: "Finchain Tester",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"
                                    },
                                    to: {
                                        email: "tester2@finchain.com.br",
                                        name: "Finchain Tester 2",
                                        phone: "+55 11 98877-6655",
                                        wallet: "0xcDe1DAf4F47D958E2a891B1B6437aA97569c6c7E"
                                    },
                                    status: "PENDENT"
                                }
                            ]
                        },
                        success: true,
                        message:  {
                            title: "Balance of user",
                            message: "Balance of user in DYN",
                            messageId: 511
                        } 
                    };
    
                    request(app)
                        .post(path('/balance'))
                        .set('x-access-token', token)
                        .send({})
                        .expect(200)
                        .end((err, res) => {

                            expect(res.body.message).to.deep.equal(expectedResponse.message)
                            expect(res.body.success).to.be.true
                            
                            var data = res.body.data
                            var amount = data.amount
                            expect(amount.DYN).to.be.a('number')
                            expect(amount.ETH).to.be.a('number')
                            expect(data.balance).to.have.lengthOf(4)
                            expect(data.balance).to.deep.equal(expectedResponse.data.balance)

                            done()
                        });
                });
            });
        });
    });
});