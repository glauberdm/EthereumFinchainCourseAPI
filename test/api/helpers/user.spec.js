var 
    expect = require('chai').expect
    , userHelper = require('../../../api/helpers/user') 
;

describe('helpers', () => {
    describe('user', () => {
      describe('pick expose properties', () => {
        var user = {
            email: "support@finchain.com.br",
            password: "taA84dliXwiAve3Y70srcz55F4Ujx_sw5jEvz7hsd5LsjqbUaGL",
            name: "Finchain Tester",
            idNumber: "123.456.789-00",
            phone: "+55 11 98877-6655",
            device: 1,
            pushToken: "taA84dliXwiAve3Y70srcz55F4Ujx_sw5jEvz7hsd5LsjqbUaGL",
            photo: "APA91bHQwK2Sk44KK_R7htaA84dliXwiAve3Y70srcz55F4Ujx_sw5jEvz7hsd5LsjqcbYyUtpa3TGvgKgU4EXZkSHD2dqL-JlTZ2NHDEdNIOYgBgKZZRC0oA9N8Ahf6TFm2FCE6FqIE...",
            wallet: {
                address: "b19a67819b3726dc088d111c9038d94204dff2b6751a6b7b157aa5dc135f84d1"
            },
            _id: "59cd39b55a77c74b41798f6a"
          };

        it('Should pick user info to expose', () => {
            var userPicked = userHelper.pickUserInfoToExpose(user, ['email', 'idNumber'])
            expect(userPicked).to.have.all.keys('email','idNumber')
            expect(userPicked).to.not.have.all.keys('name','photo', '_id')
        });

        it('Should pick default user info to expose', () => {
            var userPicked = userHelper.pickDefaultUserInfoToExpose(user)
            expect(userPicked).to.have.all.keys('email', 'name', 'idNumber', 'phone', 'photo', 'wallet')
            expect(userPicked).to.not.have.all.keys('device', 'pushToken')
        });
      });  
    });
});