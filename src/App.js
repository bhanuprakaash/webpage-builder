import React, { useState, useEffect, useRef } from "react";
import SidePanel from "./components/SidePanel";
import Canvas from "./components/Canvas";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosAddCircleOutline } from "react-icons/io";

function App() {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState("100%");
  const canvasRef = useRef(null);

  useEffect(() => {
    if (showSidePanel) {
      setCanvasWidth("30%");
    } else {
      setCanvasWidth("90%");
    }
  }, [showSidePanel]);

  return (
    <div className={`app-container ${showSidePanel ? "panel-open" : ""}`}>
      <DndProvider backend={HTML5Backend}>
        <div className="canvas-container">
          <Canvas ref={canvasRef} style={{ width: canvasWidth }} />
          <button
            className="open-panel-btn"
            onClick={() => setShowSidePanel(!showSidePanel)}
          >
            <IoIosAddCircleOutline />
          </button>
          {showSidePanel && (
            <SidePanel closePanel={() => setShowSidePanel(false)} />
          )}
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
