import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
// import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
const drawerWidth = 350
const ProjectsList = () => {
    const navigate = useNavigate()
    const [projectList, setProjectList] = useState([]);
    const { mutate: GetProjectList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setProjectList(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetClientDetail = () => {
        GetProjectList({
            url: `/project/list?page=1&size=10&projectType=1`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetClientDetail();
    }, [])
    return (
        <Box className="main_tab_section">
            <Box className="tab_header">
                <Typography variant="span">Overview</Typography>
                <Box>
                    <TextField variant='outlined' />
                    <Button variant='outlined'></Button>
                </Box>
            </Box>
            <Box className="below_main_tab_section">
                <Box className="inner_container">
                    {projectList && projectList.map((data) => {
                        <>
                            {data.title}
                            {data.description}
                        </>
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default ProjectsList
