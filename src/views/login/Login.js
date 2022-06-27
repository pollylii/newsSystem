import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import Particles from 'react-particles-js';
import './Login.css'
import axios from 'axios';
// import BgImg from '../../images/imgs/火车.jpg'

export default function Login(props) {
    const onFinish = (values) => {
        axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`)
            .then(res => {
                if (res.data?.length === 0) {
                    message.error('用户名或密码不匹配！！')
                } else {
                    localStorage.setItem('token', JSON.stringify(res.data[0]))
                    props.history.push('/')
                }
            })
    }
    const bg = {
        background: 'rgb(35,39,65)',
        height: '100%',
        // backgroundImage: require(BgImg),
    }
    return (
        <div style={bg}>
            <div className='formContainer'>
                {/* <Particles /> */}
                <div className='loginTitle'>全球新闻发布管理系统</div>
                <Form name="normal_login" className='login-form' onFinish={onFinish}>
                    <Form.Item name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='用户名' />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input type="password" placeholder="Password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}