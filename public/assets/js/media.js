var text = [];
var image = [];

var quotes = [];
var authors = [];

function loadQuote() {

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {


        document.getElementById("quote1").innerHTML = data.quoteText;
        document.getElementById("author1").innerHTML = data.quoteAuthor;


    })
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {

        document.getElementById("quote2").innerHTML = data.quoteText;
        document.getElementById("author2").innerHTML = data.quoteAuthor;


    })

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {

        document.getElementById("quote7").innerHTML = data.quoteText;
        document.getElementById("author7").innerHTML = data.quoteAuthor;


    })


    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {

        document.getElementById("quote5").innerHTML = data.quoteText;
        document.getElementById("author5").innerHTML = data.quoteAuthor;

    })
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {

        document.getElementById("quote6").innerHTML = data.quoteText;
        document.getElementById("author6").innerHTML = data.quoteAuthor;

    })

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {

        document.getElementById("quote3").innerHTML = data.quoteText;
        document.getElementById("author3").innerHTML = data.quoteAuthor;

    })

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {

        document.getElementById("quote8").innerHTML = data.quoteText;
        document.getElementById("author8").innerHTML = data.quoteAuthor;

    })



    // for(i= 0; i< 3;i++){
    //     alert("hello world")
    //     $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {
    //         document.getElementById("quote" + (i+1).toString()).innerHTML = data.quoteText;
    //             document.getElementById("author"+(i+1).toString()).innerHTML = data.quoteAuthor;
    //
    //     })
    //
    //
    //
    //
    //
    // }


}

function loadMemes() {
    $.getJSON("https://www.reddit.com/r/CoronavirusMemes.json", function (json) {
        for (var i = 0; i < json.data.children.length; i++) {
            //sets the first corona meme text
            text.push(json.data.children[i].data.title);
            //sets that meme's image
            image.push(json.data.children[i].data.url);
        }
    });


}


function loadMemesOnPage() {
    loadMemes()
    alert(toptext[0])
    alert(bottomText[0])


    // var item = {
    //     name: "My Name",
    //     age: 30,
    //     other: "Other Info"
    // }
    // var template = [];
    //
    // template.push(
    //     '<div class="row">',
    //     '<span class="name-info">' + item.name + '</span>',
    //     '<span class="age-info">' + item.age + '</span>',
    //     '<span class="other-info">' + item.other + '</span>',
    //     '</div>'
    // );
    //
    // var htmlString = template.join('');
    // var element = document.querySelector('.TxtTile');
    // element.innerHTML = htmlString;


}

function loadQuotesOnPage(){

    loadQuote();


    // for(i=1;i<5;i++){
    //     document.getElementById("quote" + i.toString()).innerHTML = quotes[i];
    //     document.getElementById("author" + i.toString()).innerHTML = authors[i];
    // }
}
