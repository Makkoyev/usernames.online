export default class User{
    constructor(uid, displayName, email, emailVerified, phoneNumber, photoURL, metadata){
        this.uid = uid,
        this.displayName = displayName,
        this.email = email,
        this.emailVerified = emailVerified,
        this.phoneNumber = phoneNumber,
        this.photoURL = photoURL,
        this.metadata = metadata
    }
}