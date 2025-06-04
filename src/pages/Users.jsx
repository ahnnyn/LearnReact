import UserForm from "../user/user.form";
import UserTable from "../user/user.table";
import React, { useState, useEffect } from 'react';
import { fetchAllUserAPI } from '../services/api.service';


const Users = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);


    useEffect(
        ()=>{
            loadAllUser();
        }, [current, pageSize]  //[] + condition
    );

    const loadAllUser = async() => {
        const res = await fetchAllUserAPI(current, pageSize);
        if(res.data){
            setDataUsers(res.data.result);
            setTotal(res.data.meta.total);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
        }
    }

    return (
        <div style={{padding: "20px"}}>
            <UserForm loadAllUser = {loadAllUser}/>
            <UserTable 
                dataUsers = {dataUsers}
                loadAllUser = {loadAllUser}
                current = {current}
                pageSize = {pageSize}
                total = {total}
                setCurrent = {setCurrent}
                setPageSize = {setPageSize}

            />
        </div>
    )
}

export default Users;