const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

// Resume data embedded
const RESUME_DATA = `NARENDRA YENUMULA
Data Analyst | BI | SQL | Financial Analytics
Boca Raton, FL | +1 (954) 501-1832 | narendra.nani936@gmail.com | https://www.linkedin.com/in/narendrayenumula15/ | https://vocal-banoffee-ef2635.netlify.app/

PROFESSIONAL SUMMARY
Data Analyst with 3+ years of experience delivering insights across financial, operational, and healthcare datasets using SQL, Python, Power BI, Tableau, and SAP (S/4HANA, ECC, BW/4HANA). Experienced in data modeling, enterprise data integration, working with data warehouse environments, automating reporting workflows, and building dashboards that support credit risk, regulatory reporting, and performance tracking. Known for improving reporting consistency, strengthening data validation, and translating complex datasets into actionable business insights.

PROFESSIONAL EXPERIENCE

Data Analyst
Discover Financial Services — Mar 2025 – Present
- Work with large transactional datasets spanning millions of records using SQL and Python to support credit risk and operational reporting. Perform data extraction, transformation, and validation across enterprise data sources. Deliver reliable datasets used by finance and risk teams for ongoing analysis.
- Design and maintain Power BI dashboards tracking credit performance, spending trends, and compliance indicators across reporting cycles. Build DAX measures and data models aligned with stakeholder requirements. Ensure dashboards support regular business reviews and decision‑making.
- Extract and reconcile data from SAP S/4HANA and SAP ECC supporting financial close, regulatory reporting, and audit requests. Validate data accuracy, resolve data inconsistencies, and document reporting logic. Improve reporting transparency across teams.
- Automate recurring reporting workflows using Python and Power Automate, reducing manual effort (~30%) and improving report delivery timelines. Standardize data preparation steps across commonly used datasets. Strengthen reporting reliability across teams.
- Partner with finance, risk, and compliance stakeholders supporting recurring reports and ad‑hoc analysis each month. Implement data validation checks that improve data quality and reduce reporting discrepancies. Maintain reusable SQL logic that improves report consistency.

Data Analyst
VR Digital Solutions — Jan 2022 – Jul 2023
- Analyse datasets ranging from 100K–2M records using SQL, Excel, and Python to support marketing analytics, operational reporting, and client performance tracking. Perform data cleaning, validation, and transformation. Deliver datasets used in recurring client reporting.
- Develop 4–5 Power BI and Tableau dashboards visualizing KPIs, campaign performance, and operational trends for internal teams and clients. Translate business requirements into clear visualizations. Enable stakeholders to monitor performance and adjust strategies based on insights.
- Conduct ad‑hoc analysis across multiple campaigns to identify growth opportunities, customer engagement patterns, and performance gaps. Provide actionable insights that supported campaign optimization decisions. Help teams prioritize improvements based on data trends.
- Collaborate with developers and business stakeholders across multiple projects to gather reporting requirements and refine data models. Participate in discussions around data structure and reporting logic. Deliver dashboards aligned with business objectives.
- Automate recurring reporting tasks using Excel macros and Python scripts, reducing manual reporting effort (~25%) and improving reporting consistency. Help teams access updated data more efficiently. Improve report turnaround across projects.

Data Analyst Intern
VR Digital Solutions — Jul 2021 – Dec 2021
- Assist senior analysts with data collection, data cleaning, and data preprocessing across datasets used in analytics projects. Prepare datasets using Excel, SQL, and Python for reporting workflows. Support multiple reporting initiatives simultaneously.
- Create 2–3 dashboards in Power BI and Excel to track business metrics and project performance indicators. Help maintain reporting templates and documentation. Support teams during weekly reporting cycles.
- Perform exploratory data analysis (EDA) to identify trends, patterns, and data issues used in internal presentations. Document observations and data anomalies. Support analysts in preparing stakeholder insights.

PROJECTS

SuperStore – Sales Analysis (Automated ETL & Executive KPI Dashboard) :
- Designed an end to end pipeline that ingests raw CSV/Excel sales files, cleanses/validates them with Python (Pandas, NumPy), loads
fact and KPI tables into MySQL via SQLAlchemy, schedules daily automated refreshes (≈30 % less manual prep), and powers an interactive Power BI executive dashboard with KPI cards, trend analyses, product/region/ship mode insights, plus automated PDF/Excel summary reports. (Tech: Python, MySQL, Power BI, ETL automation)


Credit Risk Monitoring Dashboard:
- Built an end to end solution that generates synthetic banking transaction data with Python (pandas, NumPy, mysql connector), stores and processes it in MySQL using views and window functions for monthly aggregates, rolling averages, and credit utilization based risk segmentation (High > 80 %, Medium 50 79 %, Low < 50 %); validated the risk logic via a Python sanity check script and delivered an interactive Power BI executive dashboard that visualizes real time credit utilization KPIs, risk distribution breakdowns, and spend trend analysis—automating the entire pipeline and enabling rapid detection of high risk customers. (Tech: Python, MySQL, SQL window functions, Power BI)

SAP Financial Reporting & Reconciliation Analysis:
- Simulated an end to end SAP style GL reconciliation workflow that cleanses and validates GL and transaction datasets (Python pandas), automates balance vs transaction reconciliation and variance calculations with SQL, generates core financial KPIs (Revenue, Expense, Net Profit, Variance %), and delivers an audit ready Power BI dashboard featuring KPI cards, GL vs transaction comparison tables, mismatch detection, and interactive filters—all built to showcase data validation, SQL/Python automation, and BI reporting skills.

SKILLS
- Data Analysis: SQL (CTEs, joins, window functions), Python (Pandas, NumPy), R, Data Cleaning & Validation, Exploratory Data Analysis (EDA), Statistical Analysis, Data Transformation, Ad‑hoc Reporting.
- BI & Visualization: Power BI (DAX, data modeling, dashboard design), Tableau, Excel (PivotTables, advanced formulas, charts), SAP Analytics Cloud (SAC), Dashboard Storytelling, KPI Reporting, Data Visualization Best Practices.
- SAP & Enterprise Data: SAP S/4HANA, SAP ECC, SAP BW/4HANA, SAP HANA, SAP BusinessObjects (Web Intelligence, Crystal Reports), SAP Data Extraction, Financial & Operational Reporting from SAP.
- Data Engineering & Automation: ETL Workflow Development, Data Integration, Python Automation Scripts, Power Automate, Snowflake, SQL Server, Data Pipeline Support, Scheduled Reporting Automation.
- Analytics & Modeling: KPI Development, Predictive Modeling (basic), Customer Segmentation, Churn Analysis, Trend Analysis, Performance Analysis, Business Metrics Tracking.
- Domain Expertise: Financial Analytics, Credit Risk Reporting Support, Regulatory Reporting Support, Healthcare Analytics, Claims Data Processing, Performance Reporting.

EDUCATION
Master of Science – Data Science & Analytics – Florida Atlantic University –(Fenb 2023 - May 2025)`;

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
