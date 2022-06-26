import { WebSocket } from 'ws';

/**
 * Save a game id to the websocket
 */
export const saveGameToWS = (ws: WebSocket, gameId: string) => {
  (ws as any).gameId = gameId;
};

/**
 * Save a player id to the websocket
 */
export const savePlayerToWS = (ws: WebSocket, playerId: string) => {
  (ws as any).playerId = playerId;
};

/**
 * Get a game id from the websocket
 */
export const getGameFromWS = (ws: WebSocket): string | undefined => {
  return (ws as any).gameId;
};

/**
 * Get a player id from the websocket
 */
export const getPlayerFromWS = (ws: WebSocket): string | undefined => {
  return (ws as any).playerId;
};
