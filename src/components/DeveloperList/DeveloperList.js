import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Divider, Drawer, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
// import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import styled from '@emotion/styled'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import IconButton from '@mui/material/IconButton'
import { PROJECT } from '../../constants/projectConstant'
import { useTheme } from '@emotion/react'
const drawerWidth = 350
const DeveloperList = () => {
    const navigate = useNavigate()
    const theme = useTheme();
    const [filterElement, setFilterElement] = useState({
        serviceId: "",
        skill: "",
        hourlyRate: "",
        hiringStatus: "",
        contractStatus: "",
        jobType: ""
    });
    const [developerList, setDeveloperList] = useState([]);
    const [open, setOpen] = useState(false)
    const { mutate: GetDeveloperList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setDeveloperList(res.data.data.searchList)
        },
        onError: (err) => {
            setDeveloperList([])
        }
    });
    const handleDeveloperList = () => {
        GetDeveloperList({
            url: `/freelancer/list?page=1&size=10`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleDeveloperList();
    }, [])
    const [serviceSkillList, setServiceSkillList] = useState({
        serviceList: [],
        skillList: []
    });
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const handleApplyFilter = () => {
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
    }
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
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        overflowX: 'hidden',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }))
    return (
        <Box className="main_tab_section">
            <Box className="tab_header">
                <Typography variant="span">Overview</Typography>
                <Box>
                    <TextField variant='outlined' />
                    <Button onClick={handleDrawerOpen} variant="outlined">Filter</Button>
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
                {/* <Autocomplete
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
                </FormControl> */}
            </Drawer>
            <Box className="below_main_tab_section">
                <Box className="inner_container">
                    <TableContainer
                        className="orders_table_height set_box_shadow"
                        component={Paper}
                    >
                        {developerList.length > 0 ? (
                            <Table
                                className="customer_list_table"
                                stickyHeader
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Country</TableCell>
                                        <TableCell>Open Projects</TableCell>
                                        <TableCell>Total Projects</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {developerList.map((row, index) => (
                                        <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell>{row.first_name ?? '-'} {row.last_name ?? '-'}</TableCell>
                                            <TableCell>{row.country_name ?? '-'}</TableCell>
                                            <TableCell>{row.openJobs ?? '-'}</TableCell>
                                            <TableCell>
                                                {row.totalJobs ?? '-'}
                                            </TableCell>
                                            <TableCell className="customers_list_page_buttons">
                                                <Button
                                                    className="client_view_button common_button"
                                                    onClick={() => {
                                                        navigate(`/developer-profile/${row.id}`)
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <></>
                        )}
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default DeveloperList
