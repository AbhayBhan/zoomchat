import React from 'react';
import {useSelector} from 'react-redux';

const ListChat = ({messages}) => {

    const {user} = useSelector((state) => state.auth);

  return (
    <div className='container flex flex-col space-y-3 p-2'>
        {messages.map((msg) => {
            return(
                <div key={msg._id} className={user._id == msg.user ? "flex flex-row-reverse items-start " 
                  : "flex flex-row items-start"}>
                  <h1 className={user._id == msg.user ? "text-white bg-green-500 shadow-2xl rounded-full px-2 py-1" :
                    "text-white bg-blue-500 shadow-2xl rounded-full px-2 py-1"}>{msg.text}</h1>
                </div>
            )
        })}
    </div>
  )
}

export default ListChat