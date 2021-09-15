import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import AuthProvider from "./AuthProvider";
import { useEffect } from "react";
import { firestore } from "./firebase";

let App = () => {

  // useEffect(()=>{
    
  //   //* add
  //   // firestore.collection("users").add({body : "this is val 2"})

    
  //   //* get
  //   async function f(){
  //     //firestore.collection gives a promise and also gives an object named querySnapshot which contains a snapshot of
  //     //object stored in collection
  //     //
  //     let querySnapshot = await firestore.collection("users").get()

  //     for(let i =0 ; i<querySnapshot.docs.length; i++){
  //       //.docs.data gives us the data 
  //       console.log(querySnapshot.docs[i].data());
  //     }
      
  //   }
    
  //   f()
    
  // },[])

  return (
    <>

    

    {/* <h1>App</h1> */}
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
