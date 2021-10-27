import React from "react";
import "./PageSlider.css";

interface PageSliderProps {
  onRightPage(): void;
  onLeftPage(): void;
  currentPage: number;
}

const PageSlider: React.FC<PageSliderProps> = ({onLeftPage, onRightPage, currentPage}) => {
  return (
    <div className="PageSlider">
      <div className="PageSlider__item" onClick={onLeftPage}>◀</div>
      <div className="PageSlider__page">{currentPage}</div>
      <div className="PageSlider__item" onClick={onRightPage}>▶</div>
    </div>
  );
}

export default PageSlider;