const BASE_URL = 'https://connect-chat-369l.onrender.com/api/v1'
// console.log(BASE_URL);

export const Auth = {
    login: BASE_URL + '/users/login',
    signup: BASE_URL + '/users/signup',
    sendOtp: BASE_URL + '/users/verify-email'
}

export const SearchUser ={
    searchPeople:BASE_URL + '/connect/findusers'
}
