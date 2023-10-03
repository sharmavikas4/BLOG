import { useEffect, useState } from "react"
import axios from "axios";
import ButtonAppBar from "./Navbar";
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card,CardHeader,CardMedia} from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Dashboard.css";
function Dashboard() {
    // const [o,setO] = useState([]);
    // const [mouse,setMouse] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
    const [data,setData] = useState({
      image: '',
      post: []
  });
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    useEffect(()=>{
        const fetchData = async function(){
          await axios.get(`${process.env.REACT_APP_SERVER_URL}`+"/dashboard",{withCredentials: "include"}).then((res)=>{setData({...res.data.user});});
        }
        fetchData();
    },[data.post]);
    // setMouse(data.post.map((p)=>{return false})); setO(data.post.map((p)=>{return 1}))
    // function hide(i){
    //   setMouse((prevValue)=>{
    //     if (prevValue&&prevValue.length!==0){
    //       let a = [...prevValue];
    //     a[i] = false;
    //     return a;
    //     }
    //     return prevValue;
    //   });
    //   setO((prevValue)=>{
    //     if (prevValue&&prevValue.length!==0){
    //       let a = [...prevValue];
    //     a[i] = 1;
    //     return a;
    //     }
    //     return prevValue;
    //   });
    // }
    // function unhide(i){
    //   setMouse((prevValue)=>{
    //     if (prevValue&&prevValue!==0){
    //       let a = [...prevValue];
    //     a[i] = true;
    //     return a;
    //     }
    //     return prevValue;
    //   });
    //   setO((prevValue)=>{
    //     if (prevValue&&prevValue.length!==0){
    //       let a = [...prevValue];
    //     a[i] = 0.3;
    //     return a;
    //     }
    //     return prevValue;
    //   });
    // }
    // function del(event,post,id){
    //   axios.post("http://localhost:3000/delete",{withCredentials: true},{...post,id: id}).then((res)=>{console.log(res)});
    // }
  return (
    <>
    <ButtonAppBar image={data.image}/>
    <Box sx={{ flexGrow: 1 }} style={{marginTop: "4vw"}}>
    <Grid className="g"container spacing={4} key={data._id}>
      {data&&data.post.map((p,i)=>{
        const id = i.toString();
        return <Grid item xs={12} sm={4} key={p._id}>
        {/* onMouseOver={()=>{unhide(i)}} onMouseOut={()=>{hide(i)}} */}
        <Item>
          <Card onClick={()=>{navigate("/edit",{state: {image: p.image,title: p.title,content: p.content,pid: p._id,id: data._id}})}}>
          <CardMedia  component="img" height="200" image={p.image} alt="Chevrolet" />
          <CardHeader  title={p.title} />
          {/* {<DeleteIcon className="delete" onClick={(event)=>{event.isPropagationStopped();console.log("hi")}} fontSize="large"></DeleteIcon>}
          {<EditIcon className="edit" fontSize="large"></EditIcon>} */}
          </Card>
        </Item>
        </Grid>
      })}
      </Grid>
    </Box>
    </>
  )
}
export default Dashboard
