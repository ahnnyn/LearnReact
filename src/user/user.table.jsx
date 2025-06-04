import { Space, Table, Button, Popconfirm, message, notification } from 'antd';
import React from 'react';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../services/api.service';
const UserTable = (props) => {
    
    const {dataUsers, loadAllUser, current, pageSize, total, setCurrent, setPageSize} = props;
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
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize} 
                    </>
                )
            }
        },
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

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log("Check: ", pagination, filters, sorter, extra);
        //nếu thay đổi trang: current
        if(pagination && pagination.current){
            if(pagination.current !== +current){
                setCurrent(+pagination.current); //"+pagination.current" để chuyển đổi sang kiểu số
            }
        }
        //nếu thay đổi tổng số phần tử: pageSize

        if(pagination && pagination.pageSize){
            if(pagination.pageSize!== +pageSize){
                setPageSize(+pagination.pageSize); //"+pagination.current" để chuyển đổi sang kiểu số
            }
        }

    };



    return (
        <>
            <Table 
                columns={columns} 
                dataSource={dataUsers} 
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    } 
                }
                onChange={onChange}

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
                loadAllUser = {loadAllUser}
            />
        </>

    )


}

export default UserTable;