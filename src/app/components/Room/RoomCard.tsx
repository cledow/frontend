import {useState} from 'react';


type RoomCardProps = {
  roomName: string;
  backgroundImage : string;
  deadLine: string;
  studyTime: string;
  member: string;
}

const RoomCard:React.FC<RoomCardProps> = ({roomName, backgroundImage, deadLine, studyTime, member}) => {

    const [roomOn,setRoomOn] = useState<boolean>(true);

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 relative">
      {/* On/Off 표시 */}
      <span
        className={`absolute top-0 right-0 mt-2 mr-2 text-4xl font-semibold ${
            roomOn ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {roomOn ? 'On' : 'Off'}
      </span>
      <h1 className="text-xl font-semibold mb-2">{roomName}</h1>
      <div>
        <h2 className="text-lg mb-1">기간: {deadLine}까지</h2>
        <h2 className="text-lg mb-1">주요 공부 시간: {studyTime}</h2>
        <h2 className="text-lg">인원: {member}</h2>
      </div>
    </div>
      );
};








export default RoomCard;
