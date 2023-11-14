"use client"
import React, {useEffect, useState} from 'react';
import RTCVideo from '../components/face/RTCVideo'
import io from 'socket.io-client';
import { getAllRooms } from '../api/rooms/api';
import RoomCard from '../components/Room/RoomCard'
import CreateRoomModal from '../components/Room/CreateModal'; // 모달 컴포넌트를 가져옵니다.
import Room from '../models/room';
//문제점 1 : 마이크나, 카메라를 끌 때, 두번 누르면 그 떄 부터 작동을 한다. 
//문제점 2 : video도 audio도 교체되면, 카메라를 꺼둔 게 다시 보이기 시작한다. 
let socket : any;
let roomName :string;
let myPeerConnection : RTCPeerConnection; 
let localStream :MediaStream;
//let peerStream : MediaStream;

const Dummy_Data = [{
  roomName: "코딩 공부 방",
  backgroundImage: "_",
  deadLine : "2023년 12월 31일",
  studyTime: "2PM ~ 11PM",
  member : "9/10",
},{
  roomName: "토익 공부 방",
  backgroundImage: "_",
  deadLine : "2024 1월 6일",
  studyTime: "2PM ~ 11PM",
  member : "9/10",
}];



export default function Zoom() {
  //Stream 설정 
  //유저 이름 설정
    const user = 'User_' + String(new Date().getTime()).substr(-3);

   // const [localStream, setLocalStream] = useSta  te<MediaStream>();
    const [peerStream, setPeerStream] = useState<MediaStream>();
    //Stream을 State에 담아서 사용하다보면, 최초에 마운트 됐을 때는 제대로 작동하지만, 나중에 다시 참고할 때에는 undefined로 뜨게 된다..

    //const [roomName, setRoomName] = useState<string>();
    const [isEnter, setIsEnter] = useState<boolean> ();
    const [cameras, setCameras] = useState< MediaDeviceInfo[]>();
    const [mics, setMics] = useState<MediaDeviceInfo[]>();

    const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
    const [isMicOn, setIsMicOn] = useState<boolean>(true);

    const [camera, setCamera] = useState<string>();
    const [mic, setMic] = useState<string>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rooms, setRooms]= useState<[]>([]);
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    //방 만드는 모달창 

    let devices : MediaDeviceInfo[];
    
