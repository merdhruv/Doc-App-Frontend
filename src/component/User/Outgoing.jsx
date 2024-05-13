import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { styled } from "@mui/material/styles";
import SendIcon from '@mui/icons-material/Send';
import {Typography,Button} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

export default function Outgoing() {
    const navigate = useNavigate();
    const [documentsList, setDocumentsList] = useState([]);

    const handleView = (doc) => {
        navigate(`/PdfViewer/${doc.filename}`);
      };

  useEffect(()=>{
    axios.get("http://localhost:5000/api/file")
    .then((res)=>{
      setDocumentsList(res.data.response);
    })
  },[])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, mt:3 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Doc. Code</StyledTableCell>
            <StyledTableCell align="right">Recipent</StyledTableCell>
            <StyledTableCell align="right">File Name</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documentsList.map((row) => (
            <StyledTableRow key={row.Doc_code}>
              <StyledTableCell component="th" scope="row">
                {row.Doc_code}
              </StyledTableCell>
              <StyledTableCell align="right">{row.recipient}</StyledTableCell>
              <StyledTableCell align="right">{row.filename}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">
                    <Button variant="contained" startIcon={<SendIcon />} style={{"marginRight":"10px"}} onClick={()=>{handleView(row)}}>
                        <Typography sx={{display:{xs:'none', sm:'flex'}}}>
                            View
                        </Typography>
                    </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
  )
}
