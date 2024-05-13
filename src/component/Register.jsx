import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import { DatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { registerSchema } from './Validator';

const defaultTheme = createTheme();

export default function Register() {

  const onSubmit = () => {
    
    let url = 'http://localhost:5000/api/user/adduser';

    axios.post(url, {
      fullname : values.fullname,
      username: values.username,
      contact : values.contact,
      email : values.email,
      password: values.password,
      role,
      doj,
    })
    .then(({ data }) => {
      console.log(data);
      alert("Account created!");
      clearForm();
    })
    .catch(err => {
      console.error(err);
      alert(`Error creating account. Please try again.`);
    });
  };

  const clearForm = () => {
    resetForm();
    setRole("");
    setDoj(new Date().toISOString().substr(0, 10));
  };

  const [role, setRole] = useState('');
  const [doj, setDoj] = useState(new Date().toISOString())

  const {values, handleSubmit, resetForm , touched, errors,getFieldProps} = useFormik({
      initialValues:{
        username : "",
        fullname : "",
        email : "",
        password: "",
        contact : "",
        },
        validationSchema : registerSchema,
        onSubmit

    }
  )

  

  return (
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  helperText = {touched.username && errors.username ? errors.username : "Enter UserName" }
                  color={touched.username && errors.username ? 'error' : "primary" }
                  id="userName"
                  label="Username"
                  autoFocus
                  {...getFieldProps("username")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  helperText = {touched.fullname && errors.fullname ? errors.fullname : "Enter Full Name" }
                  color={touched.fullname && errors.fullname ? 'error' : "primary" }
                  id="FullName"
                  label="Full Name"
                  name="Full Name"
                  autoComplete="full-name"
                  {...getFieldProps("fullname")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  helperText = {touched.email && errors.email ? errors.email : "Enter Email" }
                  color={touched.email && errors.email ? 'error' : "primary" }
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...getFieldProps("email")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  color={touched.password && errors.password ? 'error' : "primary" }
                  helperText= {touched.password && errors.password ? errors.password : "Enter Password" }
                  {...getFieldProps("password")}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm = {6}>
                <TextField
                  select
                  value = {role}
                  onChange={(e)=>{setRole(e.target.value)}}
                  required
                  fullWidth
                  name="role"
                  label="Role"
                  id="role"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm = {6}>
                <TextField
                  required
                  fullWidth
                  name="contact"
                  label="Contact"
                  id="contact"
                  color={touched.contact && errors.contact? 'error' : "primary" }
                  helperText= {touched.contact && errors.contact ? errors.contact : "Enter Contact" }
                  {...getFieldProps("contact")}
                />
              </Grid>
              <Grid item xs={12} sm = {6}>
                <DatePicker
                  label = "Date of Join"
                  
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </LocalizationProvider>
    </ThemeProvider>
    )
}
