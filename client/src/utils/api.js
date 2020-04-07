// this file is for using axios to make backend calls on the front end

import axios from "axios";

export default {
    saveUser: function(userData) {
        return axios.post("/api/users/register", userData);
    },
    loginUser: function(userData) {
        return axios.post("api/users/login", userData);
    },
    setAuthToken: function(token) {
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
        }
        else {
            delete axios.defaults.headers.common['Authorization']
        }
    },
    // function is work in progress. we want to delete the auth token header
    // and then set the state in react to the empty object to indicate
    // user has logged out.
    logoutUser: function() {
        localStorage.removeItem("jwtToken")
    }
};