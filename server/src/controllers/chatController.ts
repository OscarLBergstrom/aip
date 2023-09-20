import { Request, Response } from "express";
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

// Configure your OpenAI API key and create an instance of the API client
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});
const openai = new OpenAIApi(openaiConfig);

export const createChatResponse = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: message,
      },
    ];

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    if (
      completion.data.choices &&
      completion.data.choices.length > 0 &&
      completion.data.choices[0].message &&
      completion.data.choices[0].message.content
    ) {
      const responseMessage = completion.data.choices[0].message.content;

      res.json({ botResponse: responseMessage });
    } else {
      res.status(500).json({ error: "Invalid response from the chatbot API." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
