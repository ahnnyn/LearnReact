import UserForm from "../user/user.form";
import UserTable from "../user/user.table";
import React, { useState, useEffect } from 'react';
import { fetchAllUserAPI } from '../services/api.service';


const Users = () => {
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(
        ()=>{
            loadAllUser();
        }, []
    );

    const loadAllUser = async() => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    }

    return (
        <div style={{padding: "20px"}}>
            <UserForm loadAllUser = {loadAllUser}/>
            <UserTable 
                dataUsers = {dataUsers}
                loadAllUser = {loadAllUser}
            />
        </div>
    )
}

export default Users;