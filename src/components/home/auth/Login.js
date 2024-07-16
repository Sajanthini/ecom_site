import React, { useState } from 'react';
import Navbar from '../../home/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: {},
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.name);
                    swal('Success', res.data.message, 'success');
                    navigate('/');;
                } else if (res.data.status === 401) {
                    swal('Warning', res.data.message, 'warning');
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors || {} });
                }
            }).catch(error => {
                if (error.response) {
                    setLogin({ ...loginInput, error_list: error.response.data.validation_errors || {} });
                    console.error('Server responded with:', error.response.data);
                } else if (error.request) {
                    console.error('Request made but no response:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            });
        });
    }

    return (
        <div>
            <Navbar />
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Login</h4>
                            </div>
                            <form onSubmit={loginSubmit}>
                                <div className='card-body'>
                                    <div className='form-group mb-3'>
                                        <label>Email Id</label>
                                        <input type='email' name='email' onChange={handleInput} value={loginInput.email} className='form-control' />
                                        <span className='text-danger'>{loginInput.error_list.email ? loginInput.error_list.email[0] : ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input type='password' name='password' onChange={handleInput} value={loginInput.password} className='form-control' />
                                        <span className='text-danger'>{loginInput.error_list.password ? loginInput.error_list.password[0] : ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
