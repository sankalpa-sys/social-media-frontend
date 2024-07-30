import Sidebar from "../components/Sidebar/Sidebar.tsx";
import RightSidebar from "../components/RightSidebar/RightSidebar.tsx";
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const hideSidebarRoutes = ['/profile/:id'];
    const shouldShowSidebar = !hideSidebarRoutes.some(route => {
        const regex = new RegExp(`^${route.replace(/:[^\s/]+/g, '([^/]+)')}$`);
        return regex.test(currentPath);
    });
    return(
        <div className='grid grid-cols-12 w-full max-h-screen bg-black text-white'>
            <Sidebar/>
            <div className={`${shouldShowSidebar ?  "md:col-span-7": "md:col-span-10"} col-span-12`}>
                <Outlet/>
            </div>
            {shouldShowSidebar && <RightSidebar/>}
        </div>
    )
}

export default MainLayout;