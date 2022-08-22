import { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import { Onclose } from '../../interface/Interface';
import { Myaxios } from '../../service/Axios';
import {  toast } from 'react-toastify';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:"40%",
      minHeight:"200px",
    },
  };

export default function Modal({onClose,todo,get}:Onclose) {
const [name, setname] = useState<string>();
const [color, setcolor] = useState<string>();
const [loading, setloading] = useState<boolean>(false);

// update todo
async function UpdateTodo(){
  setloading(true);
  try {
    const res = await Myaxios.put("/api/todo",{name:name,color:color,id:todo._id});
    console.log(res);
    toast.success(res.data.msg);
    get();
    onClose()
  } catch (error) {
    toast.warning("update bumadi");
    throw error;
  }finally{
    
    setloading(false);
  }
}
  useEffect(()=>{
  ReactModal.setAppElement('body');
  },[]);
  ////////////////////
  useEffect(() => {
    if(!todo) return
    setname(todo.name);
    setcolor(todo.color);
  }, [todo])
  
  return (
    <ReactModal isOpen={true} 
    style={customStyles}
    contentLabel="Example Modal"
    ariaHideApp={false}>
        <h1 className='mb-3 text-center'>Edit Todo</h1>
        <div className='mb-3'>
          <input type="text"  className='form-control' value={name} onChange={(e)=>setname(e.target.value)}/>  
        </div>
        <div className='mt-3'>
          <label htmlFor="">Color</label>
          <br />
          <input type="color" value={color}  onChange={(e)=>setcolor(e.target.value)}/>  
        </div>
        <div className='d-flex justify-content-end gap-2'>
        <button  type='button'  className="btn btn-primary btn-sm" onClick={UpdateTodo} disabled={loading}>Update</button>
        <button type='button' onClick={onClose} className="btn btn-danger btn-sm">Close</button>
        </div>
    </ReactModal>
  )
}
