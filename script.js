const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

// Resume data embedded
const RESUME_DATA = `Name: Narendra Yenumula
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

Data Analysis: SQL, Python, Pandas, NumPy, R, EDA
BI & Visualization: Power BI, Tableau, Excel, SAP Analytics Cloud
SAP: SAP S/4HANA, SAP ECC, SAP BW/4HANA, SAP HANA
Data Engineering: ETL, Snowflake, SQL Server, Python Automation

Education: MS Data Science & Analytics, Florida Atlantic University (2025)`;

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
