import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { requestAdmin } from '../../utils/axios-utils';
import { useLocation } from 'react-router-dom';
import AddEditSkillServiceDialog from '../AddEditSkillServiceDialog/AddEditSkillServiceDialog';
import DeleteSkillServiceDialog from '../DeleteSkillServiceDialog/DeleteSkillServiceDialog';
const SkillServiceList = () => {
    const [skillServiceList, setSkillServiceList] = useState([])
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
        },
        onError: (err) => {
            console.log(err);
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
        },
        onError: (err) => {
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
        },
        onError: (err) => {
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
                <Box>
                    <TextField value={searchValue} variant='outlined'
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                    />
                    <Button onClick={() => {
                        let dialogTitle = currentPath === "/skill-list" ? "Add Skill" : "Add Service"
                        let placeholder = currentPath === "/skill-list" ? "Enter Skill" : "Enter Service"
                        setAddEditSkillServiceDialogControl({ ...addEditSkillServiceDialogControl, status: true, dialogTitle: dialogTitle, placeholder: placeholder, type: "add" })
                    }} variant="outlined">Add</Button>
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
                    })
                    }
                </Box>
            </Box>
            <AddEditSkillServiceDialog addEditSkillServiceDialogControl={addEditSkillServiceDialogControl} setAddEditSkillServiceDialogControl={setAddEditSkillServiceDialogControl} handleClose={handleClose} handleAddUpdateSkillService={handleAddUpdateSkillService} />
            <DeleteSkillServiceDialog deleteSkillServiceDialogControl={deleteSkillServiceDialogControl} setDeleteSkillServiceDialogControl={setDeleteSkillServiceDialogControl} handleClose={handleClose} handleDeleteSkillService={handleDeleteSkillService} />
        </Box >
    )
}

export default SkillServiceList