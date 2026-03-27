const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

// Show welcome message when page loads
window.addEventListener("DOMContentLoaded", function() {
  addMessage("👋 Hi there! I'm glad you're here. Feel free to ask me anything — about my experience, skills, projects, or how I can add value to your team. I'm happy to chat!", "bot");
});

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

// Simple local AI response (rule-based - NO API CALLS)
function generateResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // About yourself
  if (message.includes("about yourself") || message.includes("tell me about you") || message.includes("who are you")) {
    return "I'm Narendra Yenumula, a Data Analyst with 3+ years of experience in financial, operational, and healthcare analytics. I specialize in SQL, Python, Power BI, and Tableau. Currently working at Discover Financial Services, I build dashboards and automate reporting to drive business insights. I'm passionate about turning data into actionable intelligence!";
  }
  
  // Skills
  if (message.includes("skill") || message.includes("technical") || message.includes("tools")) {
    return "My key technical skills include:<br>• <b>Programming:</b> Python, SQL, R<br>• <b>BI Tools:</b> Power BI, Tableau, Excel<br>• <b>Data:</b> ETL, SQL Server, Snowflake<br>• <b>SAP:</b> S/4HANA, ECC, BW/4HANA<br>• <b>Libraries:</b> Pandas, NumPy<br>I'm proficient in data cleaning, analysis, and visualization across multiple platforms.";
  }
  
  // Experience
  if (message.includes("experience") || message.includes("work exp") || message.includes("work experience")) {
    return "I have 3+ years of professional experience:<br>• <b>Current (Mar 2025):</b> Data Analyst at Discover Financial Services<br>• <b>2022-2023:</b> Data Analyst at VR Digital Solutions<br>• <b>2021-2022:</b> Data Analyst Intern at VR Digital Solutions<br>In these roles, I've worked with large datasets (2M+ records), built dashboards, and automated reporting to support business decisions.";
  }
  
  // Projects
  if (message.includes("project")) {
    return "My key projects include:<br>• <b>Business Performance Analytics Dashboard:</b> Built dashboards using SQL, Power BI, Excel to track operational KPIs and revenue trends<br>• <b>Customer Behavior & Retention Analysis:</b> Analyzed customer behavior using Python and SQL, created Tableau and Power BI dashboards to visualize insights<br>These projects demonstrated my ability to translate data into business value.";
  }
  
  // Education
  if (message.includes("education") || message.includes("degree")) {
    return "I'm pursuing a <b>Master of Science in Data Science & Analytics</b> from Florida Atlantic University (graduating 2025). This advanced degree complements my 3+ years of professional experience and deepens my expertise in statistical analysis, machine learning, and advanced analytics.";
  }
  
  // Strengths
  if (message.includes("strength")) {
    return "My key strengths are:<br>1. <b>Technical Skills:</b> Proficient in SQL, Python, Power BI, Tableau, and SAP tools<br>2. <b>Analytical Abilities:</b> Strong experience in EDA, data cleaning, and problem-solving<br>3. <b>Business Acumen:</b> Understand how to translate data insights into business value<br>4. <b>Communication:</b> Can present complex findings to stakeholders clearly<br>5. <b>Automation:</b> Excel at automating repetitive reporting tasks";
  }
  
  // Tools
  if (message.includes("tool")) {
    return "I'm proficient with these tools:<br>• <b>Data Analysis:</b> SQL, Python, Excel, R<br>• <b>BI & Visualization:</b> Power BI, Tableau, SAP Analytics Cloud<br>• <b>Data Platforms:</b> SQL Server, Snowflake, SAP HANA<br>• <b>ETL:</b> Python Automation, Power Automate<br>• <b>Libraries:</b> Pandas, NumPy<br>These tools help me efficiently process, analyze, and visualize complex datasets.";
  }
  
  // Achievements
  if (message.includes("achievement")) {
    return "Key achievements:<br>• Built multiple Power BI and Tableau dashboards that improved decision-making<br>• Automated reporting processes, reducing manual work by hours weekly<br>• Analyzed datasets with 2M+ records to identify key business insights<br>• Worked with financial, operational, and healthcare data successfully<br>• Supporting finance and risk teams at Discover Financial Services";
  }
  
  // Career goals
  if (message.includes("career goal")) {
    return "My career goals are:<br>• Become an expert in advanced analytics and business intelligence<br>• Lead data-driven initiatives that directly impact business strategy<br>• Develop machine learning models for predictive analytics<br>• Continue growing my expertise in SQL, Python, and cloud technologies<br>• Help organizations make better decisions through data insights";
  }
  
  // Certifications
  if (message.includes("certification")) {
    return "I'm actively pursuing professional development through my MS degree in Data Science & Analytics from Florida Atlantic University. This advanced program covers statistical analysis, machine learning, and advanced analytics techniques to complement my practical experience.";
  }
  
  // Background
  if (message.includes("background") || message.includes("location")) {
    return "I'm based in Boca Raton, Florida. I have a strong background in data analysis with 3+ years of professional experience across financial, operational, and healthcare sectors. My journey began as a Data Analyst Intern at VR Digital Solutions, where I developed my skills, and now I'm leveraging that expertise at Discover Financial Services while pursuing my master's degree.";
  }
  
  // Default response
  return "That's a great question! Based on my resume, I can help you with information about my experience, skills, projects, education, and how I can contribute to your team. Feel free to ask more specific questions!";
}

async function sendMessage(messageFromButton = null) {
  const message = messageFromButton || input.value.trim();

  if (!message) return;

  addMessage(message, "user");

  if (!messageFromButton) {
    input.value = "";
  }

  // Simulate typing delay - NO API CALL, just local logic
  setTimeout(() => {
    const reply = generateResponse(message);
    addMessage(reply, "bot");
  }, 500);
}

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
