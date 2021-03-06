song1 = "";
song2 = "";

leftwristx = 0;
leftwristy = 0;

rightwristx = 0;
rightwristy = 0;

leftwristscore = 0;
rightwristscore = 0;

song1_status = "";
song2_status = "";

function preload() {

    song1 = loadSound("lovesick_girls.mp3");
    song2 = loadSound("stay.mp3");
}

function setup() {
    canvas = createCanvas(500, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}


function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristscore = results[0].pose.keypoints[9].score;
        rightwristscore = results[0].pose.keypoints[10].score;
        console.log("Score left wrist= " + leftwristscore  + "Score right wrist" + rightwristscore);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("Left wrist x=" + leftwristx + "Left wrist y=" + leftwristy);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("Right wrist x=" + rightwristx + "Right wrist y=" + rightwristy);
    }
}

function draw() {
    image(video, 0, 0, 500, 400);

    fill("#FF0000");
    stroke("#FF0000");

    song1_status = song1.isPlaying();

    if (leftwristscore > 0.2) {
        circle(leftwristx, leftwristy, 20);
        song2.stop();

        if (song1_status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song being played is- Lovesick Girls";
        }
    }
    song2_status = song2.isPlaying();

    if (rightwristscore > 0.2) {
        circle(rightwristx, rightwristy, 20);
        song1.stop();

        if (song2_status == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song being played is- Stay";
        }
    }
}


function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}