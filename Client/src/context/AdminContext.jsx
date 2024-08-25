import { createContext, useReducer } from "react";
import { adminReducer, defaultAdmin, ACTIONS } from "../reducer/AdminReducer"

const AdminContext = createContext();

export function AdminProvider({children}) {
    const [state, dispatch] = useReducer(adminReducer, defaultAdmin);

    const logIn = (adminAccount) => {
        dispatch({ type: ACTIONS.LOGIN, newAccount: adminAccount })
    }

    const logOut = () => {
        dispatch({ type: ACTIONS.LOGOUT })
    }

    const adminContext = {
        token: state.token, 
        adminId: state.adminId, 
        username: state.username, 
        loggedIn: state.loggedIn,
        logIn: logIn,
        logOut: logOut
    }

    return (
        <AdminContext.Provider value={adminContext}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContext;