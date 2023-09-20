export default class HaipModel {

  botResponse: string;

  constructor() {
    this.botResponse = "";
  }

  async submitBotRequest(userMessage: string) {
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
      this.botResponse = data.botResponse;
    } catch (error) {
      console.error("Error:", error);
      this.botResponse = "An error occurred while communicating with the chatbot.";
    }
    console.log("ChatBot: \n", this.botResponse);
  }

};