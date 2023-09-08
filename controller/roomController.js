// Import the initializeGraph function
import initializeGraph from "../logic/graph.js";
import navigateWithInstructions from "../logic/path.js";

export const navigate = async (req, res) => {
    try { 
        const startRoom = req.body.startRoom;
        const endRoom = req.body.endRoom;
      
        // Initialize the graph as a Map
        const graph = await initializeGraph(); // Assuming initializeGraph returns a Promise
      
        if (!startRoom || !endRoom) {
          return res.status(400).json({ error: "Invalid parameters" });
        }
      
        if (!graph.has(startRoom) || !graph.has(endRoom)) {
          return res.status(404).json({ error: "Room not found" });
        }
      
        const directions = navigateWithInstructions(graph, startRoom, endRoom);
    
    if (directions === null) {
      return res.status(404).json({ error: "No valid path found" });
    }

    // Return the directions list in the JSON response
    res.json({ directions });
      
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}
