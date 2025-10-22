import React from "react";
import { CardProps } from "../api/services/game/game.api.types";

interface CardComponentProps {
  card: CardProps;
  onClick?: () => void;
  isTop?: boolean;
  draggable?: boolean;
  onDragEnd?: (card: CardProps, wasDropped: boolean) => void;
}

const Card = ({
  card,
  onClick,
  isTop,
  draggable = false,
  onDragEnd,
}: CardComponentProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("card", JSON.stringify(card));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // dropEffect será "move" se foi solto em um local válido, "none" se não foi
    const wasDropped = e.dataTransfer.dropEffect === "move";
    onDragEnd?.(card, wasDropped);
  };

  function getColorStyle(color?: string) {
    switch (color?.toLowerCase()) {
      case "red":
        return "bg-red-500 text-white border-2 border-red-700 ";
      case "blue":
        return "bg-blue-500 text-white border-2 border-blue-700 ";
      case "green":
        return "bg-green-500 text-white border-2 border-green-700 ";
      case "yellow":
        return "bg-yellow-400 text-slate-900 border-2 border-yellow-600 ";
      case "purple":
        return "bg-purple-500 text-white border-2 border-purple-700 ";
      default:
        return "bg-gray-500 text-white border-2 border-gray-700 ";
    }
  }

  function getTypeStyle(cardType: string) {
    switch (cardType) {
      case "reset":
        return "bg-red-600 text-white border-2 border-red-800 ";
      case "pause":
        return "bg-yellow-400 text-slate-900 border-2 border-yellow-600 ";
      default:
        return "";
    }
  }

  const colorStyle =
    card.type === "level" ? getColorStyle(card.color) : getTypeStyle(card.type);

  return (
    <div
      onClick={onClick}
      draggable={draggable && isTop}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`flex h-52 w-40 flex-col items-center justify-center rounded-lg p-4 transition-transform ${colorStyle} ${
        isTop && draggable
          ? "cursor-grab hover:scale-105 active:cursor-grabbing"
          : isTop
            ? "cursor-pointer"
            : ""
      }`}
    >
      <span className="text-4xl font-bold">
        {card.type === "level" ? card.number : card.type.toUpperCase()}
      </span>
    </div>
  );
};

export default Card;
