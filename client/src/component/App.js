import { StrictMode, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from "./User";
import Login from "./Login.js";
import CreatePost from "./CreatePost";
import Post from "./Post";
import axios from "axios";
import Dashboard from "./Dashboard";
import Edit from "./Edit.js";
function App() {
  const [file,setFile] = useState(null);
  const [post,setPost] = useState({
    title: "",
    image: "",
    content: ""
  }
  );
  function change(event){
    const {name,value} = event.target;
    if (name==="image"){
      setFile(event.target.files[0]);
    }
    setPost((prevValue)=>{
      return name==="title"?{...prevValue,title:value}:(name==="image"?{...prevValue,image: value}:{...prevValue,content: value});
    })
  }
  const [login,setLogin] = useState(false);
  // const [data,setData] = useState([]);
  // const [li,setLike] = useState([]);
  useEffect(()=>{
    console.log(`${process.env.REACT_APP_SERVER_URL}`+"/success");
      const fetchData = async function(){
        await fetch(`${process.env.REACT_APP_SERVER_URL}`+"/success",{credentials: "include"}).then((res)=>{res.json().then((data)=>{console.log(data.message);setLogin(data.message); })})}
      fetchData();
      console.log(login);
    },[]);
 
  function click(){
    // const username = name;
    // const userage = age;
    // const user = {
    //   name: username,
    //   age: userage
    // }
    // axios.post('http://localhost:3000/',{user}).then((res)=>{console.log(res)});
    // axios.get('http://localhost:3000/auth/google').then((res)=>{res.json().then((data)=>{console.log(data.message)})});
    console.log(`${process.env.REACT_APP_SERVER_URL}`+"/auth/google");
    window.open(`${process.env.REACT_APP_SERVER_URL}`+"/auth/google","_self");
  }
  // async function login(){
  //   await fetch("http://localhost:3000/success",{credentials: "include"}).then((res)=>{res.json().then((data)=>{setMessage(data.message)})});
  // }
  async function  logout(){
    await fetch(`${process.env.REACT_APP_SERVER_URL}`+"/logout",{credentials:"include"}).then((res)=>{res.json().then((data)=>{setLogin(data.message)})});
  }
  // function change(event){
  //   const data = event.target.value;
  //   const name = event.target.name;
  //   if (name==='age'){
  //     setAge(data);
  //   }
  //   else{
  //     setName(data);
  //   }
  // }
  function save(post){
    // const formData = new FormData();
    // formData.append("title",post.title);
    // formData.append("content",post.content);
    // formData.append("image",file);
    // console.log(formData);
    axios.post(`${process.env.REACT_APP_SERVER_URL}`+"/success",{title: post.title,content: post.content,image: file},{headers:{
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true});
  }
  // function like(post,id,i){
  //   axios.post('http://localhost:3000/success/like',{...post,id: id},{withCredentials: true}).then((res)=>{
  //     console.log(res.data.message);
  //     if (res.data.message){
  //       setLike((prevValue)=>{
  //         let n = 0;
  //         if (res.data.n!==-1){
  //           n = 1;
  //         }
  //         else {
  //           n = -1;
  //         }
  //         const a = [...prevValue];
  //         a[i] = a[i]+n;
  //         return a;
  //       })
  //       // if (!res.data.n===-1){
  //       //   setLike((prevValue)=>{
  //       //     const a = [...prevValue];
  //       //     a[i] = a[i]+1;
  //       //     return a;
  //       //   })
  //       // }
  //     }
  //   });
  //   console.log(li);
  // }
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={login?<User/>:<Login click={click}/>}></Route>
          <Route path="/createpost" element={login?<CreatePost post={post} change={change} click={save}/>:<Login click={click}/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/post" element={login ? <Post/> : <Login click={click}/>}></Route>
          <Route path="/dashboard" element={login ? <Dashboard/> : <Login click={click}/>}> </Route>
          <Route path="/edit" element={login?<Edit/> : <Login click={click}/>}></Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}
export default App;
