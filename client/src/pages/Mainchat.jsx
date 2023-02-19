import React, { useState, useEffect } from 'react';
import {FaSignOutAlt, FaShare} from 'react-icons/fa';
import {logout} from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import ListChat from './ListChat';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8000/');

const Mainchat = () => {
  const [connected, setConnected] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('initload', (data) => {
      const {msg} = data;
      setMessages(msg);
    })
  
    socket.on('updatemsg', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    })
  },[socket])

  const handleConnect = () => {
    socket.emit('conn_made');
    setConnected(true);
  }

  const handleLogout = async () => {
    await dispatch(logout());
    setMessages([]);
    navigate('/login');
  }

  const onSend = () => {
    const msg = {user : user._id , text : text};
    socket.emit('post', msg);
    setMessages([...messages, msg]);
    setText("");
  }

  return (
    <section className='container flex flex-col p-4 mt-16 h-full w-[40vw] border-2 border-gray-300 rounded-lg'>
      <div className='flex flex-row justify-between mb-5'>
        <h1 className='text-3xl font-bold'>{connected ? "Connected." : "Disconnected."}</h1>
        <button onClick={handleLogout}><FaSignOutAlt /></button>
      </div>
      {connected ? (
        <div className='flex flex-col space-y-2'>
          <div className='h-[400px] border-y-2 overflow-y-scroll'>
            <ListChat messages={messages} />
          </div>
          <div className='flex flex-row justify-between'>
            <input value={text} onChange={(e) => setText(e.target.value)} className='w-96 border-2 border-black py-1 px-2 rounded-lg' type='text' placeholder='Type your Message...' />
            <button onClick={onSend}><FaShare/></button>
          </div>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect</button>
      )}
      
    </section>
  )
}

export default Mainchat