import React, { useState,useEffect } from "react";
import Modal from "react-modal";
import "./login.css";
import {useFormik} from 'formik';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {

  Box,
  Button,
  Avatar,
  AppBar,
  Typography,
  CssBaseline,
  Toolbar,
  TextField,
  MenuItem,
  Grid,
  Container,
  Alert
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { loginSchema } from "./Validator";

const roles = [
  { value: "user", text: "User" },
  { value: "admin", text: "Admin" },
];
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
  },
};
Modal.setAppElement("#root");

export default function Login({ setToken }) {

 

  async function loginUser(credentials) {
    const url = "http://localhost:5000/api/user/login";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  const onSubmit = async () => {
    const token = await loginUser({
      email : values.email,
      password : values.password,
      role,
    });
    setToken(token);
    if (token.message === "Success User") {
      window.location.href = "/user";
    } else if (token.message === "Success Admin") {
      window.location.href = "/admin";
    }
    else if(token.message === 'Password does not matched!'){
      alert('Incorrect Password');
    }
    console.log(token.message);
  };
  const handleRegister = async () => {
    setToken({
      message: "register",
      token: "lkadshfhjasdkbjfhj",
    });
    window.location.href = "/register";
  };

  const handleLogin = ()=>{
    sessionStorage.clear();
    setModalIsOpen(true);
  }


  const {values, handleSubmit, isValid, isSubmitting, touched, errors,getFieldProps}  = useFormik({
    initialValues:{
        email:"",
        password:""
    },
    validationSchema : loginSchema,
    onSubmit

    })
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const [role, setRole] = useState(roles[0].value);

  return (
    <>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar variant="regular" align="center">
          <Grid container>
            <Grid item >

            <Avatar
              src="https://images-workbench.99static.com/alRM7OHaLHbw-HDzd4AS1YnD8CU=/http://s3.amazonaws.com/projects-files/18/1847/184768/da7b63f4-dac3-557b-2589-4412be10ab47.png"
              alt="Document Tracker Logo"
            />
            </Grid>
            <Grid item sm={10} xs= {0}>
              <Typography variant="h6">Document Tracking System</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style = {customStyles}
      >
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container>
            <Grid item xs={11}>

            </Grid>
            <Grid item xs = {1}>

              <Button 
                  color = 'error'
                  onClick={() => setModalIsOpen(false)}>
                    <CancelIcon />
                  </Button>
              </Grid>
          </Grid>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12} >
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
              <Grid item xs={12} >
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
              <Grid item xs={12} >
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

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              New User?{" "}
              <Button
                
                size="large"
                onClick={
                  handleRegister
                }
                style={{ width: "50%" }}
              >
                Register
              </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Modal>

      {/* ---------------------------------------------------------------------------------------------- */}
      <div className="details_container bg-white rounded shadow overflow-hidden">
        <h2>About Project</h2>
        <p>
          The Document Tracking System (DTS) app is designed to streamline and
          enhance the management of documents within an organization. It offers
          a centralized platform for tracking, organizing, and accessing various
          types of documents, improving efficiency, accountability, and
          compliance.
        </p>
      </div>

      {/* Responsive Cards */}

      <div className="container">
        <Grid container spacing = {2}> 
          <Grid item xs = {4}>
            <div className="responsive_cards card">
              
                <img
                  src="https://w7.pngwing.com/pngs/576/642/png-transparent-data-analysis-analytics-management-big-data-data-processing-business-template-text-people-thumbnail.png"
                  alt="Card 1"
                  className="card-image"
                />
              
              <div className="card-statement">
                <p>Searching the Documents</p>
              </div>
            </div>
          </Grid>
          <Grid item xs = {4}>
            <div className="responsive_cards card">
              
                <img
                  src="https://w7.pngwing.com/pngs/477/619/png-transparent-man-sitting-in-front-of-computer-monitors-network-operations-center-network-monitoring-management-information-security-operations-center-business-analyst-computer-network-service-people-thumbnail.png"
                  alt="Card 2"
                  className="card-image"
                />
              
              <div className="card-statement">
                <p>Managing the Documents</p>
              </div>
            </div>
          </Grid>
          <Grid item xs = {4}>
            <div className="responsive_cards card">
              
                <img
                  src="https://w7.pngwing.com/pngs/653/323/png-transparent-customer-relationship-management-business-customer-service-rent-miscellaneous-angle-text-thumbnail.png"
                  alt="Card 3"
                  className="card-image"
                />
              
              <div className="card-statement">
                <p>B2C Relations</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      
      {/* Footer */}
        {/* Footer content */}
        <div className="footer">
          <div className="container-custom">
            <div className="footer-content-wrap">
              <div className="footer-left-block">
                <div className="footer-acknowledgement">
                  {/* <img
                      src="https://scontent.fblr22-2.fna.fbcdn.net/v/t39.30808-6/342022383_889796985425626_4868738027538509982_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=rcVR7DWzTmYAX--GebK&_nc_ht=scontent.fblr22-2.fna&oh=00_AfBBrbSvWxNw5YR6WVYx96zS9d5Rjk-s0bKZG5PSTaG11Q&oe=65D2B2A5"
                      loading="lazy"
                      alt="InCheq logo"
                      height="20"
                      className="footer-logo"
                    /> */}
                  <p className="footer-logo-text">DOCUMENT TRACKING SYSTEM</p>

                  <div className="body-small">
                    Our Document Tracking System provides a seamless solution
                    for managing your documents efficiently. Designed with
                    user-friendliness and reliability in mind, our system allows
                    you to keep track of your documents with ease. Whether it's
                    tracking document workflows, ensuring compliance, or
                    streamlining document access, our platform offers the tools
                    you need to stay organized and productive. Built with
                    passion and commitment, we strive to be your trusted partner
                    in document management. For inquiries or support, please
                    contact us at [Your Contact Information]. Powered by
                    cutting-edge technology, our system is continuously evolving
                    to meet your evolving needs.
                  </div>
                </div>
              </div>
              <div className="footer-right-block">
                <div className="footer-social">
                  <div
                    className="footer-icons-wrap"
                    style={{ display: "flex" }}
                  >
                    <img
                      src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac703f4433e644d297d_icon-social-facebook.svg"
                      loading="lazy"
                      alt="facebook icon"
                      className="social-icon"
                    />
                    <div className="bg-btn-animate is-social"></div>

                    <img
                      src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac73d90a44d405c1067_icon-social-twitter.svg"
                      loading="lazy"
                      alt="twitter icon"
                      className="social-icon"
                    />
                    <div className="bg-btn-animate is-social"></div>

                    <img
                      src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac78d8367ec0922c640_icon-social-instagram.svg"
                      loading="lazy"
                      alt="t"
                      className="social-icon"
                    />
                    <div className="bg-btn-animate is-social"></div>

                    <img
                      src="https://assets-global.website-files.com/6411205aa4059e3917a059f4/6423cac7889b6aa4dfc8bf31_icon-social-linkedin.svg"
                      loading="lazy"
                      alt="linkedin icon"
                      className="social-icon"
                    />
                    <div className="bg-btn-animate is-social"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="copyright-right">
                <div className="body-xs">© 2023 CDAC. All Rights Reserved</div>
              </div>
            </div>
          </div>
        </div>
        <div className="cursor">
          <div
            data-w-id="9f54bfc6-d3fa-a651-f09d-f4c94a566b55"
            className="cursor-dot"
          >
            <div className="cursor-dot-small"></div>
          </div>
          <div className="w-embed">
            <style></style>
          </div>
        </div>
    </>
  );
}
