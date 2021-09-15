
import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props)=>{

    let [user, setUser] = useState(null);
    let [loading , setLoading] = useState(true);


    useEffect(()=>{

        // onSuthStateChanged function returns a function which can be used for cleanup (Work as cleanup function on call)
        let unsub = auth.onAuthStateChanged(async (user)=>{
            if(user){
                let {displayName,email,uid,photoURL} = user;

                let docRef = firestore.collection("user").doc(uid);

                let documentSnapshot = await docRef.get();

                if(!documentSnapshot.exists){

                    docRef.set({
                        displayName,
                        email,
                        photoURL
                    })
                }

                setUser({displayName,email,uid,photoURL});
            }
            else{
                setUser(null)
            }
            // false means loging/logout  is done
            setLoading(false);
        })

        return ()=>{
            // works as cleanup function
            unsub();
        }
    },[])

    return <authContext.Provider value = {user}>
        {!loading && props.children}
    </authContext.Provider>
}

export default AuthProvider;