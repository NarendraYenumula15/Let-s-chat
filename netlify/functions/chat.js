const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

exports.handler = async function (event, context) {
  try {
    console.log("Function started");

    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    const data = JSON.parse(event.body || "{}");
    const question = data.message || "Tell me about Narendra.";

    console.log("Question:", question);

    // Load resume from root directory
    const resumePath = path.join(__dirname, "../../resume.txt");
    console.log("Resume path:", resumePath);
    
    const resume = fs.readFileSync(resumePath, "utf8");
    console.log("Resume loaded successfully");

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY not set");
      return {
        statusCode: 500,
        body: JSON.stringify({
          reply: "API key not configured",
        }),
      };
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant answering recruiter questions about Narendra Yenumula based on this resume:\n\n${resume}\n\nAnswer clearly, professionally, and concisely.`,
            },
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 500,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", result);
      return {
        statusCode: 500,
        body: JSON.stringify({
          reply: "Error connecting to AI service",
        }),
      };
    }

    const reply =
      result?.choices?.[0]?.message?.content ||
      "Could not generate response";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("ERROR:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Error connecting to AI.",
      }),
    };
  }
};
