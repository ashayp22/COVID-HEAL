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

        document.getElementById("total_cases").innerHTML = data.totalConfirmedCases
        document.getElementById("total_deaths").innerHTML = data.totalDeaths
        document.getElementById("total_recoveries").innerHTML = data.totalRecoveredCases


        console.log("success");
    })
    .fail(function () {
        console.log("error");
    });
