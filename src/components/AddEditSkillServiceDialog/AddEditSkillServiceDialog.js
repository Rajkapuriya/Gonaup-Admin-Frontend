import { Box, Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material'
import React from 'react'

const AddEditSkillServiceDialog = ({ addEditSkillServiceDialogControl, setAddEditSkillServiceDialogControl, handleClose, handleAddUpdateSkillService }) => {
    return (
        <>
            <Dialog
                open={addEditSkillServiceDialogControl.status}
                onClose={handleClose}
            >
                <Box className="text-center">
                    <Typography className="developer_main_heading" variant="span"> {addEditSkillServiceDialogControl.dialogTitle}</Typography>
                </Box>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        label={addEditSkillServiceDialogControl.placeholder}
                        value={addEditSkillServiceDialogControl?.value}
                        onChange={(e) => {
                            setAddEditSkillServiceDialogControl({ ...addEditSkillServiceDialogControl, value: e.target.value })
                        }}
                    />
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button className="save_button"
                        onClick={handleAddUpdateSkillService}
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

export default AddEditSkillServiceDialog