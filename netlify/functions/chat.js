const fetch = require("node-fetch");
const fs = require("fs");
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

    // Load resume
    const resume = fs.readFileSync("./resume.txt", "utf8");
    console.log("Resume loaded");

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant answering recruiter questions about Narendra based on this resume:

${resume}

Answer clearly and professionally.`,
            },
            {
              role: "user",
              content: question,
            },
          ],
        }),
      }
    );

    const result = await response.json();
    console.log("AI response:", result);

    const reply =
      result?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Error connecting to AI.",
      }),
    };
  }
};