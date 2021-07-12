status = "";
objects = [];

function preload()
{
}

function setup()
{
    canvas = createCanvas(640,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 450);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}
function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw()
{
    image(video,0,0,640,450);

    if(status != "")
    {
        r = random(255);
        b = random(255);
        g = random(255);
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,b,g);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == "person")
            {
                document.getElementById("No").innerHTML = " Baby Found ";
                console.log("stop");
            }
            else   
            {
                document.getElementById("No").innerHTML = " Baby Not Found ";
                console.log("play");
            }
            
        }
        if(objects.length == 0)
        {
            document.getElementById("No").innerHTML = " Baby Not Found ";
            console.log("play");
        }
    }
}


