// this file is for using axios to make backend calls on the front end

import axios from "axios";

export default {
    saveUser: function(userData) {
        return axios.post("/api/users/register");
    }
};