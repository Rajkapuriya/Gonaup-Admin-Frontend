import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
const DeleteSkillServiceDialog = ({ handleClose, deleteSkillServiceDialogControl, setDeleteSkillServiceDialogControl, handleDeleteSkillService }) => {
    return (
        <>
            <Dialog
                open={deleteSkillServiceDialogControl.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <DeleteRoundedIcon />
                    <Typography className="developer_main_heading" variant="span">Are You Sure you want to Delete  {deleteSkillServiceDialogControl.dialogTitle}</Typography>
                </Box>
                <DialogContent>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button"
                        onClick={handleDeleteSkillService}
                        autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteSkillServiceDialog