import { Button, Input, notification, Modal } from "antd";
import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";
import { createUserAPI } from "../services/api.service";

const UserForm = (props) => {
  const {loadAllUser} = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async() => {
    const res = await createUserAPI(fullName, email, password, phone);
    if(res.data ){
        notification.success({
            message: "create user",
            description: "User created successfully!",
        })
        resetAndCloseModal();
        await loadAllUser();
    }else{
        notification.error({
            message: "Error create user",
            description: JSON.stringify(res.message),
        });
    }
    
    console.log(">>Checking res: ", res.data);
  };

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");

  }


  return (
    <div className="user-form" style={{ margin: "20px 0", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Users</h3>
          <Button
            type="primary"
            className="submit-button"
            //onClieck = {() => handleOnClickBtn()}
            onClick={()=>setIsModalOpen(true)}
          >
            Create User
          </Button>
         
        </div>

      <Modal
        title="CREATE USER"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={()=> resetAndCloseModal()}
        okText="CREATE"
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
          <span>FullName: </span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Email: </span>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Password: </span>
          <Input.Password
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
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
    </div>
  );
};

export default UserForm;
