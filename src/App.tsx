import React from "react";
import { useDeck } from "./hooks/use-deck.hook";
import Card from "./components/Card";

function App() {
  const { deck, start, isStarting, startError, pauseCards, setPauseCards } =
    useDeck();

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
          <div className="flex w-full max-w-5xl flex-col gap-3">
            <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
              <span className="font-semibold">Total: {deck.totalCards}</span>
              <span>Level: {deck.breakdown.level}</span>
              <span>Reset: {deck.breakdown.reset}</span>
              <span>Pause: {deck.breakdown.pause}</span>
            </div>

            <div className="h-[600px] w-full overflow-y-auto rounded-lg border border-slate-300 bg-slate-50 p-4">
              <div className="grid grid-cols-4 gap-3">
                {deck.cards.length > 0 ? (
                  deck.cards.map((card) => <Card key={card._id} card={card} />)
                ) : (
                  <div className="col-span-4 text-center text-gray-500">
                    Nenhuma carta disponível
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
