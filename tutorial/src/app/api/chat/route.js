import { deepseek } from "@ai-sdk/deepseek";
import { streamText } from "ai";

export async function POST(req) {
  const { messages } = await req.json();

  try {
    // Stream text using the DeepSeek model
    const result = await streamText({
      model: deepseek("deepseek-reasoner", {
        // Use the correct model name
        apiKey: process.env.DEEPSEEK_API_KEY, // Ensure the API key is set in .env.local
      }),
      messages,
    });

    // Return the streaming response
    return result.toAIStreamResponse();
  } catch (error) {
    console.error("Error streaming text:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
