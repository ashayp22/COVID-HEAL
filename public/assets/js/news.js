
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}



function callAPI(state) {
    $.ajax({
        type: "GET",
        url: "https://api.smartable.ai/coronavirus/news/" + state,

        // Request headers
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Cache-Control", "no-cache");
            xhrObj.setRequestHeader("Subscription-Key", "f1e40b6a2eaa412e876cc21fe5669a0c");
        },
    })
        .done(function (data) {

            const {news} = data;

            if(news.length == 0) {
              var header = document.createElement('h5');
              header.innerHTML = "There isn't any current news based on your location.";
              header.style.color = "black"
              header.style.textAlign = "center"
              document.getElementById("features").appendChild(header);
            }

            for (i = 0; i < news.length; i++) {

              //dynamically create elements

              var div1 = document.createElement('div');
              div1.className = "col-md-6 d-flex align-items-stretch"
              div1.style.zIndex = "0"

              var div2 = document.createElement('div');
              div2.className = "card"

              var div3 = document.createElement('div');
              div3.className = "card-body"

              console.log(news[i].images != null)

              if(news[i].images != null) {
                div3.style.backgroundImage = "url(" + news[i].images[0].url + ")";
              } else {
                div3.style.backgroundImage = "url(resources/covid.jpg)";
              }

              var header = document.createElement('h5');
              header.className = "card-title"
              header.innerHTML = news[i].title;
              header.style.color = "white"

              var para = document.createElement('p');
              para.className = "card-text"
              para.innerHTML = news[i].excerpt;
              para.style.color = "white"

              var div4 = document.createElement('div');
              div4.className = "read-more"

              var a = document.createElement('a');
              var link = document.createTextNode("Read More");
              a.appendChild(link);
              a.title = "Read More";
              a.href = news[i].webUrl;

              var arrow = document.createElement('i');
              arrow.className = "icofont-arrow-right"

              a.appendChild(arrow);
              div4.prepend(a);
              div3.appendChild(header);
              div3.appendChild(para);
              div3.appendChild(div4);
              div2.appendChild(div3);
              div1.appendChild(div2);

              document.getElementById("allnews").appendChild(div1);

            }


        })
        .fail(function () {
          var header = document.createElement('h5');
          header.innerHTML = "There isn't any current news based on your location.";
          header.style.color = "black"
          header.style.textAlign = "center"
          document.getElementById("features").appendChild(header);
        });

}

function getNews() {
  var location = getCookie("code")

  if(location == "") {
    location = "US"
  }

    callAPI(location)
}

// news[i].title;
// news[i].path;
// news[i].excerpt;
// news[i].type;
// news[i].webUrl;
// news[i].publishedDateTime;
// news[i].provider.name;
// news[i].provider.domain;
// news[i].provider.author;
// news[i].images; //array
// news[i].topics; //array
