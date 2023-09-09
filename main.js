let img = "";
let stetus = false;
var objects = [];

function preload() {
    img = loadImage("oranges.jpeg");
}

function setup() {
    canvas = createCanvas(1000, 1500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting...";
}

function modelLoaded() {
    console.log("Model has loaded.");
    stetus = true;
    objectDetector.detect(img, gotResults);
}

function draw() {
    image(img, 0, 0, 1000, 1500);
    if (stetus == true){
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}