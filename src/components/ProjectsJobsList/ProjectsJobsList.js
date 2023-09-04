import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Chip, Divider, Drawer, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import moment from 'moment'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import IconButton from '@mui/material/IconButton'
import { PROJECT } from '../../constants/projectConstant'
import DoneIcon from '@mui/icons-material/Done';
import ProjectDetailDialog from '../ProjectDetailDialog/ProjectDetailDialog'
const drawerWidth = 350
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
const ProjectsJobsList = ({ project_type }) => {
    const navigate = useNavigate()
    const [projectList, setProjectList] = useState([]);
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [filterElement, setFilterElement] = useState({
        serviceId: "",
        skill: "",
        hourlyRate: "",
        hiringStatus: "",
        contractStatus: "",
        jobType: ""
    });
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const { mutate: GetServiceList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setServiceSkillList((prevState) => ({
                ...prevState,
                serviceList: res.data.data.serviceList,
            }));
        },
        onError: (err) => {
        }
    });
    const { mutate: GetSkillList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setServiceSkillList((prevState) => ({
                ...prevState,
                skillList: res.data.data.skillList,
            }));
        },
        onError: (err) => {
        }
    });
    useEffect(() => {
        GetServiceList({
            url: '/service/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
        GetSkillList({
            url: '/skill/list',
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const { mutate: GetProjectList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setProjectList(res.data.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const handleApplyFilter = () => {
        handleGetProjectList()
    }
    const handleClearAllFilter = () => {
        setFilterElement({
            serviceId: null,
            skill: null,
            hourlyRate: null,
            hiringStatus: null,
            contractStatus: null,
            jobType: null
        })
        handleGetProjectList()
    }
    const handleGetProjectList = () => {
        let url = `/project/list?page=1&size=10&projectType=${project_type}`
        if (filterElement.serviceId) {
            let service = filterElement.serviceId.map((data) => data.id)
            url += `&serviceId=${service[0]}`;
        }
        if (filterElement.skill) {
            let skill = filterElement.skill.map((data) => data.id).join(",")
            url += `&skills=${skill}`;
        }
        if (filterElement.hourlyRate !== "" && filterElement.hourlyRate) {
            url += `&minHourlyRate=${parseInt(filterElement.hourlyRate)}`
        }
        if (filterElement.hiringStatus !== "" && filterElement.hiringStatus) {
            url += `&hiringStatus=${parseInt(filterElement.hiringStatus)}`
        }
        if (filterElement.contractStatus !== "" && filterElement.contractStatus) {
            url += `&contactStatus=${parseInt(filterElement.contractStatus)}`
        }
        if (filterElement.jobType !== "" && filterElement.jobType) {
            url += `&jobStatus=${parseInt(filterElement.jobType)}`
        }
        if (searchValue !== "" && searchValue) {
            url += `&searchQuery=${searchValue}`
        }
        GetProjectList({
            url: url,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        overflowX: 'hidden',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }))
    useEffect(() => {
        handleGetProjectList();
    }, [project_type])
    return (
        <Box className="main_tab_section">
            <Box className="tab_header">
                <Typography variant="span">Overview</Typography>
                <Box>
                    <TextField variant='outlined' label="Search" value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                    />
                    <Button onClick={handleDrawerOpen} variant='outlined'>Filter</Button>
                </Box>
            </Box>
            <Drawer
                onClose={handleDrawerClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                open={open}
                anchor="right"
            >
                <DrawerHeader className="drawer_header_section">
                    <Box className="filter_main_heading">
                        <IconButton
                            sx={{ color: '#2e3591', padding: '0px' }}
                            disableRipple={true}
                            onClick={handleDrawerClose}
                        >
                            {theme.direction === 'rtl' ? (
                                <ChevronLeftIcon className="chevron_icon" />
                            ) : (
                                <ChevronRightIcon className="chevron_icon" />
                            )}
                        </IconButton>
                        <Typography sx={{ fontSize: '20px' }}>Filter By</Typography>
                    </Box>
                    <Box>
                        <Button className="text_button"
                            onClick={handleClearAllFilter}
                        >
                            Reset
                        </Button>
                        <Button
                            className="common_button"
                            onClick={handleApplyFilter}
                            variant="contained"
                        >
                            Apply
                        </Button>
                    </Box>
                </DrawerHeader>
                <Divider />
                <Autocomplete
                    multiple
                    options={serviceSkillList.skillList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                        setFilterElement({ ...filterElement, skill: value })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Skill"
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    options={serviceSkillList.serviceList}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                        setFilterElement({ ...filterElement, serviceId: value })
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Service"
                        />
                    )}
                />
                <TextField
                    variant="outlined"
                    label="Enter Hourly Rate"
                    value={filterElement.hourlyRate}
                    onChange={(e) => {
                        setFilterElement({ ...filterElement, hourlyRate: e.target.value })
                    }}
                />
                <FormControl>
                    <FormLabel>Hiring Status</FormLabel>
                    <RadioGroup
                        value={filterElement.hiringStatus}
                        onChange={(e) => {
                            setFilterElement({ ...filterElement, hiringStatus: e.target.value })
                        }}
                    >
                        {PROJECT.HIRING_STAGE.map((data) => {
                            return <FormControlLabel value={data.id} control={<Radio />} label={data.type}
                            />
                        })}
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Contract Status</FormLabel>
                    <RadioGroup
                        value={filterElement.contractStatus}
                        onChange={(e) => {
                            setFilterElement({ ...filterElement, contractStatus: e.target.value })
                        }}
                    >
                        {PROJECT.CONTRACT_STATUS.map((data) => {
                            return <FormControlLabel value={data.id} control={<Radio />} label={data.type}
                            />
                        })}
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Job Type</FormLabel>
                    <RadioGroup
                        value={filterElement.jobType}
                        onChange={(e) => {
                            setFilterElement({ ...filterElement, jobType: e.target.value })
                        }}
                    >
                        {PROJECT.PROJECT_STATUS.map((data) => {
                            return <FormControlLabel value={data.id} control={<Radio />} label={data.type}
                            />
                        })}
                    </RadioGroup>
                </FormControl>
            </Drawer>
            <Box className="below_main_tab_section">
                <Box className="inner_container">
                    <Box className="project_list_section">
                        {projectList && projectList.map((data) => {
                            return <Box className="project_detail" onClick={() => {
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
                                {data.skills && data.skills.split(',').map((data) => {
                                    return <Stack direction="row" spacing={1}>
                                        <Chip
                                            label={data}
                                            variant="outlined"
                                        />
                                    </Stack>
                                })}
                                <Divider className="my-2" />
                                <ThemeProvider theme={theme}>
                                    <Box className="d-flex justify-content-between">
                                        <Stack direction="row" spacing={1}>
                                            <Chip
                                                label={`Invited: ${data.invited}`}
                                                color="primary"
                                                sx={{ color: "#fff" }}
                                            />
                                            <Chip
                                                label={`Interested: ${data.interested
                                                    }`}
                                                color="secondary"
                                                sx={{ color: "#fff" }}
                                            />
                                            <Chip
                                                label={`Suggested: ${data.suggested}`}
                                                color="info"
                                            />
                                            <Chip
                                                label={`Hired: ${data.hired}`}
                                                color="success"
                                            />
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            {data.project_status !== 0 ? <Chip
                                                label="Contract Open"
                                                color="primary"
                                            /> : <Chip
                                                label="Contract Closed"
                                                color="error"
                                            />}
                                        </Stack>
                                    </Box>
                                </ThemeProvider>
                            </Box>
                        })}
                    </Box>
                </Box>
            </Box>


        </Box>
    )
}

export default ProjectsJobsList
