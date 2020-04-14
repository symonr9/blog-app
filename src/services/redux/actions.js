export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (userToken, username) => ({
    type: LOGIN_USER,
    userToken,
    username
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});
