import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, BookOutlined, HomeOutlined, MailOutlined, SettingOutlined, UserAddOutlined, UsergroupAddOutlined, LoginOutlined, LogoutOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context.jsx';

const Header = () =>{

    const [current, setCurrent] = useState('');
    const {user} = useContext(AuthContext);

    const onClick = e => {
        setCurrent(e.key);
    };
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
                        label: <Link to = "/logout">Đăng xuất</Link>, 
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