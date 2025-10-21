import React from "react";
import { Card as CardType } from "../api/services/game/game.api.types";

const Card = ({ card }: { card: CardType }) => {
  function cardStyle(cardType: string) {
    switch (cardType) {
      case "level":
        return "text-white";
      case "reset":
        return "bg-red-500 text-white";
      case "pause":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-300 text-black";
    }
  }

  return (
    <div
      style={{
        backgroundColor: card.color || "#6b7280", // fallback gray-500
      }}
      className={`rounded-md p-4 shadow-md ${cardStyle(card.type)} flex h-52 w-40 flex-col items-center justify-center`}
    >
      <span className="text-3xl font-bold">
        {card.type === "level" ? ` ${card.number}` : card.type}
      </span>
    </div>
  );
};

export default Card;
