import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
function ChatHeader() {
  return (
    <div className='chat-header'>
        <div style={{flexGrow:1}} >
           <input type ="text" placeholder='Search User' >
           </input>
          
        </div>
        <div style={{flexGrow:3 ,textAlign:"center",fontFamily:"monospace"}}>
            <h1>Chat Please</h1>
        </div>
        <div style={{flexGrow:1}}>
            {/* <h1>Profile Pic</h1> */}
        </div>
    </div>
  )
}

export default ChatHeader