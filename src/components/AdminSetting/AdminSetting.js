import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ServiceIcon from '../../assets/images/ServiceIcon.svg'
import SkillIcon from '../../assets/images/SkillIcon.svg'

import './index.css';
const AdminSetting = () => {
    const navigate = useNavigate()
    return (
        <Box className="main_tab_section">
            <Box className="below_main_detail_section p-3 row">
                <Box>
                    <Box className="setting_element" onClick={() => {
                        navigate('/skill-list')
                    }}>
                        <Box className="skill_service_icon">
                            <img src={SkillIcon} />
                        </Box>
                        <Typography variant='span'>Skills</Typography>
                    </Box>
                    <Box onClick={() => {
                        navigate('/service-list')
                    }} className="setting_element">
                        <Box className="skill_service_icon">
                            <img src={ServiceIcon} />
                        </Box>
                        <Typography variant='span'>Services</Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default AdminSetting
