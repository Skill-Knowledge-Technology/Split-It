// this file is for using axios to make backend calls on the front end

import axios from "axios";

export default {
  saveUser: function(userData) {
    return axios.post("/api/users/register", userData);
  },
  loginUser: function(userData) {
    return axios.post("/api/users/login", userData);
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
  createTransaction: function(transData) {
    return axios.post("/api/transactions/createTransaction", transData);
  },
  addParticipant: function(transData){
    return axios.post("/api/participates/addParticipant", transData);
  },
  createFriendship: function(data) {
    return axios.post("/api/friendships/createFriendship", data);
  },
  addToBalance: function(amount) {
    return axios.post("/api/users/addToBalance", amount);
  },
  getFriendRequests: function(userId) {
    return axios.get(`/api/friendships/myFriendRequests/${userId}`);
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