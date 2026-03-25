const fetch = require("node-fetch");
require("dotenv").config();

// Resume content embedded directly
const RESUME_CONTENT = `Name: Narendra Yenumula
Title: Data Analyst | BI | SQL | Financial Analytics
Location: Boca Raton, Florida

SUMMARY
Data Analyst with 3+ years of experience working with financial, operational, and healthcare datasets using SQL, Python, Power BI, Tableau, and SAP (S/4HANA, ECC, BW/4HANA).

EXPERIENCE

Discover Financial Services (Mar 2025 – Present)
Role: Data Analyst
- Work with large transactional datasets using SQL and Python
- Build Power BI dashboards for credit performance and spending trends
- Extract data from SAP S/4HANA and SAP ECC
- Automate reporting using Python and Power Automate
- Support finance and risk teams

VR Digital Solutions (Jan 2022 – Jul 2023)
Role: Data Analyst
- Analyze datasets up to 2M records using SQL, Excel, Python
- Build dashboards in Power BI and Tableau
- Perform marketing and operational analytics
- Automate reporting with Python and Excel macros

VR Digital Solutions (Jul 2021 – Dec 2021)
Role: Data Analyst Intern
- Data cleaning and preprocessing
- Build dashboards in Power BI
- Perform exploratory data analysis

PROJECTS

Business Performance Analytics Dashboard
- Built dashboards using SQL, Power BI, Excel
- Track operational KPIs and revenue trends

Customer Behavior & Retention Analysis
- Analyzed customer behavior using Python and SQL
- Created Tableau and Power BI dashboards

SKILLS

Data Analysis
SQL, Python, Pandas, NumPy, R, EDA

BI & Visualization
Power BI, Tableau, Excel, SAP Analytics Cloud

SAP
SAP S/4HANA, SAP ECC, SAP BW/4HANA, SAP HANA

Data Engineering
ETL, Snowflake, SQL Server, Python Automation

Education
MS Data Science & Analytics
Florida Atlantic University (2025)`;

exports.handler = async function (event, context) {
  try {
    console.log("=== Chat Function Started ===");
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ reply: "Method Not Allowed" }),
      };
    }

    const data = JSON.parse(event.body || "{}");
    const question = data.message || "Tell me about Narendra.";
    console.log("Question:", question);

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY not configured");
      return {
        statusCode: 500,
        body: JSON.stringify({
          reply: "Error: API key not configured.",
        }),
      };
    }

    console.log("Calling Groq API...");
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
              content: `You are an AI assistant answering questions about Narendra Yenumula, a Data Analyst professional. Based on the resume below, answer questions professionally and concisely.

RESUME:
${RESUME_CONTENT}

Be helpful, accurate, and professional.`,
            },
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", result);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          reply: `Error from AI: ${result.error?.message || "Unknown"}`,
        }),
      };
    }

    const reply =
      result?.choices?.[0]?.message?.content ||
      "Could not generate response";

    console.log("Success!");
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("ERROR:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: `Error: ${error.message}`,
      }),
    };
  }
};
