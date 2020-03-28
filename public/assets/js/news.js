// function loadNews(state) {
//     var URL = "";
//     var apiKey = "48d19b6286494f4495616a2dcab82b9d";
//     //back up key - 48d19b6286494f4495616a2dcab82b9d
//     //  c1db44e2f1744a3e90246189cbdb3c7e
//     $.ajax({
//         type: "GET",
//         url: "https://api.smartable.ai/coronavirus/news/" + state,
//
//         // Request headers
//         beforeSend: function (xhrObj) {
//             xhrObj.setRequestHeader("Cache-Control", "no-cache");
//             xhrObj.setRequestHeader("Subscription-Key", "c1db44e2f1744a3e90246189cbdb3c7e");
//         },
//     })
//         .done(function (data) {
//             const {news} = data;
//             alert("hello world")
//             console.log(news[0].title);
//             // return data;
//         })
//         .fail(function () {
//             alert("error");
//
//
//         });
//
//
// }

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

            console.log(news[0].title);
            console.log(news.length);




            // $("ti1").update("New text");
            for (i = 0; i < 10; i++) {
                document.getElementById("ti" + (i + 1)).innerText = news[i].title;
                document.getElementById("para" + (i + 1)).innerHTML = news[i].excerpt;


                if (i < 4) {
                    // var square = document.getElementsByClassName("col-md-6 d-flex align-items-stretch");//had invalid markup
                    // // var selectBox = document.getElementById("selectBox");
                    // // var selectedItem = selectBox.options[selectBox.selectedIndex].value;
                    // square[i].style.backgroundImage  = "url("+news[i].images[0].url+")";

                    var body = document.getElementsByClassName('card-body')[i];
                    body.style.backgroundImage = "url(" + news[i].images[0].url + ")";

                }

            }

            // alert(news[0].images[0].url)

        })
        .fail(function () {
            alert("error");
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
