import React, { useContext, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'

import ProjectWhite from '../../assets/images/Project_White.svg'
import ProjectGreen from '../../assets/images/Project_green.svg'

import JobsWhite from '../../assets/images/Job_white.svg'
import JobsGreen from '../../assets/images/Job_green.svg'

import ClientWhite from '../../assets/images/Client_white.svg'
import ClientGreen from '../../assets/images/Client_green.svg'

import RecruiterWhite from '../../assets/images/Recruiter_white.svg'
import RecruiterGreen from '../../assets/images/Recruiter_green.svg'

import DeveloperWhite from '../../assets/images/Developer_white.svg'
import DeveloperGreen from '../../assets/images/Developer_green.svg'

import SettingWhite from '../../assets/images/Setting_white.svg'
import SettingGreen from '../../assets/images/Setting_green.svg'

import SignOutWhite from '../../assets/images/Sign_Out_white.svg'
import SignOutGreen from '../../assets/images/Sign_Out_green.svg'
import { Context as ContextActivePage } from '../../context/pageContext/pageContext'
const SideBar = () => {
    let navigate = useNavigate()
    const [path, setPath] = useState(null)
    const { setActivePage } = useContext(ContextActivePage)
    const handleNavItemClick = (path, name) => {
        navigate(path)
        setActivePage(name)
        setPath(path)
        localStorage.setItem('path', path)
    }
    useEffect(() => {
        let pathName = localStorage.getItem('path')
        setPath(pathName)
    }, [])
    return (
        <>
            <Box style={{ width: '17%', background: 'white' }}>
                <div className="main-logo">
                    <img src={Logo} alt="Company logo" />
                </div>
                <Box className="sidebar_group_icon">
                    <Box
                        onClick={() => {
                            handleNavItemClick('/project-list', 'ProjectList')
                        }}
                        className={`sidebar_icons ${path === '/project-list' && 'selected-link'
                            }`}
                    >
                        <Box className="sidebar_icon_root">
                            <img
                                src={path === '/project-list' ? ProjectWhite : ProjectGreen}
                                className="sidebar_img"
                            />
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Projects
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => {
                            handleNavItemClick('/job-list', 'Job List')
                        }}
                        className={`sidebar_icons ${path === '/job-list' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            <img
                                src={path === '/job-list' ? JobsWhite : JobsGreen}
                                className="sidebar_img"
                            />
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Jobs
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => {
                            handleNavItemClick('/client-list', 'Job List')
                        }}
                        className={`sidebar_icons ${path === '/client-list' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            <img
                                src={path === '/client-list' ? ClientWhite : ClientGreen}
                                className="sidebar_img"
                            />
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Clients
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => {
                            handleNavItemClick('/recruiter-list', 'Recruiter List')
                        }}
                        className={`sidebar_icons ${path === '/recruiter-list' && 'selected-link'}`}
                    >
                        <Box className="sidebar_icon_root">
                            <img
                                src={path === '/recruiter-list' ? RecruiterWhite : RecruiterGreen}
                                className="sidebar_img"
                            />
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Recruiters
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => {
                            handleNavItemClick('/developer-list', 'Developer List')
                        }}
                        className={`sidebar_icons ${path === '/developer-list' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            <img
                                src={path === '/developer-list' ? DeveloperWhite : DeveloperGreen}
                                className="sidebar_img"
                            />
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Developers
                        </Typography>
                    </Box>
                    <Box onClick={() => {
                        handleNavItemClick('/admin-setting', 'Admin-Setting')
                    }}
                        className={`sidebar_icons ${path === '/admin-setting' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            <img
                                src={path === '/admin-setting' ? SettingWhite : SettingGreen}
                                className="sidebar_img"
                            />
                        </Box>
                        <Typography className="page_name_root" variant="div">
                            Settings
                        </Typography>
                    </Box>
                    <Box onClick={() => {
                        handleNavItemClick('/signout', 'Signout')
                    }}
                        className={`sidebar_icons ${path === '/signout' && 'selected-link'
                            }`}>
                        <Box className="sidebar_icon_root">
                            <img
                                src={path === '/signout' ? SignOutWhite : SignOutGreen}
                                className="sidebar_img"
                            />
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
