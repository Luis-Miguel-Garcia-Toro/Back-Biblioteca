const bcrypt = require("bcryptjs");
class PasswordManager {
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(12)
        const pass = await bcrypt.hash(password, salt)
        return pass
    }
    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash)
    }
}

module.exports = {
    PasswordManager
}
