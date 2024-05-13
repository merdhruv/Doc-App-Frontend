import React ,{useState}from "react";
import { Link } from "react-router-dom";
import {  createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const defaultTheme = createTheme();

export default function UserNavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    window.location.href = '/user';
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOutgoing = ()=>{
    window.location.href = '/user/outgoing';
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Avatar src="https://images-workbench.99static.com/alRM7OHaLHbw-HDzd4AS1YnD8CU=/http://s3.amazonaws.com/projects-files/18/1847/184768/da7b63f4-dac3-557b-2589-4412be10ab47.png" />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  m: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Document Tracking App
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                    <MenuItem  onClick={handleCloseNavMenu}>
                      <Link to = '/user'>Incoming</Link>
                    </MenuItem>
                    <MenuItem  onClick={handleCloseNavMenu}>
                      <Link to = '/user/outgoing'>Outgoing</Link>
                    </MenuItem>

                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Incoming
                  </Button>
                  <Button
                    onClick={handleOutgoing}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Outgoing
                  </Button>

              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                    <MenuItem >
                      <Link className="dropdown-item" to="/user" >
                        DashBoard
                      </Link>
                    </MenuItem>
                    <MenuItem  >
                      <Link className="dropdown-item" to="/user/outgoing" >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem  onClick={()=>{
                      sessionStorage.clear();
                      window.location.href = '/';
                    }}>
                      <Button>
                        Logout
                      </Button>
                    </MenuItem>
                  
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </CssBaseline>
    </ThemeProvider>
  );
}
