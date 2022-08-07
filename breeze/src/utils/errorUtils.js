export function errorDebug(error, identityCode) {
    let err = new Error();
    const message = `
        Identity Code  📢 :: ${identityCode}
        StackTrace 📢 :: ${err.stack}
    `
    const errorResult = {
        'error': error,
        'message': message
    }

    return errorResult;
}