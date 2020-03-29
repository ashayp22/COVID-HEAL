
var contacts = [
    {
      "state": "AL",
      "hotline": "888-264-2256"
    },
    {
      "state": "AK",
      "hotline": "907-269-8000"
    },
    {
      "state": "AR",
      "hotline": "800-632-4502"
    },
    {
      "state": "AZ",
      "hotline": "602-542-1025"
    },
    {
      "state": "CA",
      "hotline": "2-1-1"
    },
    {
      "state": "CO",
      "hotline": "303-389-1687"
    },
    {
      "state": "CT",
      "hotline": "text CTCOVID to 898211"
    },
    {
      "state": "DE",
      "hotline": "866-408-1899"
    },
    {
      "state": "FL",
      "hotline": "66-779-6121"
    },
    {
      "state": "GA",
      "hotline": "844-442-2681"
    },
    {
      "state": "HI",
      "hotline": "2-1-1"
    },
    {
      "state": "IA",
      "hotline": "2-1-1"
    },
    {
      "state": "ID",
      "hotline": "208-788-5558"
    },
    {
      "state": "IL",
      "hotline": "800-889-3931"
    },
    {
      "state": "IN",
      "hotline": "877-826-0011"
    },
    {
      "state": "KS",
      "hotline": "1-866-534-3463"
    },
    {
      "state": "KY",
      "hotline": "800-722-5725"
    },
    {
      "state": "LA",
      "hotline": "2-1-1"
    },
    {
      "state": "MA",
      "hotline": "617-983-6800"
    },
    {
      "state": "ME",
      "hotline": "800-464-5767"
    },
    {
      "state": "MD",
      "hotline": "703-228-7999"
    },
    {
      "state": "MI",
      "hotline": "888-535-6136"
    },
    {
      "state": "MN",
      "hotline": "651-201-3920"
    },
    {
      "state": "MO",
      "hotline": "800-392-0272"
    },
    {
      "state": "MS",
      "hotline": "877-978-6453"
    },
    {
      "state": "MT",
      "hotline": "888-333-0461"
    },
    {
      "state": "NC",
      "hotline": "866-462-3821"
    },
    {
      "state": "ND",
      "hotline": "866-207-2880"
    },
    {
      "state": "NE",
      "hotline": "402-552-6645"
    },
    {
      "state": "NH",
      "hotline": "866-444-4211"
    },
    {
      "state": "NJ",
      "hotline": "800-222-1222"
    },
    {
      "state": "NM",
      "hotline": "855-600-3453"
    },
    {
      "state": "NV",
      "hotline": "866-535-5654"
    },
    {
      "state": "NY",
      "hotline": "866-881-2809"
    },
    {
      "state": "OH",
      "hotline": "833-427-5634"
    },
    {
      "state": "OK",
      "hotline": "877-215-8336"
    },
    {
      "state": "OR",
      "hotline": "503-370-6584"
    },
    {
      "state": "PA",
      "hotline": "877-724-3258"
    },
    {
      "state": "RI",
      "hotline": "401-222-8022"
    },
    {
      "state": "SC",
      "hotline": "866-462-3821"
    },
    {
      "state": "SD",
      "hotline": "303-389-1687"
    },
    {
      "state": "TN",
      "hotline": "877-857-2945"
    },
    {
      "state": "TX",
      "hotline": "817-248-6299"
    },
    {
      "state": "UT",
      "hotline": "800-456-7707"
    },
    {
      "state": "VA",
      "hotline": "703-228-7999"
    },
    {
      "state": "VT",
      "hotline": "866-652-4636"
    },
    {
      "state": "WA",
      "hotline": "800-525-0127"
    },
    {
      "state": "WI",
      "hotline": "608-720-5300"
    },
    {
      "state": "WV",
      "hotline": "800-887-4304"
    },
    {
      "state": "WY",
      "hotline": "888-364-3065"
    }
  ]

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


window.addEventListener('load', (event) => {
  state = getCookie("code");

  if(state.substring(0, 2) == "US") {
    condensed_state = state.substring(3, state.length);

    var txt = "If you have symptoms, please take the test & contact the emergency hotline: "

    for(var i = 0; i < contacts.length; i++) {
      if(contacts[i].state == condensed_state) {
        txt += contacts[i].hotline;
      }
    }

    document.getElementById("hotline").innerHTML = txt;
  } else {
    document.getElementById("hotline").innerHTML = "";
  }


});
