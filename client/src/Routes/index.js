import HomeRoute from './Home.Routes'
import SignupRoute from './Signup.Routes'
import LoginRoute from './Login.Routes'
import DashboardRoute from './Dashboard.Routes'

export default [
    ...HomeRoute,
    ...SignupRoute,
    ...LoginRoute,
    ...DashboardRoute
]