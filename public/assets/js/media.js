var image = [];
var toptext = [];
var bottomText = [];

function loadQuote() {

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function (data) {
        alert(data.quoteText);
        alert(data.quoteAuthor);
        alert(data.quoteLink);
    })
}

function loadMemes() {
    $.getJSON("http://alpha-meme-maker.herokuapp.com/submissions", function (data) {
        for (var i = 0; i < data.length; i++) {
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
}
