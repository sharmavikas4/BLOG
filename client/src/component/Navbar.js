import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
import styles from "./Navbar.css"
export default function ButtonAppBar(props) {
    const location = useLocation();
  const navigate = useNavigate();
  const [image,setImage] = useState("");
  useEffect(()=>{
    const fetchData = async function(){
        axios.get(`${process.env.REACT_APP_SERVER_URL}`+"/success",{withCredentials: "include"}).then((res)=>{setImage(res.data.img)});
    }
    fetchData();
},[]);
  return (
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <AppBar position="static" style={{backgroundColor:"white",color:"black",fontWeight:"bolder"}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} onClick={()=>{
            navigate("/");
          }}>
            Blog.
          </Typography>
          <button className='createButton'  onClick={()=>{
            navigate("/createpost");
          }}>Create Blog<AddIcon/></button>
    <Avatar sx={{ width: 48, height: 48 }}><img onClick={()=>{
        navigate("/dashboard");
      }}src={image} alt="Profile" />
      </Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
