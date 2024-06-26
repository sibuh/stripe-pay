import { useState } from "react";
import { Link,useLocation} from "react-router-dom";
import axios from "./api/axios";

function Completion() {
    const [success,setSuccess]=useState(false);
    const[errMsg,setErrMsg]=useState("");
      const location=useLocation();
      const queryParams= new URLSearchParams(location.search);
      const value=queryParams.get("payment_intent");
    const handleSubmit=async()=>{
        try{
          const res=await axios.get("/ticket/"+value,{
            headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
          })
          if (res.status===200){
            setSuccess(true);

          }else{
            setErrMsg('failed to get ticket')
          }
        }catch(err){
          setErrMsg("failed to get ticket")
        }
      

      }
    return (
    <>
      {
        success?<section>
          <h1>Congratulations!! Payment successful</h1>
          <button onClick={handleSubmit}>Get ticket</button>
          </section>:
        <section>
         <h1 className="error-msg">Failed to get ticket</h1>
        <Link to="/">Back to home</Link>
       
        
        </section>
      }
     
    </>
    );
  }
  
  export default Completion;