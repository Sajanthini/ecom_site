import React, { useState } from 'react';
import Navbar from '../../home/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [registerInput, setRegisterInput] = useState({
        name: '',
        email: '',
        password: '',
        error_list: {},
    });

    const handleInput = (e) => {
        e.persist();
        setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password
        };

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data)
                .then(res => {
                    if (res.data.status === 200) {
                        localStorage.setItem('auth_token',res.data.token);
                        localStorage.setItem('auth_name',res.data.name);
                        swal('Success',res.data.message,'success');
                        navigate('/');;
                    } else {
                        setRegisterInput({ ...registerInput, error_list: res.data.validation_errors || {} });
                    }
                })
                .catch(error => {
                    if (error.response) {
                        setRegisterInput({ ...registerInput, error_list: error.response.data.validation_errors || {} });
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
                                <h4>Register</h4>
                            </div>
                            <form onSubmit={registerSubmit}>
                                <div className='card-body'>
                                    <div className='form-group mb-3'>
                                        <label>Full Name</label>
                                        <input type='text' name='name' className='form-control' onChange={handleInput} value={registerInput.name} />
                                        <span className='text-danger'>{registerInput.error_list.name ? registerInput.error_list.name[0] : ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email Id</label>
                                        <input type='email' name='email' className='form-control' onChange={handleInput} value={registerInput.email} />
                                        <span className='text-danger'>{registerInput.error_list.email ? registerInput.error_list.email[0] : ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Password</label>
                                        <input type='password' name='password' className='form-control' onChange={handleInput} value={registerInput.password} />
                                        <span className='text-danger'>{registerInput.error_list.password ? registerInput.error_list.password[0] : ''}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <button type='submit' className='btn btn-primary'>Register</button>
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

export default Register;
