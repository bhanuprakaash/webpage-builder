import React, { useState, useRef, forwardRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import FeaturesComponent from "./templates/FeaturesComponent";
import HeroComponent from "./templates/HeroComponent";
import NavbarComponent from "./templates/NavbarComponent";
import "../App.css";
import { IoSwapVerticalSharp } from "react-icons/io5";

const Canvas = forwardRef((props, ref) => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item) => addComponentToCanvas(item.name),
  }));

  const addComponentToCanvas = (name) => {
    if (name) {
      setDroppedComponents((prev) => [...prev, { name, id: Date.now() }]);
    }
  };

  const moveComponent = (dragIndex, hoverIndex) => {
    const newOrder = [...droppedComponents];
    const [draggedComponent] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedComponent);
    setDroppedComponents(newOrder);
  };

  return (
    <div ref={drop} className="canvas" style={{ width: "100%" }}>
      {droppedComponents.map((component, index) => (
        <DroppedComponent
          key={component.id}
          component={component}
          index={index}
          moveComponent={moveComponent}
        />
      ))}
    </div>
  );
});

const DroppedComponent = ({ component, index, moveComponent }) => {
  const ref = useRef(null);
  const dragHandleRef = useRef(null); 

  const [, drop] = useDrop({
    accept: "COMPONENT",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "COMPONENT",
    item: { type: "COMPONENT", index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragHandleRef);

  drop(ref);
  preview(ref);

  const opacity = isDragging ? 0.5 : 1;

  if (!component.name) {
    return null;
  }

  return (
    <div ref={ref} style={{ opacity, position: "relative" }}>
      <div
        ref={dragHandleRef}
        style={{
          width: "20px",
          fontSize: "20px",
          position: "absolute",
          top: "-20px",
          right: "70px",
          cursor: "move",
          zIndex: 1,
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <IoSwapVerticalSharp />
      </div>
      {renderComponentByName(component.name)}
    </div>
  );
};

function renderComponentByName(name) {
  switch (name) {
    case "Navbar":
      return <NavbarComponent />;
    case "Hero":
      return <HeroComponent />;
    case "Features":
      return <FeaturesComponent />;
    default:
      return null;
  }
}

export default Canvas;
