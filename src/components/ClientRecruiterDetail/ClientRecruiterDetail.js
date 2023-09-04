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
const ClientRecruiterDetail = ({ project_type }) => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [activePage, setActivePage] = useState("2");
    const [clientRecruiterProfileDetail, setClientRecruiterProfileDetail] = useState({});
    const [projectList, setProjectList] = useState([]);
    const [companyProfile, setCompanyProfile] = useState({})
    const { mutate: GetClientRecruiterDetail } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setClientRecruiterProfileDetail(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleChange = (event, newValue) => {
        setActivePage(newValue);
    };
    const handleClientRecruiterProfile = () => {
        GetClientRecruiterDetail({
            url: `/client/profile?userId=${id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleClientRecruiterProfile();
    }, [])
    const { mutate: GetProjectList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setProjectList(res.data.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetProjectList = () => {
        GetProjectList({
            url: `/project/list?page=1&size=10&projectType=${project_type}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetProjectList();
    }, [project_type])
    const { mutate: GetCompanyProfile } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setCompanyProfile(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetCompanyProfile = () => {
        GetCompanyProfile({
            url: `/client/company/profile?companyId=${clientRecruiterProfileDetail.companyId}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        { clientRecruiterProfileDetail?.companyId && handleGetCompanyProfile() }
    }, [clientRecruiterProfileDetail?.companyId])
    return (
        <Box className="profile_body_section">
            <Box className="user_profile_header_Section">
                <Box className="username_profile_Section">
                    <Box>
                        {clientRecruiterProfileDetail?.image_url ? (
                            <img
                                src={clientRecruiterProfileDetail?.image_url}
                                className="user_profile_icon"
                                alt={clientRecruiterProfileDetail.first_name}
                            />
                        ) : (
                            <AccountCircleRoundedIcon className="user_profile_icon" />
                        )}
                    </Box>
                    <Box className="username_and_position">
                        <Typography className="username_text" variant="span">
                            {clientRecruiterProfileDetail?.first_name + " " + clientRecruiterProfileDetail?.last_name || '-'}
                        </Typography>
                        <Typography variant="span" sx={{ marginTop: '5px' }}>
                            {clientRecruiterProfileDetail?.state_name + "," + clientRecruiterProfileDetail.country_name || '-'}
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
                            <Tab label="Recent works" value="1" />
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
                                        {data.skills && data.skills.split(',').map((data) => {
                                            return <Stack direction="row" spacing={1}>
                                                <Chip
                                                    label={data}
                                                    variant="outlined"
                                                    className='mx-1'
                                                />
                                            </Stack>
                                        })}</Box>
                                    <Stack direction="row" spacing={1}>
                                        {data.contract_status !== 0 ? <Chip
                                            label="Contract Open"
                                            color="primary"
                                        /> : <Chip
                                            label="Contract Closed"
                                            color="error"
                                        />}
                                    </Stack></Box>
                            </Box>
                        })}
                    </TabPanel>
                    <TabPanel sx={{ padding: '0px' }} value="2">
                        <Box className="client_profile_main_section">
                            <Box className="d-flex justify-content-between p-4">
                                <Typography className="profile_section_heading" variant="span">Company details</Typography>
                                <Button className="border_common_button"
                                >Close Account</Button>
                            </Box>
                            <Box className="d-flex row">
                                <Box className="d-flex column w-50 align-items-end p-3" >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <Box className="d-flex row px-2">
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>
                                                Company Name
                                            </Typography>
                                            <Typography variant='span' className='profile_section_heading'>
                                                {companyProfile?.company_name}
                                            </Typography>
                                        </Box>
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>Company Size </Typography>
                                            <Typography variant='span' className='profile_section_heading'>
                                                {companyProfile?.size}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="d-flex column w-50 align-items-end p-3 ">
                                    <Box className="d-flex row px-2">
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>Website</Typography>
                                            <Typography variant='span' className='profile_section_heading'>
                                                {companyProfile?.website}
                                            </Typography>
                                        </Box>
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>LinkedIn</Typography>
                                            <Typography variant='span' className='profile_section_heading'>
                                                {clientRecruiterProfileDetail?.linkdin_profile}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="client_profile_main_section">
                            <Box className="d-flex justify-content-between p-4">
                                <Typography className="profile_section_heading" variant="span">Company contacts</Typography>
                            </Box>
                            <Box className="d-flex row">
                                <Box className="d-flex column w-50 align-items-end p-3" >
                                    <Box className="d-flex row px-2">
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>Phone</Typography>
                                            <Typography variant='span' className='profile_section_heading'>
                                                {clientRecruiterProfileDetail?.contact_number}</Typography>
                                        </Box>
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>Country </Typography>
                                            <Typography variant='span' className='profile_section_heading'>
                                                {companyProfile?.country_name}</Typography>
                                        </Box>
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>State </Typography>
                                            <Typography variant='span' className='profile_section_heading'>{companyProfile?.state_name}</Typography>
                                        </Box>
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>Address </Typography>
                                            <Typography variant='span' className='profile_section_heading'>{
                                                companyProfile?.address
                                            }</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="d-flex column w-50 align-items-end p-3 ">
                                    <Box className="d-flex row px-2">
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>Skype</Typography>
                                            <Typography variant='span' className='profile_section_heading'>{
                                                clientRecruiterProfileDetail?.skype_id
                                            }</Typography>
                                        </Box>
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>City</Typography>
                                            <Typography variant='span' className='profile_section_heading'>{companyProfile?.city_name}</Typography>
                                        </Box>
                                        <Box className="d-flex row">
                                            <Typography variant='span' sx={{ color: "#8E8E8E" }}>Zip/Postal Code</Typography>
                                            <Typography variant='span' className='profile_section_heading'>{companyProfile?.zip_code}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}

export default ClientRecruiterDetail
