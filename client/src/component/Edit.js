import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card } from "@mui/material";
import styles from "./Edit.css";
import ButtonAppBar from "./Navbar";
function Edit() {
    const {state} = useLocation();
    const [post,setPost] = useState({
        title: state.title,
        content: state.content,
        image:"",
    });
    console.log(state);
    const [file,setFile] = useState(null);
    const navigate = useNavigate();
    function change(event){
        const {name,value} = event.target;
        if (name==="image"){
            setFile(event.target.files[0]);
        }
    setPost((prevValue)=>{
      return name==="title"?{...prevValue,title:value}:(name==="image"?{...prevValue,image: value}:{...prevValue,content: value});
    })
    }
    function del(pid,id){
      axios.post(`${process.env.REACT_APP_SERVER_URL}`+"/del",{pid: pid,id: id,...post},{withCredentials: true}).then((res)=>{console.log(res)});
    }
    function ed(pid,id){
      axios.post(`${process.env.REACT_APP_SERVER_URL}`+"/edit",{pid: pid,id: id,title: post.title,content: post.content,image: file},{headers:{
        'Content-Type': 'multipart/form-data'
      },withCredentials: true}).then((res)=>{console.log(res)})
    }
  return (
    <>
    <ButtonAppBar></ButtonAppBar>
    <div className="edit">
    <Card>
    <form onSubmit={((event)=>{
      event.preventDefault();
      ed(state.pid,state.id);
      navigate("/dashboard");
    })}action={`${process.env.REACT_APP_SERVER_URL}`+"/edit"} method="Post"encType="multipart/form-data">
    <h1>Edit</h1>
    <input type="text" name="title" onChange={change} value={post.title}></input>
    <textarea rows="8" column="50" name="content" onChange={change} value={post.content}></textarea>
    <label className="label">Select a new image if you want to change image</label>
    <input type="file" onChange={change} name="image" value={post.image} class="file"></input>
    <div>
    <DeleteIcon onClick={()=>{del(state.pid,state.id); navigate("/dashboard")}} fontSize="large"></DeleteIcon>
    <button type="submit" className="ed"><EditIcon fontSize="large"></EditIcon></button>
    </div>
    </form>
    </Card>
    </div>
    </>
  )
}
export default Edit;