import {Routes,Route,Navigate} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";

import {useContext} from "react"
import { Mycontext } from "./context/Context";
import Loding from "./components/Loding";
 
export default function App() {
const  {state:{auth:{isAuth ,loading}}} = useContext<any>(Mycontext);
 
  if(loading) return <Loding/>

  if(isAuth) return(

    <Routes>
    <Route path="/todo" element={<Todo/>}/>
    <Route path="*" element={<Navigate to="/todo"/>}/>
    </Routes>
  );
  return(
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<Navigate to="/login"/>}/>
    </Routes>
  )
}
