import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import {
  FaChevronUp,
  FaChevronDown,
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { RiFontSize } from "react-icons/ri";
import { FaBold, FaItalic } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import "../../styles/ListComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ListComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqItems, setFaqItems] = useState([
    {
      id: 101,
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to create a new password.",
    },
    {
      id: 102,
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee on all purchases. If you are not satisfied with your purchase, please contact our support team for a refund.",
    },
    {
      id: 103,
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team via email at support@example.com or by calling our hotline at (123) 456-7890. Our team is available 24/7.",
    },
    {
      id: 104,
      question: "Where can I find the user manual?",
      answer:
        "The user manual can be found in the 'Help' section of our website or downloaded directly from the product page. A digital copy is also included in your order confirmation email.",
    },
    {
      id: 105,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping rates and delivery times vary based on your location. Please check our shipping policy for more details.",
    },
    {
      id: 106,
      question: "How do I update my billing information?",
      answer:
        "To update your billing information, log in to your account and navigate to the 'Account Settings' section. From there, you can update your payment details and billing address.",
    },
  ]);
  const [listTitle, setListTitle] = useState({
    text: "Got Questions?",
    color: "#333333",
    fontSize: "64px",
    fontWeight: "bold",
    fontStyle: "normal",
  });
  const [listSubtitle, setListSubtitle] = useState({
    text: "Find answers to common queries about our services.",
    color: "#333333",
    fontSize: "24px",
    fontWeight: "normal",
    fontStyle: "normal",
  });
  const [listSettingsOpen, setListSettingsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [listMarginTop, setListMarginTop] = useState(0);
  const [listMarginBottom, setListMarginBottom] = useState(0);
  const [showListTitle, setShowListTitle] = useState(true);
  const [showListSubtitle, setShowListSubtitle] = useState(true);
  const [listAmount, setListAmount] = useState(6);
  const [listColor, setListColor] = useState("#FFFFFF");
  const [listBackgroundType, setListBackgroundType] = useState("color");
  const [listBackgroundColor, setListBackgroundColor] = useState("#FFFFFF");
  const [listBackgroundImage, setListBackgroundImage] = useState(null);
  const [listVisible, setListVisible] = useState(true);
  const handleDeleteList = () => setListVisible(false);
  const [showFontSizePicker, setShowFontSizePicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSizePickerSubtitle, setShowFontSizePickerSubtitle] =
    useState(false);
  const [showColorPickerSubtitle, setShowColorPickerSubtitle] = useState(false);
  const [listCardFontSize, setListCardFontSize] = useState("36px");
  const [listCardContentFontSize, setListCardContentFontSize] =
    useState("20px");

  const handleListImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setListBackgroundImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const toggleListSettings = () => setListSettingsOpen(!listSettingsOpen);

  const duplicateFaq = (index) => {
    if (faqItems.length >= 6) {
      alert("You can only create upto 6 items");
      return;
    }
    const newFaq = { ...faqItems[index], id: Date.now() + Math.random() };
    const updatedFaqs = [...faqItems];
    updatedFaqs.splice(index + 1, 0, newFaq);
    setFaqItems(updatedFaqs);
  };

  const deleteFaq = (index) => {
    const updatedFaqs = faqItems.filter((_, i) => i !== index);
    setFaqItems(updatedFaqs);
  };

  const moveFaqUp = (index) => {
    if (index === 0) return;
    const updatedFaqs = [...faqItems];
    [updatedFaqs[index], updatedFaqs[index - 1]] = [
      updatedFaqs[index - 1],
      updatedFaqs[index],
    ];
    setFaqItems(updatedFaqs);
    setActiveIndex(index - 1);
  };

  const moveFaqDown = (index) => {
    if (index === faqItems.length - 1) return;
    const updatedFaqs = [...faqItems];
    [updatedFaqs[index], updatedFaqs[index + 1]] = [
      updatedFaqs[index + 1],
      updatedFaqs[index],
    ];
    setFaqItems(updatedFaqs);
    setActiveIndex(index + 1);
  };

  const handleContentChange = (index, newContent) => {
    setFaqItems((prevFaqItems) =>
      prevFaqItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, answer: newContent } : item
      )
    );
  };

  const handleQuestionChange = (index, newQuestion) => {
    setFaqItems((prevFaqItems) => {
      return prevFaqItems.map((item, i) => {
        if (i === index) {
          return { ...item, question: newQuestion };
        }
        return item;
      });
    });
  };

  return (
    <>
      {listVisible && (
        <section
          className="list1 list-section-container"
          id="list01-2o"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            paddingTop: "10px",
            paddingBottom: "80px",
            marginTop: `${listMarginTop}px`,
            marginBottom: `${listMarginBottom}px`,
            backgroundColor:
              listBackgroundType === "color" ? listBackgroundColor : "white",
            backgroundImage:
              listBackgroundType === "image" && listBackgroundImage
                ? `url(${listBackgroundImage})`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <button
            className="btn btn-secondary btn-sm list-settings-button top-0 end-0 translate-middle-y"
            onClick={toggleListSettings}
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
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-10 m-auto">
                <div className="content">
                  <div className="row justify-content-center mb-5">
                    <div className="col-12 content-head">
                      <div className="mbr-section-head">
                        {showListTitle && (
                          <div className="list-title-container">
                            <h4
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                setListTitle({
                                  ...listTitle,
                                  text: e.target.textContent,
                                })
                              }
                              className="mbr-section-title mbr-fonts-style align-center mb-0 display-2"
                              style={{
                                color: listTitle.color,
                                fontSize: listTitle.fontSize,
                                fontWeight: listTitle.fontWeight,
                                fontStyle: listTitle.fontStyle,
                              }}
                            >
                              {listTitle.text}
                            </h4>
                            <div className="list-title-manipulation-buttons">
                              <button
                                className="btn btn-md me-1"
                                onClick={() => {
                                  setShowFontSizePicker(false);
                                  setShowColorPicker(false);
                                  setListTitle({
                                    ...listTitle,
                                    fontWeight:
                                      listTitle.fontWeight === "bold"
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
                                  setShowFontSizePicker(false);
                                  setShowColorPicker(false);
                                  setListTitle({
                                    ...listTitle,
                                    fontStyle:
                                      listTitle.fontStyle === "italic"
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
                              <div className="list-pickers">
                                {showColorPicker && (
                                  <div className="list-color-picker">
                                    <input
                                      type="color"
                                      value={listTitle.color}
                                      onChange={(e) =>
                                        setListTitle({
                                          ...listTitle,
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
                                {showFontSizePicker && (
                                  <div className="list-font-size-picker">
                                    <select
                                      value={listTitle.fontSize}
                                      onChange={(e) =>
                                        setListTitle({
                                          ...listTitle,
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

                        {showListSubtitle && (
                          <div className="list-subtitle-container">
                            <p
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                setListSubtitle({
                                  ...listSubtitle,
                                  text: e.target.textContent,
                                })
                              }
                              className="list-subtitle"
                              style={{
                                color: listSubtitle.color,
                                fontSize: listSubtitle.fontSize,
                                fontWeight: listSubtitle.fontWeight,
                                fontStyle: listSubtitle.fontStyle,
                              }}
                            >
                              {listSubtitle.text}
                            </p>
                            <div className="list-subtitle-manipulation-buttons">
                              <button
                                className="btn btn-md me-1"
                                onClick={() => {
                                  setShowFontSizePickerSubtitle(false);
                                  setShowColorPickerSubtitle(false);
                                  setListSubtitle({
                                    ...listSubtitle,
                                    fontWeight:
                                      listSubtitle.fontWeight === "bold"
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
                                  setShowFontSizePickerSubtitle(false);
                                  setShowColorPickerSubtitle(false);
                                  setListSubtitle({
                                    ...listSubtitle,
                                    fontStyle:
                                      listSubtitle.fontStyle === "italic"
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
                                  setShowColorPickerSubtitle(
                                    !showColorPickerSubtitle
                                  ); // Toggle Color Picker visibility
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
                              <div className="list-pickers">
                                {showColorPickerSubtitle && (
                                  <div className="list-color-picker">
                                    <input
                                      type="color"
                                      value={listSubtitle.color}
                                      onChange={(e) =>
                                        setListSubtitle({
                                          ...listSubtitle,
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
                                  <div className="list-font-size-picker">
                                    <select
                                      value={listSubtitle.fontSize}
                                      onChange={(e) =>
                                        setListSubtitle({
                                          ...listSubtitle,
                                          fontSize: e.target.value,
                                        })
                                      }
                                      style={{
                                        border: "none",
                                        borderRadius: "5px",
                                        width: "100px",
                                      }}
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
                      </div>
                    </div>
                  </div>
                  <div
                    id="bootstrap-accordion_22"
                    className="panel-group accordionStyles accordion"
                  >
                    {faqItems.slice(0, listAmount).map((item, index) => (
                      <div key={item.id} className="card faq-item">
                        <div
                          className="card-header d-flex justify-content-between"
                          role="tab"
                          id={`heading${item.id}`}
                          onClick={() => toggleAccordion(index)}
                          style={{ backgroundColor: `${listColor}` }}
                        >
                          <button
                            type="button"
                            className={`panel-title ${
                              activeIndex === index ? "" : "collapsed"
                            }`}
                            aria-expanded={activeIndex === index}
                            aria-controls={`collapse${item.id}`}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              outline: "none",
                              border: "none",
                              backgroundColor: `${listColor}`,
                              width: "100%",
                            }}
                          >
                            <h6
                              className="panel-title-edit mbr-semibold mbr-fonts-style mb-0 display-5"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleQuestionChange(
                                  index,
                                  e.target.textContent
                                )
                              }
                              style={{
                                textAlign: "left",
                                fontSize: listCardFontSize,
                              }}
                            >
                              {item.question}
                            </h6>
                            <span className="sign">
                              {activeIndex === index ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </span>
                          </button>
                          {activeIndex === index && (
                            <div
                              className={`floating-action-buttons ${
                                activeIndex === index ? "show" : ""
                              }`}
                            >
                              <FaPlus onClick={() => duplicateFaq(index)} />
                              <FaTrash onClick={() => deleteFaq(index)} />
                              <FaArrowUp onClick={() => moveFaqUp(index)} />
                              <FaArrowDown onClick={() => moveFaqDown(index)} />
                            </div>
                          )}
                        </div>
                        <div
                          id={`collapse${item.id}`}
                          className={`panel-collapse noScroll ${
                            activeIndex === index ? "show" : "collapse"
                          }`}
                          role="tabpanel"
                          aria-labelledby={`heading${item.id}`}
                          style={{ backgroundColor: `${listColor}` }}
                        >
                          <div className="panel-body">
                            <p
                              className="mbr-fonts-style panel-text display-7"
                              contentEditable={activeIndex === index}
                              suppressContentEditableWarning={true}
                              onBlur={(event) =>
                                handleContentChange(
                                  index,
                                  event.target.textContent
                                )
                              }
                              style={{ fontSize: listCardContentFontSize }}
                            >
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {listSettingsOpen && (
                    <div className="list-adjustments">
                      <div className="list-adjustment-part">
                        <h5 style={{ textAlign: "center" }}>Size</h5>
                        <hr />
                        <div className="form-list-group">
                          <label htmlFor="top-margin">Top</label>
                          <input
                            id="top-margin"
                            type="range"
                            min="0"
                            max="100"
                            value={listMarginTop}
                            onChange={(e) => setListMarginTop(e.target.value)}
                            className="form-control-range"
                          />
                        </div>
                        <div className="form-list-group">
                          <label htmlFor="bottom-margin">Bottom</label>
                          <input
                            id="bottom-margin"
                            type="range"
                            min="0"
                            max="100"
                            value={listMarginBottom}
                            onChange={(e) =>
                              setListMarginBottom(e.target.value)
                            }
                            className="form-control-range"
                          />
                        </div>
                      </div>
                      <div className="list-adjustment-part">
                        <h5 style={{ textAlign: "center" }}>Show/Hide</h5>
                        <hr />
                        <div className="form-list-checkbox">
                          <label
                            htmlFor="show-feature-title"
                            className="form-check-label"
                          >
                            Title
                          </label>
                          <input
                            id="show-feature-title"
                            type="checkbox"
                            checked={showListTitle}
                            onChange={() => setShowListTitle(!showListTitle)}
                            className="form-check-input"
                          />
                        </div>
                        <div className="form-list-checkbox">
                          <label
                            htmlFor="show-feature-subtitle"
                            className="form-check-label"
                          >
                            Subtitle
                          </label>
                          <input
                            id="show-feature-subtitle"
                            type="checkbox"
                            checked={showListSubtitle}
                            onChange={() =>
                              setShowListSubtitle(!showListSubtitle)
                            }
                            className="form-check-input"
                          />
                        </div>
                        <div className="form-list-group">
                          <label htmlFor="list-columns">Amount</label>
                          <select
                            id="list-columns"
                            value={listAmount}
                            onChange={(e) =>
                              setListAmount(parseInt(e.target.value, 10))
                            }
                            className="form-control"
                            style={{ width: "150px" }}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                      </div>
                      <div className="list-adjustment-part">
                        <h5 style={{ textAlign: "center" }}>Card</h5>
                        <hr />
                        <div className="form-list-group">
                          <label htmlFor="feature-columns">Title Size</label>
                          <select
                            id="feature-columns"
                            value={listCardFontSize}
                            onChange={(e) =>
                              setListCardFontSize(e.target.value)
                            }
                            className="form-control"
                            style={{ width: "150px" }}
                          >
                            <option value="36px">36px</option>
                            <option value="30px">30px</option>
                            <option value="24px">24px</option>
                            <option value="18px">18px</option>
                          </select>
                        </div>
                        <div className="form-list-group">
                          <label htmlFor="feature-columns">Content Size</label>
                          <select
                            id="feature-columns"
                            value={listCardContentFontSize}
                            onChange={(e) =>
                              setListCardContentFontSize(e.target.value)
                            }
                            className="form-control"
                            style={{ width: "150px" }}
                          >
                            <option value="20px">20px</option>
                            <option value="18px">18px</option>
                            <option value="26px">16px</option>
                            <option value="14px">14px</option>
                          </select>
                        </div>
                      </div>
                      <div
                        className="list-adjustment-part"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5>Color</h5>
                        <input
                          type="color"
                          value={listColor}
                          onChange={(e) => setListColor(e.target.value)}
                        />
                      </div>
                      <div className="list-adjustment-part">
                        <h5 style={{ textAlign: "center" }}>Background</h5>
                        <hr />
                        <div className="form-list-radio">
                          <label>Image</label>
                          <input
                            type="radio"
                            name="background"
                            value="image"
                            checked={listBackgroundType === "image"}
                            onChange={() => setListBackgroundType("image")}
                          />
                        </div>
                        {listBackgroundType === "image" && (
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleListImageUpload}
                            />
                          </div>
                        )}
                        <div className="form-list-radio">
                          <label>Color</label>
                          <input
                            type="radio"
                            name="background"
                            value="color"
                            checked={listBackgroundType === "color"}
                            onChange={() => setListBackgroundType("color")}
                          />
                        </div>
                        <div>
                          {listBackgroundType === "color" && (
                            <input
                              type="color"
                              value={listBackgroundColor}
                              onChange={(e) =>
                                setListBackgroundColor(e.target.value)
                              }
                            />
                          )}
                        </div>
                      </div>
                      <div className="list-adjustement-part">
                        <button
                          onClick={handleDeleteList}
                          style={{
                            color: "red",
                            border: "none",
                            background: "transparent",
                          }}
                        >
                          Delete List
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ListComponent;
