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
        directions.unshift('N');
       // Inside your navigateWithInstructions function after generating directions
        const moves = [];

        for (let i = 0; i < directions.length - 1; i++) {
          const currentDirection = directions[i];
          const nextDirection = directions[i + 1];
          const moveInstruction = generateMoveInstruction(currentDirection, nextDirection);
          moves.push(moveInstruction);
        }
        return { path, directions,moves};
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
  function generateMoveInstruction(currentDirection, nextDirection) {
    // Define a mapping of cardinal directions to move instructions
    const directionsMap = {
      N: 'straight',
      E: 'right',
      S: 'turn around',
      W: 'left',
    };
  
    // Check if the directions are valid
    if (!directionsMap[currentDirection] || !directionsMap[nextDirection]) {
      return 'unknown move'; // Handle invalid directions
    }
  
    // Determine the move instruction
    if (currentDirection === nextDirection) {
      return 'straight'; // If the current direction is the same as the next direction
    } else if (currentDirection === 'N' && nextDirection === 'E') {
      return 'right'; // Turn right from North to East
    }else if (currentDirection === 'N' && nextDirection === 'W') {
      return 'left'; // Turn left from North to West
    }else if (currentDirection === 'N' && nextDirection === 'S') {
      return 'turnaround'; // Turn turnaround from North to south
    }else if (currentDirection === 'E' && nextDirection === 'N') {
      return 'left'; // Turn left from East to North
    } else if (currentDirection === 'E' && nextDirection === 'S') {
      return 'right'; // Turn right from East to South
    }else if (currentDirection === 'E' && nextDirection === 'W') {
      return 'turnaround'; // Turn turnaround from East to West
    }  else if (currentDirection === 'S' && nextDirection === 'E') {
      return 'left'; // Turn left from South to East
    } else if (currentDirection === 'S' && nextDirection === 'W') {
      return 'right'; // Turn right from South to West
    }  else if (currentDirection === 'S' && nextDirection === 'N') {
      return 'turnaround'; // Turn turnaround from West to South
    }else if (currentDirection === 'W' && nextDirection === 'N') {
      return 'right'; // Turn right from West to North
    } else if (currentDirection === 'W' && nextDirection === 'S') {
      return 'left'; // Turn left from West to South
    } else if (currentDirection === 'W' && nextDirection === 'E') {
      return 'turnaround'; // Turn turnaround from West to South
    }else {
      return 'unknown move'; // Handle other cases
    }
  }
  
  

  export default navigateWithInstructions;
  