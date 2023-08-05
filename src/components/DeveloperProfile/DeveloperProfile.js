import { Avatar, Box, Button, Chip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './index.css'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { request, requestAdmin } from '../../utils/axios-utils';
import DoneIcon from '@mui/icons-material/Done';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import ProjectDetailDialog from '../ProjectDetailDialog/ProjectDetailDialog';
const DeveloperProfile = () => {
    const { id } = useParams();
    const [developerDetail, setDeveloperDetail] = useState({})
    const [freelancerJobList, setFreelancerJobList] = useState([])
    const [projectDetailDialogControl, setProjectDetailDialogControl] = useState({
        status: false,
    })
    const { mutate: GetDeveloperProfile } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setDeveloperDetail(res.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetDeveloperProfile({
            url: `/freelancer/profile?userId=${id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    const handleClose = () => {
        setProjectDetailDialogControl({ ...projectDetailDialogControl, status: false })
    }
    const { mutate: GetFreelancerJobList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setFreelancerJobList(res.data.data.data)
        },
        onError: (err) => {
            console.log(err);
        }
    });
    useEffect(() => {
        GetFreelancerJobList({
            url: `/freelancer/job-list?userId=${id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [])
    return (
        <>
            <Box className="developer_profile_main_section">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">{
                            developerDetail.professional_role}</Typography>
                        <Box>
                            <Typography className='developer_main_heading' variant="span"> ${developerDetail.hourly_rate}/hr
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography>{developerDetail?.description}</Typography>
            </Box>
            <Box className="d-flex column">
                <Box>
                    <Box className="developer_profile_main_section">
                        <Box className="developer_title_desc">
                            <Box className="d-flex column">
                                <Typography className="developer_main_heading" variant="span">Skills and Expertise</Typography>
                            </Box>
                            <Box>
                                {developerDetail.skills && developerDetail.skills.map((chip) => (
                                    <Chip
                                        variant="outlined"
                                        color="success"
                                        key={chip.id}
                                        deleteIcon={<DoneIcon />}
                                        label={chip.name}
                                        style={{ margin: '4px' }}
                                    />
                                ))}
                                {developerDetail.services_offer && developerDetail.services_offer.map((chip) => (
                                    <Chip
                                        variant="outlined"
                                        color="success"
                                        key={chip.id}
                                        deleteIcon={<DoneIcon />}
                                        label={chip.name}
                                        style={{ margin: '4px' }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box >
                    <Box className="developer_profile_main_section ">
                        <Box className="developer_title_desc">
                            <Box className="d-flex column">
                                <Typography className="developer_main_heading" variant="span">Portfolio Link</Typography>
                            </Box>
                            <Box className="w-100 d-flex row justify-content-between">
                                <Box className="w-50">
                                    <Typography className="sub_heading">Freelancer</Typography>
                                    <Typography>{developerDetail.freelance_profile}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">Linkedin</Typography>
                                    <Typography>{developerDetail.linkdin_profile}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">Github</Typography>
                                    <Typography>{developerDetail.github_profile}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box >
                    <Box className="developer_profile_main_section ">
                        <Box className="developer_title_desc">
                            <Box className="d-flex column">
                                <Typography className="developer_main_heading" variant="span">Contact</Typography>
                            </Box>
                            <Box className="w-100 d-flex row justify-content-between">
                                <Box className="w-50">
                                    <Typography className="sub_heading">Phone</Typography>
                                    <Typography>{developerDetail.contact_number}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">Skype</Typography>
                                    <Typography>{developerDetail.skype_id}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">Country</Typography>
                                    <Typography>{developerDetail.country_name}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">City</Typography>
                                    <Typography>{developerDetail.city_name}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">State</Typography>
                                    <Typography>{developerDetail.state_name}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">Zip/Postal Code</Typography>
                                    <Typography>{developerDetail.zip_code}</Typography>
                                </Box>
                                <Box className="w-50">
                                    <Typography className="sub_heading">Address</Typography>
                                    <Typography>{developerDetail.address}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box className="developer_profile_main_section">
                        <Box className="developer_title_desc">
                            <Box className="d-flex column justify-content-between">
                                <Typography className="developer_main_heading" variant="span">Recent Jobs</Typography>
                            </Box>
                            {freelancerJobList && freelancerJobList.map((data) => {
                                return <Box>
                                    <Box className="experience_detail">
                                        <Box className="d-flex row">
                                            <Typography className="h5" variant='span'>{data.title} </Typography>
                                            <Typography className='sub_heading' variant='span'>Hired On-{moment(data.hired_at).format('L')} | ${data.final_rate}/hr</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            })}
                        </Box>
                    </Box >
                </Box>
            </Box>

            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Education</Typography>
                    </Box>
                    <Box className="d-flex column justify-content-between mt-2">
                        {developerDetail.education &&
                            developerDetail.education.map((data) => {
                                return <Box className="developer_education_box">
                                    <Box className="d-flex row">
                                        <Box className="d-flex column">
                                            <Typography className="developer_main_heading" variant="span">{data.school}</Typography>
                                        </Box>
                                        <Typography variant="span">{data.degree}/</Typography>
                                        <Typography className='sub_heading' variant="span">{data.date_from} - {data.date_to}</Typography>
                                    </Box>
                                </Box>
                            })
                        }
                    </Box>
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Experience </Typography>
                    </Box>
                    {developerDetail.experience && developerDetail.experience.map((data) => {
                        return <Box>
                            <Box className="experience_detail">
                                <Box className="d-flex row">
                                    <Typography className="h5" variant='span'>{data.title}| {data.company}</Typography>
                                    <Typography className='sub_heading' variant='span'>{data.working_from} - {data.working_to}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    })}
                </Box>
            </Box >
            <Box className="developer_profile_main_section ">
                <Box className="developer_title_desc">
                    <Box className="d-flex column">
                        <Typography className="developer_main_heading" variant="span">Portfolio </Typography>
                    </Box>
                    <Box className="d-flex row justify-content-between">
                        {developerDetail.projects && developerDetail.projects.map((data) => {
                            return <Card className="d-flex row" sx={{ maxWidth: "33%" }}>
                                <img onClick={() => {
                                    setProjectDetailDialogControl({ ...projectDetailDialogControl, status: true, id: data.id })
                                }}
                                    src={data.project_image_url}
                                />
                                <Box className="d-flex">
                                    <Typography className="developer_main_heading m-2" variant="span">
                                        {data.title}
                                    </Typography>
                                </Box>
                            </Card>
                        })}
                    </Box>
                </Box>
                <ProjectDetailDialog projectDetailDialogControl={projectDetailDialogControl} handleClose={handleClose} />
            </Box >
        </>
    )
}

export default DeveloperProfile