import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Chip, Divider, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material'
import './index.css'
import { useNavigate, useParams } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import moment from 'moment'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import EditIcon from '@mui/icons-material/Edit';
import DeveloperProfile from '../DeveloperProfile/DeveloperProfile'
const DeveloperDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [activePage, setActivePage] = useState("2");
    const [developerProfileDetail, setDeveloperProfileDetail] = useState({});
    const [projectList, setProjectList] = useState([]);
    const { mutate: GetDeveloperDetail } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setDeveloperProfileDetail(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleChange = (event, newValue) => {
        setActivePage(newValue);
    };
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
                                src={developerProfileDetail?.image_url}
                                className="user_profile_icon"
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
                        <Typography variant="span" sx={{ marginTop: '5px' }}>
                            {developerProfileDetail?.state_name + "," + developerProfileDetail.country_name || '-'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={activePage}>
                    <Box className="tab_row">
                        <TabList
                            sx={{ borderBottom: '1px solid #F1F2F6' }}
                            className="client_profile_tab mb-2"
                            onChange={handleChange}
                        >
                            <Tab label="Recent Jobs" value="1" />
                            <Tab label="Profile" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel sx={{ padding: '0px' }} value="1">
                        {projectList && projectList.map((data) => {
                            return <Box className="project_detail mb-1" onClick={() => {
                                navigate(`/project-job-detail/${data.id}`)
                            }}>
                                <Box className="project_title d-flex justify-content-between">
                                    <Box className="d-flex row">
                                        <Typography variant="span">{data.title}</Typography>
                                        <Typography className="project__created_date" variant="span">{moment(data.created_at).format('ll')}</Typography>
                                    </Box>
                                    <Typography variant="span">${data.min_hourly_budget}-{data.max_hourly_budget}/hr</Typography>
                                </Box>
                                <Typography variant="span">{data.description}</Typography>
                                <Box className="d-flex column justify-content-between">
                                    <Box className="d-flex column ">
                                        {data.skills.split(',').map((data) => {
                                            return <Stack direction="row" spacing={1}>
                                                <Chip
                                                    label={data}
                                                    variant="outlined"
                                                    className='mx-1'
                                                />
                                            </Stack>
                                        })}</Box>
                                    <Stack direction="row" spacing={1}>
                                        {data.project_status !== 0 ? <Chip
                                            label="Contract Open"
                                            color="primary"
                                        /> : <Chip
                                            label="Contract Open"
                                            color="error"
                                        />}
                                    </Stack></Box>
                            </Box>
                        })}
                    </TabPanel>
                    <TabPanel sx={{ padding: '0px' }} value="2">
                        <DeveloperProfile />
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}

export default DeveloperDetail
