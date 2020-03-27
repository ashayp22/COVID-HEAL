


// // Load the model.
// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(loadHandTrack)



const modelParams = {
    flipHorizontal: false,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

var handModel;

let faceCascade = new cv.CascadeClassifier();  // initialize classifier

let utils = new Utils('errorMessage'); //use utils class

let faceCascadeFile = 'haarcascade_frontalface_default.xml'; // path to xml

// use createFileFromUrl to "pre-build" the xml
utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
    faceCascade.load(faceCascadeFile); // in the callback, load the cascade from file
    console.log("loaded cascade")
});

function loadHandTrack() {
  // Load the model.
  // load pre-trained classifiers
  handTrack.load(modelParams).then(model => {
    // detect objects in the image.
    console.log("loaded handtrack")
    handModel = model
    startVideo()
  });
}


loadHandTrack()

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

    // function animate() {
    //   detect()
    //   a = requestAnimationFrame(animate);
    // }
    //
    //  animate()

     setTimeout(detect, 1000);

    // let video = document.getElementById('video');
    // let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    // let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    // let gray = new cv.Mat();
    // let cap = new cv.VideoCapture(video);
    // let faces = new cv.RectVector();
    //
    // const FPS = 30;
    // function processVideo() {
    //     let begin = Date.now();
    //     // start processing.
    //     cap.read(src);
    //     src.copyTo(dst);
    //     cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
    //     // detect faces.
    //     faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0);
    //     // draw faces.
    //     for (let i = 0; i < faces.size(); ++i) {
    //         let face = faces.get(i);
    //         let point1 = new cv.Point(face.x, face.y);
    //         let point2 = new cv.Point(face.x + face.width, face.y + face.height);
    //         cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
    //     }
    //     cv.imshow('canvas', dst);
    //     // schedule the next one.
    //     let delay = 1000/FPS - (Date.now() - begin);
    //     setTimeout(processVideo, delay);
    //
    // };
    //
    // // schedule the first one.
    // setTimeout(processVideo, 0);

  // console.log("detecting")
  // const canvas = faceapi.createCanvasFromMedia(video)
  // document.body.append(canvas)
  // const displaySize = { width: video.width, height: video.height }
  // faceapi.matchDimensions(canvas, displaySize)
  // setInterval(async () => {
  //   console.log("started async")
  //   runDetection()
  //   const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //   // const resizedDetections = faceapi.resizeResults(detections, displaySize)
  //   // console.log("head")
  //   // console.log(resizedDetections)
  //   //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
  //   // faceapi.draw.drawDetections(canvas, resizedDetections)
  //   // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
  //   // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  // }, 100)
})

var last = false

function detect() {
    var video = document.getElementById('video');
    handModel.detect(video).then(predictions => {
        var hands = []
        for(var i = 0; i < predictions.length; i++) {
          hands.push(predictions[i].bbox)
        }
        var face = detectFace()

        var intersecting = false

        for(var i = 0; i < hands.length; i++) {
          intersecting = intersecting || rectanglesIntersect(face[0], face[1], face[2], face[3], hands[i][0], hands[i][1], hands[i][2], hands[i][3])
        }

        if(intersecting) {
          console.log("intersecting")
        } else {
          console.log("safe")
        }

        //send notification for not touching face

        if(last == true && intersecting == false) {
          
        }

        last = intersecting

        // var ctx = document.getElementById('canvas').getContext('2d');
        // ctx.strokeStyle = "#0000ff";
        //
        // for(var i = 0; i < hands.length; i++) {
        //   ctx.beginPath();
        //   ctx.rect(hands[i][0], hands[i][1], hands[i][2], hands[i][3]);
        //   ctx.stroke();
        // }
        //
        // var ctx = document.getElementById('canvas').getContext('2d');
        // ctx.strokeStyle = "#0000ff";
        // ctx.beginPath();
        // ctx.rect(face[0], face[1], face[2], face[3]);
        // ctx.stroke();
        setTimeout(detect, 1000);

    });
}

function rectanglesIntersect(x1,  y1,  w1,  h1, x2,  y2,  w2,  h2) {

  var b1 = x1 < x2 + w2
  var b2 = x1 + w1 > x2
  var b3 = y1 < y2 + h2
  var b4 = y1 + h1 > y2

  return b1 && b2 && b3 && b4

}

function detectFace() {
  var ctx = document.getElementById("canvas").getContext('2d');
  var video = document.getElementById('video');
  ctx.drawImage(video, 0, 0, 720, 560);
  let src = cv.imread('canvas');
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
  let faces = new cv.RectVector();
  // detect faces
  faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0);

  let largest = 0
  let chosen = []

  for (let i = 0; i < faces.size(); ++i) {
    let x = faces.get(i).x
    let y = faces.get(i).y
    let w = faces.get(i).width
    let h = faces.get(i).height
    if (w > largest) {
      chosen = [x, y, w, h];
      largest = w
    }
  }

  return chosen
}




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
