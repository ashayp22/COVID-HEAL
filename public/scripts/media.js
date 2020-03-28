
function loadQuote() {
        $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
    alert(data.quoteText);
    alert(data.quoteAuthor);
    alert(data.quoteLink);
    })
}