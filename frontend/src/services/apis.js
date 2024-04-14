const BASE_URL = 'https://connect-chat-369l.onrender.com/api/v1'
// console.log(BASE_URL);

export const Auth = {
    login: BASE_URL + '/users/login',
    signup: BASE_URL + '/users/signup',
    sendOtp: BASE_URL + '/users/verify-email',
    forgetPasswordToken : BASE_URL + '/users/resetpasswordtoken',
    resetPassword: BASE_URL + '/users/resetpassword',
    logout:BASE_URL + '/profile/logouthandler'
}

export const SearchUser = {
    searchPeople: BASE_URL + '/connect/findusers'
}

export const Chat = {
    createChat: BASE_URL + '/connect/createchat',
    fetchChat: BASE_URL + '/connect/fetchchat'

}

export const GroupChat = {
    createGroupChat: BASE_URL + '/connect/creategroupchat',
    editGroupChat: BASE_URL + '/connect/editGroupDetails'
}

export const Message = {
    sendMessage: BASE_URL + '/message/sendmessage',
    fetchAllConversation: BASE_URL + "/message/fetchallmessage",
    fetchGroupConversation: BASE_URL + '/message/fetchgroupmessage'
}

export const search = {
    findFriendsDetails: BASE_URL + '/search/friendDetails',
    getGroupDetails: BASE_URL + '/search/getGroupDetails'
}

export const UpdateProfile = {
    updateDetails : BASE_URL + '/profile/updateprofiledetails',
    updatePassword: BASE_URL + '/profile/updatePassword',
    imageUpload: BASE_URL + '/profile/imageupload',
    groupImageUpload : BASE_URL + '/profile/groupimageupdate'
}
