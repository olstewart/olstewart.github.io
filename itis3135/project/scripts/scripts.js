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

// This code will make a gif of the gameplay play when the mouse glides over it.
const infestedPreview = document.getElementById("infested-preview");
const spacekidPreview = document.getElementById("spacekid-preview");
const fluffballsPreview = document.getElementById("fluffballs-preview");

const infestedSrc = infestedPreview.src;
const spacekidSrc = spacekidPreview.src;
const fluffballsSrc = fluffballsPreview.src;


const changeImage = (originalImage, newSource) => {
    originalImage.src = newSource;
};

//Infested
infestedPreview.addEventListener("mouseover", () => {
    changeImage(infestedPreview, "images/infested-gif-preview.gif");
});

infestedPreview.addEventListener("mouseleave", () => {
    setTimeout(() => {
        changeImage(infestedPreview, infestedSrc);
    }, 700);
});

//Spacekid
spacekidPreview.addEventListener("mouseover", () => {
    changeImage(spacekidPreview, "images/spacekid-gif-preview.gif");
});

spacekidPreview.addEventListener("mouseleave", () => {
    setTimeout(() => {
        changeImage(spacekidPreview, spacekidSrc);
    }, 700);
});

//Fluffballs
fluffballsPreview.addEventListener("mouseover", () => {
    changeImage(fluffballsPreview, "images/fluffballs-gif-preview.gif");
});

fluffballsPreview.addEventListener("mouseleave", () => {
    setTimeout(() => {
        changeImage(fluffballsPreview, fluffballsSrc);
    }, 700);
});