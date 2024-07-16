/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import profile from '../../assets/images/profile1.jpg';
import dp1 from '../../assets/images/dp1.png';
import dp2 from '../../assets/images/dp2.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';

const Header = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotification = Boolean(isOpennotificationDrop);

  const handleOpenMyAccDr = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDr = () => {
    setAnchorEl(null);
  };

  const handleOpennotificationDrop = () =>{
    setisOpennotificationDrop(true)
  }

  const handleClosenotificationDrop = () =>{
    setisOpennotificationDrop(false)
  }
  return (
    <>
      <header className='d-flex align-items-center'>
        <div className='container-fluid'>
          <div className='row d-flex align-items-center'>
            <div className='col-2 part1'>
              <Link to={'/'} className='d-flex align-items-center logo'>
                <img src={logo} />
                <span className='ml-2'>MartX</span>
              </Link>
            </div>
            <div className='col-3 d-flex align-items-center part2'>
              <Button className='rounded-circle mr-3'>
                <MenuOpenOutlinedIcon style={{ fontSize: 28 }} /></Button>
              <div className="searchBox position-relative d-flex align-items-center">
                <SearchOutlinedIcon />
                <input type="text" placeholder="Search here...." />
              </div>
            </div>
            <div className='col-7 d-flex align-items-center justify-content-end part3'>
              <Button className='rounded-circle mx-3'><LightModeOutlinedIcon style={{ fontSize: 28 }} /></Button>
              <Button className='rounded-circle mx-3'><ShoppingCartOutlinedIcon style={{ fontSize: 28 }} /></Button>

              <Button className='rounded-circle mx-3'><EmailOutlinedIcon style={{ fontSize: 28 }} /></Button>
              
                <div className='dropdownwrapper position-relative'>
                  <Button className='rounded-circle mx-3' onClick={handleOpennotificationDrop}><NotificationsNoneOutlinedIcon style={{ fontSize: 28 }} /></Button>
                    <Menu
                      anchorEl={isOpennotificationDrop}
                      className='notifications dropdown_list'
                      id="notifications"
                      open={openNotification}
                      onClose={handleClosenotificationDrop}
                      onClick={handleClosenotificationDrop}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <div className='head pl-3 pb-3'>
                        <h4 style={{marginLeft:20 , paddingTop:10}}>Notifications (12)</h4>
                      </div>
                      <Divider className='pb-0'/>

                      <div className='scroll'>
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp1} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp2} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp1} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp2} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp1} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp2} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp1} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      
                      <MenuItem onClick={handleCloseMyAccDr}>
                        <div className='d-flex align-items-center'>
                          <div className='userImg'>
                            <span className='rounded-circle'>
                              <img src={dp2} />
                            </span>
                          </div>
                          <div className='dropdowninfo'>
                            <h4>
                              <span>
                                <b>Mahmudul </b>
                                added to his favorite list
                                <b> Leather belt steve madden</b>
                              </span>
                            </h4>
                            <p className='text-sky mb-0'>
                              Few seconds ago
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                      </div>
                      
                    </Menu>
                
                </div>
              <div className='myAccWrapper'>
                <Button className='myAcc d-flex align-items-center' onClick={handleOpenMyAccDr}>
                  <div className='userImg'>
                    <span className='rounded-circle'>
                      <img src={profile} />
                    </span>
                  </div>
                  <div className='userInfo'>
                    <h4>Kabilan</h4>
                    <p className='mb-0'>@kabil96</p>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAccDr}
                  onClick={handleCloseMyAccDr}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleCloseMyAccDr}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDr}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDr}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header