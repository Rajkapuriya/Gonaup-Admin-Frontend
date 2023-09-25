import { Button, Chip, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { requestAdmin } from '../../utils/axios-utils';
import { useMutation } from 'react-query';
import Cookie from 'js-cookie';
import DoneIcon from '@mui/icons-material/Done';
import moment from 'moment/moment';
import RectangularChip from '../RectangularChip/RectangularChip';
import { Context as ContextSnackbar } from '../../context/notificationcontext/notificationcontext'

const ProjectDetailDialog = ({ projectDetailDialogControl, handleClose }) => {
    const [projectDetail, setProjectDetail] = useState({});
    const { successSnackbar, errorSnackbar } = useContext(ContextSnackbar)?.state
    const { setSuccessSnackbar, setErrorSnackbar } = useContext(ContextSnackbar)
    const { mutate: GetDeveloperProfile } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setProjectDetail(res.data.data)
        },
        onError: (err) => {
            console.log(err)
            setErrorSnackbar({
                ...errorSnackbar, status: true, message: err.response.data.message,
            })
        }
    });
    useEffect(() => {
        GetDeveloperProfile({
            url: `/project/details?projectId=${projectDetailDialogControl.id}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }, [projectDetailDialogControl.id])
    return (
        <>
            <Dialog
                open={projectDetailDialogControl.status}
                onClose={handleClose}
                className="dialog_section"
            >
                <DialogContent className='d-flex row'>
                    <Typography variant="span">{projectDetail.title}</Typography>
                    {projectDetail.projectImageArray && projectDetail.projectImageArray.map((data) => {
                        return <img src={data} alt="" />
                    })}
                    <Typography variant="span">Duration</Typography>
                    <Typography variant="span">{moment(projectDetail.date_from).format('ll')}- {moment(projectDetail.date_to).format('ll')}</Typography>
                    <Typography variant="span">Project URL</Typography>
                    <Typography variant="span">{projectDetail.project_url}</Typography>
                    <Typography variant="span">Skills</Typography>
                    <Stack direction="row">
                        {projectDetail.skills && projectDetail.skills.map((chip) => (
                            <RectangularChip
                                color="success"
                                key={chip.id}
                                deleteIcon={<DoneIcon />}
                                label={chip.name}
                                style={{ margin: '4px' }}
                            />
                        ))}
                    </Stack>
                    <Typography variant='span'>Overview</Typography>
                    <Typography variant="span">{projectDetail.description}</Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ProjectDetailDialog