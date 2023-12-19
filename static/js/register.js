document.getElementById('register-button').addEventListener('click', (e) => {
  e.preventDefault();
  const collegeName = document.getElementById('college-name').value;
  const instituteType = document.getElementById('institute-type').value;
  const state = document.getElementById('state').value;
  const email = document.getElementById('email').value;
  const contactNumber = document.getElementById('contact-number').value;
  const collegeAddress = document.getElementById('college-address').value;
  const postalCode = document.getElementById('postal-code').value;
  const password = '123456789';
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
      password,
      checkbox,
    }),
  })
  .then(response => {
    if (response.status === 200) {
      alert("Registration Successful");
      window.location.href = "/";
    } else {
      alert("Invalid Credentials");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});