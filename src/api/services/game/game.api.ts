import { Api } from "../../api";
import type { DeckResponse, StartGameRequest } from "./game.api.types";

export class GameApi {
  // POST /cards/game/start - Criar deck do jogo
  // Body opcional: { "pauseCards": 0-3 } (padrão: 3)
  static start = async (payload?: StartGameRequest): Promise<DeckResponse> => {
    const res = await Api.post<DeckResponse>(`/decks`, payload);
    return res.data;
  };

  // POST /decks/:deckId/draw - Comprar carta
  static drawCard = async (deckId: string) => {
    const res = await Api.post<DeckResponse>(`/decks/${deckId}/draw`);
    return res.data;
  };

  // GET /decks/:deckId?includeCards=true - Ver estado do deck
  static getDeckState = async (deckId: string): Promise<DeckResponse> => {
    const res = await Api.get<DeckResponse>(`/decks/${deckId}`, {
      params: { includeCards: true },
    });
    return res.data;
  };

  // Optional: GET /cards - Ver cartas disponíveis
  static getCards = async () => {
    const res = await Api.get(`/cards`);
    return res.data;
  };
}
