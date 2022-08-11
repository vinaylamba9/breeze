export default class UserAccountModel {
    constructor(data) {
        this.userId = data._id;
        this.name = data.name;
        this.email = data.email;
        this.profileImage = data.profileImage;
        this.isVerified = data.isVerified;
        this.accountInItFrom = data.accountInItFrom;
        this.accountStatus = data.accountStatus;
        this.token = data.token;
    }
}
