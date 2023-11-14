"use client"
import React, { useState, useEffect ,useRef} from 'react';
import io from 'socket.io-client';

export interface IMsg {
  user: string;
  msg: string;
}

let socket :any

// 랜덤 유저
const user = 'User_' + String(new Date().getTime()).substr(-3);

// 내 메시지
const Me = ({ message }: { message: string }) => {
  return (
  <div className="p-6px 10px">
    <p className="text-black text-lg">Me</p>
    <div className="bg-blue-500 text-white max-w-320px px-2 py-1 rounded-lg inline-block">
      <p className="text-2xl">{message}</p>
    </div>
  </div>
  );
};

// 상대 메시지
const Other = ({ user, message }: { user: string; message: string }) => {
  return (
    <div className="p-6px 10px text-right">
     <p className="text-right text-black text-lg">{user}</p>
     <div className="bg-green-400 text-white max-w-320px px-2 py-1 rounded-lg inline-block">
        <p className="text-2xl">{message}</p>
      </div>

    </div>

  );
};

function Index() {
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>('');

  const socketInitializer = () => {
    socket = io("http://localhost:8000", {transports : ['websocket']})

    socket.on('connect', () => {
      console.log(user ,'has connected', socket);
      socket.emit("welcome", user);
      setConnected(true);
    });

    socket.on('error', (error: any) => {
      console.log("error : ",error);
    });

    socket.on('newWelcome', (user:string)=> {
      console.log(user, "(님)이 들어오셨습니다! ");
    });

    socket.on('newIncomingMessage', (message: IMsg) => {
     /* chat.push(message);
      setChat([...chat]);*/
      setChat((currentMsg)=> [...currentMsg, {user: message.user, msg: message.msg}])
     
      console.log(user, chat, Date());
    });
  };
  // 소켓 연결

  const scrollRef = useRef<HTMLDivElement | null>(null);//채팅 쳤을 때 매번 맨 아래로 가도록 scroll을 위한 코드

  useEffect(() => {
 
    socketInitializer();
    // 브라우저가 꺼지면 소켓 연결 종료
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("socket is gone");
      }
    };
  }, []);

  useEffect(() => {
    scrollRef.current ? scrollRef.current.scrollIntoView({ behavior: 'smooth' }) : console.log("there is no scrollRef") ;
  }, [chat]);
  
 

  const sendMessage = async () => {
    const message: IMsg = {
      user,
      msg,
    };
    if(msg.trim() !== ""){ // 공백 제거 후에, 제출을 하기 위해서는 , trim을 한 번 해줘야 한다. 
      socket.emit("createdMessage", message);
      setMsg('');  
    }

    /*if (msg) {
      const message: IMsg = {
        user,
        msg,
      };
      //send Message to Other user
      //const res = await chatAPI(message);
      // reset field if OK
      if (res.status === 201) {
        setMsg('');
      }
      fetch("http://localhost:3000/api/chat",{
        method: "POST",
        body: JSON.stringify({message})
      }) 
    }*/

  };
  return (
      <div className="relative block w-full h-screen">
        <div className="block border rounded-4 w-480px h-90v m-0 auto mt-32px bg-gray-200 overflow-y-scroll">
          {chat.map((chat, i) => (
            <div key={i}>
              {chat.user === user ? (
                <Me message={chat.msg} />
              ) : (
                <Other user={chat.user} message={chat.msg} />
              )}
            </div>
          ))}
          <div ref={scrollRef}/> 
        </div>

        <div className="flex w-480px h-10v m-0 auto mt-12px space-x-2">
          <input
            type="text"
            className="w-3/4 text-lg h-full text-black border"
            value={msg}
            placeholder={connected ? '메시지를 입력하세요' : '연결중입니다...'}
            disabled={!connected}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={(e) => { //엔터를 이용해서도 제출을 할 수 있게 해주려면 이런 방식을 택해야한다.
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            onSubmit={sendMessage}
          />
          <button
            className={`w-1/4 h-full ${connected ? 'bg-blue-500' : 'bg-gray-300'} text-white`}
            onClick={sendMessage}
            disabled={!connected}
          >
            보내기
          </button>
        </div>

      </div>
  );
}

export default Index;