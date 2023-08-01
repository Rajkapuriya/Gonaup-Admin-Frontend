import React, { useEffect, useState } from 'react'
import { Box, Button, Chip, Divider, Stack, TextField, Typography } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import moment from 'moment'
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
                    <Box className="project_list_section">
                        {projectList && projectList.map((data) => {
                            return <Box className="project_detail" onClick={() => {
                                navigate(`/projectjobdetail/${data.id}`)
                            }}>
                                <Box className="project_title d-flex justify-content-between">
                                    <Box className="d-flex row">
                                        <Typography variant="span">{data.title}</Typography>
                                        <Typography className="project__created_date" variant="span">{moment(data.created_at).format('ll')}</Typography>
                                    </Box>
                                    <Typography variant="span">${data.min_hourly_budget}-{data.max_hourly_budget}/hr</Typography>
                                </Box>
                                <Typography variant="span">{data.description}</Typography>
                                {data.skills.split(',').map((data) => {
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
                                            />
                                            <Chip
                                                label={`Interested: ${data.interested
                                                    }`}
                                                color="secondary"
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
                                                label="Contract Open"
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
