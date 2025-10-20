// Tipos de carta válidos
export const CardTypes = {
  LEVEL: "level",
  RESET: "reset",
  PAUSE: "pause",
} as const;

export const CardColors = {
  RED: "red",
  BLUE: "blue",
  GREEN: "green",
  YELLOW: "yellow",
} as const;

export type CardType = (typeof CardTypes)[keyof typeof CardTypes];

export type Card = {
  color?: string; // Apenas para cartas do tipo 'level'
  _id: string; // ID único da carta ( MONGODB)
  numero: number;
  tipo: CardType;
  createdAt: string;
};

export type StartGameRequest = {
  pauseCards?: number; // 0-3 (padrão: 3)
};

// Resposta da API  /cards/game/start
export type DeckResponse = {
  message: string;
  totalCards: number;
  breakdown: {
    level: number;
    reset: number;
    pause: number;
  };
  cards: Card[];
};
