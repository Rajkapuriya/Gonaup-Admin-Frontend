import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
const SideBar = () => {
    let navigate = useNavigate()
    const [path, setPath] = useState(null)
    return (
        <>
            <Box style={{ width: '17%', background: 'white' }}>
                <div className="main-logo">
                    <img src={Logo} alt="Company logo" />
                </div>
                <Box className="sidebar_group_icon">
                    <Box
                        className={`sidebar_icons ${path === '/projects' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            {/* <img
                                src={path === '/dashboard' ? DashBoardWhite : Dashboard}
                                className="sidebar_img"
                            /> */}
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Projects
                        </Typography>
                    </Box>
                    <Box
                        className={`sidebar_icons ${path === '/jobs' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            {/* <img
                                src={path === '/client' ? CustomerWhite : CustomerBlue}
                                className="sidebar_img"
                            /> */}
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Jobs
                        </Typography>
                    </Box>
                    <Box
                        className={`sidebar_icons ${path === '/clients' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            {/* <img
                                src={path === '/staff' ? Team : TeamBlue}
                                className="sidebar_img"
                            /> */}
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Clients
                        </Typography>
                    </Box>
                    <Box
                        className={`sidebar_icons ${path === '/recruiters' && 'selected-link'}`}
                    >
                        <Box className="sidebar_icon_root">
                            {/* <img
                                src={path === '/task' ? TaskBlue : Task}
                                className="sidebar_img"
                            /> */}
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Recruiters
                        </Typography>
                    </Box>
                    <Box
                        className={`sidebar_icons ${path === '/developers' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            {/* <img
                                src={path === '/orders' ? OrdersBlue : Orders}
                                className="sidebar_img"
                            /> */}
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Developers
                        </Typography>
                    </Box>
                    <Box
                        className={`sidebar_icons ${path === '/settings' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            {/* <img
                                src={path === '/report' ? ReportBlue : Statistics}
                                className="sidebar_img"
                            /> */}
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Settings
                        </Typography>
                    </Box>
                    <Box
                        className={`sidebar_icons ${path === '/signout' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            {/* <img
                                src={path === '/settings' ? SettingsBlue : Settings}
                                className="sidebar_img"
                            /> */}
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Sign Out
                        </Typography>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default SideBar
