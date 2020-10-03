
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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

    //f1e40b6a2eaa412e876cc21fe5669a0c --current key
    //c7201c8cc7msh378871e1a345523p1f3ca7jsnf7e43fd1bd33 - new key

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://coronavirus-smartable.p.rapidapi.com/news/v1/" + state + "/",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
            "x-rapidapi-key": "c7201c8cc7msh378871e1a345523p1f3ca7jsnf7e43fd1bd33"
        }
    }


    $.ajax(settings)
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

                if (news[i].images != null) {
                    div3.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(" + news[i].images[0].url + ")";
                } else {
                    div3.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(resources/covid.jpg)";
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
                a.target = "_blank"
                a.style.color = "white"


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

function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r: 0, g: 0, b: 0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r: 0, g: 0, b: 0},
        count = 0;

    if (!context) {
        console.log("a")
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        console.log(e)
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

}

function getNews() {
    var location = getCookie("code")

    if (location == "") {
        location = "US"
    }

    callAPI(location)
}