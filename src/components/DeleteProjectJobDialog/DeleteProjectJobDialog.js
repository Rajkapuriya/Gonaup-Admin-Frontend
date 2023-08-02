import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { PROJECT } from '../../constants/projectConstant';
const DeleteProjectJobDialog = ({ deleteProjectJobDialogControl, handleClose, setDeleteProjectJobDialogControl,
    handleDeleteProject }) => {
    return (
        <>
            <Dialog
                open={deleteProjectJobDialogControl.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <DeleteRoundedIcon />
                    <Typography className="developer_main_heading" variant="span"> Close Job</Typography>
                </Box>
                <DialogContent>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel >Reason for closing</InputLabel>
                        <Select
                            value={deleteProjectJobDialogControl.reason}
                            label="Reason for closing"
                            onChange={(e) => {
                                setDeleteProjectJobDialogControl({ ...deleteProjectJobDialogControl, reason: e.target.value })
                            }}
                        >
                            {PROJECT.REASON_FOR_CLOSING.map((data) => {
                                return <MenuItem value={data.type}>{data.type}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button"
                        onClick={handleDeleteProject}
                        autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteProjectJobDialog