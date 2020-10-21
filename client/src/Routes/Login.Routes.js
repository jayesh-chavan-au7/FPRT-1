import { WEB_URL } from '../config'
// import LoginContainer from '../containers/LoginContainer'


const LoginRoute = [
    {
        path : WEB_URL.User_Login,
        exact : true,
        isProtected : false,
        // component : LoginContainer
    }
]

export default LoginRoute