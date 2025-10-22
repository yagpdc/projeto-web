import React from "react";
import { CardProps } from "../api/services/game/game.api.types";
import Card from "./Card";

interface SlotProps {
  playedCards: CardProps[];
  onDrop: (card: CardProps) => void;
}

export const Slot = ({ playedCards, onDrop }: SlotProps) => {
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const cardData = e.dataTransfer.getData("card");
    if (cardData) {
      const card = JSON.parse(cardData);

      if (!playedCards.find((c) => c._id === card._id)) onDrop(card);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-slate-700">Cartas Jogadas</h3>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative min-h-64 w-48 rounded-lg border-4 border-dashed p-4 transition-all ${
          isDraggingOver
            ? "scale-105 border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50"
        }`}
      >
        {playedCards.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-slate-400"></div>
        ) : (
          <div className="relative h-52 w-40">
            {playedCards.map((card, index) => (
              <div
                key={`${card._id}-${index}`}
                className="absolute"
                style={{
                  top: `0`,
                  left: `${index * 2}px`,
                  zIndex: index,
                }}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg bg-slate-100 p-3 text-sm">
        <div className="font-semibold text-slate-700">Total jogadas:</div>
        <div className="text-slate-600">{playedCards.length} cartas</div>
      </div>
    </div>
  );
};
