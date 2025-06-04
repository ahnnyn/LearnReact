import { Button, Input, Form, notification, Row, Col, Divider, message } from "antd";
import { loginAPI } from "../services/api.service";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context.jsx";
const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const {setUser} = useContext(AuthContext);

        const onFinish = async(values) =>{
            setLoading(true);
            const res = await loginAPI(
                values.email, 
                values.password);
    
                if(res.data) {
                   message.success({
                        content: "Đăng nhập thành công!",
                        duration: 2,
                    });
                    localStorage.setItem("access_token", res.data.access_token);
                    setUser(res.data.user);
                    navigate("/");
                    form.resetFields();
                }else{
                    notification.error({
                        message: "Error Register User",
                        description: JSON.stringify(res.message),
                    });
                }
                setLoading(false);
        }
        return (
            <Row justify={"center"} style={{ marginTop: "50px" }}>
                <Col xs={24} md={12} lg={8}>
                    <fieldset style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", margin: "5px" }}>
                        <legend style={{ fontSize: "1.5em", fontWeight: "bold" }}>Đăng nhập</legend>
                    <Form
                                    layout="vertical"
                                    form={form}
                                    onFinish={onFinish}
                                >
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    { 
                                                        required: true, message: 'Please input your email!' 
                                                    },
                                                    { 
                                                        type: 'email', message: 'The input is not valid E-mail!' 
                                                    }
                                                ]}
                                                >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[{ required: true, message: 'Please input your password!' }]}
                                                >
                                                <Input.Password onKeyDown={(event)=>{
                                                    if(event.key === "Enter") {
                                                        form.submit();
                                                    }
                                                }} />
                                            </Form.Item>

                                <Form.Item>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <Button 
                                                    loading={loading}
                                                    onClick={()=>form.submit()} 
                                                    type="primary">
                                                    Login
                                                </Button>
                                                <Link to={"/"}>Go to homepage <ArrowRightOutlined /></Link>
                                            </div>

                                </Form.Item>
                            </Form>
                            <Divider />
                            <div style={{textAlign:"center"}}>Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link></div>
                    </fieldset>
                </Col>
            </Row>
            
        )
}

export default Login;