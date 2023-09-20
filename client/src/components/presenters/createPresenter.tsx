import CreateView from "../views/createView";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

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
      setBotResponse(data.botResponse); // Assuming your server returns { botResponse }
    } catch (error) {
      console.error("Error:", error);
      setBotResponse("An error occurred while communicating with the chatbot.");
    }
  };

  useEffect(() => {
    if(botResponse) {
      console.log("Chatbot: \n", botResponse); 
      redirect("/preview");
    }
  }, [botResponse]);

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
  }

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
