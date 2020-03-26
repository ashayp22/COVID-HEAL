// Load the model.
  handTrack.load().then(model => {
    const img = document.getElementById('img');
    alert("loaded")

    // Grab elements, create settings, etc.
    var video;

    function setup() {
      video = document.getElementById('video');
      // Elements for taking the snapshot

      // Get access to the camera!
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Not adding `{ audio: true }` since we only want video now
          navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
              //video.src = window.URL.createObjectURL(stream);
              video.srcObject = stream;
              video.play();
          });
      }

    }

    // // detect objects in the image.
    // model.detect(img).then(predictions => {
    //   console.log('Predictions: ', predictions);
    // });




  });
