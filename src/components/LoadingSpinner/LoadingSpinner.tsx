import {LoadingOutlined} from "@ant-design/icons";

function LoadingSpinner({title}:{ title: string }) {
    return (
        <div className='flex items-center space-y-4 flex-col'>
            <LoadingOutlined style={{fontSize: "24px"}}/>
            <p className='font-semibold text-sm'>{title}</p>
        </div>
    );
}

export default LoadingSpinner;