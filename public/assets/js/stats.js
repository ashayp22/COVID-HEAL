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
