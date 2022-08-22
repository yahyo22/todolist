import React from 'react'
import  { useEffect, useState } from "react";
import Modal from "../components/modal/Modal";
import { I } from "../interface/Interface";
import { Myaxios } from "../service/Axios";
import {  toast } from 'react-toastify';
import "../assets/style/style.css";
export default function Todo() {
    
    // api
const [todos, setTodos] = useState([]);
const [current ,setcurrent] =useState<any>(null);
//State
  const [modal ,setmodal] = useState<boolean>(false);
const [loading, setloading] = useState<boolean>(false);
const [error, seterror] = useState<string>("");
const [name, setname] = useState<string>("");
const [loadingbutton, setloadingbutton] = useState<boolean>(false);
  // useEffect
  useEffect(()=>{
    getAllTodo();
  },[]);
// chekbox get
async function chekbox(id:number) {
  setloading(true)
  try {
  const res = await Myaxios("/api/todo/toggleComplete/"+id);
  toast.success(res.data.msg);
  getAllTodo();
  } catch (error) {
  toast.warning("ishlamad");
  setloading(false);
    throw error;
  }
}
  // get Zapros
  async function getAllTodo() {
    setloading(true);
    try {
      const respose = await Myaxios.get("/api/todo");
        setTodos(respose.data.data);
        console.log(respose.data.data);
    } catch (error) {
      seterror("server blan muammo");
      throw error;
    }finally{
      setloading(false);
    }
  } 
// post Zapros
async function onAddTodo(){
  setloadingbutton(true)
  try {
    const response = await Myaxios.post("/api/todo",{name:name,color:genColor()});
    toast.success(response.data.msg);
    getAllTodo();
    setname("");
  } catch (error) {
    toast.error("suka puston yozma");
    throw error;
  }finally{
    setloadingbutton(false);
  }
}
// Delete zapros
async function DeleteTodo(id:number){
  setloading(true);
  try {
  const response = await Myaxios.delete("/api/todo/"+id);
  console.log(response.data);
  toast.success(response.data.msg);
  getAllTodo()
  } catch (error) {
    setloading(false)
    toast.warning("ishlamad")
    throw error;
  }
}

// random number
function randNumber (min:number,max:number){
  return Math.floor(Math.random() * ( max - min + 1 )+ min );
}

// gen color
function genColor(){
  let color = "#"
  for(let i=0; i < 6; i++){
   let rn = randNumber(0,15);
  color+= rn.toString(16);
  }
  return color;
  
}
genColor();
  return (
    <div className="container">
      <header>
        <div className="row py-5">
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              placeholder="Name. . ."
              onChange={(e)=>setname(e.target.value)}
              value={name}
            />
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-primary w-100" onClick={onAddTodo}
            disabled={loadingbutton}>
              Add
            </button>
          </div>
        </div>
      </header>
      <main className="mt-5">
        {loading ? 
        <button className="btn btn-primary" type="button" disabled style={{transform:'scale(1)'}}>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
  :( error ? <p className="text-center text-danger">{error}</p>:
        <ul className="list-unstyled">  
        {todos.map((i:I)=>(  
         <li className="shadow p-3 mb-3  rounded d-flex justify-content-between align-items-center" key={i._id}
         style={{backgroundColor: i.color}}>
         <div className="form-check"> 
           <input className="form-check-input" type="checkbox" checked={i.isCompleted} onChange ={()=>chekbox(i._id)}/>
         </div>
         <p className="m-0">{i.name}</p> 
         <div className="gap-3 d-flex">
           <button type="button" className="btn btn-warning btn-sm" onClick={()=>{setmodal(true);setcurrent(i);}}>Update</button>
             <button type="button" className="btn btn-danger btn-sm"
             onClick={()=>DeleteTodo(i._id)}>Delete</button>
         </div>
         </li>
        ))}
       </ul>
         )}
      </main>
      {modal? <Modal onClose={()=>setmodal(false)} todo={current} get={getAllTodo}/> : null}
    </div>
  );
}
