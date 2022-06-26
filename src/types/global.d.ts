declare namespace Client {
  enum Actions {
    CreateGame = 'CreateGame',
    JoinGame = 'JoinGame',
  }

  type Message = {
    name: Client.Actions;
    gameId: string | undefined;
  };
}
