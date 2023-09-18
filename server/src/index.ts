import express, { Express, Request, Response } from 'express';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import dotenv from "dotenv";
const cors = require('cors'); // TODO: av oklar anledning funkade inte import cors from "cors" för mig
import router from './routes/chat';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({path: "./src/.env"});

const port = process.env.PORT; // Choose a port for your server

app.use('/', router);

// Configure your OpenAI API key and create an instance of the API client
// const openaiConfig = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
// });
// const openai = new OpenAIApi(openaiConfig);


// // Define a route handler for handling chatbot requests
// app.post("/api/chatbot", async (req, res) => {
//   try {
//     const { message } = req.body; // Assuming the client sends a JSON object with a "message" property

//     // Create a chat message for the chatbot
//     const messages: ChatCompletionRequestMessage[] = [
//       {
//         role: "system",
//         content: "You are a helpful assistant.",
//       },
//       {
//         role: "user",
//         content: message,
//       },
//     ];

//     // Use the OpenAI API to generate a response
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: messages,
//     });

//     if (
//       completion.data.choices &&
//       completion.data.choices.length > 0 &&
//       completion.data.choices[0].message &&
//       completion.data.choices[0].message.content
//     ) {
//       const responseMessage = completion.data.choices[0].message.content;

//       // Send the chatbot's response back to the client
//       res.json({ botResponse: responseMessage });
//     } else {
//       res.status(500).json({ error: "Invalid response from the chatbot API." });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the request."});
//   }
// });

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
