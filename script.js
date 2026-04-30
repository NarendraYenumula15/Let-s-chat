const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

// Welcome message
window.addEventListener("DOMContentLoaded", function () {
  addMessage(
    "👋 Hi! I'm Narendra Yenumula, a Senior Data Engineer. Feel free to ask me about my experience, data pipelines, AI/ML work, or technical skills!",
    "bot"
  );
});

function addMessage(message, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "bot-msg";

  // Bold formatting
  message = message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert bullets
  message = message.replace(/^\* (.*$)/gm, "• $1");
  message = message.replace(/^- (.*$)/gm, "• $1");

  // Line breaks
  message = message.replace(/\n/g, "<br>");

  msg.innerHTML = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Rule-based AI (No API)
function generateResponse(userMessage) {
  const message = userMessage.toLowerCase();


 // ✅ EDUCATION (move this to TOP)
  if (message.includes("education") || message.includes("degree") || message.includes("study")) {
    return "I completed my <b>Master of Science in Data Science & Analytics</b> from Florida Atlantic University in <b>May 2025</b>. This program strengthened my expertise in data engineering, machine learning, and advanced analytics.";
  }

  // About
  if (message.includes("about") || message.includes("who are you")) {
    return "I'm <b>Narendra Yenumula</b>, a <b>Senior Data Engineer</b> with 4 years of experience building scalable data pipelines and AI/ML-ready systems. I specialize in <b>Python, SQL, Snowflake, and cloud-based data engineering</b>, helping organizations make data-driven decisions.";
  }

  // Skills
  if (message.includes("skill") || message.includes("technical")) {
    return "My core skills include:<br><br>• <b>Data Engineering:</b> ETL/ELT, Data Warehousing, Data Lakes, Data Modeling<br>• <b>Big Data:</b> Apache Spark (PySpark), Distributed Processing<br>• <b>AI/ML:</b> Feature Engineering, ML Pipelines, Predictive Analytics<br>• <b>Programming:</b> Python (Pandas, NumPy, Scikit-learn), SQL<br>• <b>Cloud:</b> AWS (S3, Glue, Lambda), Snowflake, Airflow<br>• <b>Visualization:</b> Power BI, Tableau";
  }

  // Experience
  if (message.includes("experience") || message.includes("work experience")) {
    return "I have 4 years of experience:<br><br>• <b>Senior Data Engineer – Discover Financial Services (2024–Present)</b><br>• <b>Data Engineer – Hexaware Technologies (2022–2024)</b><br>• <b>Data Engineer Intern – VR Digital Solutions (2021)</b><br><br>I’ve built scalable pipelines, supported ML systems, and optimized large-scale data processing.";
  }

  // Projects
  if (message.includes("project")) {
    return "My key projects include:<br><br>• <b>SuperStore ETL Pipeline:</b> Built automated ETL system using Python & MySQL, reducing manual work by 30%<br>• <b>Credit Risk Monitoring Dashboard:</b> End-to-end ML-ready pipeline with real-time KPI tracking using Python, SQL & Power BI";
  }

  // Tools
  if (message.includes("tool") || message.includes("technology")) {
    return "I work with:<br><br>• <b>Languages:</b> Python, SQL<br>• <b>Data Platforms:</b> Snowflake, MySQL<br>• <b>Cloud:</b> AWS (S3, Glue, Lambda)<br>• <b>Big Data:</b> Spark (PySpark)<br>• <b>Orchestration:</b> Airflow<br>• <b>BI Tools:</b> Power BI, Tableau";
  }

  // Strengths
  if (message.includes("strength")) {
    return "My key strengths are:<br><br>• <b>Scalable Data Pipelines:</b> Built pipelines handling 5M+ records/month<br>• <b>Performance Optimization:</b> Reduced query time by 35%<br>• <b>Automation:</b> Reduced manual effort by 30%<br>• <b>AI/ML Readiness:</b> Strong in feature engineering & ML pipelines<br>• <b>Data Quality:</b> Improved reliability by 25%";
  }

  // Achievements
  if (message.includes("achievement")) {
    return "Key achievements:<br><br>• Processed <b>5M+ records/month</b> pipelines<br>• Improved data reliability by <b>25%</b><br>• Reduced query time by <b>35%</b><br>• Automated workflows reducing manual work by <b>30%</b><br>• Enabled ML-driven analytics systems";
  }
  // Career Goals
if (message.includes("career goal") || message.includes("goal")) {
  return "My career goal is to become a <b>top-tier Data Engineer specializing in AI/ML data systems</b>. I aim to design scalable data architectures that power intelligent applications. I'm also focused on growing in <b>cloud technologies, distributed systems, and real-time data processing</b>, while contributing to impactful, data-driven decision-making.";
}

// Certifications
if (message.includes("certification") || message.includes("course")) {
  return "I have completed my <b>Master’s in Data Science & Analytics (May 2025)</b> from Florida Atlantic University. Currently, I am pursuing <b>advanced certifications in Data Engineering, Cloud (AWS), and AI/ML pipelines</b> to strengthen my expertise in building scalable and production-ready data systems.";
}

// Background / Location
if (message.includes("background") || message.includes("location")) {
  return "I'm currently based in <b>Boca Raton, Florida</b>. I have 4 years of experience as a <b>Data Engineer</b>, starting my career as an intern and growing into a Senior role. My journey has been focused on <b>building data pipelines, supporting AI/ML systems, and improving data quality and performance</b> across financial and enterprise domains.";
}

  // Default
  return "I can help you with my experience in <b>data engineering, AI/ML pipelines, cloud technologies, and scalable systems</b>. Feel free to ask something specific!";
}

async function sendMessage(messageFromButton = null) {
  const message = messageFromButton || input.value.trim();

  if (!message) return;

  addMessage(message, "user");

  if (!messageFromButton) {
    input.value = "";
  }

  // Typing effect
  const typing = document.createElement("div");
  typing.className = "bot-msg";
  typing.innerHTML = "⏳ Thinking...";
  typing.id = "typing";
  chatBox.appendChild(typing);

  setTimeout(() => {
    document.getElementById("typing").remove();
    const reply = generateResponse(message);
    addMessage(reply, "bot");
  }, 500);
}

// Enter key support
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
