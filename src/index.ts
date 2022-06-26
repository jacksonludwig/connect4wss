import httpServer from './app';

const PORT = process.env.PORT || 4001;

httpServer.listen(PORT, () => {
  console.log(`websocket server running on ${PORT}`);
});
