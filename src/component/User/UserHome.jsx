import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Card, Grid, Typography,Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
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
  
 
  
  

export default function UserHome() {
    const navigate = useNavigate();

    const [documentsList, setDocumentsList] = useState([]);

    const fetchData = ()=>{
        axios.get("http://localhost:5000/api/file")
        .then((documents)=>{
          setDocumentsList(documents.data.response);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
      }
      const handleRefresh = ()=>{
        fetchData();
      }
      
      useEffect(()=>{
        fetchData();
      },[])
      const handleDelete = (doc)=>{
  
        axios.post("http://localhost:5000/api/file/delete", {Doc_code:doc._id})
        .then(res=>{
          console.log(res.data.message);
          alert("file deleted")
          handleRefresh();
        })
        .catch((err)=>{
        console.log('error', err)
      })
    }
    const handleCompose = ()=>{
        navigate('/user/compose');
      }
      const handleView = (doc) => {
        navigate(`/PdfViewer/${doc.filename}`);
      };
  return (
    <ThemeProvider theme={createTheme()}>
        <CssBaseline>
            <Grid container spacing={3} sx={{ backgroundColor: 'gray', color: 'white', p: 2, mt:2  }} >
                <Grid item xs={12} sm={3}>
                    <Card sx = {{p : 6 ,backgroundColor : '#add8e6', height: '220px'}}>
                        <Typography variant='h4'>
                            Incoming Document
                        </Typography> 
                        <Typography variant='h4'sx={{pl:7, pt:2}} >{documentsList.length}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx = {{p:6,backgroundColor : '#ffff94', height: '220px' }}>
                        <Typography variant='h4'>
                            Pending Document
                        </Typography>
                        <Typography variant='h4'sx={{pl:7, pt:2}} >3</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx = {{p:6,backgroundColor : '#7aeb7a', height: '220px' }} > 
                    <Typography variant='h4'>
                            Received Document
                        </Typography>
                        <Typography variant='h4'sx={{pl:7, pt:2}} >2</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx = {{p:6, backgroundColor : '#ff4d4d', height: '220px' }} > 
                    <Typography variant='h4'>
                            Ended Document
                    </Typography>
                        <Typography variant='h4'sx={{pl:7, pt:2}} >1</Typography>
                    </Card>
                </Grid>

            </Grid>
            
            <Button variant='contained' onClick={handleCompose} sx={{ display: 'block', margin: 'auto' ,mt:2}}>
                Compose 
            </Button>
              

        {/* Table */}

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, mt:3 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Doc. Code</StyledTableCell>
            <StyledTableCell align="right">Sender</StyledTableCell>
            <StyledTableCell align="right">Recipent</StyledTableCell>
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
              <StyledTableCell align="right">{row.sender}</StyledTableCell>
              <StyledTableCell align="right">{row.recipient}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">
                    <Button variant="contained" startIcon={<SendIcon />} style={{"marginRight":"10px"}} onClick={()=>{handleView(row)}}>
                        <Typography sx={{display:{xs:'none', sm:'flex'}}}>
                            View
                        </Typography>
                    </Button>
                    <Button variant="outlined" color='error' startIcon={<DeleteIcon />}onClick={()=>{handleDelete(row)}}>
                        <Typography sx={{display: { xs: "none", md: "flex" },}}>
                            Delete
                        </Typography>
                    </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </CssBaseline>
    </ThemeProvider>
  )
}
