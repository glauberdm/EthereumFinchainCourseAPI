
var response = (message, success, data) => {
    message.title = message.title || (success ? "Success" : "Fail")
    message.message = message.message || (success ? "The operation was executed with success" : "The operantion was fail")
    message.messageId = message.messageId || (success ? 1 : 0)

    var response = {
        success: success || false,   
        message: message
    }

    if(data){
        response.data = data;
    }
    
    return response
};

module.exports.success = (message, data) => {
    return response(message, true, data)
};

module.exports.fail = (message, data) => {
    return response(message, false, data)
};