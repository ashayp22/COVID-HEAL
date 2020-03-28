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

let detectionInterval = 500

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
  setTimeout(detect, detectionInterval);
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

        if(face != []) {
          for(var i = 0; i < hands.length; i++) {
            intersecting = intersecting || rectanglesIntersect(face[0], face[1], face[2], face[3], hands[i][0], hands[i][1], hands[i][2], hands[i][3])
          }
        }


        if(intersecting) {
          console.log("intersecting")
        } else {
          console.log("safe")
        }

        //send notification for not touching face
        if(last == true && intersecting == false) {
          run()
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
        setTimeout(detect, detectionInterval);

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

//code for sending a push notification

// Hard-coded, replace with your public key
const publicVapidKey = 'BDm5c3wc5O_dCtsQJg2qzZ8FNXYNHQrvUwO_dabEMYOlt_X_bOOX8ejxY0hczQ-bL4MaWW4CNQ0-a6Su2VOMrdk';

var registration;

async function registerPush() {
  console.log('Registering service worker');
  registration = await navigator.serviceWorker.
    register('/scripts/worker.js');
  console.log('Registered service worker');
}

registerPush()


async function run() {

  const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

  console.log(subscription)
  console.log('Registered push');

  var sub_json = JSON.stringify(subscription)

  console.log(sub_json)

  console.log('Sending push');
  await fetch('/alert', {
    method: 'POST',
    body: sub_json,
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Sent push');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
