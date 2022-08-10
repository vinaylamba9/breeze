export default class UserAccountModel {
    constructor(data) {
        this.userId = data.userId;
        this.name = data.name;
        this.email = data.email;
        this.currentStatus = data.currentStatus;
        this.token = data.token;
    }
}
