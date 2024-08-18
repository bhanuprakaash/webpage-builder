import React from "react";
import { useDrag } from "react-dnd";
import "../App.css";
import { IoIosCloseCircle } from "react-icons/io";

const SidePanel = ({ closePanel }) => {
  const components = [
    { name: "Navbar", image: "/images/navbar.png" },
    { name: "Hero", image: "/images/hero.png" },
    { name: "Features", image: "/images/features.png" },
  ];

  return (
    <div className="side-panel">
      <button onClick={closePanel} className="cancel-button-in-side-panel">
        <IoIosCloseCircle />
      </button>
      {components.map((component, index) => (
        <DraggableComponent
          key={index}
          name={component.name}
          image={component.image}
        />
      ))}
    </div>
  );
};

function DraggableComponent({ name, image }) {
  //eslint-disable-next-line
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="draggable-component">
      <img src={image} alt={name} className="component-image" />
      <p>{name}</p>
    </div>
  );
}

export default SidePanel;
