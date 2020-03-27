// Load the model.
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(loadHandTrack)



const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

var handModel;

function loadHandTrack() {
  // Load the model.
  handTrack.load(modelParams).then(model => {
    // detect objects in the image.
    handModel = model
    startVideo()
  });
}


function startVideo() {
  const video = document.getElementById('video')
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
        console.log("playing video")
    });
  }
}

video.addEventListener('playing', () => {
  console.log("detecting")
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})




//
// var handModel;
//
//   handTrack.load().then(model => {
//     handModel = model
//     const img = document.getElementById('img');
//     alert("loaded")
//
//     handModel.detect(img).then(predictions => {
//       console.log('Predictions: ', predictions);
//     });
//
//     // Grab elements, create settings, etc.
//     var video = document.getElementById('video');
//
//     // Get access to the camera!
//     if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       // Not adding `{ audio: true }` since we only want video now
//       navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//           //video.src = window.URL.createObjectURL(stream);
//           video.srcObject = stream;
//           video.play();
//           animate()
//       });
//     }
//
//   });
//
//   function animate() {
//     drawHands()
//     predictHands()
//     a = requestAnimationFrame(animate);
//   }
//
//   function drawHands() {
//     var ctx = document.getElementById('canvas').getContext('2d');
//     var video = document.getElementById('video');
//     ctx.drawImage(video, 0, 0, 640, 480);
//   }
//
//   function predictHands() {
//
//     // var img = new Image();
//     // var canvas = document.getElementById('canvas');
//     // img.src = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
//     // img.width = 640;
//     // img.height = 480;
//     //
//     // handModel.detect(img).then(predictions => {
//     //   console.log('Predictions: ', predictions);
//     // });
//   }
