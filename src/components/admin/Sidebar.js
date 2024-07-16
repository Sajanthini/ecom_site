import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    };

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/admin/dashboard">
                        <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} onClick={() => isOpenSubmenu(0)}>
                            <span className="icon"><DashboardCustomizeOutlinedIcon /></span>
                            Dashboard
                        </Button>
                    </Link>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
                        <span className="icon"><ProductionQuantityLimitsOutlinedIcon /></span>
                        Products
                        <span className="arrow"><ChevronRightOutlinedIcon /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu === true ? 'collapsed' : 'collapse'}`}>
                        <ul className="submenu">
                            <li><Link to="/admin/category">Category</Link></li>
                            <li><Link to="#">Product List</Link></li>
                            <li><Link to="#">Product View</Link></li>
                            <li><Link to="#">Product Upload</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                        <span className="icon"><PlaylistAddIcon /></span>
                        Orders
                        <span className="arrow"><ChevronRightOutlinedIcon /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu === true ? 'collapsed' : 'collapse'}`}>
                        <ul className="submenu">
                            <li><Link to="#">All Orders</Link></li>
                            <li><Link to="#">Pickup</Link></li>
                            <li><Link to="#">Delivery</Link></li>
                            <li><Link to="#">Pending</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 3 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(3)}>
                        <span className="icon"><GroupOutlinedIcon /></span>
                        Users
                        <span className="arrow"><ChevronRightOutlinedIcon /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 3 && isToggleSubmenu === true ? 'collapsed' : 'collapse'}`}>
                        <ul className="submenu">
                            <li><Link to="#">All Users</Link></li>
                            <li><Link to="#">Active</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 4 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(4)}>
                        <span className="icon"><MonetizationOnOutlinedIcon /></span>
                        Payments
                        <span className="arrow"><ChevronRightOutlinedIcon /></span>
                    </Button>
                    <div className={`submenuWrapper ${activeTab === 4 && isToggleSubmenu === true ? 'collapsed' : 'collapse'}`}>
                        <ul className="submenu">
                            <li><Link to="#">All </Link></li>
                            <li><Link to="#">Card</Link></li>
                            <li><Link to="#">Cash</Link></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`} onClick={() => isOpenSubmenu(5)}>
                        <span className="icon"><DescriptionOutlinedIcon /></span>
                        Invoices
                        <span className="arrow"><ChevronRightOutlinedIcon /></span>
                    </Button>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`} onClick={() => isOpenSubmenu(6)}>
                        <span className="icon"><DeliveryDiningOutlinedIcon /></span>
                        Delivery
                    </Button>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 7 ? 'active' : ''}`} onClick={() => isOpenSubmenu(7)}>
                        <span className="icon"><ChatBubbleOutlinedIcon /></span>
                        Messages
                    </Button>
                </li>
                <li>
                    <Button className={`w-100 ${activeTab === 8 ? 'active' : ''}`} onClick={() => isOpenSubmenu(8)}>
                        <span className="icon"><SettingsOutlinedIcon /></span>
                        Settings
                    </Button>
                </li>
            </ul>
            <div className='logoutWrapper'>
                <div className='logoutBox'>
                    <Button variant="contained"><LockOutlinedIcon /> Logout</Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
