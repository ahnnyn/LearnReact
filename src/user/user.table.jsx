import { Space, Table, Button, Popconfirm, message, notification } from 'antd';
import React from 'react';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../services/api.service';
const UserTable = (props) => {
    
    const {dataUsers, loadAllUser} = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);  
    const [dataUpdate, setDataUpdate] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);  
    const [dataDetail, setDataDetail] = useState(null);

    const handleDeleteUser = async(id) =>{
        const res = await deleteUserAPI(id);
        if(res.data){
           notification.success({
                message: "Delete user",
                description: "User deleted successfully!",
            });
            await loadAllUser();
        }else{
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message),
            });
        }

    }


    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a 
                        href="#"
                        onClick={()=>{
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
                {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
            <Space size="middle">
                <EditOutlined 
                    style={{cursor: "pointer", color: "green"}}
                    onClick={() => {
                        setDataUpdate(record);
                        setIsModalUpdateOpen(true);
                    }}
                />
                <Popconfirm
                    title="Xóa người dùng"
                    description="Bạn có chắc chắn xóa user này ?"
                    onConfirm={() =>{handleDeleteUser(record._id)}}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                >
                    <DeleteOutlined 
                        style={{cursor: "pointer", color: "red"}}

                    />   
                </Popconfirm>

            </Space>
            ),
        },

    ];


    return (
        <>
            <Table 
                columns={columns} 
                dataSource={dataUsers} 
                rowKey={"_id"}
            />

            <UpdateUserModal
                isModalUpdateOpen = {isModalUpdateOpen}
                setIsModalUpdateOpen = {setIsModalUpdateOpen}
                dataUpdate = {dataUpdate}
                setDataUpdate = {setDataUpdate}
                loadAllUser = {loadAllUser}
            />

            <ViewUserDetail 
                isDetailOpen = {isDetailOpen}
                setIsDetailOpen = {setIsDetailOpen}
                dataDetail = {dataDetail}
                setDataDetail = {setDataDetail}
            />
        </>

    )


}

export default UserTable;