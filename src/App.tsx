import React from "react";
import { useDeck } from "./hooks/use-deck.hook";
import { Deck } from "./components/Deck";
import { Slot } from "./components/Slot";
import { CardProps } from "./api/services/game/game.api.types";

function App() {
  const {
    deck,
    start,
    isStarting,
    startError,
    pauseCards,
    setPauseCards,
    handleCardDrop,
    handleCardRemoved,
    deckCards,
    playedCards,
  } = useDeck();

  return (
    <div className="flex h-screen flex-col items-center justify-start overflow-hidden p-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-slate-900">Game</h1>

        <div className="flex items-center gap-2">
          <button
            disabled={isStarting}
            onClick={() => start({ pauseCards })}
            className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isStarting ? "Iniciando..." : "Iniciar Jogo"}
          </button>
          <select
            className="cursor-pointer rounded-md border border-slate-500 px-3 py-2"
            value={pauseCards}
            onChange={(e) => setPauseCards(Number(e.target.value))}
          >
            <option value={3}>Facil</option>
            <option value={2}>Medio</option>
            <option value={1}>Dificil</option>
            <option value={0}>Expert</option>
          </select>
        </div>

        {startError && (
          <div className="text-red-500">Erro: {startError.message}</div>
        )}

        {deck && (
          <div className="flex w-full flex-col gap-6">
            <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
              <span className="font-semibold">
                Total Inicial: {deck.totalCards}
              </span>
              <span>No Deck: {deckCards.length}</span>
              <span>Jogadas: {playedCards.length}</span>
            </div>

            <div className="flex items-start justify-center gap-8">
              {/* Deck */}
              <Deck cards={deckCards} onCardRemoved={handleCardRemoved} />

              {/* Slot */}
              <Slot playedCards={playedCards} onDrop={handleCardDrop} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
