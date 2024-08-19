import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/HeroComponent.css";
import { IoSettingsSharp } from "react-icons/io5";
import { RiFontSize } from "react-icons/ri";
import { FaBold, FaItalic } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";

const HeroComponent = () => {
  const [title, setTitle] = useState({
    text: "Welcome to My Website",
    color: "#333333",
    fontSize: "64px",
    fontWeight: "bold",
    fontStyle: "normal",
  });

  const [subtitle, setSubtitle] = useState({
    text: "Your journey starts here",
    color: "#333333",
    fontSize: "24px",
    fontWeight: "normal",
    fontStyle: "normal",
  });

  const [button, setButton] = useState({
    text: "Get Started",
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    fontStyle: "normal",
    backgroundColor: "#55c2da",
  });
  //eslint-disable-next-line
  const [buttonLink, setButtonLink] = useState("#");
  const [imageSrc, setImageSrc] = useState(
    "/images/10009122-removebg-preview.png"
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [imageSize, setImageSize] = useState(100);
  const [reverse, setReverse] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [backgroundType, setBackgroundType] = useState("image");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizePickerSubtitle, setShowFontSizePickerSubtitle] =
    useState(false);
  const [showColorPickerSubtitle, setShowColorPickerSubtitle] = useState(false);
  const [showFontSizePickerButton, setShowFontSizePickerButton] =
    useState(false);
  const [showColorPickerButton, setShowColorPickerButton] = useState(false);
  const [showColorPickerButtonBackground, setShowColorPickerButtonBackground] =
    useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const handleDeleteHero = () => setHeroVisible(false);

  const handleButtonTextChange = (e) =>
    setButton((prev) => ({ ...prev, text: e.target.innerText }));

  const toggleSettings = () => setSettingsOpen(!settingsOpen);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBackgroundImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("upload-image").click();
  };

  const handleReverseHeroContent = (e) => {
    setReverse(e.target.checked);
  };
  return (
    <>
      {heroVisible && (
        <section
          className={`container-fluid py-5 hero-section position-relative ${
            reverse ? "reverse" : ""
          } `}
          style={{
            marginTop: `${top}px`,
            marginBottom: `${bottom}px`,
            backgroundColor:
              backgroundType === "color" ? backgroundColor : "white",
            backgroundImage:
              backgroundType === "image" && backgroundImage
                ? `url(${backgroundImage})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            paddingLeft: !fullscreen ? "40px" : "5px",
            paddingRight: !fullscreen ? "40px" : "5px",
          }}
        >
          <button
            className="btn btn-secondary btn-sm hero-settings-btn top-0 end-0 translate-middle-y"
            onClick={toggleSettings}
          >
            <IoSettingsSharp color="black" />
          </button>
          <div
            className={`row align-items-center ${
              reverse ? "flex-row-reverse" : ""
            }`}
            style={{ minHeight: "60vh" }}
          >
            <div className="col-md-6 text-center items-center text-md-start">
              {showTitle && (
                <div className="hero-title-container">
                  <h1
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setTitle({ ...title, text: e.target.textContent })
                    }
                    style={{
                      color: title.color,
                      fontSize: title.fontSize,
                      fontWeight: title.fontWeight,
                      fontStyle: title.fontStyle,
                      margin: 0,
                      padding: "12px 15px",
                      width: "100%",
                      boxSizing: "border-box",
                      outline: "none",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {title.text}
                  </h1>
                  <div className="title-manipulation-buttons">
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePicker(false);
                        setShowColorPicker(false);
                        setTitle({
                          ...title,
                          fontWeight:
                            title.fontWeight === "bold" ? "normal" : "bold",
                        });
                      }}
                    >
                      <FaBold />
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePicker(false);
                        setShowColorPicker(false);
                        setTitle({
                          ...title,
                          fontStyle:
                            title.fontStyle === "italic" ? "normal" : "italic",
                        });
                      }}
                    >
                      <FaItalic />
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePicker(false);
                        setShowColorPicker(!showColorPicker); // Toggle Color Picker visibility
                      }}
                    >
                      <IoIosColorPalette />
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowColorPicker(false);
                        setShowFontSizePicker(!showFontSizePicker); // Toggle Font Size Picker visibility
                      }}
                    >
                      <RiFontSize />
                    </button>
                    <div className="hero-pickers">
                      {showColorPicker && (
                        <div className="hero-color-picker">
                          <input
                            type="color"
                            value={title.color}
                            onChange={(e) =>
                              setTitle({ ...title, color: e.target.value })
                            }
                            style={{
                              border: "none",
                              width: "30px",
                              height: "20px",
                            }}
                          />
                        </div>
                      )}
                      {showFontSizePicker && (
                        <div className="hero-font-size-picker">
                          <select
                            value={title.fontSize}
                            onChange={(e) =>
                              setTitle({ ...title, fontSize: e.target.value })
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
              {showSubtitle && (
                <div className="hero-subtitle-container">
                  <p
                    className="lead hero-subtitle"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setSubtitle({ ...subtitle, text: e.target.textContent })
                    }
                    style={{
                      color: subtitle.color,
                      fontSize: subtitle.fontSize,
                      fontWeight: subtitle.fontWeight,
                      fontStyle: subtitle.fontStyle,
                      whiteSpace: "pre-wrap",
                      margin: 0,
                      padding: "8px 12px",
                      width: "100%",
                      boxSizing: "border-box",
                      outline: "none",
                    }}
                  >
                    {subtitle.text}
                  </p>

                  <div className="subtitle-manipulation-buttons">
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePickerSubtitle(false);
                        setShowColorPickerSubtitle(false);
                        setSubtitle({
                          ...subtitle,
                          fontWeight:
                            subtitle.fontWeight === "bold" ? "normal" : "bold",
                        });
                      }}
                    >
                      <FaBold />
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePickerSubtitle(false);
                        setShowColorPickerSubtitle(false);
                        setSubtitle({
                          ...subtitle,
                          fontStyle:
                            subtitle.fontStyle === "italic"
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
                        setShowFontSizePickerSubtitle(false);
                        setShowColorPickerSubtitle(!showColorPickerSubtitle); // Toggle Color Picker visibility
                      }}
                    >
                      <IoIosColorPalette />
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowColorPickerSubtitle(false);
                        setShowFontSizePickerSubtitle(
                          !showFontSizePickerSubtitle
                        );
                      }}
                    >
                      <RiFontSize />
                    </button>
                    <div className="hero-pickers">
                      {showColorPickerSubtitle && (
                        <div className="hero-color-picker">
                          <input
                            type="color"
                            value={subtitle.color}
                            onChange={(e) =>
                              setSubtitle({
                                ...subtitle,
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
                      {showFontSizePickerSubtitle && (
                        <div className="hero-font-size-picker">
                          <select
                            value={subtitle.fontSize}
                            onChange={(e) =>
                              setSubtitle({
                                ...subtitle,
                                fontSize: e.target.value,
                              })
                            }
                            style={{
                              border: "none",
                              borderRadius: "5px",
                              width: "100px",
                            }}
                          >
                            <option value="34px">24px</option>
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
              {showButton && (
                <div className="hero-button-container">
                  <a
                    href={buttonLink}
                    className="btn hero-button"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={handleButtonTextChange}
                    style={{
                      color: button.color,
                      fontSize: button.fontSize,
                      fontWeight: button.fontWeight,
                      backgroundColor: button.backgroundColor,
                      marginLeft: "15px",
                      padding:"23px",
                      borderRadius:"36px"
                    }}
                  >
                    {button.text}
                  </a>
                  <div className="button-manipulation-buttons">
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePickerButton(false);
                        setShowColorPickerButton(false);
                        setButton((prev) => ({
                          ...prev,
                          fontWeight:
                            prev.fontWeight === "bold" ? "normal" : "bold",
                        }));
                      }}
                    >
                      <FaBold />
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePickerButton(false);
                        setShowColorPickerButton(!showColorPickerButton);
                        setShowColorPickerButtonBackground(false);
                      }}
                    >
                      <IoIosColorPalette />
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowFontSizePicker(false);
                        setShowColorPickerButton(false);
                        setShowColorPickerButtonBackground(
                          !showColorPickerButtonBackground
                        );
                      }}
                    >
                      Bg
                    </button>
                    <button
                      className="btn btn-md me-1"
                      onClick={() => {
                        setShowColorPickerButton(false);
                        setShowColorPickerButtonBackground(false);
                        setShowFontSizePickerButton(!showFontSizePickerButton);
                      }}
                    >
                      <RiFontSize />
                    </button>
                    <div className="hero-pickers">
                      {showColorPickerButton && (
                        <div className="hero-color-picker">
                          <input
                            type="color"
                            value={button.color}
                            onChange={(e) =>
                              setButton({ ...button, color: e.target.value })
                            }
                            style={{
                              border: "none",
                              width: "30px",
                              height: "20px",
                            }}
                          />
                        </div>
                      )}
                      {showColorPickerButtonBackground && (
                        <div className="hero-color-picker">
                          <input
                            type="color"
                            value={button.backgroundColor}
                            onChange={(e) =>
                              setButton({
                                ...button,
                                backgroundColor: e.target.value,
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
                      {showFontSizePickerButton && (
                        <div className="hero-font-size-picker">
                          <select
                            value={button.fontSize}
                            onChange={(e) =>
                              setButton({ ...button, fontSize: e.target.value })
                            }
                            style={{
                              border: "none",
                              borderRadius: "5px",
                              width: "100px",
                            }}
                          >
                            <option value="16px">16px</option>
                            <option value="18px">18px</option>
                            <option value="20px">20px</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-6 items-center text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleHeroImageUpload}
                style={{ display: "none" }}
                id="upload-image"
              />
              <img
                src={imageSrc}
                alt="Hero"
                className="img-fluid"
                style={{
                  cursor: "pointer",
                  width: `${imageSize}%`,
                  height: `${imageSize}%`,
                  backgroundColor: "transparent",
                }}
                onClick={handleImageClick}
              />
            </div>
            {settingsOpen && (
              <div className="hero-menu-box">
                <div className="menu-part">
                  <h5 style={{textAlign:"center"}}>Size</h5>
                  <hr/>
                  <div className="hero-menu-checkbox">
                    <label htmlFor="full-screen">Fullscreen</label>
                    <input
                      id="full-screen"
                      type="checkbox"
                      checked={fullscreen}
                      onChange={() => setFullscreen(!fullscreen)}
                    />
                  </div>
                  <div className="hero-menu-range">
                    <label htmlFor="hero-margin-top-range">Top</label>
                    <input
                      id="hero-margin-top-range"
                      type="range"
                      min="0"
                      max="100"
                      value={top}
                      onChange={(e) => setTop(e.target.value)}
                    />
                  </div>
                  <div className="hero-menu-range">
                    <label htmlFor="hero-margin-bottom-range">
                      Bottom
                    </label>
                    <input
                      id="hero-margin-bottom-range"
                      type="range"
                      min="0"
                      max="100"
                      value={bottom}
                      onChange={(e) => setBottom(e.target.value)}
                    />
                  </div>
                  <div className="hero-menu-range">
                    <label htmlFor="image-size-range">Image Size</label>
                    <input
                      id="image-size-range"
                      type="range"
                      min="0"
                      max="100"
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value)}
                    />
                  </div>
                  <div className="hero-menu-checkbox">
                    <label htmlFor="hero-reverse-checkbox">Reverse</label>
                    <input
                      id="hero-reverse-checkbox"
                      type="checkbox"
                      checked={reverse}
                      onChange={handleReverseHeroContent}
                    />
                  </div>
                </div>
                <div className="menu-part">
                  <h5 style={{textAlign:"center"}}>Show/Hide</h5>
                  <hr/>
                  <div className="hero-menu-checkbox">
                    <label htmlFor="hero-title-checkbox">Title</label>
                    <input
                      id="hero-title-checkbox"
                      type="checkbox"
                      checked={showTitle}
                      onChange={() => setShowTitle(!showTitle)}
                    />
                  </div>
                  <div className="hero-menu-checkbox">
                    <label htmlFor="hero-subtitle-checkbox">Subtitle</label>
                    <input
                      id="hero-subtitle-checkbox"
                      type="checkbox"
                      checked={showSubtitle}
                      onChange={() => setShowSubtitle(!showSubtitle)}
                    />
                  </div>
                  <div className="hero-menu-checkbox">
                    <label htmlFor="hero-button-checkbox">Button</label>
                    <input
                      id="hero-button-checkbox"
                      type="checkbox"
                      checked={showButton}
                      onChange={() => setShowButton(!showButton)}
                    />
                  </div>
                </div>
                <div className="menu-part">
                  <h5 style={{textAlign:"center"}}>Background</h5>
                  <hr/>
                  <div className="hero-menu-radio">
                    <label>Image</label>
                    <input
                      type="radio"
                      name="background"
                      value="image"
                      checked={backgroundType === "image"}
                      onChange={() => setBackgroundType("image")}
                    />
                  </div>
                  {backgroundType === "image" && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                  <div className="hero-menu-radio">
                    <label>Color</label>
                    <input
                      type="radio"
                      name="background"
                      value="color"
                      checked={backgroundType === "color"}
                      onChange={() => setBackgroundType("color")}
                    />
                  </div>
                  <div>
                    {backgroundType === "color" && (
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                      />
                    )}
                  </div>
                </div>
                <div className="menu-part">
                  <button
                    onClick={handleDeleteHero}
                    style={{
                      color: "red",
                      border: "none",
                      background: "transparent",
                    }}
                  >
                    Delete Hero
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default HeroComponent;
