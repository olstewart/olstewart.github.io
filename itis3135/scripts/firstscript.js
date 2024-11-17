const timeDate = document.getElementById("time-date");
const nameEmotionForm = document.getElementById("name-emotion-form");
const userName = document.getElementById("user-name");
const emotion = document.getElementById("emotion");
const greeting = document.getElementById("greeting");
const polygonForm = document.getElementById("polygon-form");
const favNumber = document.getElementById("fav-number");

const date = new Date();

timeDate.innerText = `The date is: ${date.getDay}, ${date.getMonth} ${date.getMonth}, ${date.getFullYear}, and the time is: ${date.getHours}:${date.getMinutes}`;

nameEmotionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    greeting.innerText = `Welcome, ${userName.value}! We hear that you are feeling ${emotion.value}. Thank you for sharing! We love hearing the thoughts of our customers.`
});

polygonForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let shape = "";
    switch(favNumber.value){
        case "1": shape = "henagon";break;
        case "2": shape = "digon"; break;
        case "3": shape = "triangle"; break;
        case "4": shape = "quadrilateral"; break;
        case "5": shape = "pentagon"; break;
        case "6": shape = "hexagon"; break;
        case "7": shape = "septagon"; break;
        case "8": shape = "octogon"; break;
        case "9": shape = "nonogon"; break;
        case "10": shape = "decagon"; break;
        default: shape = "cannot compute..."
    }

    alert(`${shape}`);
});

const materials = document.getElementById("materials");
const poundsOfMaterial = document.getElementById("pounds-material");
const numberOfColors = document.getElementById("num-of-colors");
const calculateCostButton = document.getElementById("calculate-cost");
const costResult = document.getElementById("cost-result");

const calculateCost = (materialType, poundsOfMaterial, numberOfColors) => {
    let materialPrice = 0;
    switch(materialType){
        case "plastic": materialPrice = .3; break;
        case "fabric": materialPrice = 10; break;
        case "paper": materialPrice = 1; break;
        case "cardboard": materialPrice = .1; break;
        case "metal": materialPrice = 1.3; break;
        default: materialPrice = 0;
    }
    return poundsOfMaterial * materialPrice * (1 + numberOfColors/10);
};

calculateCostButton.addEventListener("click", () => {
    costResult.innerText = `Cost of materials: $${calculateCost(materials.value, poundsOfMaterial.valueAsNumber, numberOfColors.valueAsNumber)}`;
});

const costMaterials = document.getElementById("cost-materials");
const percentProfit = document.getElementById("percent-profit");
const calculatePriceButton = document.getElementById("calculate-sale-price");
const priceResult = document.getElementById("price-result");

const calculateSalePrice = (costOfMaterials, percentProfit) => {
    return costOfMaterials * (1 + percentProfit/100);
};

calculatePriceButton.addEventListener("click", () => {
    priceResult.innerText = `Price to sell product: $${calculateSalePrice(costMaterials.valueAsNumber, percentProfit.valueAsNumber)}`;
});


const designSize = document.getElementById("design-size");
const recommendItemButton = document.getElementById("recommend-item");
const recommendationResult = document.getElementById("recommendation-result");

const recommendItemFromDesignSize = (inches) => {
    if(inches <= 3){
        return "stickers or pins";
    } else if(3 < inches && inches <= 6){
        return "mugs or cups";
    } else if(6 < inches && inches <= 9){
        return "keychains or minifigures";
    } else if(9 < inches && inches <= 12){
        return "plushies";
    } else if(12 < inches && inches < 15){
        return "clothing graphics";
    } else{
        return "posters or banners";
    }
};

recommendItemButton.addEventListener("click", () => {
    recommendationResult.innerText = `For a ${designSize.value} inch product, we recommend using your design in ${recommendItemFromDesignSize(designSize.valueAsNumber)}.`;
});


const goodIdeaButton = document.getElementById("good-idea");
const ideaResult = document.getElementById("idea-result");
const budgetButton = document.getElementById("budget");
const expensiveResult = document.getElementById("expensive-result");


const isDesignGoodIdea = () => {
    ideaResult.innerText = "Yes, your idea is great! Please send us a $500.99 consultation fee to proceed with making your design come to life!";
};

goodIdeaButton.addEventListener("click", isDesignGoodIdea);

const isDesignExpensive = () => {
    expensiveResult.innerText = "No, your idea is very on-budget! Please send us a $1000.99 consultation fee to proceed with further budget management tips!"; 
};

budgetButton.addEventListener("click", isDesignExpensive);