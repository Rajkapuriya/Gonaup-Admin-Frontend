import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
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
                        <EmojiObjectsIcon />
                        <Typography variant='span'>Skills</Typography>
                    </Box>
                    <Box className="setting_element">
                        <EmojiObjectsIcon />
                        <Typography variant='span'>Services</Typography>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default AdminSetting
