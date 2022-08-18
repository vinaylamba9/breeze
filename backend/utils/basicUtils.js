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

const timeON = {
    timeDiffrenceInMin: function (newDate, oldDate) {
        let diff = (newDate.getTime() - oldDate.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    },
    minToHrs: function (timeInMin) {
        return Math.abs(Math.round(timeInMin / 60));
    },
    isTimeLimitAvailable: function (lowerLimit, upperLimit) {
        if (lowerLimit < upperLimit) {
            return true;
        } else {
            return false;
        }
    },
    minuteToMilliseconds: function (minute) {
        return minute * 60000;
    },
    addTimeInMin: function (min) {
        return new Date(Date.now() + this.minuteToMilliseconds(min));
    }

}

const cleanUserModel = function (user) {
    try {
        user = user.toObject();
        if (!_isNull(user.password)) {
            delete user.password;
        }
        if (!_isNull(user.token)) {
            delete user.token;
        }
        if (!_isNull(user.tokenValidTill)) {
            delete user.tokenValidTill;
        }
        return user;
    } catch (e) {
        throw (e);
    }
}

module.exports = {
    generateRandomString,
    notNull,
    _isNotEmpty,
    _isNull,
    otpGenrator,
    timeON,
    cleanUserModel

}