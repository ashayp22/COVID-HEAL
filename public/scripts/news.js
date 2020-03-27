


function loadNews(state) {
    var URL = "";
    var apiKey = "c1db44e2f1744a3e90246189cbdb3c7e";
    //back up key - 48d19b6286494f4495616a2dcab82b9d

    $.ajax({
        type: "GET",
        url: "https://api.smartable.ai/coronavirus/news/" + state,

        // Request headers
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Cache-Control", "no-cache");
            xhrObj.setRequestHeader("Subscription-Key", "c1db44e2f1744a3e90246189cbdb3c7e");
        },
    })
        .done(function (data) {
            const {news} = data;
            return news;
        })
        .fail(function () {
            alert("error");


        });
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

function onLoad() {
    loadNews();
}
