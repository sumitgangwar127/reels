import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { authContext  } from "../AuthProvider";
import { auth, storage , firestore } from "../firebase";
import VideoCard from "./videoCard";

import "./home.css"
let Home =()=>{

    let user = useContext(authContext);

    let [post,setPost]=useState([])

    useEffect(()=>{

        let unsub = firestore.collection("post").onSnapshot((querySnapshot)=>{
            let docArr = querySnapshot.docs;

            let arr=[];
            for(let i =0; i<docArr.length;i++){
                arr.push({
                    id:docArr[i].id,
                    ...docArr[i].data()
                })
            }

            setPost(arr);
        })
        
        return ()=>{
            unsub();
        }
    },[])

    return(
        <>

            {(user)? "" : <Redirect to ="/login" />}

            <div className="video-container">
                {post.map((el) => {
                   return <VideoCard key ={el.id}  data={el}/>
                })}
            </div>

            <button className="home-logout-btn"
                onClick={()=>{
                    auth.signOut();
                }}>LOGOUT</button>

                <input type="file" 

                    onClick={(e)=>{
                        e.currentTarget.value = null;
                    }}
                    onChange={(e)=>{
                        let videoObj = e.currentTarget.files[0]
                        let {name , size, type} = videoObj;

                        size = size/1000000;

                        if(size > 10){
                            alert("file size exceeds 10mb")
                            return;
                        }

                        type = type.split("/")[0];

                        if(type !== "video"){
                            alert("please upload a video file");
                            return;
                        }

                        // reference will give us a event in return
                        let uploadTask = storage
                            .ref(`/post/${user.uid}/${Date.now() + "_" + name}`)
                            .put(videoObj);
                        
                            // on change of state 3 functions are executes
                            //3rd function executes after file upload completes
                          uploadTask.on("state_changed","","",()=>{
                              
                              //getDownloadURL function is a promise based url thats why we used .then()  after that
                              uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                                  console.log(url);

                                  firestore
                                    .collection("post")
                                    .add({name: user.displayName, url, likes:[], comment:[] });

                              })
                          })


                    }}
                
                 />
        </>
    )
}

export default Home;