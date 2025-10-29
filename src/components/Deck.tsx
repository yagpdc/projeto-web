import React, { useState } from "react";
import { CardProps } from "../api/services/game/game.api.types";
import Card from "./Card";

interface DeckProps {
  cards: CardProps[];
  onCardRemoved?: (card: CardProps) => void;
}

export const Deck = ({ cards: initialCards, onCardRemoved }: DeckProps) => {
  const [cards, setCards] = useState(initialCards);
  const [clickCount, setClickCount] = useState(0);

  const handleCardClick = () => {
    console.log("Card clicked:", cards[0]._id);
    setClickCount((prev) => prev + 1);
    setCards((prevCards) => {
      const [firstCard, ...restCards] = prevCards;
      return [...restCards, firstCard];
    });
  };

  const handleDragEnd = (card: CardProps, wasDropped: boolean) => {
    if (wasDropped && card._id === cards[0]._id) {
      // Remove a carta do deck
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      // Notifica o componente pai
      onCardRemoved?.(card);
    }
  };

  const currentCard = cards[0];
  const isFirstCard = clickCount === 0;
  const isLastCard = clickCount === cards.length - 1;
  const cardPosition = (clickCount % cards.length) + 1;

  if (cards.length === 0) {
    return (
      <div className="flex h-28 w-20 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400"></div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-52 w-40">
        {cards.map((card, index) => (
          <div
            key={card._id}
            className="absolute"
            style={{
              top: 0,
              right: `${index * 0.5}px`,
              zIndex: cards.length - index,
            }}
          >
            <Card
              card={card}
              onClick={index === 0 ? handleCardClick : undefined}
              isTop={index === 0}
              draggable={true}
              onDragEnd={handleDragEnd}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
