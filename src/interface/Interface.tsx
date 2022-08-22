
//onclode
export interface Onclose{
    onClose:any;
    todo:{
      name:string;
      _id:number;
      color:string;
    };
    get:()=> Promise<void>;
  }
  export interface I{
    isCompleted:boolean;
    _id:number;
    name:string;
    color:string;
  }
  export interface Users{
      name:string;
      password:string;
  }
  export interface Contentt{
      auth?:{
        user:null,
        token:null,
        isAuth:boolean,
        loading:boolean,
      };
  }
