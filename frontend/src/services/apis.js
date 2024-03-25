const BASE_URL = process.env.BASE_URL;

export const Auth = {
    login: BASE_URL + '/users/login',
    signup: BASE_URL + '/users/signup',
    sendOtp: BASE_URL + '/users/verify-email'
}