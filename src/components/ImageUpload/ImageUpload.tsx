import { useState, useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

interface ImageUploadProps {
    onImageUpload: (imageUrl: string) => void;
    children: React.ReactNode;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, children }) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("upload_preset", "socialMedia");
            const res = await axios.post("https://api.cloudinary.com/v1_1/sankalpa-sys/image/upload", formData);
            const imageUrl = res?.data?.secure_url;
            onImageUpload(imageUrl);
        } catch (e) {
            console.log(e);
        } finally {
            setUploading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
            />
            {uploading ?
                <LoadingOutlined style={{ fontSize: "20px", color: "gray", cursor: "pointer" }} />
                : <div onClick={triggerFileInput}>{children}</div>}
        </div>
    );
};

export default ImageUpload;
