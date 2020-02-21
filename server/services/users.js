const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_OPTIONS = {
  expiresIn: 31556926,
};
const secret = "Not very secret"
const secretOrKey = secret

/**
 * Create a token from a payload that can then be decoded
 * later back into the payload
 *
 */
const getJwtToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrKey, JWT_OPTIONS, (err, token) => {
      return err ? reject(err) : resolve(token);
    });
  });
};

/**
 * Verify and decode a JWT token back to its original
 * object.
 *
 */
const verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrKey, (err, decoded) => {
      return err ? reject(err) : resolve(decoded);
    });
  });
};

/**
 * Find a user by email
 *
 */


/**
 * Find a User based on User ID
 */


/**
 * Edit a user's details
 *
 */


/**
 * Creates a new User
 *
 */

/**
 * Generate a hash with bcrypt
 *
 */
const generateHash = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(value, salt);
  return hash;
};



module.exports = {
  getJwtToken,
  createUser,
  generateHash,
  findUserByEmail,
  findUser,
  editUser,
  verifyJwtToken,
};


// In the services folder, we want to be able to query data from our database,
// in this case we will be querying data from the user 