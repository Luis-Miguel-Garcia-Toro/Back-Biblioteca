const jwt = require("jsonwebtoken");
//const {jwtDecode} = require("jwt-decode");
class JWTManager {
  static createToken(data, secret) {
    return jwt.sign(
      {
        data,
        iss: "app.bookverse",
        aud: "app.bookverse",
      },
      secret,
      {
        algorithm: "HS256",
        expiresIn: 60 * 60 * 12, //
      }
    );
  }
  static decodeToken(token) {
    try {
      let data = jwt.decode(token);
      return data;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }
}
module.exports = {
  JWTManager,
};
