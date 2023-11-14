export const getAllRooms = async () => {
    const res = await fetch('http://localhost:3000/api/rooms', { cache: 'no-store' });
    const rooms = await res.json();
    return rooms;
  }
  
  export const addRoom = async (room: any) => {
    const res = await fetch('api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    })
    const newRoom = await res.json();
    return newRoom;
  }
  
  export const editRoom = async (room: any) => {
    const res = await fetch('api/rooms', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    })
    const updatedRoom = await res.json();
    return updatedRoom;
  }
  
  export const deleteRoom = async (id: string) => {
    await fetch('api/rooms', {
      method: 'DELETE',
    })
  }