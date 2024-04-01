const BASE_URL = 'http://localhost:4000/api/v1'
// console.log(BASE_URL);

export const Auth = {
    login: BASE_URL + '/users/login',
    signup: BASE_URL + '/users/signup',
    sendOtp: BASE_URL + '/users/verify-email'
}

export const SearchUser ={
    searchPeople:BASE_URL + '/connect/findusers'
}

export const Chat ={
    createChat : BASE_URL + '/connect/createchat',
    fetchChat: BASE_URL + '/connect/fetchchat'

}