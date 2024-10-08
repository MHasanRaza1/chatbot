import React, { useState } from 'react'
import './App.css'
import { RiCodeSSlashLine, RiPlanetLine } from "react-icons/ri";
import { FaPython } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState('');
  const [reponse, setResponse] = useState(false);
  const [messages, setMessages] = useState([]);

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    }
  }

  const generateResponse = async (msg) => {
    const genAI = new GoogleGenerativeAI('AIzaSyDbaq7ocAIsA_ehBXfHplYm_j7GtY0mcuQ');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    setMessages((pre) => [
      ...pre, {
        type: 'userMsg',
        text: msg
        },
    ])
    setResponse(true)
    setMessage('')

    setTimeout(()=>{
      setMessages((pre)=> [
        ...pre,{
          type: 'response',
          text: result.response.text()
        }
      ])
    },2000)
    console.log(result.response.text());
  }

  const newChat = () => {
    setResponse(false);
    setMessages([]);

  }
  return (
    <>
      <div className="w-[100%] min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white flex flex-col justify-center items-center">
        {
          reponse ?
            <div className='h-[80vh] w-[75%]'>
              <div className="header pt-[25px] flex items-center justify-between w-[100%] ">
                <h2 className='text-2xl'>Human Assistant</h2>
                <button onClick={newChat} id='newChatBtn' className='bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]'>New Chat</button>
              </div>

              <div className="messages by-2">
                {
                  messages.map((msg,index)=> {
                   return (<div key={index} className={msg.type}><p>{msg.text}</p></div>)
                  })
                }
              </div>
            </div>
            :
            <div className='middle h-[80vh] flex items-center flex-col justify-center'>
              <h1 className='text-4xl'>Human Assistant</h1>
              <div className="boxes lg:mt-7 lg:flex lg:items-center lg:gap-4 hidden">
                <div className="cards w-[200px] h-[120px] cursor-pointer transition-all hover:bg-[#201f1f] rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p>What is coding ? <br /> How we can learn it.</p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><RiCodeSSlashLine /></i>
                </div>
                <div className="cards w-[200px] h-[120px] cursor-pointer transition-all hover:bg-[#201f1f] rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p className='text-[18px]'>Which is the red <br /> planet of solar <br /> system?</p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><RiPlanetLine /></i>
                </div>
                <div className="cards w-[200px] h-[120px] cursor-pointer transition-all hover:bg-[#201f1f] rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p>In which year python <br /> was invented ? </p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><FaPython /></i>
                </div>
                <div className="cards w-[200px] h-[120px] cursor-pointer transition-all hover:bg-[#201f1f] rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px]">
                  <p>How we can use <br /> the AI for adopt ?</p>
                  <i className='absolute right-3 bottom-3 text-[18px]'><TbMessageChatbot /></i>
                </div>
              </div>
            </div>
        }

        <div className="bottom w-[100%] flex flex-col items-center">
          <div className="inputBox w-[75%] flex items-center bg-[#181818] rounded-[30px]">
            <input 
            value={message} 
            onChange={(e) => { setMessage(e.target.value) }} 
            type="text" 
            className='p-[15px] pl-[15px] bg-transparent flex-1 outline-0 border-none' 
            placeholder='Write your message here....' 
            id='messageBox'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                hitRequest();
              }
            }}
            />
            {
              message == '' ? '' :
                <i className='text-green-500 text-[20px] mr-5 cursor-pointer' onClick={hitRequest}><IoSend /></i>
            }
          </div>
          <p className='text-[gray] text-[14px] my-4'>Human Assistant is developed by Hasan Raza. This AI application use the gemini API for giving the response.</p>
        </div>
      </div>
    </>
  )
}

export default App