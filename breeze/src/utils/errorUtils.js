export function errorDebug(error, stackTrace, identityCode) {
    const message = `
        Identity Code  🚀 :: ${identityCode}
        Error ❌:: ${error}
        StackTrace 📢 :: ${stackTrace}
    `
    return message;
}