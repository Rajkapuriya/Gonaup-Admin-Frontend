import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
// import './index.css'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useMutation } from 'react-query'
import { requestAdmin } from '../../utils/axios-utils'
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
                <Box>
                    <TextField variant='outlined' />
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
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Country</TableCell>
                                        <TableCell>Open Projects</TableCell>
                                        <TableCell>Total Projects</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
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
