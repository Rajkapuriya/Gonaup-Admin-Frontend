import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Button, Divider, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import './index.css'
import { useNavigate, useParams } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import moment from 'moment'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import EditIcon from '@mui/icons-material/Edit';
import DeveloperProfile from '../DeveloperProfile/DeveloperProfile'
import Logo from '../../assets/images/logo.svg'
import { Context as ContextSnackbar } from '../../context/notificationcontext/notificationcontext'
const DeveloperDetail = () => {
    const { id } = useParams();
    const [developerProfileDetail, setDeveloperProfileDetail] = useState({});
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate: GetDeveloperDetail } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setDeveloperProfileDetail(res.data.data)
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleGetDeveloperDetailProfile = () => {
        GetDeveloperDetail({
            url: `/freelancer/profile?userId=${id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetDeveloperDetailProfile();
    }, [])
    return (
        <Box className="profile_body_section">
            <Box className="user_profile_header_Section">
                <Box className="username_profile_Section">
                    <Box>
                        {developerProfileDetail?.image_url ? (
                            <img
                                src={Logo}
                                className="user_profile_image"
                                alt={developerProfileDetail.first_name}
                            />
                        ) : (
                            <AccountCircleRoundedIcon className="user_profile_icon" />
                        )}
                    </Box>
                    <Box className="username_and_position">
                        <Typography className="username_text" variant="span">
                            {developerProfileDetail?.first_name + " " + developerProfileDetail?.last_name || '-'}
                        </Typography>
                        <Typography variant="span" sx={{ marginTop: '5px', color: "#8E8E8E" }}>
                            {developerProfileDetail?.state_name + "," + developerProfileDetail.country_name || '-'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <DeveloperProfile />
            </Box>
        </Box >
    )
}

export default DeveloperDetail
