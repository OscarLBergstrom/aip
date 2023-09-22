import CreateView from "../views/createView";
import { useState } from "react";

const CreatePresenter = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [botResponse, setBotResponse] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBotResponse(data.botResponse);

    } catch (error) {
      console.error("Error:", error);
      setBotResponse("An error occurred while communicating with the chatbot.");
    }
  };

  return (
    <CreateView
      userMessage={userMessage}
      setUserMessage={setUserMessage}
      botResponse={botResponse}
      setBotResponse={setBotResponse}
      onSubmit={handleSubmit}
    />
  );
};

export default CreatePresenter;
