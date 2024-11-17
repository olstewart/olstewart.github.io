const timeDate = document.getElementById("time-date");
const nameEmotionForm = document.getElementById("name-emotion-form");
const userName = document.getElementById("user-name");
const emotion = document.getElementById("emotion");
const greeting = document.getElementById("greeting");

const date = new Date();



nameEmotionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    timeDate.innerText = `The date is: ${date.getDay}, ${date.getMonth} ${date.getMonth}, ${date.getFullYear}, and the time is: ${date.getHours}:${date.getMinutes}`;
    greeting.innerText = `Welcome, ${userName.value}! We hear that you are feeling ${emotion.value}. Thank you for sharing! We love hearing the thoughts of our customers.`
});