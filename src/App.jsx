import {GoogleGenerativeAI} from '@google/generative-ai'
import { useState } from 'react';
function App ()
{
  const [input,setInput]=useState('')
  const [chat,setChat] = useState([])
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
  const handleInput = async () =>
  {
    try
    {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = input;

      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      setChat([
        ...chat,
      {
        userText: input,
        aiText: result.response.text(),
      }
    ])
    setInput('')
    }
    catch(err)
    {
       console.log(err)
    }
  }

  return (
    <div className='relative-h-screen flex flex-col justify-center items-center'>
     <div className="absolute inset-0">
    <div className="relative h-full w-full [&>div]:absolute [&>div]:top-0 [&>div]:right-0 [&>div]:z-[-2] [&>div]:h-full [&>div]:w-full [&>div]:bg-gradient-to-l [&>div]:from-blue-200 [&>div]:to-white">
    <div></div>
    
  </div>
  </div>

      <div className="chat h-3/4">
        {
          chat.map((val,i) => (
            <div key={i}>
              <h2 className=' text-3xl text-black '>{val.userText}</h2>
              <p className='text-4xl  text-cyan-950 font-bold text-justify'>{val.aiText}</p>
            </div>
          ))
        }
      </div>
      <div className='input my-5 fixed bottom-0'>
         <input 
          type="text"
          placeholder="Ask me Something" 
          className= "text-3xl  text-gray-500 rounded-2xl py-5"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
         />
          <button className="bg-blue-950 text-white font-bold p-5 text-center text-2xl rounded-4xl"
          onClick={handleInput}>
            send
          </button>

           <button className="bg-blue-950 text-white font-bold p-5 text-center text-2xl rounded-4xl"
          onClick={()=>setChat([])}>
            clear chat
            </button>
          
      </div>
    </div>
  )
}
export default App;