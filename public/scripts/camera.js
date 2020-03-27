// Load the model.

var handModel;

  handTrack.load().then(model => {
    handModel = model
    const img = document.getElementById('img');
    alert("loaded")

    handModel.detect(img).then(predictions => {
      console.log('Predictions: ', predictions);
    });

    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
          animate()
      });
    }

  });

  function animate() {
    drawHands()
    predictHands()
    a = requestAnimationFrame(animate);
  }

  function drawHands() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var video = document.getElementById('video');
    ctx.drawImage(video, 0, 0, 640, 480);
  }

  function predictHands() {

    // var img = new Image();
    // var canvas = document.getElementById('canvas');
    // img.src = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    // img.width = 640;
    // img.height = 480;
    //
    // handModel.detect(img).then(predictions => {
    //   console.log('Predictions: ', predictions);
    // });
  }
