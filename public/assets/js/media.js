var image = [];
var toptext = [];
var bottomText = [];

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

        document.getElementById("quote3").innerHTML = data.quoteText;
        document.getElementById("author3").innerHTML = data.quoteAuthor;


    })
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {

        document.getElementById("quote4").innerHTML = data.quoteText;
        document.getElementById("author4").innerHTML = data.quoteAuthor;

    })
}

function loadMemes() {

    $.getJSON("http://alpha-meme-maker.herokuapp.com/submissions", function (data) {
        alert("wait waaaaat");
        for (var i = 0; i < data.length; i++) {
            alert("this is data length " + data.length);
            toptext.push(data[i].topText);
            bottomText.push(data[i].bottomText);
            loadMemeImage(data[i].memeID);
        }
    })
}

function loadMemeImage(id) {

    $.getJSON("http://alpha-meme-maker.herokuapp.com/memes/" + id + "/", function (data) {
        image.push(data.image);
    })
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

    document.getElementById("quote1").innerHTML = quotes[0];


    // for(i=1;i<5;i++){
    //     document.getElementById("quote" + i.toString()).innerHTML = quotes[i];
    //     document.getElementById("author" + i.toString()).innerHTML = authors[i];
    // }
}