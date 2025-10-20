import React from "react";
import { useDeck } from "./hooks/use-deck.hook";

function App() {
  const { deck, start, isStarting, startError, pauseCards, setPauseCards } =
    useDeck();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-slate-900">Game</h1>

        <div className="flex items-center gap-2">
          <button
            disabled={isStarting}
            onClick={() => start({ pauseCards })}
            className="rounded bg-blue-600 px-6 py-0.5 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isStarting ? "Iniciando..." : "Iniciar Jogo"}
          </button>
          <select
            className="cursor-pointer rounded-md border border-slate-500"
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
          <div className="flex flex-col gap-2 rounded border p-4">
            <div className="font-bold">{deck.message}</div>
            <div className="text-sm text-slate-600">
              Total de cartas: {deck.totalCards}
            </div>
            <div className="text-sm text-slate-600">
              Level: {deck.breakdown.level} | Reset: {deck.breakdown.reset} |
              Pause: {deck.breakdown.pause}
            </div>
            <div className="mt-2 max-h-64 overflow-auto">
              <div className="text-sm font-semibold">Cartas:</div>
              {deck.cards.map((card) => (
                <div key={card._id} className="text-xs">
                  {card.tipo === "level" ? ` ${card.color}` : card.tipo} -{" "}
                  {card.numero}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
