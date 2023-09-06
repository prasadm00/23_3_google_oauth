const axios = require("axios")
const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';
const utils = require('./utils');
const query_string = require('querystring');

const query_params = utils.query_params
const get_access_token = async auth_code => {

    const access_token_params = {
        ...query_params,
        client_secret: process.env.CLIENT_APP_SECRET,
        code: auth_code,
        grant_type: 'authorization_code',
    };

    try {
        return await axios({
            method: 'post',
            url: `${google_access_token_endpoint}?${query_string.stringify(access_token_params)}`,
        });
    } catch (error) {
        console.log("Error==>>", error);
    }

};

const get_profile_data = async access_token => {

    try {
        return await axios({
            method: 'post',
            url: `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`,
        });
    } catch (error) {
        console.log("Error==>>", error);
    }

};


module.exports = { get_access_token, get_profile_data }