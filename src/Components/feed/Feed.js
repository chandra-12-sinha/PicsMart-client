import React from 'react' 
import Follower from '../follower/Follower'
import Post from '../post/Post'

const Feed = () => {
  return (
    <div className='Feed'>
        <div className="container">
            <div className="left-part">
                <Post/>
            
            </div>
            <div className="right-part">
                <div className="following">
                    <h3 className='title'>Followings-</h3>
                    <Follower/>
                    
                </div>
                <div className="suggestion">
                    <h3 className='title'>Suggestions-</h3>
                    <Follower/>
                  
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Feed
