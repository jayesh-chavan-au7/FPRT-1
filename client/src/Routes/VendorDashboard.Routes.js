import { WEB_URL } from '../Config'
import VendorDashboard from '../Containers/VendorDashboard'

const VendorDashboardRoute = [
    {
        path : WEB_URL.Vendor_Dashboard,
        exact : true,
        isProtected : true,
        component : VendorDashboard
    }
]

export default VendorDashboardRoute