import { Api } from "../../api";
import type { DeckResponse, StartGameRequest } from "./game.api.types";

export class GameApi {
  // POST /cards/game/start - Criar deck do jogo
  // Body opcional: { "pauseCards": 0-3 } (padrão: 3)
  static start = async (payload?: StartGameRequest): Promise<DeckResponse> => {
    const res = await Api.post<DeckResponse>(`/cards/game/start`, payload);
    return res.data;
  };
}
