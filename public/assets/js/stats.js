$.ajax({
    type: "GET",
    url: "https://api.smartable.ai/coronavirus/stats/global",

    // Request headers
    beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Cache-Control", "no-cache");
        xhrObj.setRequestHeader("Subscription-Key", "eba31584641f4cbeae6f39397823b9a1");
    },
})
    .done(function (data) {

        var stats = [data.stats.totalConfirmedCases + "", data.stats.totalDeaths + "", data.stats.totalRecoveredCases + ""]


        for(var z = 0; z < stats.length; z++) {
          var number = stats[z];

          var times = parseInt((number.length-1 )/ 3)+1
          for(var i = 1; i < times; i++) {
            var s = i * 3;
            s = number.length - s - (i - 1);
            number = number.substring(0, s) + "," + number.substring(s, number.length)
          }
          stats[z] = number
        }

        document.getElementById("total_cases").innerHTML = stats[0]
        document.getElementById("total_deaths").innerHTML = stats[1]
        document.getElementById("total_recoveries").innerHTML = stats[2]


        console.log("success");
    })
    .fail(function () {
        console.log("error");
    });

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

var code = getCookie("code");
var loc = getCookie("location")


if(code != "") {
  $.ajax({
      type: "GET",
      url: "https://api.smartable.ai/coronavirus/stats/" + code,

      // Request headers
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Cache-Control", "no-cache");
          xhrObj.setRequestHeader("Subscription-Key", "eba31584641f4cbeae6f39397823b9a1");
      },
  })
      .done(function (data) {

          var stats = [data.stats.totalConfirmedCases + "", data.stats.totalDeaths + "", data.stats.totalRecoveredCases + ""]


          for(var z = 0; z < stats.length; z++) {
            var number = stats[z];

            var times = parseInt((number.length-1 )/ 3)+1
            for(var i = 1; i < times; i++) {
              var s = i * 3;
              s = number.length - s - (i - 1);
              number = number.substring(0, s) + "," + number.substring(s, number.length)
            }
            stats[z] = number
          }

          document.getElementById("location_cases").innerHTML = stats[0]
          document.getElementById("location_deaths").innerHTML = stats[1]
          document.getElementById("location_recoveries").innerHTML = stats[2]
          document.getElementById("individual_location").innerHTML = "Live Stats for " + loc;


          console.log("success");
      })
      .fail(function () {
          console.log("error");
      });
}
