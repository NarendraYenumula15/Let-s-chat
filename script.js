const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

// Resume data embedded
const RESUME_DATA = `NARENDRA YENUMULA
Senior Data Engineer | AI/ML Pipelines | Python | SQL | Snowflake | Cloud
Boca Raton, FL | +1 (561) 859-6887 | yenumulanarendra321@gmail.com | LinkedIn | Portfolio

PROFESSIONAL SUMMARY
Data Engineer with 4+ years of experience building scalable data pipelines and AI/ML-ready data systems. Expert in Python, SQL, and Snowflake with strong experience in feature engineering, data preprocessing, and predictive analytics support. Proven ability to improve data quality, optimize performance, and automate workflows, enabling data-driven and AI-powered decision-making.

PROFESSIONAL EXPERIENCE

Senior Data Engineer
Discover Financial Services — Mar 2024 – Present
- Built scalable ETL pipelines processing 5M+ records/month using Python and SQL, enabling ML-driven risk analytics and improving prediction accuracy.
- Designed feature engineering pipelines to transform raw financial data into model-ready datasets, improving model performance and reducing training time.
- Implemented automated data validation and anomaly detection frameworks, increasing data reliability by 25% and ensuring consistency across analytics and ML systems.
- Optimized complex SQL queries and large-scale transformations in Snowflake, reducing execution time by 35% and improving reporting performance.
- Automated end-to-end data workflows using Python and orchestration tools, reducing manual effort by 30% and improving pipeline scalability and stability.

Data Engineer
Hexaware Technologies — Jan 2022 – Feb 2024
- Developed ETL pipelines processing 100K–2M records using Python and SQL, supporting ML use cases such as customer segmentation and churn prediction.
- Built data preprocessing and feature extraction pipelines using Python (Pandas, NumPy), improving data quality and enabling structured inputs for machine learning models.
- Designed optimized SQL queries and data models for reporting systems, improving performance by 25% and reducing dashboard latency.
- Automated KPI aggregation and reporting workflows using Python and SQL, reducing manual effort by 25% and improving reporting consistency.
- Integrated multiple data sources into centralized warehouse systems, reducing discrepancies by 18% and enabling unified analytics.

Data Engineer Intern
VR Digital Solutions — Jan 2021 – Dec 2021
- Assisted in building ETL pipelines and data ingestion workflows using Python and SQL, improving data availability for analytics and ML use cases.
- Performed data cleaning, validation, and anomaly detection across datasets, improving reporting accuracy by 15%.
- Automated repetitive data processing tasks using Python scripts, improving workflow efficiency and reducing processing time.

PROJECTS

SuperStore – Sales Analysis (Automated ETL & Executive KPI Dashboard):
- Built an automated ETL pipeline using Python and MySQL to clean, process, and load sales data, reducing manual effort by ~30%.
- Developed an interactive Power BI dashboard with KPI tracking, trend analysis, and automated reporting.

Credit Risk Monitoring Dashboard:
- Created an end-to-end system to generate, process, and analyze banking data using Python and MySQL for credit risk segmentation.
- Designed a Power BI dashboard to monitor real-time KPIs, risk distribution, and spending trends for proactive risk detection.

SKILLS
- Data Engineering: ETL/ELT Pipelines, Data Warehousing, Data Modeling, Data Lakes, Data Integration, Data Governance.
- Programming: Python (Pandas, NumPy, Scikit-learn), SQL (Advanced Optimization, Window Functions).
- Big Data: Apache Spark (PySpark), Distributed Processing, Batch Processing.
- AI/ML: Feature Engineering, Data Preprocessing, ML Pipelines, Predictive Analytics, Anomaly Detection.
- Cloud & Tools: Snowflake, AWS (S3, Glue, Lambda), Airflow, Databricks (Exposure).
- Visualization: Power BI, Tableau, Excel.

EDUCATION
Master of Science – Data Science & Analytics – Florida Atlantic University – May 2025`;
// Show welcome message when page loads
function showWelcome() {
  if (chatBox && chatBox.children.length === 0) {
    addMessage("👋 Hi there! I'm glad you're here. Feel free to ask me anything — about my experience, skills, projects, or how I can add value to your team. I'm happy to chat!", "bot");
  }
}

// Try to show welcome message multiple ways
setTimeout(showWelcome, 100);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showWelcome);
} else {
  showWelcome();
}

function addMessage(message, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "bot-msg";

  // Bold **text**
  message = message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert bullet points
  message = message.replace(/^\* (.*$)/gm, "• $1");

  // Convert line breaks
  message = message.replace(/\n/g, "<br>");

  msg.innerHTML = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Call Groq AI API
async function callGroqAI(userMessage) {
  try {
    // Check if API key is available
    if (typeof GROQ_API_KEY === 'undefined' || !GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined. Make sure config.js is loaded.");
      return "Sorry, the AI service is not configured. Please check the API key setup.";
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant answering questions about Narendra Yenumula, a Data Analyst professional. Based on the resume below, answer recruiter and job-seeker questions professionally and concisely.

RESUME:
${RESUME_DATA}

Guidelines:
- Answer questions about skills, experience, projects, and background
- Be professional and accurate
- Keep responses concise (2-3 sentences typically)
- Reference specific technologies and experiences from the resume
- If asked something not on the resume, politely redirect to the available information`
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Groq API Error:", error);
      return "Sorry, I couldn't process your request. Please try again!";
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return "Sorry, I'm having trouble connecting to the AI service. Please try again!";
  }
}

async function sendMessage(messageFromButton = null) {
  const message = messageFromButton || input.value.trim();

  if (!message) return;

  addMessage(message, "user");

  if (!messageFromButton) {
    input.value = "";
  }

  // Show typing indicator
  const typingMsg = document.createElement("div");
  typingMsg.className = "bot-msg";
  typingMsg.innerHTML = "⏳ Thinking...";
  typingMsg.id = "typing-indicator";
  chatBox.appendChild(typingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Call Groq AI
  const reply = await callGroqAI(message);
  
  // Remove typing indicator
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }

  // Add AI response
  addMessage(reply, "bot");
}

// Add event listener for input
if (input) {
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}
