import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import '../../App.css'
import routes from '../../routes/routes';
const MasterLayout = () => {
    return (
        <div>
            <Header />
            <div className='main d-flex'>
                <div className='sidebarWrapper'>
                    <Sidebar />
                </div>

                <div id="content">
                    <main>
                        <Routes>
                            {routes.map((route, idx) => (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        element={<route.component />}
                                    />
                                )
                            ))}
                            <Route path="*" element={<Navigate to="dashboard" />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;
