var text = [];
var image = [];



function loadQuote() {

    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
        alert(data.quoteText);
        alert(data.quoteAuthor);
        alert(data.quoteLink);
    })
}

function loadMemes() {
    $.getJSON("https://www.reddit.com/r/CoronavirusMemes.json", function(json) {
        for (var i = 0; i < json.data.children.length; i++) {
            //sets the first corona meme text
            text.push(json.data.children[i].data.title);
            //sets that meme's image
            image.push(json.data.children[i].data.url);
        }
    });
}