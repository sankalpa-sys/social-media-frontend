import {
    CompassOutlined,
    HeartOutlined,
    HomeOutlined, LogoutOutlined, MenuOutlined,
    MessageOutlined, PlusSquareOutlined,
    SearchOutlined, StrikethroughOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

type TSideBarData = {
    name: string;
    icon: JSX.Element;
    route?: string;
    clickHandler?: () => void;

}

const sidebarData: TSideBarData[] = [
    {
        name: "Home",
        icon: <HomeOutlined style={{fontSize: "25px"}} />,
        route: "/"
    },
    {
        name: "Search",
        icon: <SearchOutlined style={{fontSize: "25px"}} />,
        route: "/"
    },
    {
        name: "Explore",
        icon: <CompassOutlined style={{fontSize: "25px"}} />,
        route: "/"
    },
    {
        name: "Reels",
        icon: <VideoCameraOutlined style={{fontSize: "25px"}} />,
        route: "/"
    },
    {
        name: "Messages",
        icon: <MessageOutlined style={{fontSize: "25px"}} />,
        route: "/inbox"
    },
    {
        name: "Notifications",
        icon: <HeartOutlined style={{fontSize: "25px"}} />,
        route: "/"
    },
    {
        name: "Create",
        icon: <PlusSquareOutlined style={{fontSize: "25px"}} />,
        route: "/"
    },

]

const sidebarData2: TSideBarData[] = [{
    name: "Threads",
    icon: <StrikethroughOutlined style={{fontSize: "25px"}}/>,
    route: "/"

},
    {
        name: "More",
        icon: <MenuOutlined style={{fontSize: "25px"}} />,
        route: "/"
    },
    {
        name: "Log out",
        icon: <LogoutOutlined style={{fontSize: "25px"}} />,
        route: "",
        clickHandler: () => {localStorage.removeItem("auth-token"); window.location.reload()}
    },
]

export {sidebarData, sidebarData2}