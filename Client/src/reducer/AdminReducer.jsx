const initialToken = sessionStorage.getItem("token");
let initialAccount = null;

if (initialToken) 
{
    //call verifyToken get api
    const response = await fetch(`http://localhost:3000/cakedByKim/verifyToken/${initialToken}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json"
        }
    });

    const data = await response.json();
    
    initialAccount = data;

    if (initialAccount.message == 'Token Expired')
    {
        sessionStorage.removeItem("token");
        window.location.href = "/login"
    }

}

export const defaultAdmin = {
    token: initialAccount ? initialAccount.token : null, 
    adminId: initialAccount ? initialAccount.adminId : null, 
    username: initialAccount ? initialAccount.username : null, 
    loggedIn: initialAccount ? initialAccount.loggedIn : false
}

export const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}

export function adminReducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN: {
            let newState = {...state};
            newState.token = action.newAccount.token;
            newState.adminId = action.newAccount.adminId;
            newState.username = action.newAccount.username;
            newState.loggedIn = action.newAccount.loggedIn;
            
            return newState;
        }
        case ACTIONS.LOGOUT: {
            let newState = {...state};
            newState.token = null;
            newState.adminId  = null;
            newState.username = null;
            newState.loggedIn = false;

            return newState;
        }
        default: 
            return state;
    }
}