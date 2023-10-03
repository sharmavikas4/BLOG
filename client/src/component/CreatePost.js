import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.js";
import styles from "./CreatePost.css";
import { Box } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
function CreatePost(props) {
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <Box sx={{ flexGrow: 1 }}>
    <form onSubmit={((event)=>{
      event.preventDefault();
      props.click(props.post);
      navigate("/");
    })}action={`${process.env.REACT_APP_SERVER_URL}`+"/success"} method="Post"encType="multipart/form-data">
        <h1>Create Post <CreateIcon fontSize="large"/></h1>
        <input onChange={props.change} type="text" name="title" placeholder="Enter your title" value={props.post.title} ></input>
        <textarea onChange={props.change} name="content" placeholder="Enter your blog post content" rows="8" column="50" value={props.post.content}></textarea>
        <input id="file" onChange={props.change} type="file" name="image" placeholder="Enter your image" value={props.post.image}/>
        <button className="create" type="submit">Create</button>
    </form>
    </Box>
    </>
  )
}
export default CreatePost;