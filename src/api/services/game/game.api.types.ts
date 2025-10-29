// Tipos de carta válidos
export const CardTypes = {
  LEVEL: "level",
  RESET: "reset",
  PAUSE: "pause",
} as const;

export type DropPayload = { index: number; card: CardProps };

export const CardColors = {
  RED: "red",
  BLUE: "blue",
  GREEN: "green",
  YELLOW: "yellow",
} as const;

export type CardType = (typeof CardTypes)[keyof typeof CardTypes];

export type CardProps = {
  _id: string;
  id: number;
  number: number;
  type: CardType;
  color?: string;
};

export type DeckData = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  pauseCards: number;
  currentCardIndex: number;
  drawnCards: CardProps[];
  cards: CardProps[];
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
  deck: DeckData;
};
