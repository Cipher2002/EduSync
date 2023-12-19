var faq = document.getElementsByClassName("faq-page");
var i;
for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var body = this.nextElementSibling;
        if (body.style.display === "block") {
            body.style.display = "none";
        } else {
            body.style.display = "block";
        }
    });
}

let currentFontSize = 16;

function increaseFontSize() {
  currentFontSize += 2;
  applyFontSize();
}

function resetFontSize() {
  currentFontSize = 16;
  applyFontSize();
}

function decreaseFontSize() {
  currentFontSize -= 2;
  applyFontSize();
}

function applyFontSize() {
  document.body.style.fontSize = currentFontSize + "px";
}
var today = new Date();

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.getElementById("spanDate").innerHTML =
  months[today.getMonth()] +
  " " +
  today.getDate() +
  ", " +
  today.getFullYear();

function updateClock() {
  var today = new Date();

  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  // Add leading zero if the number is less than 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var currentTime = hours + ":" + minutes + ":" + seconds;

  document.getElementById("spanTime").innerHTML = currentTime;
}

// Update the time every second (1000 milliseconds)
setInterval(updateClock, 1000);
window.onbeforeunload = function () {
      window.scrollTo(0, 0);
}
function toggleChatbox() {
  var chatbox = document.getElementById('chatbox');
  var chatboyIcon = document.getElementById('chatboy-icon');

  if (chatbox.style.display === 'none' || chatbox.style.display === '') {
      // Show chatbox and hide chatboy icon
      chatbox.style.display = 'block';
      chatboyIcon.style.display = 'none';
  } else {
      // Hide chatbox and show chatboy icon
      chatbox.style.display = 'none';
      chatboyIcon.style.display = 'block';
  }
}

function sendMessage() {
  var inputField = document.querySelector('.chatbox input');
  var message = inputField.value.trim();

  if (message !== '') {
      // Display loading dots to simulate the chatbot is typing
      var loadingDots = document.querySelector('.loading-dots');
      loadingDots.style.display = 'inline-block';

      // Simulate processing time (replace this with your actual message processing logic)
      setTimeout(function () {
          // Clear the input field
          inputField.value = '';

          // Hide loading dots
          loadingDots.style.display = 'none';

          // Get the chatbox content container
          var chatboxContent = document.querySelector('.chatbox');

          // Append the user's message and chatbot's reply to the chatbox
          var userMessage = '<p>User: ' + message + '</p>';
          var chatbotReply = '<p>Chatbot: This is a sample reply.</p>';
          
          // Insert the chatbot's reply before the user's message
          
          chatboxContent.insertAdjacentHTML('beforeend', userMessage);
          chatboxContent.insertAdjacentHTML('beforeend', chatbotReply);

          // Scroll the chatbox to the bottom to show the latest messages
          chatboxContent.scrollTop = chatboxContent.scrollHeight;
      }, 1000); // Simulating 1 second processing time, replace with your actual processing time
  }
}