import { WEB_URL }from '../config'
// import VoluteerAuth  from "../containers/VoluteerAuth"


const UserSignupRoute = [
    {
        path : WEB_URL.User_Signup,
        exact : true,
        isProtected : false,
        // component : VoluteerAuth
    }
]

export default UserSignupRoute