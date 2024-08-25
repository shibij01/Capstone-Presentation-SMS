import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginBanner from "../src/images/LoginBanner.jpg"
import AdminContext from "../src/context/AdminContext";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react"


export default function Login() {
  //use Navigate
  const navigate = useNavigate();
  const adminContext = useContext(AdminContext);
  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    //grab values for login 
    const username = e.target.username.value;
    const password = e.target.password.value;

    //form payload for login user endpoint
    const body = {
        username: username,
        password: password
    }

    //call loginUser post api
    const response = await fetch("http://localhost:3000/cakedByKim/loginAdmin", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': "application/json"
        }
    });

    const data = await response.json();

    //if logged in, set token in local storage, update token
    if (data.loggedIn) {
        sessionStorage.setItem("token", data.token);
        adminContext.logIn({token: data.token, adminId: data.adminId, username: data.username, loggedIn: true});        
        navigate("/services");
    } 

  }

  return (
        <>
        <Box
            sx={{
                width: '100%',
                height: '250px',
                overflow: "hidden",
                my: '16px',
                backgroundImage: `url(${LoginBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 5
            }}
        > 
        <Typography variant="h2" color="primary" ml={8}>Admin Login</Typography>
        </Box>
        <Container>
          <Paper elevation={10} sx={{maxwidth: 250, m: "auto", p:2}} >
          
          <form id="loginForm" onSubmit={handleSubmit}>
          <FormGroup sx={{width: "auto", alignContent: "center" }}>

          <OutlinedInput sx={{m:1}} label="Username" id="username" placeholder="Username" required/>
          <OutlinedInput sx={{m:1}} label="Password" id="password" placeholder="Password" 
            type={showPassword ? 'text' : 'password'}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {showPassword ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              </InputAdornment>
            }
            />
          <FormGroup sx={{display: "inline-block"}}>
            <Button variant="contained" color="secondary" sx={{width: 100, height: 50, m:1, float: "left"}} id="reset" placeholder="Reset" type="reset" >Reset</Button>
            <Button variant="contained" color="secondary" sx={{width: 100, height: 50, m:1, float: "right"}} id="login" placeholder="Login" type="submit">Login</Button>
          </FormGroup>
          </FormGroup>
          </form>
          </Paper>
        </Container>
        </>
  )
}
