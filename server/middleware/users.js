const userServices = require('../services/user');
const bcrypt = require('bcrypt');


const expressValidator = {
  // this function asserts if the email should exist or not
  // NOTE we also have access to the current user information  
  // based on the email. Thus req.user contains the user information.
  emailShouldExist: (shouldExist) => async(value, {req}) => {
    const user = await userServices.findUserByEmail(value);
    if (shouldExist && !user) {
      throw new Error("Email not found")
    }
    if (!shouldExist && user) {
      throw new Error("Email already exist")
    }
    if (user) {
      req.user = user
    }
    return true 
  },
  passwordMatchesHash: async(value, {req}) => {
    // req.user is attched in emailShouldExist middleware
    const match = await bcrypt.compare(value, req.user.password)
    if (!match) {
      throw new Error("incorrect password")
    }
    return true 
  },
  matches: async(value, {req}) => {
    if (value !== req.user.password2) {
      throw new Error("Passwords don\'t match")
    }
    return true 
  }
}

module.exports = {
  expressValidator
}