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

function waah(state) {
    $.ajax({
        type: "GET",
        url: "https://api.smartable.ai/coronavirus/news/US",

        // Request headers
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Cache-Control", "no-cache");
            xhrObj.setRequestHeader("Subscription-Key", "f1e40b6a2eaa412e876cc21fe5669a0c");
        },
    })
        .done(function (data) {
            alert("success");
            const {news} = data;
            alert("hello world")
            console.log(news[0].title);

        })
        .fail(function () {
            alert("error");
        });

}

function tryFunc() {

    alert("ahhhhh")
    waah()
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