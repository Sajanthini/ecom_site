import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MasterLayout from './components/admin/MasterLayout';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function AdminPrivateRoute() {
    const navigate = useNavigate();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log('Checking authentication...');
                const res = await axios.get('/api/checkingAuthenticated');
                console.log('Response:', res);

                if (res.status === 200) {
                    setAuthenticated(true);
                } else {
                    console.log('Not authenticated');
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401)
        {
            swal('Unauthorized',err.response.data.message,'warning');
            navigate('/');
        }
        return Promise.reject(err);
    })

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return Authenticated ? <MasterLayout><Outlet /></MasterLayout> : <Navigate to="/login" />;
}

export default AdminPrivateRoute;
