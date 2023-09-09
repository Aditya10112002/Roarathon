function navigateWithInstructions(graph, startRoom, endRoom) {
    const visited = new Set();
    const queue = [];
  
    // Initialize the queue with the start room and path
    queue.push({ room: startRoom, path: [startRoom] });
  
    while (queue.length > 0) {
      const { room, path } = queue.shift();
  
      if (room === endRoom) {
        // Found the destination room
        const directions = generateDirectionsFromPath(graph, path);
        const instructions=leftright(directions);
        return { path, directions, instructions};
      }
  
      if (!visited.has(room)) {
        visited.add(room);
  
        const roomData = graph.get(room);
  
        if (!roomData) {
          // Handle the case where roomData is missing or undefined
          return null; // or throw an error or handle it as needed
        }
  
        const nextRooms = roomData.connectedRooms;
  
        if (!nextRooms) {
          // Handle the case where connectedRooms is missing or undefined
          return null; // or throw an error or handle it as needed
        }
  
        for (const connectedRoom of nextRooms) {
          if (!visited.has(connectedRoom)) {
            const newPath = [...path, connectedRoom];
            queue.push({ room: connectedRoom, path: newPath });
          }
        }
      }
    }
  
    // No path found
    return null;
  }
  
  function generateDirectionsFromPath(graph, path) {
    const directions = [];
  
    for (let i = 0; i < path.length - 1; i++) {
      const currentRoom = path[i];
      const nextRoom = path[i + 1];
      const direction = determineDirection(graph.get(currentRoom), graph.get(nextRoom));
      directions.push(direction);
    }
  
    return directions;
  }
  
  function determineDirection(currentRoomData, nextRoomData) {
    if (!currentRoomData || !nextRoomData) {
      // Handle the case where room data is missing or undefined
      return "unknown direction"; // or throw an error or handle it as needed
    }
  
    const dx = nextRoomData.x - currentRoomData.x;
    const dy = nextRoomData.y - currentRoomData.y;
  
    if (dx === 0 && dy >0) {
      return "N"; // North
    } else if (dx >0 && dy === 0) {
      return "E"; // East
    } else if (dx === 0 && dy <0) {
      return "S"; // South
    } else if (dx <0 && dy === 0) {
      return "W"; // West
    } else {
      return "unknown direction"; // Handle other cases as needed
    }
  }
  
  function leftright(directions){
    return "fhfhj";
  }
  export default navigateWithInstructions;
  