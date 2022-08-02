export class DomainType {
    static USER = "user";
}

export class NetworkInfo {
    static protocol = "http://";
    static subDomain = "localhost:5000";
    static domain = "/api/";
    static networkInfo = NetworkInfo.protocol + NetworkInfo.subDomain + NetworkInfo.domain;
}

export class MethodType {
    static get = "/get";
    static post = "/post";
    static put = "/update";
    static delete = "/delete";
}

export class APIType {
    static LOGIN = "/login";
    static SIGNUP = "/signup";
    static FORGOTPASSWORD = "forgotPassword";
}