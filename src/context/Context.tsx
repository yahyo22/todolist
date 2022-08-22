import {createContext ,ReactNode,FC, useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { Myaxios } from '../service/Axios';

import {  toast } from 'react-toastify';

export const Mycontext = createContext({});

const Context:FC<{children?:ReactNode}>=({children})=> {
  const navigate = useNavigate();
  
const [auth, setauth] = useState({
    user:null,
    token:null,
    isAuth:false,
    loading:false,
});
useEffect(() => {
  userMe();
}, []);
// User me
async function userMe() {
  setauth(p=>({
    ...p,
    loading:true, 
  }));
  try {
    const res = await Myaxios("/auth/userme");
    setauth((p:any)=>({
      ...p,
      user:res.data.user,
      token: localStorage.getItem("TOKEN"),
      isAuth:true,
    }))
  } catch (error) {
    localStorage.removeItem("TOKEN");
    navigate("/login");
    throw error
  }finally{
    setauth(p=>({
      ...p,
      loading:false,
    }))
  }
}
// register
  async  function registerUser(body:any){
    setauth(p=>({
      ...p,
      loading:true,
    }))
      try {
        const res = await Myaxios.post("/auth/register",body);
        setauth(p=>({
          ...p,
          user:res.data.user,
          token:res.data.token,
          isAuth:true,
        }));
        localStorage.setItem("TOKEN",res.data.token);
        toast.success("Royhatan utiz");
        
      } catch (error) {
        toast.warning("server blan xato ");
        throw error;
      }finally{
        setauth(p=>({
          ...p,
          loading:false,
        }))
      }
    }
    // login
    async function login(body:any) {
      setauth(p=>({
        ...p,
        loading:true,
      }))
      try {
        const res = await Myaxios.post("/auth/login",body);
        console.log(res);
        localStorage.setItem("TOKEN",res.data.token);
        setauth(p=>({
          ...p,
          user:res.data.user,
          token:res.data.token,
          isAuth:true,  
        }));

      } catch (error) {
        throw error
      }finally{
        setauth(p=>({
          ...p,
          loading:false,
        }))
    }
    }

      return (
        <Mycontext.Provider value={{state:{auth},fn:{registerUser,login}}}>
            {children}
        </Mycontext.Provider>
      )
    }
    
export default Context;
    
