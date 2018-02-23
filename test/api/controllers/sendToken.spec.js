var
  test = require('../../../config/test')
  , app = require('../../../app').listen()
  , mockgoose = require('../helpers/mockgoose')
  , request = require('supertest')
  , path = config.path
  , User = require('mongoose').model('User')
  , expect = require('chai').expect
;

describe('controllers', () => {
  describe('sendToken', () => {
    describe('POST /send_token', function() {

      beforeEach((done) => {
        var userFrom = {
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
  
        var UserFrom = new User(userFrom)
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

        var UserTo = new User(userTo)
        UserTo.save()

        done()
      })

      it('Should send token', (done) => {
        var transfer = {
          amount: 500.05,
          description: "Lunch",
          wallet: "0xcDe1DAf4F47D958E2a891B1B6437aA97569c6c7E"
        };

        var expectedResponse = {
          data : {
            amount: 500.05,
            description: "Lunch",
            hash: 'to be a hash',
            date: 'to be a date',
            from: {
              email: "tester@finchain.com.br",
              name: "Finchain Tester",
              phone: "+55 11 98877-6655",
              wallet: "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8",
            },
            to: {
              email: "tester2@finchain.com.br",
              name: "Finchain Tester 2",
              phone: "+55 11 98877-6655",
              wallet: "0xcDe1DAf4F47D958E2a891B1B6437aA97569c6c7E",
            },
            status: 'PENDENT'
          },
          success: true,
          message:  {
              title: "Send token",
              message: "500.05 tokens DYN was sended to Finchain Tester 2",
              messageId: 521
          } 
        };

        var token = "0x6DB4102fd0c3b8853a4Bb09520B8998A9df45dD8"

        request(app)
          .post(path('/send_token'))
          .set('x-access-token', token)
          .send(transfer)
          .expect(200)
          .end((err, res) => {

            expect(res.body.message).to.deep.equal(expectedResponse.message)
            expect(res.body.success).to.be.true
            
            const data = res.body.data
            const dataExpected = expectedResponse.data
            
            expect(data.status).to.be.equal(dataExpected.status)
            
            expect(data.from).to.be.include(dataExpected.from)
            expect(data.to).to.be.include(dataExpected.to)
            expect(new Date(data.date)).to.be.a('date')
            expect(data.hash).to.be.a('string')
            expect(data.description).to.be.equal(dataExpected.description)
            expect(data.amount).to.be.a('number')
            
            done()
          });
      });
    });
  });
});