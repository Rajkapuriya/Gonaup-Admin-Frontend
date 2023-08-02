import { Box, Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { PROJECT } from '../../constants/projectConstant';
const UpdateHiringStageDialog = ({ updateHiringStageDialogControl, setUpdateHiringStageDialogControl, handleClose, handleUpdateHiringStage }) => {
    const handleChange = (event) => {
        setUpdateHiringStageDialogControl({ ...updateHiringStageDialogControl, hiring_status: event.target.value });
    };
    return (
        <>
            <Dialog
                open={updateHiringStageDialogControl.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <Typography className="developer_main_heading" variant="span">Update Hiring Stage</Typography>
                </Box>
                <DialogContent>
                    <FormControl>
                        <RadioGroup
                            value={updateHiringStageDialogControl.hiring_status}
                            onChange={handleChange}
                        >
                            {PROJECT.HIRING_STAGE.map((data) => {
                                return <FormControlLabel value={data.id} control={<Radio />} label={data.type} />
                            })}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button"
                        onClick={handleUpdateHiringStage}
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

export default UpdateHiringStageDialog