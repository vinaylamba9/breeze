const generateRandomString = function (length) {
    let output = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_:[]!@#$%^&*()_';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        output += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return output;
}


const notNull = function (input) {
    if (input != null && input != undefined) return true
    else return false;

}

const _isNull = function (value) {
    if (value == null || value == undefined) return true;
    else return false;
}

const _isNotEmpty = function (value) {
    if (typeof value == 'object') {
        if (Array.isArray(value)) {
            if (value != null && value != undefined && value.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            if (value != null && value != undefined) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        if (value != null && value != undefined && value != "") {
            return true;
        } else {
            return false;
        }
    }
}

const otpGenrator = function (length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
module.exports = {
    generateRandomString,
    notNull,
    _isNotEmpty,
    _isNull
}