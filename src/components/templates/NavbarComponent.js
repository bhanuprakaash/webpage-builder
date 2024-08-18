import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../styles/NavbarComponent.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosColorPalette, IoIosAdd } from "react-icons/io";
import { RiFontSize, RiDeleteBin6Line, RiLink } from "react-icons/ri";
import { HiMiniQueueList } from "react-icons/hi2";
import { IoSettingsSharp } from "react-icons/io5";
import { FaReact } from "react-icons/fa";

function NavbarComponent() {
  const [title, setTitle] = useState("My Website");
  const [navItems, setNavItems] = useState([
    {
      text: "Home",
      color: "#000000",
      fontSize: "16px",
      dropdown: [],
      isOpen: false,
      navigation: "#",
    },
    {
      text: "About",
      color: "#000000",
      fontSize: "16px",
      dropdown: [],
      isOpen: false,
      navigation: "#",
    },
    {
      text: "Services",
      color: "#000000",
      fontSize: "16px",
      dropdown: [],
      isOpen: false,
      navigation: "#",
    },
    {
      text: "Contact",
      color: "#000000",
      fontSize: "16px",
      dropdown: [],
      isOpen: false,
      navigation: "#",
    },
  ]);
  const [colorPalette] = useState([
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#800000",
  ]);
  const [fontSizes] = useState([
    { label: "Heading", value: "24px" },
    { label: "Menu", value: "16px" },
    { label: "Text", value: "14px" },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navbarRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const [brandNameVisible, setBrandNameVisible] = useState(true);
  const [logoSize, setLogoSize] = useState(50); // Default logo size
  const [menuAlignment, setMenuAlignment] = useState("center"); // Default alignment
  const [navLinksVisible, setNavLinksVisible] = useState(true); // State to toggle nav links visibility
  const [navbarBgColor, setNavbarBgColor] = useState("#ffffff"); // State for background color
  const [brandNameColor, setBrandNameColor] = useState("#000000");
  const menuRef = useRef(null);
  const [navbarVisible, setNavbarVisible] = useState(true); // State to manage navbar visibility
  const [logoUrl, setLogoUrl] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const handleLogoVisibility = () => setLogoVisible(!logoVisible);
  const handleBrandNameVisibility = () =>
    setBrandNameVisible(!brandNameVisible);
  const handleLogoSizeChange = (e) => setLogoSize(e.target.value);
  const handleMenuAlignmentChange = (e) => setMenuAlignment(e.target.value);
  const handleNavLinksVisibility = () => setNavLinksVisible(!navLinksVisible);
  const handleBgColorChange = (e) => setNavbarBgColor(e.target.value);
  const handleBrandNameColorChange = (e) => setBrandNameColor(e.target.value);
  const handleDeleteNavbar = () => setNavbarVisible(false); // Handler to delete the navbar

  const addSubNavItem = (index) => {
    const updatedNavItems = [...navItems];
    updatedNavItems[index].dropdown.push({
      text: "Services",
      color: "#000000",
      fontSize: "16px",
      navigation: "#",
    });
    setNavItems(updatedNavItems);
  };

  const toggleDropdown = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const editNavItem = (index, newValue) => {
    const newItems = [...navItems];
    newItems[index].text = newValue;
    setNavItems(newItems);
  };

  const editSubNavItem = (navIndex, subNavIndex, newText) => {
    const updatedNavItems = [...navItems];
    updatedNavItems[navIndex].dropdown[subNavIndex].text = newText;
    setNavItems(updatedNavItems);
  };

  const addNavItem = (index) => {
    const newItems = [...navItems];
    newItems.splice(index + 1, 0, { ...newItems[index], dropdown: [] });
    setNavItems(newItems);
  };

  const removeNavItem = (index) => {
    const newItems = [...navItems];
    if (newItems.length > 1) {
      newItems.splice(index, 1);
      setNavItems(newItems);
    }
  };

  const moveNavItem = (index, direction) => {
    const newItems = [...navItems];
    const [removedItem] = newItems.splice(index, 1);
    const newIndex = direction === "left" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex <= newItems.length) {
      newItems.splice(newIndex, 0, removedItem);
      setNavItems(newItems);
    }
  };

  const changeColor = (index, color) => {
    const newItems = [...navItems];
    newItems[index].color = color;
    setNavItems(newItems);
    setShowColorPicker(false);
  };

  const changeFontSize = (index, size) => {
    const newItems = [...navItems];
    newItems[index].fontSize = size;
    setNavItems(newItems);
    setShowFontSizePicker(false);
  };

  const handleColorButtonClick = (index) => {
    setActiveIndex(index);
    setShowColorPicker(!showColorPicker);
    setShowFontSizePicker(false);
  };

  const handleFontSizeButtonClick = (index) => {
    setActiveIndex(index);
    setShowFontSizePicker(!showFontSizePicker);
    setShowColorPicker(false);
  };

  const handleButtonClick = (e, index, action) => {
    e.stopPropagation();
    action(index);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };

  const handleClickOutsideForMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false); 
    }
  };

  const handleLinkClick = (index) => {
    const newLink = window.prompt("Enter the navigation URL:");

    if (newLink) {
      setNavItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index ? { ...item, navigation: newLink } : item
        )
      );
    }
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutsideForMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideForMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideForMenu);
    };
  }, [showMenu]);

  const handleLogoInput = () => {
    const url = window.prompt("Enter the logo URL:");
    if (url) {
      setLogoUrl(url);
    }
  };

  const handleAddSubNavItem = (navIndex, subIndex) => {
    const newDropdown = [...navItems[navIndex].dropdown];
    newDropdown.splice(subIndex + 1, 0, {
      text: "Services",
      color: "#000000",
      fontSize: "16px",
      navigation: "#",
    });
    setNavItems((prevItems) =>
      prevItems.map((item, index) =>
        index === navIndex ? { ...item, dropdown: newDropdown } : item
      )
    );
  };

  const handleDeleteSubNavItem = (navIndex, subIndex) => {
    const newDropdown = navItems[navIndex].dropdown.filter(
      (_, index) => index !== subIndex
    );
    setNavItems((prevItems) =>
      prevItems.map((item, index) =>
        index === navIndex ? { ...item, dropdown: newDropdown } : item
      )
    );
  };

  return (
    <>
      {navbarVisible && (
        <nav
          className="navbar navbar-expand-lg navbar-light custom-navbar"
          style={{ backgroundColor: `${navbarBgColor}` }}
          ref={navbarRef}
          onClick={handleShowSettings}
        >
          <div className="container-fluid">
            {logoVisible && (
              <h1
                alt="Logo"
                onClick={handleLogoInput} 
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer", 
                }}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    style={{
                      width: `${logoSize}px`,
                      height: `${logoSize}px`,
                      objectFit: "contain",
                      border: "none",
                    }}
                  />
                ) : (
                  <FaReact />
                )}
              </h1>
            )}
            {brandNameVisible && (
              <h1
                className="navbar-brand responsive-navbar-brand"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setTitle(e.target.innerText)}
                style={{
                  backgroundColor: navbarBgColor,
                  color: brandNameColor,
                  textAlign: "left",
                  margin: 0,
                  width: "170px",
                  overflow: "hidden",
                }}
              >
                {title}
              </h1>
            )}
            <button
              className="navbar-toggler custom-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse justify-content-${menuAlignment}`}
              id="navbarNav"
            >
              {navLinksVisible && (
                <ul className="navbar-nav">
                  {navItems.map((item, index) => (
                    <li key={index} className="nav-item">
                      <div className="nav-item-container justify-content-between">
                        <a
                          href={item.navigation} 
                          className="nav-link "
                          style={{
                            color: item.color,
                            fontSize: item.fontSize,
                            textAlign: "center",
                            marginRight: "35px",
                          }}
                          contentEditable 
                          suppressContentEditableWarning
                          onBlur={(e) => editNavItem(index, e.target.innerText)} 
                          onClick={() => toggleDropdown(index)}
                        >
                          {item.text}
                        </a>
                        {openIndex === index && item.dropdown.length > 0 && (
                          <ul className="sub-nav">
                            {item.dropdown.map((subItem, subIndex) => (
                              <li key={subIndex} className="sub-nav-item">
                                <a
                                  href={subItem.navigation}
                                  className="nav-link"
                                  style={{
                                    color: subItem.color,
                                    fontSize: subItem.fontSize,
                                    marginLeft: "30px",
                                  }}
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) =>
                                    editSubNavItem(
                                      index,
                                      subIndex,
                                      e.target.innerText
                                    )
                                  }
                                >
                                  {subItem.text}
                                </a>
                                <div className="sub-nav-buttons">
                                  <button
                                    className="btn btn-md me-1"
                                    onClick={() =>
                                      handleAddSubNavItem(index, subIndex)
                                    }
                                  >
                                    <IoIosAdd />
                                  </button>
                                  <button
                                    className="btn btn-md me-1"
                                    onClick={() =>
                                      handleDeleteSubNavItem(index, subIndex)
                                    }
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="nav-buttons">
                          <button
                            className="btn btn-md me-1"
                            onClick={(e) =>
                              handleButtonClick(e, index, addNavItem)
                            }
                          >
                            <IoIosAdd />
                          </button>
                          <button
                            className="btn btn-md me-1"
                            onClick={(e) =>
                              handleButtonClick(e, index, removeNavItem)
                            }
                          >
                            <RiDeleteBin6Line />
                          </button>
                          <button
                            className="btn btn-md me-1"
                            onClick={() => moveNavItem(index, "left")}
                          >
                            <FaArrowLeft />
                          </button>
                          <button
                            className="btn btn-md me-1"
                            onClick={() => moveNavItem(index, "right")}
                          >
                            <FaArrowRight />
                          </button>
                          <button
                            className="btn btn-md me-1"
                            onClick={() => handleColorButtonClick(index)}
                          >
                            <IoIosColorPalette />
                          </button>
                          {showColorPicker && (
                            <div className="color-picker">
                              {colorPalette.map((color) => (
                                <button
                                  key={color}
                                  className="color-picker-button"
                                  style={{ backgroundColor: color }}
                                  onClick={() =>
                                    changeColor(activeIndex, color)
                                  }
                                />
                              ))}
                            </div>
                          )}
                          <button
                            className="btn btn-md me-1"
                            onClick={() => handleFontSizeButtonClick(index)}
                          >
                            <RiFontSize />
                          </button>
                          {showFontSizePicker && (
                            <div className="font-size-picker">
                              {fontSizes.map((size) => (
                                <button
                                  key={size.label} // Use label property for unique key
                                  className="font-size-picker-button"
                                  onClick={() =>
                                    changeFontSize(activeIndex, size.value)
                                  } // Use value for changeFontSize
                                >
                                  {size.label}
                                </button>
                              ))}
                            </div>
                          )}
                          <button
                            className="btn btn-md"
                            onClick={() => addSubNavItem(index)}
                          >
                            <HiMiniQueueList />
                          </button>
                          <button
                            className="btn btn-md me-1"
                            onClick={() => handleLinkClick(index)} 
                          >
                            <RiLink />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {showSettings && (
            <button
              variant="outline-primary"
              className="settings-btn position-absolute top-0 end-0 translate-middle-y"
              onClick={handleShowMenu}
            >
              <IoSettingsSharp />
            </button>
          )}
          {showMenu && (
            <div className="menu-box" ref={menuRef}>
              <div className="menu-title">Show/Hide</div>
              <hr />
              <div className="menu-content">
                <div className="check-box-container">
                  <div className="checkbox-div">
                    <label htmlFor="logo-check-box">Logo</label>
                    <input
                      type="checkbox"
                      id="logo-check-box"
                      checked={logoVisible}
                      onChange={handleLogoVisibility}
                    />
                  </div>
                  <div className="checkbox-div">
                    <label htmlFor="brand-name-check-box">Brand Name</label>
                    <input
                      type="checkbox"
                      id="brand-name-check-box"
                      checked={brandNameVisible}
                      onChange={handleBrandNameVisibility}
                    />
                  </div>
                  <div className="checkbox-div">
                    <label htmlFor="nav-links-check-box">Menu Items</label>
                    <input
                      type="checkbox"
                      id="nav-links-check-box"
                      checked={navLinksVisible}
                      onChange={handleNavLinksVisibility}
                    />
                  </div>
                </div>
                <div className="menu-item">
                  <label>Logo Size</label>
                  <input
                    type="number"
                    style={{
                      width: "60px",
                      border: "none",
                      outline: "none",
                      borderBottom: "1px solid black",
                    }}
                    value={logoSize}
                    min={40}
                    max={48}
                    onChange={handleLogoSizeChange}
                  />
                </div>
                <div className="menu-item">
                  <label htmlFor="menu-items-align">Menu Items Align</label>
                  <select
                    id="menu-items-align"
                    value={menuAlignment}
                    onChange={handleMenuAlignmentChange}
                  >
                    <option value="start">Left</option>
                    <option value="center">Center</option>
                    <option value="end">Right</option>
                  </select>
                </div>
                <div className="menu-item">
                  <label>Background Color</label>
                  <input
                    type="color"
                    value={navbarBgColor}
                    onChange={handleBgColorChange}
                    style={{ border: "none", outline: "none" }}
                  />
                </div>
                <div className="menu-item">
                  <label>Brand Name Color</label>
                  <input
                    type="color"
                    value={brandNameColor}
                    onChange={handleBrandNameColorChange}
                    style={{ border: "none", outline: "none" }}
                  />
                </div>
                <div className="menu-item">
                  <button
                    onClick={handleDeleteNavbar}
                    style={{
                      color: "red",
                      border: "none",
                      background: "transparent",
                    }}
                  >
                    Delete Navbar
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
}

export default NavbarComponent;
