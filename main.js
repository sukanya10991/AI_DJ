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

function play() {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("Score left wrist= " + scoreleftwrist + "Score right wrist" + scorerightwrist);

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

        if (song_status == "false") {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song being played is- Lovesick Girls";
        }
    }
    song2_status = song1.isPlaying();

    if (rightwristscore > 0.2) {
        circle(rightwristx, righwristy, 20);
        song1.stop();

        if (song_status == "false") {
            song2.play();
            document.getElementById("song_name").innerHTML = "Song being played is- Stay";
        }
    }
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}