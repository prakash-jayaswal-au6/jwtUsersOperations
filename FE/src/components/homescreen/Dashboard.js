import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import { delete_user } from '../../../../BE/controllers/user';

const Home = () => {
    const [items, setItems] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [show,setShow] = useState(false)
    //to see all post on home
    useEffect(() => {
        fetch('/api/users', {
            headers: {
                "Authorization": "jwt "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setItems(data.posts)
        })

    }, [])


  //for create comments
  const makeComments = (text,postId) => {
      fetch('/comment',{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"jwt "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              postId,
              text
          })
      }).then(res=>res.json())
      .then(result=>{
         // console.log(result )
          const newData = items.map(item=>{
            if(item._id==result._id){
                return result
            }else{
                return item
            }
        })
        setItems(newData)
      }).catch(err=>{
          console.log(err)
      })
  }

  //for delete the post
  const deleteUser = (userId) => {
      fetch(`/api/users/deleteuser/${userId}`,{
          method:'delete',
          headers:{
              Authorization:"jwt "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          //console.log(result)
          const newData = items.filter(item=>{
              return item._id !==result._id
          })
          setItems(newData)
      })
  }

  const toogle=()=>{
    setShow(!show)
}

    return (
        <div className='home'>
            {items.length==0?
            <div class="row" style={{margin:"10%",width:"100%"}}>
            <div class="col s12 m6">
              <div class="card green darken-1">
                <div class="card-content white-text">
            <span class="card-title">no post found...</span>
            <Link to="/explore" className="page" style={{color:"black"}}>Explore and follow people to see their posts</Link>
                </div>
              </div>
            </div>
          </div>:
              <> {
                    items.map(item => { 
                  console.log("prakash",item)
                        return (    
                            <div  className="card">
                                
                                    <span ><h5>Name</h5></span>
                                            <p>{ item.name}</p>
                                    
                                    <span ><h5>Email</h5></span>
                                            <p>{ item.email}</p>
                                    <span ><h6><b>PhoneNumber</b></h6></span>
                                            <p>{ item.contactNo}</p>
                                    
                                    <a class="waves-effect waves-light btn-small">Edit</a>                                  
                                    <i className="material-icons"
                                        onClick={()=>{deleteUser(item._id)}}
                                    >delete</i>                      

                            {/* <div className="card-content">
                            <p className="comment-body">desc:{item.body}</p>
                                <i className="material-icons comments" onClick={()=>toogle()}>comment</i>{item.comments.length}
                               
                                {
                                    show?<form onSubmit={(e)=>{ 
                                            e.preventDefault();kl.
                                            makeComments(e.target[0].value,item._id)
                                            e.target.reset();
                                            }}>
                                            <input type='text' placeholder='Add comment'  />
                                        </form>:""   
                                }
                            </div> */}
                                                            </div>

                    )
                 }) 
                
                 }
                 </> 
                }
        </div>
            
    )
}

export default Home;