import {sidebarData, sidebarData2} from "../../data/sidebarData.tsx";
import {useNavigate} from "react-router-dom";

function Sidebar() {
    const navigator = useNavigate()
    return (
        <div className='hidden md:block border-r-[0.5px] border-gray-500 px-5'>
            <div>
            <h1 className='font-bold text-2xl italic py-10'>InstaClone</h1>
            </div>
            <div className='flex flex-col space-y-14'>
                <div className='space-y-4'>
                    {sidebarData.map((item)=> (
                        <div onClick={!item?.route ? item.clickHandler :()=>navigator(item?.route)} key={item.name} className='flex items-center space-x-3 hover:bg-white/20 cursor-pointer px-3 py-2 rounded-sm'>
                            {item.icon}
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                <div className='space-y-4'>
                    {sidebarData2.map((item)=> (
                        <div onClick={!item?.route ? item.clickHandler :()=>navigator(item?.route)} key={item.name} className='flex items-center space-x-3 hover:bg-white/20 cursor-pointer px-3 py-2 rounded-sm'>
                            {item.icon}
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;