import { WEB_URL }from '../Config'
import UserSignup  from "../Components/User/UserSignup"


const UserSignupRoute = [
    {
        path : WEB_URL.User_Signup,
        exact : true,
        isProtected : false,
        component : UserSignup
    }
]

export default UserSignupRoute