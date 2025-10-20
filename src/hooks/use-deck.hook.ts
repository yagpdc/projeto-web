import { useMutation } from "@tanstack/react-query";
import { GameApi } from "../api/services/game/game.api";
import type {
  DeckResponse,
  StartGameRequest,
} from "../api/services/game/game.api.types";
import React from "react";

export function useDeck() {
  const [pauseCards, setPauseCards] = React.useState<number>(3);

  const startMutation = useMutation<
    DeckResponse,
    Error,
    StartGameRequest | undefined
  >({
    mutationKey: ["cards", "start"],
    mutationFn: (params) => GameApi.start(params),
  });

  return {
    pauseCards,
    setPauseCards,

    // data and status
    deck: startMutation.data,
    isStarting: startMutation.isPending,
    startError: startMutation.error,

    // actions
    start: startMutation.mutate,
    startAsync: startMutation.mutateAsync,
    resetStart: startMutation.reset,
  };
}
