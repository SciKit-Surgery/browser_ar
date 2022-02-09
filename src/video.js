// ----------------------------------------------------------------------------
// See if we can get video working
// ----------------------------------------------------------------------------

const video = document.getElementById('videoElement');

var constraints = {
    audio: false,
    video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
    }
};

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Video Capture from Webcam failed.");
    });
}
