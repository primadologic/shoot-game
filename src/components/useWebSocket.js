import { useEffect, useState, useRef } from 'react';

const useWebSocket = (url, onMessage) => {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    ws.current.onmessage = (event) => {
      console.log('WebSocket message type:', typeof event.data);
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          console.log('Blob data converted to text:', reader.result);
          if (onMessage) {
            onMessage(reader.result);
          }
        };
        reader.readAsText(event.data);
      } else {
        console.log('Text data:', event.data);
        if (onMessage) {
          onMessage(event.data);
        }
      }
    };

    return () => {
      ws.current.close();
    };
  }, [url, onMessage]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return { isConnected, sendMessage };
};

export default useWebSocket;
