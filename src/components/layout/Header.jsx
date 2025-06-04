import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import { AppstoreOutlined, BookOutlined, HomeOutlined, MailOutlined, SettingOutlined, UserAddOutlined, UsergroupAddOutlined, LoginOutlined, LogoutOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context.jsx';
import { logoutAPI } from '../../services/api.service.jsx';

const Header = () =>{

    const [current, setCurrent] = useState('');
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const onClick = e => {
        setCurrent(e.key);
    };

    const handleLogout = async() => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }); //reset user
            message.success("Đăng xuất thành công");

            //redirect to home page
            navigate("/");

        }
    }
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to = {"/users"}>User</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
            // disabled: true,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
            children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                { label: 'Option 1', key: 'setting:1' },
                { label: 'Option 2', key: 'setting:2' },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                { label: 'Option 3', key: 'setting:3' },
                { label: 'Option 4', key: 'setting:4' },
                ],
            },
            ],
        },
        ...(!user.id ?
            [{
                label: <Link to={"/login"}>Đăng nhập</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            
            }] : []
        ),

        ...(user.id ?
            [{
                label: `Welcome ${user.fullName}`,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: <span onClick={()=>handleLogout()}>Đăng xuất</span>, 
                        key: 'logout'
                    },
                ],
                
                }] : []
        ),

    ];
    return (
        <Menu 
            onClick={onClick} 
            selectedKeys={[current]} 
            mode="horizontal" 
            items={items}       
        />

    )
}

export default Header;