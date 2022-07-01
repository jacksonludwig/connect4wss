import { WebSocket } from 'ws';
import { wsServer } from '../app';

/**
 * Save a game id to the websocket
 */
export const saveGameToWS = (ws: WebSocket, gameId: string) => {
  (ws as any).gameId = gameId;
};

/**
 * Remove a game id from the websocket
 */
export const removeGameFromWS = (ws: WebSocket) => {
  (ws as any).gameId = undefined;
};

/**
 * Save a player id to the websocket
 */
export const savePlayerToWS = (ws: WebSocket, playerId: string) => {
  (ws as any).playerId = playerId;
};

/**
 * Remove a player id from the websocket
 */
export const removePlayerFromWs = (ws: WebSocket) => {
  (ws as any).playerId = undefined;
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

/**
 * Broadcast message to all websockets connected to the game besides the one given in the parameter
 */
export const broadcastMessage = (gameId: string, message: string, excludedWs?: WebSocket) => {
  const gameClients = Array.from(wsServer.clients).filter(
    (client) => getGameFromWS(client) === gameId && client !== excludedWs,
  );

  gameClients.forEach((client) => {
    client.send(message);
  });
};

/**
 * Remove game and player ids from every player in the game
 */
export const removePlayersFromGame = (gameId: string) => {
  const gameClients = Array.from(wsServer.clients).filter(
    (client) => getGameFromWS(client) === gameId,
  );

  gameClients.forEach((client) => {
    removeGameFromWS(client);
    removePlayerFromWs(client);
  });
};
