var 
expect = require('chai').expect
, responseHelper = require('../../../api/helpers/response') 
;

describe('helpers', () => {
    describe('response', () => {
        var messageSuccess = {
            title: "Success",
            message: "The operation was executed with success",
            messageId: 1
        }
    
        var messageFail = {
            title: "Fail",
            message: "The operantion was fail",
            messageId: 0
        }

        var responseSuccessExpected = {
            success: true,
            message: messageSuccess
        }

        var responseFailExpected = {
            success: false,
            message: messageFail
        }

        describe('simple response - response whitout data', () => {
            it('Should success response', () => {
                var successResponse = responseHelper.success(messageSuccess)

                expect(successResponse).to.deep.equal(responseSuccessExpected)
            });

            it('Should fail response', () => {
                var failResponse = responseHelper.fail(messageFail)
                
                expect(failResponse).to.deep.equal(responseFailExpected)
            });
        });  

        describe('response - response whit data', () => {
            var data = {
                email: "support@finchain.com.br",
            };

            var responseSuccessWithDataExpected = Object.assign({}, responseSuccessExpected)
            responseSuccessWithDataExpected.data = data

            var responseFailWithDataExpected = Object.assign({}, responseFailExpected)
            responseFailWithDataExpected.data = data

            it('Should success response with data', () => {
                var successResponseWithData = responseHelper.success(messageSuccess, data) 
                
                expect(successResponseWithData).to.deep.equal(responseSuccessWithDataExpected)
            });

            it('Should fail response with data', () => {
                var failResponseWithData = responseHelper.fail(messageFail, data) 
                
                expect(failResponseWithData).to.deep.equal(responseFailWithDataExpected)
            });

        }); 

    });
});