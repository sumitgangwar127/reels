import {auth, signInWithGoogle} from "../firebase"
import{ authContext } from "../AuthProvider"
import { useContext } from "react"
import { Redirect } from "react-router-dom"




let Login = ()=>{

    let user = useContext(authContext)
    console.log(user)
    return <>

        {/* if user is loged in then redirect to home  */}
        {(user) ? <Redirect to ="/" />: ""}
        <button onClick={()=>{
            signInWithGoogle();
        }} className="btn btn-primary m-4" >Login with Google</button>


        
    </>
}

export default Login;