import { WEB_URL } from '../Config'
import UserLogin from '../Components/User/UserLogin'

const LoginRoute = [
    {
        path : WEB_URL.User_Login,
        exact : true,
        isProtected : false,
        component : UserLogin
    }
]

export default LoginRoute