import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { PROJECT } from '../../constants/projectConstant';
const UpdateContractStatusDialog = ({ updateContractStatusDialogControl, setUpdateContractStatusDialogControl, handleClose, handleUpdateContractStatus }) => {
    const handleChange = (event) => {
        setUpdateContractStatusDialogControl({ ...updateContractStatusDialogControl, contractStatus: event.target.value });
    };
    return (
        <>
            <Dialog
                open={updateContractStatusDialogControl.status}
                onClose={handleClose}
                className='dialog-width'
            >
                <Box className="text-center">
                    <Typography className="developer_main_heading" variant="span">Update Contract Status</Typography>
                </Box>
                <DialogContent>
                    <FormControl>
                        <RadioGroup
                            value={updateContractStatusDialogControl.contractStatus}
                            onChange={handleChange}
                        >
                            {PROJECT.CONTRACT_STATUS.map((data) => {
                                if (data.id > 0) {
                                    return <FormControlLabel value={data.id} control={<Radio />} label={data.type}
                                    />
                                }
                            })}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button"
                        onClick={handleUpdateContractStatus}
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

export default UpdateContractStatusDialog