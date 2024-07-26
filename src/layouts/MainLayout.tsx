import Sidebar from "../components/Sidebar/Sidebar.tsx";
import RightSidebar from "../components/RightSidebar/RightSidebar.tsx";

interface IProps{
    children: React.ReactNode;
}
const MainLayout = ({children}: IProps) => {
    return(
        <div className='grid grid-cols-12 w-full max-h-screen bg-black text-white'>
            <Sidebar/>
            {children}
            <RightSidebar/>
        </div>
    )
}

export default MainLayout;