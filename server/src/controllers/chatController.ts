import { Request, Response } from "express";
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

export const createChatResponse = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const content = 
      'You are a playlist generator. Create a playlist with the number of tracks that I say.' +
      'The playlist should match the description that I say.' +
      'Give a reply by returning a response consisting of tracks and artists. Do not provide any other info about the tracks.\n' +
      'The reply should have the following format:\n' +
      '1. Track1 - Artist1\n' +
      '2. Track2 - Artist2\n' +
      '3. Track3 - Artist3\n' +
      'etc.\n' +
      'Write no other text at all, only the playlist in the given format.';

    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: content,
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
