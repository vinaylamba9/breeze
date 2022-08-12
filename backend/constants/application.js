class AccountStatus {
    static ACTIVE = 0;
    static DELETED = 1;
    static DISABLED = 2;
}

Object.freeze(AccountStatus)

class AccountLoggedStatus {
    static LOGIN = 0;
    static LOGOUT = 1;
    static SIGNUP = 2;
}
Object.freeze(AccountLoggedStatus)

const TimeInMs = {
    H24: (24 * (60 * (60 * 1000))),
    MIN5: ((5 * (60 * 1000))),
}


class VerificationType {
    static ACCOUNT_VERIFICATION = 0
    static FORGOT_PASSWORD = 1
}

class MasterConstantsStatus {
    static ACTIVE = 0
    static DELETED = 1
}
Object.freeze(MasterConstantsStatus);

class MasterConstantsCategory {
    static USERACCOUNS = 0
}

Object.freeze(MasterConstantsCategory)
module.exports = {
    AccountStatus,
    AccountLoggedStatus,
    VerificationType,
    TimeInMs,
    MasterConstantsStatus,
    MasterConstantsCategory
}