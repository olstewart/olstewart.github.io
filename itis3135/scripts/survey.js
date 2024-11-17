const inputForm = document.getElementById("input-form");
const username = document.getElementById("user-name");
const mascot = document.getElementById("mascot");

const caption = document.getElementById("caption");
const personalBackground = document.getElementById("personal-background");
const professionalBackground = document.getElementById("professional-background");
const academicBackground = document.getElementById("academic-background");
const webBackground = document.getElementById("web-background");
const primaryPlatform = document.getElementById("primary-platform");
const funnyThing = document.getElementById("funny-thing");
const extra = document.getElementById("extra");
const output = document.getElementById("introduction-output");



inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const courses = document.querySelectorAll(".course");
    const courseArray = Array.from(courses);
    let courseListHTML = "";
    for(let i = 0; i < courseArray.length; i++){
        courseListHTML += `<li><strong>${courseArray[i].value}</strong></li>`;
    }

    const image = document.getElementById("image").files[0];
    const imageUrl = URL.createObjectURL(image);


    output.innerHTML =  `
    <section id="introductionTop">
        <h1>${username.value} || ${mascot.value}</h1>
        <figure>
            <img src="${imageUrl}" alt="${caption.value}">
            <figcaption>${caption.value}</figcaption>
        </figure>
    </section>
    <p>
        <ul>
            <li><strong>Personal Background:</strong> ${personalBackground.value}</li>
            <li><strong>Professional Background:</strong> ${professionalBackground.value}</li>
            <li><strong>Academic Background:</strong> ${academicBackground.value}</li>
            <li><strong>Primary Computer Platform:</strong> ${primaryPlatform.value}</li>
            <li><strong>Web Development Background:</strong> ${webBackground.value}</li>
            <li><strong>Courses I'm Taking:</strong><ul>
                ${courseListHTML}
                </ul></li>
            <li><strong>Funny/Interesting Item to Remember me by:</strong> ${funnyThing.value}</li>
            <li><strong>I'd also like to Share:</strong> ${extra.value}</li>
        </ul>
        I understand that what is on this page is not password protected and I will not put anything here that I do not want publicly available. -${username.value}
    </p>`;
});

inputForm.addEventListener("reset", () => {
    output.innerHTML = "";
});