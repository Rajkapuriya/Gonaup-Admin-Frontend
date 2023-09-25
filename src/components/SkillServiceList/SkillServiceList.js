import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { InputBase, Paper } from '@mui/material'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { requestAdmin } from '../../utils/axios-utils';
import { useLocation } from 'react-router-dom';
import AddEditSkillServiceDialog from '../AddEditSkillServiceDialog/AddEditSkillServiceDialog';
import DeleteSkillServiceDialog from '../DeleteSkillServiceDialog/DeleteSkillServiceDialog';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Context as ContextSnackbar } from '../../context/notificationcontext/notificationcontext'
const SkillServiceList = () => {
    const [skillServiceList, setSkillServiceList] = useState([])
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const [addEditSkillServiceDialogControl, setAddEditSkillServiceDialogControl] = useState(
        {
            status: false,
            dialogTitle: "",
            placeholder: "",
            value: "",
            id: "",
            type: ""
        }
    );
    const [deleteSkillServiceDialogControl, setDeleteSkillServiceDialogControl] = useState(
        {
            status: false,
            id: "",
            dialogTitle: ""
        }
    );
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();
    const currentPath = location.pathname;
    const { mutate: GetSkillServiceList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setSkillServiceList(currentPath === "/skill-list" ? res.data.data.skillList : res.data.data.serviceList)
            setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.data.message,
            })
        },
        onError: (err) => {
            console.log(err);
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleGetSkillServiceList = () => {
        let url = currentPath === "/skill-list" ? `/skill/list?page=1&size=10` : "/service/list?page=1&size=10"
        if (searchValue !== "" && searchValue) {
            url += `&searchQuery=${searchValue}`
        }
        GetSkillServiceList({
            url: url,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    const handleClose = () => {
        setAddEditSkillServiceDialogControl({
            ...addEditSkillServiceDialogControl, status: false
        })
        setDeleteSkillServiceDialogControl({ ...deleteSkillServiceDialogControl, status: false })
    }
    const { mutate: AddUpdateSkillService } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setAddEditSkillServiceDialogControl({
                ...addEditSkillServiceDialogControl, status: false, dialogTitle: "",
                placeholder: "",
                value: "",
                id: "",
                type: ""
            })
            setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.data.message,
            })
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleAddUpdateSkillService = () => {
        let data = {
            name: addEditSkillServiceDialogControl.value,
        }
        if (currentPath === "/skill-list" && addEditSkillServiceDialogControl?.type === "edit") {
            data["skillId"] = addEditSkillServiceDialogControl.id
        }
        else if (currentPath === "/service-list" && addEditSkillServiceDialogControl?.type === "edit") {
            data["serviceId"] = addEditSkillServiceDialogControl.id
        }
        AddUpdateSkillService({
            url: currentPath === "/skill-list" ? `/skill` : `/service`,
            method: addEditSkillServiceDialogControl?.type === "add" ? "post" : 'put',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: data
        })
    }
    const { mutate: DeleteSkillService } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setDeleteSkillServiceDialogControl({ ...deleteSkillServiceDialogControl, status: false, id: "" })
            setSuccessSnackbar({
                ...successSnackbar,
                status: true,
                message: res.data.message,
            })
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleDeleteSkillService = () => {
        let data = {}
        if (currentPath === "/skill-list") {
            data["skillId"] = deleteSkillServiceDialogControl.id
        }
        else if (currentPath === "/service-list") {
            data["serviceId"] = deleteSkillServiceDialogControl.id
        }
        DeleteSkillService({
            url: currentPath === "/skill-list" ? `/skill` : `/service`,
            method: "delete",
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: data
        })
    }
    useEffect(() => {
        handleGetSkillServiceList();
    }, [currentPath, searchValue])
    return (
        <Box className="main_tab_section">
            <Box className="tab_header">
                <Typography variant="span">Overview</Typography>
                <Box className="tab_header_right_box">
                    <Box className="tab_header_right_item">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, boxShadow: "none" }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search ' }}
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                }}
                            />
                            <Divider orientation="vertical" flexItem />
                            {/* <IconButton color="success" sx={{ p: '10px' }} aria-label="directions"> */}
                            <SearchIcon />
                            {/* </IconButton> */}
                        </Paper>
                    </Box>
                    <Box className="tab_header_right_item">
                        <Button onClick={() => {
                            let dialogTitle = currentPath === "/skill-list" ? "Add Skill" : "Add Service"
                            let placeholder = currentPath === "/skill-list" ? "Enter Skill" : "Enter Service"
                            setAddEditSkillServiceDialogControl({ ...addEditSkillServiceDialogControl, status: true, dialogTitle: dialogTitle, placeholder: placeholder, type: "add" })
                        }} className='common_header_button'><AddRoundedIcon /> Add</Button>
                    </Box>
                </Box>
            </Box>
            <Box className="below_main_tab_section">
                <Box className="inner_container">
                    {skillServiceList.map((data) => {
                        return <Box className='skill_service_detail'>
                            <Typography className='admin_main_heading' variant='span'> {data.name}</Typography>
                            <ModeEditIcon onClick={() => {
                                let dialogTitle = currentPath === "/skill-list" ? "Edit Skill" : "Edit Service"
                                let placeholder = currentPath === "/skill-list" ? "Enter Skill" : "Enter Service"
                                setAddEditSkillServiceDialogControl({ ...addEditSkillServiceDialogControl, status: true, dialogTitle: dialogTitle, value: data.name, id: data.id, placeholder: placeholder, type: "edit" })
                            }} className="circular_icon" />
                            <DeleteOutlineRoundedIcon
                                onClick={() => {
                                    let dialogTitle = currentPath === "/skill-list" ? "Skill" : "Service"
                                    setDeleteSkillServiceDialogControl({ ...deleteSkillServiceDialogControl, status: true, id: data.id, dialogTitle: dialogTitle })
                                }}
                                className="circular_icon" />
                        </Box>
                    })}
                </Box>
            </Box>
            <AddEditSkillServiceDialog addEditSkillServiceDialogControl={addEditSkillServiceDialogControl} setAddEditSkillServiceDialogControl={setAddEditSkillServiceDialogControl} handleClose={handleClose} handleAddUpdateSkillService={handleAddUpdateSkillService} />
            <DeleteSkillServiceDialog deleteSkillServiceDialogControl={deleteSkillServiceDialogControl} setDeleteSkillServiceDialogControl={setDeleteSkillServiceDialogControl} handleClose={handleClose} handleDeleteSkillService={handleDeleteSkillService} />
        </Box >
    )
}

export default SkillServiceList