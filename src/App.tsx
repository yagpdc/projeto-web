// App.tsx
import React from "react";
import { useDeck } from "./hooks/use-deck.hook";
import { Deck } from "./components/Deck";
import { Slot } from "./components/Slot";

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
  const total = deck?.totalCards || 0; // 50–53
  const rows = 5;
  const cols = Math.ceil(total / rows);

  return (
    <div className="flex h-screen flex-col items-center justify-start overflow-hidden p-8">
      <div className="flex w-full flex-col items-center gap-6 p-4">
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
          <div className="bg-repeatdebug flex w-full flex-col gap-6 rounded-md border-4 border-rose-950 bg-[url('/wood_table_top.png')] bg-cover bg-center p-4">
            <div className="flex items-start justify-start gap-8">
              <Deck cards={deckCards} onCardRemoved={handleCardRemoved} />
              <div
                className="grid grid-flow-col grid-rows-5 gap-3"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(96px, 1fr))`,
                }}
              >
                {Array.from({ length: total }).map((_, i) => (
                  <Slot
                    key={i}
                    playedCards={playedCards[i] ? [playedCards[i]] : []}
                    onDrop={(card) => handleCardDrop({ index: i, card })}
                    allowReplace
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
