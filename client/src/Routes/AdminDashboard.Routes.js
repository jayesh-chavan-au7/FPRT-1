import { WEB_URL } from '../Config'
import AdminDashboard from '../Containers/AdminDashboard'

const AdminDashboardRoute = [
    {
        path : WEB_URL.Admin_Dashboard,
        exact : true,
        isProtected : true,
        component : AdminDashboard
    }
]

export default AdminDashboardRoute