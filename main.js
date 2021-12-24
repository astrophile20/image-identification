Webcam.set ({
    width: 300,
    height: 300,
    image_format: "png",
    png_quality: 90,

    constraints: {
        facingMode: "environment"
    }
});

camera = document.getElementById("live-cam");

Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("snappedImg").innerHTML = "<img id='captured_img' src=" + data_uri + ">";
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("MobileNet", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function identifyImage() {
    realImg = document.getElementById("captured_img");
    classifier.classify(realImg, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("object-name").innerHTML = results[0].label;
    }
}