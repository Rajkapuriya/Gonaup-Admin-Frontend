import React, { useContext, useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Divider, Drawer, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, InputBase } from '@mui/material'
// import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { handleApiCountryStateCityGetCall, requestAdmin } from '../../utils/axios-utils'
import styled from '@emotion/styled'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import IconButton from '@mui/material/IconButton'
import { PROJECT } from '../../constants/projectConstant'
import { useTheme } from '@emotion/react'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import SearchIcon from '@mui/icons-material/Search';
import { REGISTER } from '../../constants/registerConstant'
import { Context as ContextSnackbar } from '../../context/notificationcontext/notificationcontext'
const drawerWidth = 350
const DeveloperList = () => {
    const navigate = useNavigate()
    const theme = useTheme();
    const [filterElement, setFilterElement] = useState({
        serviceId: "",
        skill: "",
        hourlyRate: "",
        country: null,
        openForWork: null,
        isDeleted: null
    });
    const [developerList, setDeveloperList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate: GetCountry } = useMutation(handleApiCountryStateCityGetCall, {
        onSuccess: (res) => {
            setCountryList(res.data)
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleGetCountryCall = async (e) => {
        await GetCountry({
            url: '/countries',
            method: 'get',
            data: {},
            headers: {
                'X-CSCAPI-KEY': process.env.REACT_APP_COUNTRY_STATE_CITY_API_KEY,
            },
        })
    };
    useEffect(() => {
        handleGetCountryCall();
    }, [])
    const [open, setOpen] = useState(false)
    const { mutate: GetDeveloperList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setDeveloperList(res.data.data.searchList)
        },
        onError: (err) => {
            setDeveloperList([])
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleDeveloperList = () => {
        let url = `/freelancer/list?page=1&size=10`
        if (filterElement.serviceId) {
            let service = filterElement.serviceId.map((data) => data.id).join(',')
            url += `&serviceIds=${service}`;
        }
        if (filterElement.skill) {
            let skill = filterElement.skill.map((data) => data.id).join(",")
            url += `&skills=${skill}`;
        }
        if (filterElement.hourlyRate !== "" && filterElement.hourlyRate) {
            url += `&hourlyRate=${parseInt(filterElement.hourlyRate)}`
        }
        if (filterElement.country !== "" && filterElement.country) {
            url += `&countryId=${parseInt(filterElement.country.id)}`
        }
        if (filterElement.openForWork !== "" && filterElement.openForWork) {
            url += `&openForWork=${Boolean(filterElement.openForWork)}`
        }
        if (filterElement.isDeleted !== "" && filterElement.isDeleted) {
            url += `&isDeleted=${Boolean(filterElement.isDeleted)}`
        }
        if (searchValue !== "" && searchValue) {
            url += `&searchQuery=${searchValue}`
        }
        GetDeveloperList({
            url: url,
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
        handleDeveloperList();
    }
    const handleClearAllFilter = () => {
        setFilterElement({
            serviceId: null,
            skill: null,
            hourlyRate: null,
            isDeleted: null,
            openForWork: null
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
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
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
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
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

    return (
        <Box className="main_tab_section">
            <Box className="tab_header">
                <Typography variant="span">Overview</Typography>
                <Box className="tab_header_right_box">
                    <Box className="tab_header_right_item">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, boxShadow: "none" }}
                        >
                            <InputBase
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                }}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search ' }}
                            />
                            <Divider orientation="vertical" flexItem />
                            {/* <IconButton color="success" sx={{ p: '10px' }} aria-label="directions"> */}
                            <SearchIcon />
                            {/* </IconButton> */}
                        </Paper>
                    </Box>
                    <Box className="tab_header_right_item">
                        <Button className="filter_button" onClick={handleDrawerOpen} ><TuneRoundedIcon />Filter</Button>
                    </Box>
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
                <Box className="drawer_header_section">
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
                </Box>
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
                <Autocomplete
                    className="input_fields"
                    disablePortal
                    disableClearable
                    options={countryList}
                    value={filterElement?.country}
                    onChange={(e, value) => {
                        setFilterElement({ ...filterElement, country: value })
                    }}
                    getOptionLabel={option => option?.name}
                    renderInput={params => (
                        <TextField {...params} placeholder="Select Country" />
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
                    <FormLabel>Current Status</FormLabel>
                    <RadioGroup
                        value={filterElement.openForWork}
                        onChange={(e) => {
                            setFilterElement({ ...filterElement, openForWork: e.target.value })
                        }}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Busy in current project"
                        />
                        <FormControlLabel value={false} control={<Radio />} label="open to take new opportunities"
                        />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Job Type</FormLabel>
                    <RadioGroup
                        value={filterElement.isDeleted}
                        onChange={(e) => {
                            setFilterElement({ ...filterElement, isDeleted: e.target.value })
                        }}
                    >
                        {REGISTER.DEVELOPER_STATUS.map((data) => {
                            return <FormControlLabel value={data.id} control={<Radio />} label={data.type}
                            />
                        })}
                    </RadioGroup>
                </FormControl>
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
                                <TableHead className="table_header">
                                    <TableCell>Name</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Open Projects</TableCell>
                                    <TableCell>Total Projects</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
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
                                                    className="client_view_button"
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
                            <>
                            </>
                        )}
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default DeveloperList
