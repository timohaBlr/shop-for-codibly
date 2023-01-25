import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {DataType} from "../../redux/reducers/items-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";


type BasicTablePropsType = {}
export const BasicTable: React.FC<BasicTablePropsType> = () => {
    const data = useSelector<AppRootStateType, DataType[]>(state => state.items.data)
    const mappedRows = data
        ? data.map((row) => (
            <TableRow
                style={{backgroundColor: `${row.color}`}}
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
            </TableRow>
        ))
        : null

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mappedRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}