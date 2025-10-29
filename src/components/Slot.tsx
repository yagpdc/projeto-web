// src/components/Slot.tsx
import React from "react";
import { CardProps } from "../api/services/game/game.api.types";
import Card from "./Card";

interface SlotProps {
  playedCards: CardProps[];
  onDrop: (card: CardProps) => void;
  allowReplace?: boolean;
}

export const Slot = ({
  playedCards,
  onDrop,
  allowReplace = false,
}: SlotProps) => {
  const [over, setOver] = React.useState(false);
  const card = playedCards[0] ?? null;
  const canAccept = !card || allowReplace;

  const handleDragEnter = () => {
    if (canAccept) setOver(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!canAccept) return;
    e.preventDefault();
  };

  const handleDragLeave = () => setOver(false);

  const handleDrop = (e: React.DragEvent) => {
    if (!canAccept) return;
    e.preventDefault();
    setOver(false);
    const raw = e.dataTransfer.getData("card");
    if (!raw) return;
    onDrop(JSON.parse(raw) as CardProps);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        "relative",
        "box-border",
        "h-28 w-20",
        "flex items-center justify-center",
        over
          ? "rounded-md border-dashed bg-transparent outline outline-2 outline-blue-500"
          : "bg-transparent",
      ].join(" ")}
    >
      {card ? <Card card={card} /> : null}
    </div>
  );
};

export default Slot;
