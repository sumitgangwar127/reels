import { useContext, useEffect, useState } from "react"
import { authContext } from "../AuthProvider";
import { firestore } from "../firebase";
import "./VideoCard.css"


let VideoCard=(props)=>{

    let [playing , setPlaying] = useState(false);
    let [commentBoxOpen , setCommentBoxOpen] = useState(false);
    let [currUserComment, setCurrUserComment] = useState("");
    let [comments, setComments] = useState([])
    let user = useContext(authContext);
    let currUserLiked = props.data.likes.includes(user.uid)

    useEffect(()=>{
        let commentsArr = props.data.comment;
        let arr=[];
        let f = async ()=>{

            for(let i = 0 ;i <commentsArr.length;i++){
                let commentDoc = await firestore.collection("comments").doc(commentsArr[i]).get()

                arr.push(commentDoc.data())
            }

            setComments(arr)
            
        }
        f();
        console.log(comments);
    },[props])
    

    return (
        <div className="video-card">
            <p className="video-card-username">{props.data.name}</p>

            <span className="video-card-music">
                <span className="material-icons-outlined music-icon">music_note</span>
                <marquee className="song">Some Song</marquee>
            </span>

            <span className="material-icons-outlined video-card-like" onClick={()=>{
                let likesArr = props.data.likes;

                if(currUserLiked){
                    likesArr = likesArr.filter((el)=> el != user.uid);

                    
                }
                else{
                    likesArr.push(user.uid)
                }
                firestore.collection("post").doc(props.data.id).update({
                    likes: likesArr,
                })
            }}>
                
                {currUserLiked?"favorite":"favorite_border"}
            </span>

            <span 
                onClick={(e)=>{
                    
                    if(commentBoxOpen){
                        setCommentBoxOpen(false)
                    }
                    else{
                        setCommentBoxOpen(true)
                    }
                    
                }}
                className="material-icons-outlined video-card-comment">comment</span>
            
            {/* condetional rendering */}
            {commentBoxOpen? <div className="video-card-comment-box">
                <div className="actual-comments">

                    {
                        comments.map((el)=>{
                            return <div className="post-user-comment main" key = {el.id}>
                                <img src = {el.photo} alt=""/>
                                <div className="cmnt">
                                    <h5>{el.name}</h5>
                                    <p>{el.comments}</p>
                                 </div>
                                </div>
                        })
                    }

                  
                </div>
                <div className="comment-form">
                        <input 
                            type="text"
                            value = {currUserComment}
                            onChange={(e)=>{
                            setCurrUserComment(e.currentTarget.value);
                        }}/>
                        <button onClick={async ()=>{
                            let docRef =await firestore.collection("comments").add({
                                name: user.displayName,
                                comments: currUserComment,
                                photo: user.photoURL,
                            })
                            
                            setCurrUserComment("")
                            let doc = await docRef.get();
                            let commentId = doc.id;
                            
                            let postDoc = await firestore.collection("post").doc(props.data.id).get();
                            console.log(postDoc.data());
                            let postCommentArr = postDoc.data().comment;

                            postCommentArr.push(commentId);
                            

                            await firestore.collection("post").doc(props.data.id).update({
                                comment: postCommentArr,
                            });


                        }}>Post</button>
                </div>
            </div>:""}
            
            
            <video 
            onClick={(e)=>{
                if(playing){
                    e.currentTarget.pause();
                    setPlaying(false);
                }
                else{
                    e.currentTarget.play();
                    setPlaying(true);
                }
            }}
            loop
            src={props.data.url} 
            className="video-cards-video">
            </video>


            {/* upload part */}
       
            

        </div>
    )
}

export default VideoCard
