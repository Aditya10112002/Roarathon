function navigateWithInstructions(graph, startRoom, endRoom) {
  const visited = new Set();
  const queue = [];

  // Initialize the queue with the start room and path
  queue.push({ room: startRoom, path: [{ room: startRoom, UUID: graph.get(startRoom).UUID }] });

  while (queue.length > 0) {
    const { room, path } = queue.shift();

    if (room === endRoom) {
      // Found the destination room
      const directions = generateDirectionsFromPath(graph, path.map((step) => step.room));
      directions.unshift('N,00');

      const moves = [];

      for (let i = 0; i < directions.length - 1; i++) {
        const currentDirection = directions[i];
        const nextDirection = directions[i + 1];
        const moveInstruction = generateMoveInstruction(currentDirection, nextDirection);
        moves.push(moveInstruction);
      }

      return { path, directions, moves };
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
          const connectedRoomData = graph.get(connectedRoom);
          if (connectedRoomData) {
            const newPathStep = { room: connectedRoom, UUID: connectedRoomData.UUID };
            const newPath = [...path, newPathStep];
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
      return "N,"+Math.abs(dy); // North
      return "N,"+Math.abs(dy); // North
    } else if (dx >0 && dy === 0) {
      return "E,"+Math.abs(dx); // East
      return "E,"+Math.abs(dx); // East
    } else if (dx === 0 && dy <0) {
      return "S,"+Math.abs(dy); // South
      return "S,"+Math.abs(dy); // South
    } else if (dx <0 && dy === 0) {
      return "W,"+Math.abs(dx); // West
      return "W,"+Math.abs(dx); // West
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
    if (!directionsMap[currentDirection[0]] || !directionsMap[nextDirection[0]]) {
    if (!directionsMap[currentDirection[0]] || !directionsMap[nextDirection[0]]) {
      return 'unknown move'; // Handle invalid directions
    }
    // Determine the move instruction
    if (currentDirection[0] === nextDirection[0]) {
      return 'move straight for '+nextDirection.slice(2)+' units'; // If the current direction is the same as the next direction
    } else if (currentDirection[0] === 'N' && nextDirection[0] === 'E') {
      return 'turn right and walk for '+nextDirection.slice(2)+' units'; // Turn right from North to East
    }else if (currentDirection[0] === 'N' && nextDirection[0] === 'W') {
      return 'turn left and walk for '+nextDirection.slice(2)+' units'; // Turn left from North to West
    }else if (currentDirection[0] === 'N' && nextDirection[0] === 'S') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from North to south
    }else if (currentDirection[0]=== 'E' && nextDirection[0] === 'N') {
      return 'turn left and walk for '+nextDirection.slice(2)+' units'; // Turn left from East to North
    } else if (currentDirection[0] === 'E' && nextDirection[0] === 'S') {
      return 'turn right and walk for '+nextDirection.slice(2)+' units'; // Turn right from East to South
    }else if (currentDirection[0] === 'E' && nextDirection[0] === 'W') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from East to West
    }  else if (currentDirection[0] === 'S' && nextDirection[0] === 'E') {
      return 'turn left and walk for '+nextDirection.slice(2)+' units'; // Turn left from South to East
    } else if (currentDirection[0] === 'S' && nextDirection[0] === 'W') {
      return 'turn right and walk for '+nextDirection.slice(2)+' units'; // Turn right from South to West
    }  else if (currentDirection[0]=== 'S' && nextDirection[0] === 'N') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from West to South
    }else if (currentDirection[0] === 'W' && nextDirection[0] === 'N') {
      return 'turn right and move for '+nextDirection.slice(2)+' units'; // Turn right from West to North
    } else if (currentDirection[0] === 'W' && nextDirection[0] === 'S') {
      return 'turn left and move for '+nextDirection.slice(2)+' units'; // Turn left from West to South
    } else if (currentDirection[0] === 'W' && nextDirection[0] === 'E') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from West to South
    if (currentDirection[0] === nextDirection[0]) {
      return 'move straight for '+nextDirection.slice(2)+' units'; // If the current direction is the same as the next direction
    } else if (currentDirection[0] === 'N' && nextDirection[0] === 'E') {
      return 'turn right and walk for '+nextDirection.slice(2)+' units'; // Turn right from North to East
    }else if (currentDirection[0] === 'N' && nextDirection[0] === 'W') {
      return 'turn left and walk for '+nextDirection.slice(2)+' units'; // Turn left from North to West
    }else if (currentDirection[0] === 'N' && nextDirection[0] === 'S') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from North to south
    }else if (currentDirection[0]=== 'E' && nextDirection[0] === 'N') {
      return 'turn left and walk for '+nextDirection.slice(2)+' units'; // Turn left from East to North
    } else if (currentDirection[0] === 'E' && nextDirection[0] === 'S') {
      return 'turn right and walk for '+nextDirection.slice(2)+' units'; // Turn right from East to South
    }else if (currentDirection[0] === 'E' && nextDirection[0] === 'W') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from East to West
    }  else if (currentDirection[0] === 'S' && nextDirection[0] === 'E') {
      return 'turn left and walk for '+nextDirection.slice(2)+' units'; // Turn left from South to East
    } else if (currentDirection[0] === 'S' && nextDirection[0] === 'W') {
      return 'turn right and walk for '+nextDirection.slice(2)+' units'; // Turn right from South to West
    }  else if (currentDirection[0]=== 'S' && nextDirection[0] === 'N') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from West to South
    }else if (currentDirection[0] === 'W' && nextDirection[0] === 'N') {
      return 'turn right and move for '+nextDirection.slice(2)+' units'; // Turn right from West to North
    } else if (currentDirection[0] === 'W' && nextDirection[0] === 'S') {
      return 'turn left and move for '+nextDirection.slice(2)+' units'; // Turn left from West to South
    } else if (currentDirection[0] === 'W' && nextDirection[0] === 'E') {
      return 'turn around and move straight for '+nextDirection.slice(2)+' units'; // Turn turnaround from West to South
    }else {
      return 'unknown move'; // Handle other cases
    }
  }

  export default navigateWithInstructions;
  