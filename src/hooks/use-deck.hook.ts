import { useMutation, useQuery } from "@tanstack/react-query";
import { GameApi } from "../api/services/game/game.api";
import type {
  CardProps,
  DeckResponse,
  DropPayload,
  StartGameRequest,
} from "../api/services/game/game.api.types";
import React from "react";

export function useDeck() {
  const [pauseCards, setPauseCards] = React.useState<number>(3);
  const [playedCards, setPlayedCards] = React.useState<CardProps[]>([]);
  const [deckCards, setDeckCards] = React.useState<CardProps[]>([]);
  const [deck, setDeck] = React.useState<DeckResponse | null>(null);
  const startMutation = useMutation<
    DeckResponse,
    Error,
    StartGameRequest | undefined
  >({
    mutationKey: ["deck", "start"],
    mutationFn: (params) => GameApi.start(params),
    onSuccess: (data) => {
      setDeck(data);
      setDeckCards(data.deck.cards);
      setPlayedCards([]);
    },
  });

  React.useEffect(() => {
    if (deck?.deck?.cards) {
      setDeckCards(deck.deck.cards);
    }
  }, [deck]);

  const { data: cards } = useQuery({
    queryKey: ["cards"],
    queryFn: () => GameApi.getCards(),
  });

  const handleCardDrop = React.useCallback(({ index, card }: DropPayload) => {
    console.log("Card dropped:", card);
    setPlayedCards((prev) => [...prev, card]);

    // TODO: Chamar API de auto-save aqui
    // await GameApi.autoSave({ deckCards: deckCards, playedCards: [...playedCards, card] });
  }, []);

  const handleCardRemoved = (card: CardProps) => {
    console.log("Card removed from deck:", card);
    setDeckCards((prev) => prev.filter((c) => c._id !== card._id));

    // TODO: Chamar API de auto-save aqui
    // await GameApi.autoSave({ deckCards: deckCards.filter(c => c._id !== card._id), playedCards });
  };

  return {
    pauseCards,
    setPauseCards,
    cards,
    // data and status
    deck: startMutation.data,
    isStarting: startMutation.isPending,
    startError: startMutation.error,

    // actions
    start: startMutation.mutate,
    startAsync: startMutation.mutateAsync,
    resetStart: startMutation.reset,
    handleCardDrop,
    handleCardRemoved,
    deckCards,
    playedCards,
  };
}
