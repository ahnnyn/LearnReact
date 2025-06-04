import { Button, Input, Form, notification, Row, Col, Divider } from "antd";
import { registerUserAPI } from "../services/api.service";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async(values) =>{
        console.log('Success:', values);
        const res = await registerUserAPI(
            values.fullName, 
            values.email, 
            values.password, 
            values.phone);

            if(res.data) {
                notification.success({
                    message: "Register User",
                    description: "User registered successfully!",
                });
                navigate("/login");
                form.resetFields();
            }else{
                notification.error({
                    message: "Error Register User",
                    description: JSON.stringify(res.message),
                });
            }
    }
    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ margin: "20px" }}
            // onFinishFailed={onFinishFailed}
        >
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <h2 style={{textAlign: "center"}}>Đăng ký tài khoản</h2>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[ {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }
                        ]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={()=>form.submit()} type="primary">Register</Button>
                        {/* <Button onClick={()=>{
                            form.getFieldValue("fullName");
                            console.log("Check fullName", form.getFieldValue("fullName"));
                        }} type="primary">Test</Button> */}
                    </div>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        <span>Already have an account? </span>
                        <Link to={"/login"}>Login</Link>
                    </div>
                </Col>
             </Row>
    </Form>
    )
}

export default Register;