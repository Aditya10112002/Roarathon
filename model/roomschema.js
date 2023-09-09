import mongoose from 'mongoose'


const roomSchema = new mongoose.Schema({
    room: String,
    x: Number,
    y: Number,
    connectedRooms: [String],
    UUID: String
  });
  
  const Room = mongoose.model("Room", roomSchema);
  console.log(Room);
  export default Room;