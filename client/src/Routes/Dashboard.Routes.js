import { WEB_URL } from '../config'
// import VolunteerDashboard from '../containers/VolunteerDashboard'

const UserDashboardRoute = [
    {
        path : WEB_URL.User_Dashboard,
        exact : true,
        isProtected : true,
        // component : VolunteerDashboard
    }
]

export default UserDashboardRoute