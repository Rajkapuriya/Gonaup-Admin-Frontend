import React, { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { requestAdmin } from '../../utils/axios-utils'
import { useMutation } from 'react-query'
import { setLoginToken } from '../../hooks/storage'
import { Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'
const AdminLogin = () => {
    const [userDetail, setUserDetail] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const { mutate } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setLoginToken(res.data.data.token)
            localStorage.setItem('type', res?.data?.data?.type)
            navigate("/adminProfile")
                ;
        },
        onError: (err) => {
            ;
        }
    });
    const handleLogin = async (e) => {
        await mutate({
            url: '/auth/login',
            method: 'post',
            data: userDetail,
        })
    };
    const [showPassword, setShowPassword] = useState(true)
    const handleClickShowPassword = () => setShowPassword(show => !show)
    const handleMouseDownPassword = event => {
        event.preventDefault()
    }
    return (
        <>
            <Box className="login_page">
                <Box className="company_logo">
                    {/* <img src={Logo} alt="Company logo" /> */}
                </Box>
                <Box className="login_form_section">
                    <Box className="login_form_body">
                        <Box className="login_form_box">
                            <Typography className="login_heading" variant="span">
                                Welcome To Gonaup
                            </Typography>
                            <form
                                onSubmit={e => {
                                    e.preventDefault()
                                    handleLogin()
                                }}
                            >
                                <Box sx={{ width: '100%', padding: '30px 20px 20px 20px' }}>
                                    <TextField
                                        id="my-text-field"
                                        label="Email"
                                        sx={{ width: '100%' }}
                                        type="email"
                                        value={userDetail.email}
                                        variant="outlined"
                                        onChange={e => {
                                            setUserDetail({ ...userDetail, email: e.target.value })
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                                <Box sx={{ width: '100%', padding: '20px 20px 0px 20px' }}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        label="Password"
                                        type={showPassword ? 'password' : 'text'}
                                        value={userDetail.password}
                                        onChange={e => {
                                            setUserDetail({ ...userDetail, password: e.target.value })
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            margin: '0px',
                                                            color: '#2E3591',
                                                            boxShadow: 'none',
                                                        }}
                                                        variant="contained"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                                <Box sx={{ width: '100%', padding: '3px 20px 0px 20px' }}>
                                    <Typography
                                        className="login_forget_password_root"
                                        variant="span"
                                    >
                                        <Button
                                            sx={{ padding: '5px 0px' }}
                                            onClick={() => navigate('/forgotpassword')}
                                        >
                                            Forgotten password ?
                                        </Button>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                        padding: '20px 20px 5px 20px',
                                    }}
                                >
                                    <Button
                                        className="dialogue_bottom_button"
                                        onClick={handleLogin}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                    <Box className="login_footer">
                        <Typography className="login_copyright_root" variant="span">
                            {new Date().getFullYear()} © Gonaup.
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* <ErrorSnackbar /> */}
        </>
    )
}

export default AdminLogin