// em
    useEffect(()=>{
      //방 데이터 가져오기
      async function fetchData() {
        const fetchedTodos = await getAllRooms();
        setRooms(fetchedTodos);
      }
      fetchData();



      //socket 연결
      socket = io("http://localhost:8000", {transports : ['websocket']});

      socket.on('connect', ()=> {
        console.log("I have connected");
      });

      socket.on("welcome", async()=> {
        const offer = await myPeerConnection.createOffer();
        //다른 사람들이 들어올 수 있게 초대장을 보내는 행동이다. 우리가 누구이며, 어디있는지 등의 내용이 적혀있다. 
        //이 다음엔  setLocalDescription을 해줘야한다.
        myPeerConnection.setLocalDescription(offer);
        console.log("RoomName :" , roomName); //roomName 문제 
        socket.emit("offer", offer, roomName);
        console.log("sent the offer");

      });

      socket.on("offer", async(offer:any) => {
        console.log("recieve the offer:", offer);
        myPeerConnection.setRemoteDescription(offer);
        //이 오퍼를 받은 후에는 서버를 통해서 서로의 영상을 주고받는 것이 아니다. 다만 해당 작업을 하기 위해선 서버가 필요하다. 
        //오퍼를 가져왔다면 이제 그에 걸맞는 답변을 해줘야한다. 
        // 이 뒤로 안 된다 뭐가 문제지..
        //roomName의 값이 사라진다.
        const answer = await myPeerConnection.createAnswer();    
        // 이 떄 async/ await을 사용하지 않는다면, myPeerConnect가 생기기도 전에 함수가 실행되어서 꼭 이 작업을 해주어야만 한다. 
        myPeerConnection.setLocalDescription(answer);
        socket.emit("answer", answer, roomName);
        console.log("sent the answer");
      })

      socket.on("answer", (answer: any) => {
        myPeerConnection.setRemoteDescription(answer);
        console.log("Receive the answer : ", answer);
      })
      
      socket.on("ice", (ice: any) => {
        console.log("recieve the candidate");
        myPeerConnection.addIceCandidate(ice);
      })
      
      return () => {
        if (socket) {
          socket.disconnect();
          console.log("socket is gone");
        }
      };
    },[]);

    async function getMedia() {
      const initialConstrains = {
        audio: true,
        video: { facingMode: "user" },
      };
      const changeConstrains = {
        audio: { deviceId: { exact: camera } },
        video: { deviceId: { exact: mic } },
      };
      try {
        const myStream = await navigator.mediaDevices.getUserMedia(
          camera ? changeConstrains : initialConstrains 
          //초기에 미디어를 가져오는데, 카메라(설정으로 바꾸게 됐다면 등록된 카메라)가 없다면 즉 설정을 바꾼 적이 없는 초기상태라면 초기 Constrains로 설정을 한다. 
        );
          localStream = myStream; //이제부턴 localStream이 전역변수이다.
        if (!camera) {
          await getCameras();
          await getMics();
        }
      } catch (e) {
        console.log(e);
      }
    }

    async function initCall() {
      await getMedia();
      makeConnection();
    }

     const getCameras = async() => { //사용자의 컴퓨터에서 카메라들을 가져온다. 
      try{
        devices = await navigator.mediaDevices.enumerateDevices();
        console.log("devices: ",devices);
        const cameras = devices.filter(device => device.kind === 'videoinput')//오류 발생 
        console.log("cameras: ",cameras);
        setCameras(cameras);
      } catch (e) {
        console.log(e);
      }
    }

    const getMics = async() => { //사용자의 컴퓨터에서 카메라들을 가져온다. 
      try{
        devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(device => device.kind ==="audioinput")
        /*
        1. const cameras = devices.filter((device) => {device.kind==="videoinput}");
          이렇게 () =>{} 하는 것은 객체에 아무것도 남지 않는다. 

        2. const cameras = devices.filter(device => device.kind==="videoinput"); 혹은
        3. const cameras = devices.filter((device) => (device.kind==="videoinput"));
          이렇게 하는 것의 차이점 
        => 
        const cameras = devices.filter((device) => {
        return device.kind === "videoinput";
        });
        2, 3번째는 화살표함수에 리턴이 생략된 구문이라서, 컬리브라켓 사용하실 때는 리턴 넣어주면 된다. 
          */
        console.log("mics: ",mics);
        setMics(mics);
      } catch (e) {
        console.log(e);
      }
    }

    const handleMute = () => {
      /*      
      setIsMicOn((current) => !current);
      localStream?.getAudioTracks().forEach((track)=> track.enabled = isMicon)
      이렇게 해도 실행은 되지만, isMicOn이 마운트 되는지에 따라서, 반응이 한발짝 느리다. 따라서, 아래와 같이 함수를 작성하는 게 바람직하다. 
      */
      if(isMicOn){
        localStream?.getAudioTracks().forEach((track)=> track.enabled = false);
      }
      else{
        localStream?.getAudioTracks().forEach((track)=> track.enabled = true);
      }
      setIsMicOn((current) => !current);
      console.log(isMicOn);
    }
  
    const handleCameraOff = () => {
      if(isCameraOn){
        localStream?.getVideoTracks().forEach((track)=> track.enabled = false);
      }
      else{
        localStream?.getVideoTracks().forEach((track)=> track.enabled = true);
      }
      setIsCameraOn((current) => !current);
    }

    const cameraChangeHandle = (e: any) => {
      setCamera(e.target.value);
      getMedia();
      if (myPeerConnection) {
        const videoTrack = localStream.getVideoTracks()[0];
        const videoSender = myPeerConnection
          .getSenders()
          .find((sender:RTCRtpSender) => sender.track ? sender.track.kind === "video" : console.log("there is no sender"));
        videoSender?.replaceTrack(videoTrack);
      if (isCameraOn) {
        localStream?.getVideoTracks().forEach((track) => (track.enabled = false));
        } else {
        localStream?.getVideoTracks().forEach((track) => (track.enabled = true));
        }
    }
  }

    const micChangeHandle = (e: any)=> {
      setMic(e.target.value);
      getMedia();
      if (isMicOn) {//마이크 음소거를 해뒀으면, 오디오 트렉을 어떻게 해둘지 다시 재설정.
        localStream?.getAudioTracks().forEach((track) => (track.enabled = false));
        } else {
        localStream?.getAudioTracks().forEach((track) => (track.enabled = true));
        }
    }

    const RoomNameChangeHandler = (e:any) => {
      roomName = e.target.value;
    }
    /** 
     * const sendMessage = async () => {
    const message: IMsg = {
      user,
      msg,
    };
    if(msg.trim() !== ""){ // 공백 제거 후에, 제출을 하기 위해서는 , trim을 한 번 해줘야 한다. 
      socket.emit("createdMessage", message);
      setMsg('');  
    } */
    const roomEnterHandler = async (e: any) => {
      e.preventDefault();
      console.log("socket :", socket);
      await initCall();
      socket.emit("join_room", roomName, () => {
        console.log("You entered in Room : ", roomName );
      }); 
      setIsEnter(current => !current);

    }
    //RTCPeerConnect 연결 함수
    const makeConnection = () => {
      myPeerConnection = new RTCPeerConnection();
      
      myPeerConnection.addEventListener("icecandidate", handleIce);
      myPeerConnection.addEventListener("addstream", handleAddStream);
      console.log("localStream : ", localStream);
      localStream?.getTracks().forEach((track) => myPeerConnection.addTrack(track, localStream));
      console.log(myPeerConnection);  

    }

    const handleIce = (data : any) => {
      console.log("sent candidate");
      socket.emit("ice", data.candidate, roomName);
    }

    const handleAddStream = (data : any) => {
      console.log("addStream is on");
      setPeerStream(data.stream);
    }

    const generateUniqueId = () => {
      return Math.random().toString(36).substring(2, 10); // 무작위 문자열을 생성합니다.
    };
    
    return (<>
    

    <h1 className="text-3xl font-semibold mb-4 text-center m-6">방 목록</h1>      
    <div>
      {!isEnter ? 
    <div>
      <form onSubmit={roomEnterHandler} className="p-4  border-gray-300 rounded-lg ">
          <input
            onChange={RoomNameChangeHandler}
            required
            placeholder="방 번호를 입력해주세요"
            className="w-4/6 p-2 border border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-1/6 mt-2 border bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 transition-colors"
          >
            Enter Room 
          </button>
          <button
            className="w-1/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Make Room 
           </button>
      
      </form>
    
      {isModalOpen && (
        <CreateRoomModal closeModal={closeModal} /> // 모달 컴포넌트를 렌더링하고 closeModal 함수를 전달합니다.
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* 사이드바 */}
          <div className="col-span-1 md:col-span-1 ml-4">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">공부 종류</h2>
              <div className ="bg-gray-100">
                <ul className="mt-2 list-disc pl-4">
                  {/* DB Change */}
                    <li className="text-blue-500 hover:underline">코딩</li>
                    <li className="text-blue-500 hover:underline">토익</li>
                    <li className="text-blue-500 hover:underline">수능</li>            
                </ul>
              </div>
            </div>
          </div>

          {/* 방 목록 */}
      <div className="col-span-1 md:col-span-4">
        <div className="grid grid-cols-2 gap-4">
          {
            rooms.map((data, index)=> {
              return (
                <div className="bg-gray-300 p-4 text-center hover:opacity-50"
                key={index}>
                <RoomCard roomName={data.roomName} backgroundImage={data.roomName}
                    deadLine={data.deadLine} studyTime={data.studyTime} member ={data.member} />
                </div>
              )
            })
          }

          </div>
        </div>
      </div>
    </div>: 
      
      <div>
        {/* 방 내부 */}
        <h1>방 이름 : {roomName}</h1>
        <RTCVideo
          mediaStream = {localStream}
        />
        
        <button onClick={handleMute}>Mute</button>
        <button onClick={handleCameraOff}>Camera Off</button>
        <br/>
        <RTCVideo
          mediaStream = {peerStream}
        />
        <div>
          <select onChange={cameraChangeHandle}>{cameras?.map((e, i) => {
            return (
            <option value={e.deviceId} key={i}>
              {e.label}
              </option>)}
              )}
          </select>    
          <select onChange={micChangeHandle}>{mics?.map((e, i) => {
            return (
            <option value={e.deviceId} key={i}>
              {e.label}
              </option>
              )}
              )}
          </select>
        </div>
      </div>}
    </div>
    </>
    );
  };


