song1 =""; 
song2 = "";

song1_status = "";
song2_status = "";


scoreLeftWrist = 0;
scoreRightWrist =0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;


function preload()
{
    song1 = loadSound("peter.mp3");
    song2 = loadSound("harry_potter_intro.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.position(400,250);
    video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
console.log("PoseNet is Initialized");
}

function draw()
{
  
    image( video, 0, 0, 600, 500);
    
   fill("#FF0000");
   stroke("#FF0000");

  song1_status = song1.isPlaying();
song2_status = song2.isPlaying();

if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 30);
    song1.stop();

}
if(song2_status == false)
{
    song2.play();
    document.getElementById("song").innerHTML = "Playing the Avengers Theme Song!"

}

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 30);
        song2.stop();

    }
if(song1_status == false)
    {
        song1.play();
        document.getElementById("song").innerHTML = "Playing the Harry Potter Theme Song!"

    }

  
}
function play()
{
   song.play();
   song.setVolume(1);
   song.rate(1);
}
function gotPoses(results)
{
if(results.length >0)
{
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX  + "leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX  + "rightWristY = " + rightWristY);
}
}
function stop()
{
    song1.stop();
    song2.stop();
}