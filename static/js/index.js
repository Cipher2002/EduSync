localStorage.setItem('targetedLanguage', 'en');

window.addEventListener('load', function () {
  var logo = document.getElementById('load');
  logo.style.transform = 'scale(1)';
  document.getElementById('content').style.opacity = '0.3';
  

  setTimeout(function () {
    logo.style.transform = 'scale(1.5)';
  }, 1000);
  logo.addEventListener('transitionend', function () {
    document.getElementById('logo-container').style.opacity = '0';
    document.getElementById('content').style.opacity = '1';
  });
});

var faq = document.getElementsByClassName("faq-page");
var i;
for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        this.classList.toggle("active");
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
  const inputField = document.getElementById('chatbot-input');
const uploadButton = document.getElementById('chatbot_upload');

// Add an event listener to the button to trigger the function
uploadButton.addEventListener('click', handleUserInput);

function handleUserInput() {
    const input_data = inputField.value;
    console.log(input_data);

    // Make a POST request to the Flask app
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question: input_data,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the answers
        displayChatMessage('User', input_data);
        displayChatMessage('Chatbot', data['answers']);
        
        // Clear the input field
        inputField.value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  function displayChatMessage(sender, message) {
      // Get the chatbox content container
      var chatboxContent = document.querySelector('.chatbox');

      // Append the sender's message to the chatbox
      var messageHTML = `<p>${sender}: ${message}</p>`;
      chatboxContent.insertAdjacentHTML('beforeend', messageHTML);

      // Scroll the chatbox to the bottom to show the latest messages
      chatboxContent.scrollTop = chatboxContent.scrollHeight;
  }
}

let originalEnglishText = [];
let translatedText = [];

// Function to collect text from elements with data-translate attribute during initial page load
function collectInitialText() {
    originalEnglishText = [];
    document.querySelectorAll('[data-translate]').forEach(element => {
        originalEnglishText.push(element.textContent);
    });
}

// Function to translate all text elements
function translateAllElements() {
    const selectedLanguage = document.getElementById('language-select').value;
    localStorage.setItem('targetedLanguage', selectedLanguage);
    if (selectedLanguage === 'en') {
      window.location.reload()
    }
    sessionStorage.setItem('targetedLanguage', selectedLanguage);
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            texts: originalEnglishText,
            target_lang: selectedLanguage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        translatedText = data.translated_texts || [];
        document.querySelectorAll('[data-translate]').forEach((element, index) => {
            element.textContent = translatedText[index] || '';
        });

    })
    .catch(error => {
        console.error('Translation error:', error);
    });
}

// Bind the onchange event to the language-select dropdown
document.getElementById('language-select').addEventListener('change', function () {
    translateAllElements();
});

// Initialize the originalEnglishText variable with the original text of elements with data-translate attribute during initial page load
document.addEventListener('DOMContentLoaded', function() {
    collectInitialText();
});
