import { Button, Drawer, notification } from "antd";
import React, { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../services/api.service";

const ViewUserDetail = (props) =>{
    const {
        isDetailOpen, 
        setIsDetailOpen, 
        dataDetail, 
        setDataDetail,
        loadAllUser 
    } = props;  

    const [selectedFile, setSelectedFile ] = useState(null);
    const [preview, setPreview] = useState(null);

    const resetAndCloseModal = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
        
    }

    const handleOnChangeFile = (event) =>{
        if(!event.target.files || event.target.files.length === 0) {
           setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if(file) 
        {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateUserAvatar = async() => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if(resUpload.data){
            const newAvatar = resUpload.data.fileUploaded;
            console.log(">>Checking newAvatar: ", newAvatar);
            //step : update user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
            if(resUpdateAvatar.data){
                setIsDetailOpen(false);
                setSelectedFile(null);
                setDataDetail(null);
                await loadAllUser();
                notification.success({
                    message: "Update user avatar",
                    description: "User avatar updated successfully!",
                });
                setPreview(null);
                setSelectedFile(null);
            }else{
                notification.error({
                    message: "Error update user avatar",
                    description: JSON.stringify(resUpdateAvatar.message),
                });
            }
        }else{
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
        }
        
    }
    console.log(">>Checking upload: ", preview);
    return (
        <Drawer
                width={"50vw"}
                title="Chi tiết người dùng"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={resetAndCloseModal}
                open={isDetailOpen}
            >
                {dataDetail ? <>
                    <p>ID: {dataDetail._id}</p>
                    <p>Full name: {dataDetail.fullName}</p>
                    <p>Email: {dataDetail.email}</p>
                    <p>Phone number: {dataDetail.phone}</p>
                    <p>Avatar: </p>
                    <div
                        style={{
                            marginTop: "10px",
                            width: "150px",
                            height: "100px",
                            border: "1px solid #ccc",
                        }}
                    >
                        <img style={{height: "100%", width: "100%", objectFit:"contain"}} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}></img>
                    </div>
                   
                    <div>
                        <label htmlFor="btnUpload" 
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop:"15px",
                                padding:"5px 10px",
                                background:"orange",
                                borderRadius:"5px",
                                cursor:"pointer",
                            }}
                        >
                            Upload avatar
                        </label>
                        <input 
                            type="file" 
                            hidden id="btnUpload"
                            onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div>
                    {/* <Button type="primary">Upload</Button> */}
                    {preview && <>
                        <div
                            style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                width: "150px",
                                height: "100px",
                            }}
                        >
                            <img style={{height: "100%", width: "100%", objectFit:"contain"}} src={preview}></img>
                        </div>
                        <Button type="primary"
                            onClick={()=>{handleUpdateUserAvatar()}}
                        >Save</Button>
                    </>
                    }
                </>
                : <span>Loading...</span>}
            </Drawer>
    )
}

export default ViewUserDetail;