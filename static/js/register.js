document.getElementById('register-button').addEventListener('click', (e) => {
  e.preventDefault();
  const collegeName = document.getElementById('college-name').value;
  const instituteType = document.getElementById('institute-type').value;
  const state = document.getElementById('state').value;
  const email = document.getElementById('email').value;
  const contactNumber = document.getElementById('contact-number').value;
  const collegeAddress = document.getElementById('college-address').value;
  const postalCode = document.getElementById('postal-code').value;
  const checkbox = document.getElementById('check-box').checked;
  if (checkbox == false){
    alert("Please agree to the Terms and Conditions");
  }
  fetch('/register-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collegeName,
      instituteType,
      state,
      email,
      contactNumber,
      collegeAddress,
      postalCode,
      checkbox,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});