import React, { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, InputBase, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
// import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment'
const ClientRecruiterList = ({ user_type }) => {
    const navigate = useNavigate()
    const [clientRecruiterList, setClientRecruiterList] = useState([]);
    const { mutate: GetClientRecruiterList } = useMutation(requestAdmin, {
        onSuccess: (res) => {
            setClientRecruiterList(res.data.data.data)
        },
        onError: (err) => {
            console.log(err);
            setClientRecruiterList([])

        }
    });
    const handleClientRecruiterList = () => {
        GetClientRecruiterList({
            url: `/client/list?page=1&size=10&type=${user_type}`,
            method: 'get',
            headers: {
                Authorization: `${Cookie.get('userToken')}`,
            },
        })
    }
    useEffect(() => {
        handleClientRecruiterList();
    }, [user_type])
    return (
        <Box className="main_tab_section">
            <Box className="tab_header">
                <Typography variant="span">Overview</Typography>
                <Box className="d-flex column align-items-center">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Deleted Accounts" />
                    </FormGroup>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, boxShadow: "none" }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search ' }}
                        />
                        <Divider orientation="vertical" flexItem />
                        {/* <IconButton color="success" sx={{ p: '10px' }} aria-label="directions"> */}
                        <SearchIcon />
                        {/* </IconButton> */}
                    </Paper>
                </Box>
            </Box>
            <Box className="below_main_tab_section">
                <Box className="inner_container">
                    <TableContainer
                        className="orders_table_height set_box_shadow"
                        component={Paper}
                    >
                        {clientRecruiterList.length > 0 ? (
                            <Table
                                className="customer_list_table"
                                stickyHeader
                            >
                                <TableHead className="table_header">
                                    <TableCell>Name</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Open Projects</TableCell>
                                    <TableCell>Total Projects</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableHead>
                                <TableBody>
                                    {clientRecruiterList.map((row, index) => (
                                        <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell>{row.first_name ?? '-'} {row.last_name ?? '-'}</TableCell>
                                            <TableCell>{row.country_name ?? '-'}</TableCell>
                                            <TableCell>{row.openProjects ?? '-'}</TableCell>
                                            <TableCell>
                                                {row.totalProjects ?? '-'}
                                            </TableCell>
                                            <TableCell className="customers_list_page_buttons">
                                                <Button
                                                    className="client_view_button "
                                                    onClick={() => {
                                                        navigate(`/client-profile/${row.userId}`)
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <></>
                        )}
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}

export default ClientRecruiterList
