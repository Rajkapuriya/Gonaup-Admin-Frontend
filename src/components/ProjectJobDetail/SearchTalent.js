import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import Cookie from 'js-cookie'
import './searchtalent.css'
import { Context as ContextSnackbar } from '../../context/notificationcontext/notificationcontext'
import { useParams } from 'react-router-dom'
const SearchTalent = () => {
    const { id } = useParams();
    const [searchTalent, setSearchTalent] = useState("")
    const [talentList, setTalentList] = useState([])
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate: GetProjectJobDetail } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setTalentList(res.data.data)
        },
        onError: (err) => {
            console.log(err);
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleGetProjectJobDetail = () => {
        let link = `/freelancer/search?page=1&size=10&projectId=${id}`;
        if (searchTalent && searchTalent.trim() !== '') {
            link += `&searchQuery=${searchTalent}`;
        }
        GetProjectJobDetail({
            url: link,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleGetProjectJobDetail();
    }, [searchTalent])
    const { mutate: InviteFreelancer } = useMutation(requestAdmin, {
        onSuccess: (res) => {
        },
        onError: (err) => {
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    const handleInviteFreelancer = (userId) => {
        InviteFreelancer({
            url: `/project/invite`,
            method: 'POST',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
            data: {
                projectId: parseInt(id),
                userId: userId
            }
        })
    }
    return (
        <>
            <TextField
                variant="outlined"
                label="Search"
                value={searchTalent}
                onChange={(e) => {
                    setSearchTalent(e.target.value)
                }}
            />
            {talentList?.searchList && talentList.searchList.map((data) => {
                return <>
                    <Box
                        className="talent_detail_section">
                        <Avatar alt="Remy Sharp" src={data.user_image_url} />
                        <Box className="d-flex row">
                            <Typography className='admin_main_heading' variant='span'>{data.first_name} {data.last_name} |  ${data?.hourly_rate}/hr</Typography>
                            <Typography className='sub_heading' variant='span'>{data.state_name},{data.country_name}</Typography>
                        </Box>
                        <Button onClick={() => {
                            handleInviteFreelancer(data.id)
                            debugger;
                        }} disabled={data.invited_count === 0 ? false : true} className={data.invited_count === 0 ? "common_button" : "disable_button"}>Invite to Job</Button>
                    </Box >
                    <Divider />
                </>
            })}

        </>
    )
}

export default SearchTalent