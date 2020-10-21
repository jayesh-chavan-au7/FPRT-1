import HomeRoute from './Home.Routes'
import SignupRoute from './Signup.Routes'
import LoginRoute from './Login.Routes'
import AdminDashboard from './AdminDashboard.Routes'
import VendorDashboard from './VendorDashboard.Routes'
import UserDashboard from './UserDashboard.Routes'
export default [
    ...HomeRoute,
    ...SignupRoute,
    ...LoginRoute,
    ...AdminDashboard,
    ...VendorDashboard,
    ...UserDashboard
]