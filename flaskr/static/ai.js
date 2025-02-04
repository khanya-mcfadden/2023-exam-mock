
// ai.js 

  document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();
      const question = document.getElementById('ai-question').value.trim();
      if (!question) {
        document.getElementById("ai-response").innerHTML = "<p>You must type something in to get a response</p>";
        return;
      }
      document.getElementById("loading").style.display = "block"; // Show loading indicator
      fetch("/Ai_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: question })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log("AI data received:", data); // Log the data received
          document.getElementById("loading").style.display = "none"; // Hide loading indicator
          const response1 = data.response1 ? data.response1.replace(/\*/g, '') : 'No response1 available';
          document.getElementById("ai-response").innerHTML = `
          <p>${response1}</p>
        `;
        })
        .catch((error) => {
          console.error("Error fetching AI data:", error);
          document.getElementById("loading").style.display = "none"; // Hide loading indicator
          document.getElementById("ai-response").innerHTML = "<p>Failed to load AI response</p>";
        });
    });

    // Fetch general health recommendation based on location on page load
    const location = localStorage.getItem('location');
    if (location) {
      fetch("/Ai_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: `What is the current general weather advice or recommendations for ${location} and or the local season. Check current season, keep under 150 words. If you can't get weather, recommend that the user goes to the weather page on the currant website only.` })
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log("AI data received on load:", data); // Log the data received
          const response1 = data.response1 ? data.response1.replace(/\*/g, '') : 'No response1 available';
          document.getElementById("ai-response").innerHTML = `
          <p>${response1}</p>
        `;
        })
        .catch((error) => {
          console.error("Error fetching AI data on load:", error);
        });
    }
  });
