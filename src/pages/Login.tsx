import {useContext,useState} from 'react'
import {Link} from "react-router-dom"
import { Mycontext } from '../context/Context'
import { Users } from '../interface/Interface';
export default function Login() {
  const [users, setusers] = useState<Users>({
    name:"",
    password:"",
  })
  function LoginInput(e:any){
    const {value, name} = e.target; 
    setusers(p=>({...p, [name]:value,}));
    }
    function Loogin(){
      login(users);
    }
  const {fn:{login}} = useContext<any>(Mycontext);
  return (
    <div className='container'>
        <main className='d-flex align-items-center justify-content-center'style={{minHeight:"100vh"}}>
            <div className='shadow py-3 px-4  bg-body rounded' style={{minWidth:"320px"}}>
                <h3 className='text-center text-uppercase m-0 mb-3'>Login</h3>
                <div className='form-group mb-2'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name'  className='form-control 'onChange={LoginInput} value={users.name} name="name"/>
                </div> <div className='form-group'>
                    <label htmlFor="Password">Password</label>
                    <input type="password" id='Password'  className='form-control 'onChange={LoginInput} value={users.password} name="password"/>
                </div>
                <div className='d-flex align-items-center justify-content-between mt-3'>
                  <p className='m-0'> <Link to="/register">Register</Link></p>
                  <button type='button'className='btn btn-primary'onClick={Loogin}>Login</button>
                </div>
            </div>
        </main>
    </div>
  )
}
