document.getElementById("login-button").addEventListener("click", (e) => {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/login-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((response) => {
        if (response.status === 200) {
          window.location.href = "/dashboard";
        } else {
          alert("Invalid Credentials");
        }
      }
    )
        .catch((error) => {
        console.error("Error:", error);
      });
});