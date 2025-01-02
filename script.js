// Feedback Form Submission
document.getElementById("feedback-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    document.getElementById("feedback-response").style.display = "block";
    document.getElementById("user-name").textContent = name;

    document.getElementById("feedback-form").reset();
});
