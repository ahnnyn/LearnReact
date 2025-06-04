import React, { useContext } from 'react';
import { AuthContext } from '../components/context/auth.context.jsx';
import { Link, Navigate } from 'react-router-dom';
import { Button, Result } from 'antd';
const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    
    if(user && user.id) {
        return (
            <>
                {props.chidren}               
            </>

        )

    }
    return (
        // <Navigate to="/login" replace={true} />
        <Result
            status="403"
            title="Unauthorize!"
            subTitle="Xin lỗi, bạn cần đăng nhập để truy cập trang này."
            extra={<Button type="primary">
                <Link to="/login">Đăng nhập</Link>
            </Button>}
        />
    )
}
export default PrivateRoute;