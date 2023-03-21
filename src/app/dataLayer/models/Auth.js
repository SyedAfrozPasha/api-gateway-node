// User with auth details
const AuthModel = {
  userName: { type: String, required: true },
  password: { type: String, required: true },
};

module.exports = { AuthModel };
