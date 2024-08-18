import React, { useState, useRef, useEffect } from "react";
import "../../styles/FeaturesComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSettingsSharp } from "react-icons/io5";
import { RiFontSize, RiDeleteBin6Line } from "react-icons/ri";
import { FaBold, FaItalic } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";

const FeaturesComponent = () => {
  const calculateCardWidth = () => {
    let columns = featureColumns;
    if (window.innerWidth < 500) {
      columns = 1;
    } else if (window.innerWidth < 765) {
      columns = 2;
    }
    const cardWidth = `calc((100% - ${columns * 20}px) / ${columns})`;
    return { width: cardWidth };
  };
  const [cards, setCards] = useState([
    {
      id: 1,
      featureTitle: "Feature 1",
      featureDescription: "This is the description for feature 1.",
      image: "https://via.placeholder.com/150",
      buttonText: "Learn More",
    },
    {
      id: 2,
      featureTitle: "Feature 2",
      featureDescription: "This is the description for feature 2.",
      image: "https://via.placeholder.com/150",
      buttonText: "Learn More",
    },
  ]);
  const [featureSettingsOpen, setFeatureSettingsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [featureMarginTop, setFeatureMarginTop] = useState(0);
  const [featureMarginBottom, setFeatureMarginBottom] = useState(0);
  const [featureColumns, setFeatureColumns] = useState(4);
  const [showFeatureTitle, setShowFeatureTitle] = useState(true);
  const [showFeatureSubtitle, setShowFeatureSubtitle] = useState(true);
  const [autoSize, setAutoSize] = useState(false);
  const [spacing, setSpacing] = useState(10);
  const [showFeatureTitleToggle, setShowFeatureTitleToggle] = useState(true);
  const [showFeatureDescriptionToggle, setShowFeatureDescriptionToggle] = useState(true);
  const [showFeatureButtonsToggle, setShowFeatureButtonsToggle] =useState(true);
  const [featureBackgroundType, setFeatureBackgroundType] = useState("image");
  const [featureBackgroundColor, setFeatureBackgroundColor] =useState("#ffffff");
  const [featureBackgroundImage, setFeatureBackgroundImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const imageClassName = featureColumns === 1 ? "single-column-image" : "";
  const [showFeatureColorPicker, setShowFeatureColorPicker] = useState(false);
  const [showFeatureFontSizePicker, setShowFeatureFontSizePicker] =useState(false);
  const [showFeatureColorPickerSubtitle, setShowFeatureColorPickerSubtitle] =useState(false);
  const [
    showFeatureFontSizePickerSubtitle,
    setShowFeatureFontSizePickerSubtitle,
  ] = useState(false);
  //eslint-disable-next-line
  const [cardWidth, setCardWidth] = useState(calculateCardWidth());
  const [alignment, setAlignment] = useState("left"); 
  const [featureVisible, setFeatureVisible] = useState(true);
  const handleDeleteFeature = () => setFeatureVisible(false); 

  const [featureTitle, setFeatureTitle] = useState({
    text: "Features",
    color: "#333333",
    fontSize: "64px",
    fontWeight: "bold",
    fontStyle: "normal",
  });
  const [featureSubtitle, setFeatureSubtitle] = useState({
    text: "These are some of the features of our product.",
    color: "#333333",
    fontSize: "24px",
    fontWeight: "normal",
    fontStyle: "normal",
  });

  const handleTitleBlur = (e, index) => {
    const newTitle = e.target.textContent;
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, featureTitle: newTitle } : card
      )
    );
  };

  const handleDescriptionBlur = (e, index) => {
    const newDescription = e.target.textContent;
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, featureDescription: newDescription } : card
      )
    );
  };

  const fileInputRefs = useRef([]);

  const handleCardImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedCards = [...cards];
        updatedCards[index].image = reader.result;
        setCards(updatedCards);
      };
      reader.readAsDataURL(file);
    }
  };
  const triggerFileUpload = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const toggleFeatureSettings = () =>
    setFeatureSettingsOpen(!featureSettingsOpen);

  const addCard = (index) => {
    const newCard = {
      id: Date.now(),
      featureTitle: `Feature ${cards.length + 1}`,
      featureDescription: `This is the description for feature ${
        cards.length + 1
      }.`,
      image: "https://via.placeholder.com/150",
      buttonText: "Learn More",
    };

    const updatedCards = [...cards];
    updatedCards.splice(index + 1, 0, newCard);
    setCards(updatedCards);
  };

  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const swapCardLeft = (index) => {
    if (index > 0) {
      const updatedCards = [...cards];
      [updatedCards[index - 1], updatedCards[index]] = [
        updatedCards[index],
        updatedCards[index - 1],
      ];
      setCards(updatedCards);
    }
  };

  const swapCardRight = (index) => {
    if (index < cards.length - 1) {
      const updatedCards = [...cards];
      [updatedCards[index], updatedCards[index + 1]] = [
        updatedCards[index + 1],
        updatedCards[index],
      ];
      setCards(updatedCards);
    }
  };

  const hoverRefs = useRef([]);

  const showButtons = (index) => {
    if (hoverRefs.current[index]) {
      hoverRefs.current[index].style.display = "block";
    }
  };

  const hideButtons = (index) => {
    if (hoverRefs.current[index]) {
      hoverRefs.current[index].style.display = "none";
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFeatureBackgroundImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setCardWidth(calculateCardWidth());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {featureVisible && (
        <div
          className="container-fluid py-5 feature-section-container position-relative w-100"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
          style={{
            paddingLeft: !fullscreen ? "20px" : "0",
            paddingRight: !fullscreen ? "20px" : "0",
            marginTop: `${featureMarginTop}px`,
            marginBottom: `${featureMarginBottom}px`,
            backgroundColor:
              featureBackgroundType === "color"
                ? featureBackgroundColor
                : "white",
            backgroundImage:
              featureBackgroundType === "image" && featureBackgroundImage
                ? `url(${featureBackgroundImage})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <button
            className="btn btn-secondary btn-sm feature-settings-button top-0 end-0 translate-middle-y"
            onClick={toggleFeatureSettings}
            style={{
              display: isHovered ? "block" : "none",
              backgroundColor: "white",
              border: "none",
              padding: "5px 10px",
              fontSize: "20px",
            }}
          >
            <IoSettingsSharp color="black" />
          </button>
          {showFeatureTitle && (
            <div
              className="feature-title-container"
              style={{ textAlign: "center" }}
            >
              <h2
                contentEditable
                suppressContentEditableWarning
                className="feature-title"
                onBlur={(e) =>
                  setFeatureTitle({
                    ...featureTitle,
                    text: e.target.textContent,
                  })
                }
                style={{
                  fontWeight: featureTitle.fontWeight,
                  fontStyle: featureTitle.fontStyle,
                  fontSize: featureTitle.fontSize,
                  color: featureTitle.color,
                }}
              >
                {featureTitle.text}
              </h2>
              <div className="formatting-toolbar">
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureFontSizePicker(false);
                    setShowFeatureColorPicker(false);
                    setFeatureTitle({
                      ...featureTitle,
                      fontWeight:
                        featureTitle.fontWeight === "bold" ? "normal" : "bold",
                    });
                  }}
                >
                  <FaBold />
                </button>
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureFontSizePicker(false);
                    setShowFeatureColorPicker(false);
                    setFeatureTitle({
                      ...featureTitle,
                      fontStyle:
                        featureTitle.fontStyle === "italic"
                          ? "normal"
                          : "italic",
                    });
                  }}
                >
                  <FaItalic />
                </button>
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureFontSizePicker(false);
                    setShowFeatureColorPicker(!showFeatureColorPicker); 
                  }}
                >
                  <IoIosColorPalette />
                </button>
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureColorPicker(false);
                    setShowFeatureFontSizePicker(!showFeatureFontSizePicker);
                  }}
                >
                  <RiFontSize />
                </button>
                <div className="feature-pickers">
                  {showFeatureColorPicker && (
                    <div className="feature-color-picker">
                      <input
                        type="color"
                        value={featureTitle.color}
                        onChange={(e) =>
                          setFeatureTitle({
                            ...featureTitle,
                            color: e.target.value,
                          })
                        }
                        style={{
                          border: "none",
                          width: "30px",
                          height: "20px",
                        }}
                      />
                    </div>
                  )}
                  {showFeatureFontSizePicker && (
                    <div className="feature-font-size-picker">
                      <select
                        value={featureTitle.fontSize}
                        onChange={(e) =>
                          setFeatureTitle({
                            ...featureTitle,
                            fontSize: e.target.value,
                          })
                        }
                        style={{
                          border: "none",
                          borderRadius: "5px",
                          width: "100px",
                        }}
                      >
                        <option value="40px">40px</option>
                        <option value="48px">48px</option>
                        <option value="56px">56px</option>
                        <option value="64px">64px</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {showFeatureSubtitle && (
            <div
              className="feature-subtitle-container"
              style={{ textAlign: "center" }}
            >
              <p
                contentEditable
                suppressContentEditableWarning
                className="feature-subtitle-p"
                onBlur={(e) =>
                  setFeatureSubtitle({
                    ...featureSubtitle,
                    text: e.target.textContent,
                  })
                }
                style={{
                  fontWeight: featureSubtitle.fontWeight,
                  fontStyle: featureSubtitle.fontStyle,
                  fontSize: featureSubtitle.fontSize,
                  color: featureSubtitle.color,
                  textAlign: "center",
                }}
              >
                {featureSubtitle.text}
              </p>
              <div className="formatting-subtitle-toolbar">
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureFontSizePickerSubtitle(false);
                    setShowFeatureColorPickerSubtitle(false);
                    setFeatureSubtitle({
                      ...featureSubtitle,
                      fontWeight:
                        featureSubtitle.fontWeight === "bold"
                          ? "normal"
                          : "bold",
                    });
                  }}
                >
                  <FaBold />
                </button>
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureFontSizePickerSubtitle(false);
                    setShowFeatureColorPickerSubtitle(false);
                    setFeatureSubtitle({
                      ...featureSubtitle,
                      fontStyle:
                        featureSubtitle.fontStyle === "italic"
                          ? "normal"
                          : "italic",
                    });
                  }}
                >
                  <FaItalic />
                </button>
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureFontSizePickerSubtitle(false);
                    setShowFeatureColorPickerSubtitle(
                      !showFeatureColorPickerSubtitle
                    );
                  }}
                >
                  <IoIosColorPalette />
                </button>
                <button
                  className="btn btn-md me-1"
                  onClick={() => {
                    setShowFeatureColorPickerSubtitle(false);
                    setShowFeatureFontSizePickerSubtitle(
                      !showFeatureFontSizePickerSubtitle
                    ); 
                  }}
                >
                  <RiFontSize />
                </button>
                <div className="subtitle-feature-pickers">
                  {showFeatureColorPickerSubtitle && (
                    <div className="subtitle-feature-color-picker">
                      <input
                        type="color"
                        value={featureSubtitle.color}
                        style={{
                          border: "none",
                          width: "30px",
                          height: "20px",
                        }}
                        onChange={(e) =>
                          setFeatureSubtitle({
                            ...featureSubtitle,
                            color: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                  {showFeatureFontSizePickerSubtitle && (
                    <div className="subtitle-feature-font-size-picker">
                      <select
                        value={featureSubtitle.fontSize}
                        style={{
                          border: "none",
                          borderRadius: "5px",
                          width: "100px",
                        }}
                        onChange={(e) =>
                          setFeatureSubtitle({
                            ...featureSubtitle,
                            fontSize: e.target.value,
                          })
                        }
                      >
                        <option value="24px">24px</option>
                        <option value="30px">30px</option>
                        <option value="36px">36px</option>
                        <option value="40px">40px</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="d-flex flex-wrap justify-content-start">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`feature-card card position-relative mb-1`}
                onMouseEnter={() => showButtons(index)}
                onMouseLeave={() => hideButtons(index)}
                style={{
                  ...calculateCardWidth(),
                  borderRadius: "15px",
                  margin: `${spacing}px`,
                  height: autoSize && "100%",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  style={{ display: "none" }}
                  onChange={(e) => handleCardImageUpload(e, index)}
                />
                <img
                  src={card.image}
                  className={`card-img-top ${imageClassName}`}
                  alt={card.featureTitle}
                  onClick={() => triggerFileUpload(index)}
                  style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "15px",
                  }}
                />

                <div className="card-body">
                  {showFeatureTitleToggle && (
                    <h5
                      className="card-title"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleTitleBlur(e, index)}
                      style={{ textAlign: alignment, fontSize: "24px" }}
                    >
                      {card.featureTitle}
                    </h5>
                  )}
                  {showFeatureDescriptionToggle && (
                    <p
                      className="card-text"
                      onBlur={(e) => handleDescriptionBlur(e, index)}
                      style={{ textAlign: alignment, fontSize: "16px" }}
                      contentEditable
                      suppressContentEditableWarning
                    >
                      {card.featureDescription}
                    </p>
                  )}
                  <div style={{ textAlign: alignment }}>
                    {showFeatureButtonsToggle && (
                      <button
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#55c2da",
                          border: "none",
                          padding: "8px",
                          color: "#333",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                        contentEditable
                        suppressContentEditableWarning
                      >
                        {card.buttonText}
                      </button>
                    )}
                  </div>
                </div>
                <div
                  className="feature-hover-buttons position-absolute"
                  ref={(el) => (hoverRefs.current[index] = el)}
                  style={{
                    top: "10px",
                    right: "10px",
                    backgroundColor: "white",
                    padding: "5px",
                    display: "none",
                    outline: "none",
                    borderRadius: "5px",
                    fontSize: "10px",
                  }}
                >
                  <button
                    className="btn btn-sm mx-1"
                    onClick={() => addCard(index)}
                  >
                    <IoIosAdd />
                  </button>
                  <button
                    className="btn btn-sm mx-1"
                    onClick={() => deleteCard(card.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <button
                    className="btn  btn-sm mx-1"
                    onClick={() => swapCardLeft(index)}
                    disabled={index === 0}
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    className="btn btn-sm mx-1"
                    onClick={() => swapCardRight(index)}
                    disabled={index === cards.length - 1}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {featureSettingsOpen && (
            <div className="feature-adjustments">
              <div className="feature-adjustment-part">
                <h5>Size</h5>
                <div className="form-checkbox">
                  <label htmlFor="fullwidth">Fullwidth</label>
                  <input
                    id="fullwidth"
                    type="checkbox"
                    checked={fullscreen}
                    onChange={() => setFullscreen(!fullscreen)}
                  />
                </div>
                <div className="form-feature-group">
                  <label htmlFor="top-margin">Top Margin</label>
                  <input
                    id="top-margin"
                    type="range"
                    min="0"
                    max="100"
                    value={featureMarginTop}
                    onChange={(e) => setFeatureMarginTop(e.target.value)}
                    className="form-control-range"
                  />
                </div>
                <div className="form-feature-group">
                  <label htmlFor="bottom-margin">Bottom Margin</label>
                  <input
                    id="bottom-margin"
                    type="range"
                    min="0"
                    max="100"
                    value={featureMarginBottom}
                    onChange={(e) => setFeatureMarginBottom(e.target.value)}
                    className="form-control-range"
                  />
                </div>
                <div className="form-feature-group">
                  <label htmlFor="feature-columns">Columns</label>
                  <select
                    id="feature-columns"
                    value={featureColumns}
                    onChange={(e) =>
                      setFeatureColumns(parseInt(e.target.value, 10))
                    }
                    className="form-control"
                    style={{ width: "150px" }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className="feature-adjustment-part">
                <h5>Show/Hide</h5>
                <div className="form-checkbox">
                  <label
                    htmlFor="show-feature-title"
                    className="form-check-label"
                  >
                    Title
                  </label>
                  <input
                    id="show-feature-title"
                    type="checkbox"
                    checked={showFeatureTitle}
                    onChange={() => setShowFeatureTitle(!showFeatureTitle)}
                    className="form-check-input"
                  />
                </div>
                <div className="form-checkbox">
                  <label
                    htmlFor="show-feature-subtitle"
                    className="form-check-label"
                  >
                    Subtitle
                  </label>
                  <input
                    id="show-feature-subtitle"
                    type="checkbox"
                    checked={showFeatureSubtitle}
                    onChange={() =>
                      setShowFeatureSubtitle(!showFeatureSubtitle)
                    }
                    className="form-check-input"
                  />
                </div>
              </div>
              <div className="feature-adjustment-part">
                <h5>Cards</h5>
                <div className="form-checkbox">
                  <label htmlFor="auto-size" className="form-check-label">
                    AutoSize
                  </label>
                  <input
                    id="auto-size"
                    type="checkbox"
                    checked={autoSize}
                    onChange={() => setAutoSize(!autoSize)}
                    className="form-check-input"
                  />
                </div>
                <div className="form-feature-group">
                  <label htmlFor="spacing">Spacing</label>
                  <input
                    id="spacing"
                    type="range"
                    min="0"
                    max="10"
                    value={spacing}
                    onChange={(e) => setSpacing(e.target.value)}
                    className="form-control-range"
                  />
                </div>
                <div className="form-checkbox">
                  <label
                    htmlFor="show-feature-title-toggle"
                    className="form-check-label"
                  >
                    Title
                  </label>
                  <input
                    id="show-feature-title-toggle"
                    type="checkbox"
                    checked={showFeatureTitleToggle}
                    onChange={() =>
                      setShowFeatureTitleToggle(!showFeatureTitleToggle)
                    }
                    className="form-check-input"
                  />
                </div>
                <div className="form-checkbox">
                  <label
                    htmlFor="show-feature-description-toggle"
                    className="form-check-label"
                  >
                    Description
                  </label>
                  <input
                    id="show-feature-description-toggle"
                    type="checkbox"
                    checked={showFeatureDescriptionToggle}
                    onChange={() =>
                      setShowFeatureDescriptionToggle(
                        !showFeatureDescriptionToggle
                      )
                    }
                    className="form-check-input"
                  />
                </div>
                <div className="form-checkbox">
                  <label
                    htmlFor="show-buttons-toggle"
                    className="form-check-label"
                  >
                    Buttons
                  </label>
                  <input
                    id="show-buttons-toggle"
                    type="checkbox"
                    checked={showFeatureButtonsToggle}
                    onChange={() =>
                      setShowFeatureButtonsToggle(!showFeatureButtonsToggle)
                    }
                    className="form-check-input"
                  />
                </div>
                <div className="form-feature-group">
                  <label htmlFor="alignment">Alignment</label>
                  <select
                    id="alignment"
                    value={alignment}
                    onChange={(e) => setAlignment(e.target.value)}
                    className="form-control"
                    style={{ width: "150px", marginTop: "10px" }}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
              <div className="feature-adjustment-part">
                <h5>Background</h5>
                <div className="form-feature-radio">
                  <label>Image</label>
                  <input
                    type="radio"
                    name="background"
                    value="image"
                    checked={featureBackgroundType === "image"}
                    onChange={() => setFeatureBackgroundType("image")}
                  />
                </div>
                {featureBackgroundType === "image" && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
                <div className="form-feature-radio">
                  <label>Color</label>
                  <input
                    type="radio"
                    name="background"
                    value="color"
                    checked={featureBackgroundType === "color"}
                    onChange={() => setFeatureBackgroundType("color")}
                  />
                </div>
                <div>
                  {featureBackgroundType === "color" && (
                    <input
                      type="color"
                      value={featureBackgroundColor}
                      onChange={(e) =>
                        setFeatureBackgroundColor(e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
              <div className="feature-adjustement-part">
                <button
                  onClick={handleDeleteFeature}
                  style={{
                    color: "red",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  Delete Feature
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FeaturesComponent;
