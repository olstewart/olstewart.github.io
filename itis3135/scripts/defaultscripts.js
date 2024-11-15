const timeDate = document.getElementById("time-date");

const date = new Date();

timeDate.innerText = `Currently, it is: ${date.toDateString}`;