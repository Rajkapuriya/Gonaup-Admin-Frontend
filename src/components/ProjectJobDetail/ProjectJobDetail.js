import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Chip, Divider, Stack, Tab, TextField, Typography } from '@mui/material'
import './index.css'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import moment from 'moment'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import SkypeLogo from '../../assets/images/Skype.svg'
import LinkedinLogo from '../../assets/images/LinkedIn.svg'
import EmailLogo from '../../assets/images/Email.svg'
import CallLogo from '../../assets/images/Call.svg'
import { PROJECT } from '../../constants/projectConstant'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import DeleteProjectJobDialog from '../DeleteProjectJobDialog/DeleteProjectJobDialog'
import UpdateCommissionDialog from './UpdateCommissionDialog'
import UpdateHiringStageDialog from './UpdateHiringStageDialog'
import UpdateContractStatusDialog from './UpdateContractStatusDialog'
import SearchTalent from './SearchTalent'
import CandidateList from './CandidateList'
const theme = createTheme({
    palette: {
        primary: {
            main: '#7AC144',
        },
        secondary: {
            main: '#C18F44',
        },
        info: {
            main: "#3973CA"
        },
        success: {
            main: "#706F96"
        },
        error: {
            main: "#FF0000"
        }
    },
});
const ProjectJobDetail = ({ project_type }) => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [value, setValue] = useState('search');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [projectJobDetail, setProjectJobDetail] = useState({});
    const [deleteProjectJobDialogControl, setDeleteProjectJobDialogControl] = useState({
        status: false,
        reason: "",
        projectId: projectJobDetail?.id
    })
    const [updateCommissionDialogControl, setUpdateComissionDialogControl] = useState({ status: false, commission: '' })
    const [updateHiringStageDialogControl, setUpdateHiringStageDialogControl] = useState({
        status: false,
        hiring_status: null
    })
    const [updateContractStatusDialogControl, setUpdateContractStatusDialogControl] = useState({
        status: false,
        contractStatus: ''
    })
    const [candidateList, setCandidateList] = useState([])
    const { mutate: GetProjectJobDetail } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setProjectJobDetail(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetProjectJobDetail = () => {
        GetProjectJobDetail({
            url: `/project/details?projectId=${id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetProjectJobDetail();
    }, [])
    const handleClose = () => {
        setDeleteProjectJobDialogControl({ ...deleteProjectJobDialogControl, status: false })
        setUpdateComissionDialogControl({ ...updateCommissionDialogControl, status: false })
        setUpdateHiringStageDialogControl({ ...updateHiringStageDialogControl, status: false })
        setUpdateContractStatusDialogControl({ ...updateContractStatusDialogControl, status: false })
    }
    const handleUpdateCommission = () => {
        DeleteProject({
            url: `/project/commission`,
            method: 'PUT',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                projectId: projectJobDetail?.id,
                budgetType: projectJobDetail?.budget_type,
                commission: parseInt(updateCommissionDialogControl.commission)
            }
        })
    }
    const { mutate: DeleteProject } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleDeleteProject = () => {
        DeleteProject({
            url: `/project/close`,
            method: 'delete',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                reason: deleteProjectJobDialogControl.reason,
                projectId: projectJobDetail?.id
            }
        })
    }
    const { mutate: UpdateHiringStage } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateHiringStage = () => {
        UpdateHiringStage({
            url: `/project/hiring-status`,
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                projectId: projectJobDetail?.id,
                hiringStatus: parseInt(updateHiringStageDialogControl.hiring_status)
            }
        })
    }
    const { mutate: UpdateContractStatus } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            handleClose();
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleUpdateContractStatus = () => {
        UpdateContractStatus({
            url: `/project/contract-status`,
            method: 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                projectId: projectJobDetail?.id,
                contractStatus: parseInt(updateContractStatusDialogControl.contractStatus)
            }
        })
    }

    const { mutate: GetCandidateListDetail } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setCandidateList(res.data.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetCandidateListDetail = () => {
        GetCandidateListDetail({
            url: `/project/candidate-list?page=1&size=10&hiringStatus=${parseInt(value)}&projectId=${id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        value !== "search" && handleGetCandidateListDetail();
    }, [value])
    return (
        <Box className="main_tab_section">
            <Box className="below_main_detail_section p-3 row">
                <Box className="project_job_left_section">
                    <Box className="d-flex row p-3">
                        <Typography className="project_title" variant="span">{projectJobDetail.title}</Typography>
                        <Typography variant='span'>{projectJobDetail.description}</Typography>
                    </Box>
                    <Divider />
                    <Box className="project_job_detail">
                        <Box className="project_detail_component">
                            <AccessTimeRoundedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_title'>
                                    {PROJECT.HOUR_PER_WEEK.map((data) => {
                                        if (data.id === projectJobDetail.hour_per_week) {
                                            return data.type
                                        }
                                    })}
                                </Typography>
                                <Typography className='project_detail_sub_heading'>Hourly</Typography>
                            </Box>
                        </Box>
                        <Box className="project_detail_component">
                            <CalendarMonthRoundedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_title'>
                                    {PROJECT.PROJECT_DURATION.map((data) => {
                                        if (data.id === projectJobDetail.project_duration) {
                                            return data.type
                                        }
                                    })}
                                </Typography>
                                <Typography className='project_detail_sub_heading'>Project Length</Typography>
                            </Box>
                        </Box>
                        <Box className="project_detail_component">
                            <EmojiObjectsOutlinedIcon />
                            <Box className="d-flex row">
                                <Typography className='mx-1 project_title' >
                                    {PROJECT.EXPERIENCE_LEVEL.map((data) => {
                                        if (data.id === projectJobDetail.experience_needed) {
                                            return data.type
                                        }
                                    })}
                                </Typography>
                                <Typography className='project_detail_sub_heading'>Comprehensive and deep expertise in this field</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />

                    <Box className="d-flex row p-3">
                        <Typography className="project_detail_heading" variant="span"> Skills and Expertise </Typography>
                        <Stack direction="row" spacing={1}>
                            {projectJobDetail.skills && projectJobDetail.skills.map((data) => {
                                return <Stack direction="row" spacing={1}>
                                    <Chip
                                        label={data.name}
                                        variant="outlined"
                                    />
                                </Stack>
                            })}
                        </Stack>
                    </Box>
                    <Box>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Search" value="search" />
                                    <Tab label="Invited" value="0" />
                                    <Tab label="Interested" value="1" />
                                    <Tab label="Shortlisted" value="2" />
                                    <Tab label="Hired" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="search">
                                <SearchTalent />
                            </TabPanel>
                            <TabPanel value="0">
                                <CandidateList candidateList={candidateList} />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
                <Box className="project_job_right_section">
                    <Box className="p-3 d-flex column">
                        <Box>
                            <Avatar alt="" src={projectJobDetail.user_image_url} />
                        </Box>
                        <Box className="d-flex row px-3">
                            <Typography variant="span">{projectJobDetail.user_first_name} {projectJobDetail.user_last_name}</Typography>
                            <Typography variant="span">{projectJobDetail.user_state},{projectJobDetail.user_country}</Typography>
                            <Box>
                                <img src={SkypeLogo} />
                                <img src={LinkedinLogo} />
                                <img src={EmailLogo} />
                                <img src={CallLogo} />
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className="p-3 d-flex column">
                        <Box className="d-flex row">
                            <Typography className="project_detail_sub_heading" variant='span'>Project Status</Typography>
                            <Typography variant='span'>
                                {PROJECT.PROJECT_STATUS.map((data) => {
                                    if (data.id === projectJobDetail.project_status) {
                                        return data.type
                                    }
                                })}
                            </Typography>
                        </Box>
                        <Box>
                            <Button onClick={() => {
                                setDeleteProjectJobDialogControl({ ...deleteProjectJobDialogControl, status: true })
                            }} className="common_button">Close</Button>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className="d-flex row p-3">
                        <Typography className="project_detail_sub_heading" variant='span'>Budget</Typography>
                        <Typography variant='span'> {
                            projectJobDetail.budget_type === 0 ?
                                projectJobDetail.fixed_budget : "$" + projectJobDetail.min_hourly_budget + " to " + projectJobDetail.max_hourly_budget
                        }</Typography>
                    </Box>
                    <Divider />
                    <Box className="p-3 d-flex column">
                        <Box className="d-flex row">
                            <Typography className="project_detail_sub_heading" variant='span'>Commission</Typography>
                            <Typography variant='span'>{projectJobDetail.commission}</Typography>
                        </Box>
                        <Box className="d-flex row">
                            <Button onClick={() => {
                                setUpdateComissionDialogControl({ ...updateCommissionDialogControl, status: true, commission: projectJobDetail.commission })
                            }} className="common_button">Add</Button>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className="p-3 d-flex column">
                        <Box className="d-flex row">
                            <Typography className="project_detail_sub_heading" variant='span'>Hiring Status</Typography>
                            <Typography variant='span'>{projectJobDetail?.hiring_status}</Typography>
                        </Box>
                        <Box className="d-flex row">
                            <Button onClick={() => {
                                setUpdateHiringStageDialogControl({ ...updateHiringStageDialogControl, status: true, hiring_status: projectJobDetail.project_status })
                            }} className="common_button">Update</Button>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className="p-3 d-flex column">
                        <Box className="d-flex row">
                            <Typography className="project_detail_sub_heading" variant='span'>Contract Status</Typography>
                            <Typography variant='span'>
                                {PROJECT.CONTRACT_STATUS.map((data) => {
                                    if (data.id === projectJobDetail.contract_status) {
                                        return data.type
                                    }
                                })}
                            </Typography>
                        </Box>
                        <Box className="d-flex row">
                            <Button onClick={() => {
                                setUpdateContractStatusDialogControl({ ...updateContractStatusDialogControl, status: true, contractStatus: projectJobDetail.contract_status })
                            }} className="common_button">Update</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <DeleteProjectJobDialog deleteProjectJobDialogControl={deleteProjectJobDialogControl} handleClose={handleClose} setDeleteProjectJobDialogControl={setDeleteProjectJobDialogControl} handleDeleteProject={handleDeleteProject} />

            <UpdateCommissionDialog updateCommissionDialogControl={updateCommissionDialogControl} setUpdateComissionDialogControl={setUpdateComissionDialogControl} handleUpdateCommission={handleUpdateCommission} handleClose={handleClose} />

            <UpdateHiringStageDialog updateHiringStageDialogControl={updateHiringStageDialogControl} setUpdateHiringStageDialogControl={setUpdateHiringStageDialogControl} handleUpdateHiringStage={handleUpdateHiringStage} handleClose={handleClose} />

            <UpdateContractStatusDialog updateContractStatusDialogControl={updateContractStatusDialogControl} setUpdateContractStatusDialogControl={setUpdateContractStatusDialogControl} handleClose={handleClose} handleUpdateContractStatus={handleUpdateContractStatus} />
        </Box >
    )
}

export default ProjectJobDetail
