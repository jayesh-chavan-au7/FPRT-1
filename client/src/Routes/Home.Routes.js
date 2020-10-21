import { WEB_URL } from '../Config'
import Home from '../Containers/Home'

const HomeRoute = [
    {
        path : WEB_URL.Home,
        exact : true,
        isProtected : false,
        component : Home
    }
]

export default HomeRoute