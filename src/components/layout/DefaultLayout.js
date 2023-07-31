import React, { useEffect, useState } from 'react'
import AppContent from '../AppContent/AppContent'
import Cookie from 'js-cookie'
import { Navigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'
import { Box, Typography } from '@mui/material'
const DefaultLayout = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            setScreenHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    if (!Cookie.get('userToken')) {
        return <Navigate to="/login" />
    }
    return (
        <>
            {screenWidth > 900 ? (
                <Box className="d-flex">
                    <SideBar />
                    <Box className={'width-main'}>
                        <Header />
                        <AppContent />
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{ height: '100vh' }}
                    className="d-flex justify-content-center align-items-center"
                >
                    <Typography>Please use Bigger Screen for better visual.</Typography>
                </Box>
            )}
        </>
    )
}

export default DefaultLayout
