import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import Cookie from 'js-cookie'
import './searchtalent.css'
import { useParams } from 'react-router-dom'
const CandidateList = ({ candidateList }) => {
    return (
        <>
            {candidateList && candidateList.map((data) => {
                return <>
                    <Box
                        className="talent_detail_section">
                        <Avatar alt="Remy Sharp" src={data.user_image_url} />
                        <Box className="d-flex row">
                            <Typography className='admin_main_heading' variant='span'>{data.first_name} {data.last_name} |  ${data?.hourly_rate}/hr</Typography>
                            <Typography className='sub_heading' variant='span'>{data.state_name},{data.country_name}</Typography>
                        </Box>
                        <Button disabled={data.invited_count === 0 ? false : true} variant="outlined" className={data.invited_count === 0 ? "common_button" : "disable_button"}>Invite to Job</Button>
                    </Box>
                    <Divider />
                </>
            })}
        </>
    )
}

export default CandidateList