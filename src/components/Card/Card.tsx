import React from "react";
import "./Card.css";

interface CardProps {
  onClick(): void;
  title: string;
  description: string;
  onAdd(): void;
  onDelete(): void;
  isActive: boolean;
}

const Card: React.FC<CardProps> = ({title, description, onClick, onAdd, onDelete, isActive}) => {
  const onFavbtnHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if(isActive) {
      onDelete();
      return;
    }
    onAdd();
  }

  return (
    <div className="Card" onClick={onClick}>
      <h2 className="Card__title">{title}</h2>
      <p className="Card__description">{description}</p>
      <div className="Card__fav-btn" onClick={onFavbtnHandler}>{isActive ? "★" : "☆"}</div>
    </div>
  );
}

export default Card;