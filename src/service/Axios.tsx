import axios from "axios";

export const Myaxios = axios.create({
  baseURL:"/",

});
//req
Myaxios.interceptors.request.use((req:any)=>{
  let token = localStorage.getItem("TOKEN");
  if(token){
    req.headers.Authorization = token;
  }
  return req;
}
// ,(err)=>{
//   console.log(err);
// } 
// );
// //response
// Myaxios.interceptors.response.use((res)=>{
//   console.log(res);
  
// },(err)=>{
//   console.log(err);
// } 
);