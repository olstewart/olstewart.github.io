let mainContainer = document.getElementById("main-container");
let addRowButton = document.getElementById("add-row-btn");
let rows = document.getElementsByClassName("row");

addRowButton.addEventListener("click", () =>{
    mainContainer.innerHTML += `
                <div class="row">
					<div class="row-label">
						<p>Row 1:</p>
					</div>
					<div class="instructions">
						<p>knit 3 in pink, knit 7 in yellow, knit 3 in pink</p>
					</div>
				</div>`
});

class Stitch{
    constructor(type, stitchSpan, stitchResult, description){
        this.type = type;
        this.stitchSpan = stitchSpan;
        this.stitchResult = stitchResult;
        this.description = description;
    }

    toString(){
        return this.type;
    }

    toStitchUp(){
        return "stitch:" + this.type + "," + this.stitchSpan + "," + this.stitchResult + "," + this.description;
    }
}


//---COLOR SCHEME STUFF---//
// Change color scheme
let colorSchemes = document.getElementById("color-schemes");
let root = document.querySelector(":root");

// Color schemes are organised in order of 
// --color-scheme-name, --black, --dk-color, --lt-color, --dk-white, --white
let colorSchemeDefault = ["#022327", "#087E8B", "#acecc6", "#d6f6e3", "#eefbf4"];
let colorSchemeBlue = ["#001242", "#183b67", "#62c0dc", "#c4ecf1", "#f1fffa"];
let colorSchemeCafe = ["#32292f", "#705d56", "#70abaf", "#99e1d9", "#f0f7f4"];
let colorSchemeBrown = ["#2c2321", "#5c5552", "#8f857d", "#decbb7", "#f7f0f5"];
let colorSchemeSunset = ["#1c0d59", "#9a348e", "#da627d", "#fca17d", "#f9dbbd"];
let colorSchemePurple = ["#2f004f", "#5f0a87", "#aa7bc3", "#d6a8cf", "#ffdde2"];
let colorSchemeBeach = ["#12262a", "#0c717e", "#06cdd1", "#f4d1ae", "#f4edea"];
let colorSchemeFireball = ["#081b53", "#601700", "#f26430", "#96bbbb", "#b6dddd"];
let colorSchemeYellow = ["#41412e", "#918a38", "#e1db4b", "#edff71", "#eefcce"];
let colorSchemeGingerKitty = ["#3d0c11", "#7e3b09", "#e67e00", "#ffc784", "#ffead0"];
let colorSchemeRuby = ["#16151e", "#71081d", "#e0385a", "#f2aebb", "#fbdce2"];
let colorSchemeParrot = ["#211a1e", "#c3423f", "#5bc0eb", "#b4d770", "#fde74c"];
let colorSchemeRose = ["#5d2a42", "#fb6376", "#b4d770", "#fcb1a6", "#ffdccc"];
let colorSchemeRaisin = ["#1a1423", "#372549", "#9c637e", "#c884b7", "#eacdc2"];
let colorSchemeBoulder = ["#252422", "#403d39", "#868179", "#ccc5b9", "#fffcf2"];
let colorSchemeGemstone = ["#29293d", "#6b5276", "#a96da3", "#cf9893", "#cb9ab3"];
let colorSchemeMystic = ["#24062d", "#522472", "#9887c5", "#a2c5ed", "#cefaeb"];
let colorSchemeHedgehog = ["#101010", "#1c35d7", "#7b96ff", "#ff4f4c", "#fff2d0"];
let colorSchemeHedgehogDark = ["#eee5aa", "#101010", "#383838", "#770000", "#aa0000"];

colorSchemes.addEventListener("change", () => {
    switch(colorSchemes.value){
        case "default":{
            setColorScheme(colorSchemeDefault);
        } break;
        case "blue":{
            setColorScheme(colorSchemeBlue);
        } break;
        case "cafe":{
            setColorScheme(colorSchemeCafe);
        } break;
        case "brown":{
            setColorScheme(colorSchemeBrown);
        } break;
        case "sunset":{
            setColorScheme(colorSchemeSunset);
        } break;
        case "purple":{
            setColorScheme(colorSchemePurple);
        } break;
        case "beach":{
            setColorScheme(colorSchemeBeach);
        } break;
        case "fireball":{
            setColorScheme(colorSchemeFireball);
        } break;
        case "yellow":{
            setColorScheme(colorSchemeYellow);
        } break;
        case "ginger-kitty":{
            setColorScheme(colorSchemeGingerKitty);
        } break;
        case "ruby":{
            setColorScheme(colorSchemeRuby);
        } break;
        case "parrot":{
            setColorScheme(colorSchemeParrot);
        } break;
        case "rose":{
            setColorScheme(colorSchemeRose);
        } break;
        case "raisin":{
            setColorScheme(colorSchemeRaisin);
        } break;
        case "boulder":{
            setColorScheme(colorSchemeBoulder);
        } break;
        case "gemstone":{
            setColorScheme(colorSchemeGemstone);
        } break;
        case "mystic":{
            setColorScheme(colorSchemeMystic);
        } break;
        case "hedgehog":{
            setColorScheme(colorSchemeHedgehog);
        } break;
        case "hedgehog-dk":{
            setColorScheme(colorSchemeHedgehogDark);
        } break;
        default:{
            setColorScheme(colorSchemeDefault);
        }
    }
})

let setColorScheme = (colorScheme) => {
    root.style.setProperty("--black", colorScheme[0]);
    root.style.setProperty("--dk-color", colorScheme[1]);
    root.style.setProperty("--lt-color", colorScheme[2]);
    root.style.setProperty("--dk-white", colorScheme[3]);
    root.style.setProperty("--white", colorScheme[4]);
}
