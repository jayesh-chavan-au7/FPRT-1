import { WEB_URL } from '../Config'
import UserDashboard from '../Containers/UserDashboard'

const UserDashboardRoute = [
    {
        path : WEB_URL.User_Dashboard,
        exact : true,
        isProtected : true,
        component : UserDashboard
    }
]

export default UserDashboardRoute