// Import the initializeGraph function
import initializeGraph from "../logic/graph.js";
import navigateWithInstructions from "../logic/path.js";
import Room from "../model/roomschema.js";


export const getRooms = async (req, res) => {
  try {
    const allRooms = await Room.find({});
    // console.log("allRooms:\n", allRooms);
    let rooms;

    if (req.params.id != 0) {
      rooms = allRooms
        .filter((room) => room.UUID != req.params.id)
        .map(({ UUID, room }) => ({ UUID, room }));

    } else {
      rooms = allRooms.map(({ UUID, room }) => ({ UUID, room }));
    }
    // console.log("Rooms fetched from the database:", rooms);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHelpers = async (req, res) => {
  try {
    const allRooms = await Room.find({helper: true});
    let rooms = allRooms.map(({ UUID, room }) => ({ UUID, room }));
    
    res.status(200).json(rooms);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const navigate = async (req, res) => {
    try { 
        const startRoomId = req.body.startRoom;
        const endRoomId = req.body.endRoom;

        const startRoomObj = await Room.findOne({ UUID: startRoomId });
        const endRoomObj = await Room.findOne({ UUID: endRoomId });

        const startRoom = startRoomObj.room;
        const endRoom = endRoomObj.room;

        //  console.log("startRoom:\n", startRoom);
        // console.log("endRoom:\n", endRoom);


        const graph = await initializeGraph();
      
        if (!startRoom || !endRoom) {
          return res.status(400).json({ error: "Invalid parameters" });
        }
      
        if (!graph.has(startRoom) || !graph.has(endRoom)) {
          return res.status(404).json({ error: "Room not found" });
        }
        const navigation = navigateWithInstructions(graph, startRoom, endRoom);
        console.log(navigation);
    if (navigation === null) {
      return res.status(404).json({ error: "No valid path found" });
    }

    res.json(navigation);
      
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}
