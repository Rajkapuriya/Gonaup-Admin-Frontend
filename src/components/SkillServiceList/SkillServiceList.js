import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { requestAdmin } from '../../utils/axios-utils';
const SkillServiceList = () => {
    const [skillServiceList, setSkillServiceList] = useState([])
    const { mutate: GetSkillServiceList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setSkillServiceList(res.data.data.skillList)
            debugger
        },
        onError: (err) => {
            console.log(err);
        }
    });
    const handleGetSkillServiceList = () => {
        GetSkillServiceList({
            url: `/skill/list`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetSkillServiceList();
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
                    {skillServiceList.map((data) => {
                        return <Box className='skill_service_detail'>
                            <Typography className='admin_main_heading' variant='span'> {data.name}</Typography>
                            <ModeEditIcon className="circular_icon" />
                            <DeleteOutlineRoundedIcon className="circular_icon" />
                        </Box>
                    })
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default SkillServiceList