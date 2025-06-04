import { useEffect, useState } from "react";
import { Modal, Button, notification, Input } from "antd";
import { updateUserAPI } from "../services/api.service";
const UpdateUserModal = (props) => {
    const [id, setID] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    
    const {
        isModalUpdateOpen, 
        setIsModalUpdateOpen, 
        dataUpdate, 
        setDataUpdate, 
        loadAllUser
    } = props;  
    
    useEffect(()=>{
        if(dataUpdate){
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
            setID(dataUpdate._id);
        }
    }, [dataUpdate])

    const handleSubmit = async() => {
        const res = await updateUserAPI(id, fullName, phone);
        if(res.data ){
            notification.success({
                message: "Update user",
                description: "User updated successfully!",
            })
            resetAndCloseModal();
            await loadAllUser();
        }else{
            notification.error({
                message: "Error update user",
                description: JSON.stringify(res.message),
            });
        }
        
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setID("");
    setPhone("");
    setDataUpdate(null);
  }

    return (
        <Modal
            title="UPDATE USER"
            open={isModalUpdateOpen}
            onOk={handleSubmit}
            onCancel={()=> resetAndCloseModal()}
            okText="SAVE"
            cancelText="CANCEL"
            maskClosable={false}
        >
        <div
            style={{
            display: "flex",
            gap: "15px",
            flexDirection: "column",
            }}
        >
            <div>
                <span>ID: </span>
                <Input
                    value={id}
                    disabled

                />
            </div>
            <div>
                <span>FullName: </span>
                <Input
                    value={fullName}
                    onChange={(event) => {
                    setFullName(event.target.value);
                    }}
                />
            </div>
            <div>
                <span>Phone Number: </span>
                <Input
                    value={phone}
                    onChange={(event) => {
                    setPhone(event.target.value);
                    }}
                />
            </div>
        </div>
        </Modal>
    )
}

export default UpdateUserModal;