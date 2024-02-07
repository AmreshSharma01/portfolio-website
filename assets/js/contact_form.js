var form = document.getElementById("contact-form");

// Add an event listener for form submission
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        // Redirect to the thankyou.html page
        window.location.href = "thankyou.html";
      } else {
        // Show the pop-up with an error message
        response.json().then((data) => {
          var errorMessage = "Oops! There was a problem submitting your form";
          if (data.hasOwnProperty("errors")) {
            errorMessage = data.errors.map((error) => error.message).join(", ");
          }
          showPopup(errorMessage);
        });
      }
    })
    .catch(() => {
      // Show the pop-up with an error message
      showPopup("Oops! There was a problem submitting your form");
    });
}
