import Room from "../model/roomschema.js";

const initializeGraph = async () => {
  try {
    const rooms = await Room.find({});
    const graph = new Map();

    // console.log("Rooms fetched from the database:", rooms);

    rooms.forEach((room) => {
      const connectedRooms = room.connectedRooms || [];
      console.log(room.UUID) // Ensure it's an array
      graph.set(room.room, {
        x: room.x,
        y: room.y,
        connectedRooms,
        UUID:room.UUID,
      });
    });
    // console.log("Graph initialized:", graph); // Add this line to check the graph data
    return graph;
  } catch (error) {
    console.error("Error initializing graph:", error);
    throw error;
  }
};

export default initializeGraph;
