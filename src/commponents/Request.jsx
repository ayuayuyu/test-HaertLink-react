import { Button } from "@chakra-ui/react";

const Request = () => {
  const end = () => {
    console.log("ただいま、メールを送信してます");
    // const url = "http://127.0.0.1:8000/end";
    const url = "https://hartlink-api.onrender.com/end";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答が正常ではありません");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Button onClick={end}>完了</Button>
    </>
  );
};
export default Request;
