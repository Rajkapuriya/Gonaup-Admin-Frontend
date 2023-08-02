import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
const UpdateCommissionDialog = ({ updateCommissionDialogControl, setUpdateComissionDialogControl, handleClose, handleUpdateCommission }) => {
    return (
        <>
            <Dialog
                open={updateCommissionDialogControl.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <Typography className="developer_main_heading" variant="span">Update Commission</Typography>
                </Box>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Enter Commission"
                        value={updateCommissionDialogControl?.commission}
                        onChange={(e) => {
                            setUpdateComissionDialogControl({ ...updateCommissionDialogControl, commission: e.target.value })
                        }}
                    />
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button"
                        onClick={handleUpdateCommission}
                        autoFocus>
                        Save
                    </Button>
                    <Button className="save_button"
                        onClick={handleClose}
                        autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateCommissionDialog