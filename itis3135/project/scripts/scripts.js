const projectImages = document.getElementsByClassName("project-image");
const imageArr = Array.from(projectImages);
const highlightedImage = document.getElementById("highlighted-image");

const createHighlightedImage = (source) => {
    highlightedImage.innerHTML = `
        <img src="${source}">
        <button id="delete-button">Exit</button><br>
    `;
    const deleteButton = document.getElementById("delete-button");
    deleteButton.addEventListener("click", () => {
        highlightedImage.innerHTML = "";
    });
};
for (let i = 0; i < imageArr.length; i++){
    const imageSource = imageArr[i].src;
    imageArr[i].addEventListener("click", () => {
        createHighlightedImage(imageSource);
    });
}

