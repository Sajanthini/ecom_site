// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPrivateRoute from './AdminPrivateRoute';
import Home from './components/home/Home';
import Login from "./components/home/auth/Login";
import Register from "./components/home/auth/Register";
import axios from "axios";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    const isAuthenticated = !!localStorage.getItem('auth_token');
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    {!isAuthenticated ? (
                        <Route path="/login" element={<Login />} />
                    ) : (
                        <Route path="/login" element={<Navigate to="/" replace />} />
                    )}
                    {!isAuthenticated ? (
                        <Route path="/register" element={<Register />} />
                    ) : (
                        <Route path="/register" element={<Navigate to="/" replace />} />
                    )}
                    <Route path="/admin/*" element={<AdminPrivateRoute />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
