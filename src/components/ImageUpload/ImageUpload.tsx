import { useState, useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import heic2any from 'heic2any';

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
            // @ts-ignore
            let file: any = e.target.files[0];
            // Convert .heic to .jpeg or .png
            if (file.type === 'image/heic') {
                const blob = await heic2any({
                    blob: file,
                    toType: 'image/jpeg',
                });
                // @ts-ignore
                file = new File([blob], file.name.replace(/\.heic$/, '.jpg'), { type: 'image/jpeg' });
            }
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "socialMedia");
            const res = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);
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
