import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
// ESM
import { destr } from "destr";

const WebSocket = () => {
  const [searchParams] = useSearchParams();
  // const name = searchParams.get("name") || "";
  const roomId = searchParams.get("roomId") || "";

  // const url = `ws://127.0.0.1:8000/ws/${roomId}`;
  const url = `wss://hartlink-websocket-api.onrender.com/ws/${roomId}`;

  const [heartRate, setheartRate] = useState(
    "{player1:null,heartRate1:0.0,player2:null,heartRate2:0.0}"
  );
  const [test, setTest] = useState([]);
  // const [heartRate, setheartRate] = useState<string>(" ");
  const socketRef = useRef();

  useEffect(() => {
    const websocket = new ReconnectingWebSocket(url);
    socketRef.current = websocket;

    websocket.onopen = () => {
      console.log("WebSocket connection established");
      // WebSocket接続が確立されたらサーバーにメッセージを送信
      websocket.send("0.0");
    };

    socketRef.current.onmessage = (event) => {
      // const heart = event.data.json();
      console.log("HeartRate", event.data);
      setheartRate(destr(event.data));
      // ここのログだとundefinedになってしまう
      console.log("heartRate: ", heartRate?.heartRate1);
      // `setTest`には配列を渡すため、既存のtestに追加する形で設定
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId]);

  useEffect(() => {
    console.log("kokoday: ", heartRate?.heartRate1);
    setTest((prev) => [...prev, heartRate]);
  }, [heartRate]);

  return (
    <>
      <h1>Hellow WebSocket</h1>
      <p>
        心拍数: {heartRate.player1}:{heartRate.heartRate1}
      </p>
      <p>
        心拍数: {heartRate.player2}:{heartRate.heartRate2}
      </p>
      <h1>player1</h1>
      <div>
        {test.map((req, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>{req.heartRate1}</p>
        ))}
      </div>
      <h1>player2</h1>
      <div>
        {test.map((req, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>{req.heartRate2}</p>
        ))}
      </div>
    </>
  );
};

export default WebSocket;
