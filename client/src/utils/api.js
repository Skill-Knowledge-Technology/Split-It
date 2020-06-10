// this file is for using axios to make backend calls on the front end

import axios from "axios";

export default {
  saveUser: function(userData) {
    return axios.post("/api/users/register", userData);
  },
  loginUser: function(userData) {
    return axios.post("/api/users/login", userData);
  },
  findUser: function(userId) {
    return axios.get(`/api/users/${userId}`)
  },
  findUserBalance: function(userData) {
    return axios.get(`/api/users/getBalance/${userData}`)
  },
  setAuthToken: function(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = token
    }
    else {
      delete axios.defaults.headers.common['Authorization']
    }
  },
  logoutUser: function() {
    localStorage.removeItem("jwtToken")
  }, 
  searchByUsername: function(username) {
    return axios.get(`/api/users/findByUsername/${username}`);
  },
  searchByEmail: function(email) {
    return axios.get(`/api/users/findByEmail/${email}`);
  },
  updateEmail: function(userId, newEmail) {
    return axios.put(`/api/users/updateEmail/${userId}`, newEmail);
  },
  updateName: function(userId, newUserName) {
    return axios.put(`/api/users/updateName/${userId}`, newUserName);
  },
  createTransaction: function(transData) {
    return axios.post("/api/transactions/createTransaction", transData);
  },
  addParticipant: function(transData){
    return axios.post("/api/participates/addParticipant", transData);
  },
  createFriendship: function(data) {
    return axios.post("/api/friendships/createFriendship", data);
  },
  addToBalance: function(amount, userId) {
    return axios.post("/api/users/addToBalance", amount, userId);
  },
  transferBalance: function(senderID, data) {
    return axios.post(`/api/users/transferBalance/${senderID}`, data);
  },
  findFriendship: function(requesterID, addresseeID) {
    return axios.get(`/api/friendships/getFriendship/${requesterID}/${addresseeID}`);
  },
  getFriendRequests: function(userId) {
    return axios.get(`/api/friendships/myFriendRequests/${userId}`);
  },
  getSentRequests: function(userId) {
    return axios.get(`/api/friendships/mySentRequests/${userId}`);
  },
  getMyFriends: function(userId) {
    return axios.get(`/api/friendships/getMyFriends/${userId}`);
  },
  acceptRequest: function(requesterID, addresseeID) {
    return axios.put(`/api/friendships/acceptRequest/${requesterID}/${addresseeID}`);
  },
  deleteFriendship: function(requesterID, addresseeID) {
    return axios.delete(`/api/friendships/removeFriendship/${requesterID}/${addresseeID}`);
  },
  getTransaction: function(transID) {
    return axios.get(`/api/transactions/${transID}`);
  },
  getOwnedTransactions: function(userId) {
    return axios.get(`/api/transactions/ownedTransactions/${userId}`);
  },
  getPartTransactions: function(userId) {
    return axios.get(`/api/transactions/partTransactions/${userId}`);
  },
  getAllTransactions: function(userId) {
    return axios.get(`/api/transactions/allTransactions/${userId}`);
  }
};