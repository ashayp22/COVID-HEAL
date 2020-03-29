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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function submit() {
  //error

  var err = ""

  // //make sure they are in the proper format
  //
  // var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
  //
  // if(!Regex.test(number)) {
  //   err += "That is not a phone number, please try again."
  // }


  if(code == "") {
    err += " Please select a location."
  }

  if (err != "") {
    document.getElementById("error").innerHTML = err
  } else {
    document.getElementById("error").innerHTML = ""

    //set cookies and redirect to home

    setCookie("user", "yes", 365)
    setCookie("code", code, 365)

    closeModal()
    if(window.location.pathname == "/news") {
      location.reload();
    } else if(window.location.pathname == "/home" || window.location.pathname == "/") {
      updateHotline();
    }

  }

}


//contact hotline-------------------------------------------------------

function updateHotline() {
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
}

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



//----------------------------------------------------------------------

window.addEventListener('load', (event) => {
  //check if a user is in session
  if(getCookie("user") != "yes") {
    showModal()
    document.getElementById("close").style.display = "none";
    document.getElementById("close").style.visibility = "hidden";
  }
});


function showModal() {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("myModal").style.visibility = "visible";
  document.getElementById("close").style.display = "block";
  document.getElementById("close").style.visibility = "visible";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal").style.visibility = "hidden";
}


var region = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado",
"Connecticut", "Delaware", "District of Columbia", "Federated States of Micronesia", "Florida",
"Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
"Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota",
"Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
"New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands",
"Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylania", "Puerto Rico", "Rhode Island", "South Carolina",
"South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington",
"West Virginia", "Wisconsin", "Wyoming"]

var region_codes = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU",
"HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", 'NE',
'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX',
'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY']

var countries = [
  { "code": "AD", "name": "Andorra" },
  { "code": "AE", "name": "United Arab Emirates" },
  { "code": "AF", "name": "Afghanistan" },
  { "code": "AG", "name": "Antigua and Barbuda" },
  { "code": "AI", "name": "Anguilla" },
  { "code": "AL", "name": "Albania" },
  { "code": "AM", "name": "Armenia" },
  { "code": "AO", "name": "Angola" },
  { "code": "AQ", "name": "Antarctica" },
  { "code": "AR", "name": "Argentina" },
  { "code": "AS", "name": "American Samoa" },
  { "code": "AT", "name": "Austria" },
  { "code": "AU", "name": "Australia" },
  { "code": "AW", "name": "Aruba" },
  { "code": "AX", "name": "Åland Islands" },
  { "code": "AZ", "name": "Azerbaijan" },
  { "code": "BA", "name": "Bosnia and Herzegovina" },
  { "code": "BB", "name": "Barbados" },
  { "code": "BD", "name": "Bangladesh" },
  { "code": "BE", "name": "Belgium" },
  { "code": "BF", "name": "Burkina Faso" },
  { "code": "BG", "name": "Bulgaria" },
  { "code": "BH", "name": "Bahrain" },
  { "code": "BI", "name": "Burundi" },
  { "code": "BJ", "name": "Benin" },
  { "code": "BL", "name": "Saint Barthélemy" },
  { "code": "BM", "name": "Bermuda" },
  { "code": "BN", "name": "Brunei Darussalam" },
  { "code": "BO", "name": "Bolivia, Plurinational State of" },
  { "code": "BQ", "name": "Bonaire, Sint Eustatius and Saba" },
  { "code": "BR", "name": "Brazil" },
  { "code": "BS", "name": "Bahamas" },
  { "code": "BT", "name": "Bhutan" },
  { "code": "BV", "name": "Bouvet Island" },
  { "code": "BW", "name": "Botswana" },
  { "code": "BY", "name": "Belarus" },
  { "code": "BZ", "name": "Belize" },
  { "code": "CA", "name": "Canada" },
  { "code": "CC", "name": "Cocos (Keeling) Islands" },
  { "code": "CD", "name": "Congo, Democratic Republic of the" },
  { "code": "CF", "name": "Central African Republic" },
  { "code": "CG", "name": "Congo" },
  { "code": "CH", "name": "Switzerland" },
  { "code": "CI", "name": "Côte d'Ivoire" },
  { "code": "CK", "name": "Cook Islands" },
  { "code": "CL", "name": "Chile" },
  { "code": "CM", "name": "Cameroon" },
  { "code": "CN", "name": "China" },
  { "code": "CO", "name": "Colombia" },
  { "code": "CR", "name": "Costa Rica" },
  { "code": "CU", "name": "Cuba" },
  { "code": "CV", "name": "Cabo Verde" },
  { "code": "CW", "name": "Curaçao" },
  { "code": "CX", "name": "Christmas Island" },
  { "code": "CY", "name": "Cyprus" },
  { "code": "CZ", "name": "Czechia" },
  { "code": "DE", "name": "Germany" },
  { "code": "DJ", "name": "Djibouti" },
  { "code": "DK", "name": "Denmark" },
  { "code": "DM", "name": "Dominica" },
  { "code": "DO", "name": "Dominican Republic" },
  { "code": "DZ", "name": "Algeria" },
  { "code": "EC", "name": "Ecuador" },
  { "code": "EE", "name": "Estonia" },
  { "code": "EG", "name": "Egypt" },
  { "code": "EH", "name": "Western Sahara" },
  { "code": "ER", "name": "Eritrea" },
  { "code": "ES", "name": "Spain" },
  { "code": "ET", "name": "Ethiopia" },
  { "code": "FI", "name": "Finland" },
  { "code": "FJ", "name": "Fiji" },
  { "code": "FK", "name": "Falkland Islands (Malvinas)" },
  { "code": "FM", "name": "Micronesia, Federated States of" },
  { "code": "FO", "name": "Faroe Islands" },
  { "code": "FR", "name": "France" },
  { "code": "GA", "name": "Gabon" },
  { "code": "GB", "name": "United Kingdom of Great Britain and Northern Ireland" },
  { "code": "GD", "name": "Grenada" },
  { "code": "GE", "name": "Georgia" },
  { "code": "GF", "name": "French Guiana" },
  { "code": "GG", "name": "Guernsey" },
  { "code": "GH", "name": "Ghana" },
  { "code": "GI", "name": "Gibraltar" },
  { "code": "GL", "name": "Greenland" },
  { "code": "GM", "name": "Gambia" },
  { "code": "GN", "name": "Guinea" },
  { "code": "GP", "name": "Guadeloupe" },
  { "code": "GQ", "name": "Equatorial Guinea" },
  { "code": "GR", "name": "Greece" },
  { "code": "GS", "name": "South Georgia and the South Sandwich Islands" },
  { "code": "GT", "name": "Guatemala" },
  { "code": "GU", "name": "Guam" },
  { "code": "GW", "name": "Guinea-Bissau" },
  { "code": "GY", "name": "Guyana" },
  { "code": "HK", "name": "Hong Kong" },
  { "code": "HM", "name": "Heard Island and McDonald Islands" },
  { "code": "HN", "name": "Honduras" },
  { "code": "HR", "name": "Croatia" },
  { "code": "HT", "name": "Haiti" },
  { "code": "HU", "name": "Hungary" },
  { "code": "ID", "name": "Indonesia" },
  { "code": "IE", "name": "Ireland" },
  { "code": "IL", "name": "Israel" },
  { "code": "IM", "name": "Isle of Man" },
  { "code": "IN", "name": "India" },
  { "code": "IO", "name": "British Indian Ocean Territory" },
  { "code": "IQ", "name": "Iraq" },
  { "code": "IR", "name": "Iran, Islamic Republic of" },
  { "code": "IS", "name": "Iceland" },
  { "code": "IT", "name": "Italy" },
  { "code": "JE", "name": "Jersey" },
  { "code": "JM", "name": "Jamaica" },
  { "code": "JO", "name": "Jordan" },
  { "code": "JP", "name": "Japan" },
  { "code": "KE", "name": "Kenya" },
  { "code": "KG", "name": "Kyrgyzstan" },
  { "code": "KH", "name": "Cambodia" },
  { "code": "KI", "name": "Kiribati" },
  { "code": "KM", "name": "Comoros" },
  { "code": "KN", "name": "Saint Kitts and Nevis" },
  { "code": "KP", "name": "Korea, Democratic People's Republic of" },
  { "code": "KR", "name": "Korea, Republic of" },
  { "code": "KW", "name": "Kuwait" },
  { "code": "KY", "name": "Cayman Islands" },
  { "code": "KZ", "name": "Kazakhstan" },
  { "code": "LA", "name": "Lao People's Democratic Republic" },
  { "code": "LB", "name": "Lebanon" },
  { "code": "LC", "name": "Saint Lucia" },
  { "code": "LI", "name": "Liechtenstein" },
  { "code": "LK", "name": "Sri Lanka" },
  { "code": "LR", "name": "Liberia" },
  { "code": "LS", "name": "Lesotho" },
  { "code": "LT", "name": "Lithuania" },
  { "code": "LU", "name": "Luxembourg" },
  { "code": "LV", "name": "Latvia" },
  { "code": "LY", "name": "Libya" },
  { "code": "MA", "name": "Morocco" },
  { "code": "MC", "name": "Monaco" },
  { "code": "MD", "name": "Moldova, Republic of" },
  { "code": "ME", "name": "Montenegro" },
  { "code": "MF", "name": "Saint Martin, (French part)" },
  { "code": "MG", "name": "Madagascar" },
  { "code": "MH", "name": "Marshall Islands" },
  { "code": "MK", "name": "North Macedonia" },
  { "code": "ML", "name": "Mali" },
  { "code": "MM", "name": "Myanmar" },
  { "code": "MN", "name": "Mongolia" },
  { "code": "MO", "name": "Macao" },
  { "code": "MP", "name": "Northern Mariana Islands" },
  { "code": "MQ", "name": "Martinique" },
  { "code": "MR", "name": "Mauritania" },
  { "code": "MS", "name": "Montserrat" },
  { "code": "MT", "name": "Malta" },
  { "code": "MU", "name": "Mauritius" },
  { "code": "MV", "name": "Maldives" },
  { "code": "MW", "name": "Malawi" },
  { "code": "MX", "name": "Mexico" },
  { "code": "MY", "name": "Malaysia" },
  { "code": "MZ", "name": "Mozambique" },
  { "code": "NA", "name": "Namibia" },
  { "code": "NC", "name": "New Caledonia" },
  { "code": "NE", "name": "Niger" },
  { "code": "NF", "name": "Norfolk Island" },
  { "code": "NG", "name": "Nigeria" },
  { "code": "NI", "name": "Nicaragua" },
  { "code": "NL", "name": "Netherlands" },
  { "code": "NO", "name": "Norway" },
  { "code": "NP", "name": "Nepal" },
  { "code": "NR", "name": "Nauru" },
  { "code": "NU", "name": "Niue" },
  { "code": "NZ", "name": "New Zealand" },
  { "code": "OM", "name": "Oman" },
  { "code": "PA", "name": "Panama" },
  { "code": "PE", "name": "Peru" },
  { "code": "PF", "name": "French Polynesia" },
  { "code": "PG", "name": "Papua New Guinea" },
  { "code": "PH", "name": "Philippines" },
  { "code": "PK", "name": "Pakistan" },
  { "code": "PL", "name": "Poland" },
  { "code": "PM", "name": "Saint Pierre and Miquelon" },
  { "code": "PN", "name": "Pitcairn" },
  { "code": "PR", "name": "Puerto Rico" },
  { "code": "PS", "name": "Palestine, State of" },
  { "code": "PT", "name": "Portugal" },
  { "code": "PW", "name": "Palau" },
  { "code": "PY", "name": "Paraguay" },
  { "code": "QA", "name": "Qatar" },
  { "code": "RE", "name": "Réunion" },
  { "code": "RO", "name": "Romania" },
  { "code": "RS", "name": "Serbia" },
  { "code": "RU", "name": "Russian Federation" },
  { "code": "RW", "name": "Rwanda" },
  { "code": "SA", "name": "Saudi Arabia" },
  { "code": "SB", "name": "Solomon Islands" },
  { "code": "SC", "name": "Seychelles" },
  { "code": "SD", "name": "Sudan" },
  { "code": "SE", "name": "Sweden" },
  { "code": "SG", "name": "Singapore" },
  { "code": "SH", "name": "Saint Helena, Ascension and Tristan da Cunha" },
  { "code": "SI", "name": "Slovenia" },
  { "code": "SJ", "name": "Svalbard and Jan Mayen" },
  { "code": "SK", "name": "Slovakia" },
  { "code": "SL", "name": "Sierra Leone" },
  { "code": "SM", "name": "San Marino" },
  { "code": "SN", "name": "Senegal" },
  { "code": "SO", "name": "Somalia" },
  { "code": "SR", "name": "Suriname" },
  { "code": "SS", "name": "South Sudan" },
  { "code": "ST", "name": "Sao Tome and Principe" },
  { "code": "SV", "name": "El Salvador" },
  { "code": "SX", "name": "Sint Maarten, (Dutch part)" },
  { "code": "SY", "name": "Syrian Arab Republic" },
  { "code": "SZ", "name": "Eswatini" },
  { "code": "TC", "name": "Turks and Caicos Islands" },
  { "code": "TD", "name": "Chad" },
  { "code": "TF", "name": "French Southern Territories" },
  { "code": "TG", "name": "Togo" },
  { "code": "TH", "name": "Thailand" },
  { "code": "TJ", "name": "Tajikistan" },
  { "code": "TK", "name": "Tokelau" },
  { "code": "TL", "name": "Timor-Leste" },
  { "code": "TM", "name": "Turkmenistan" },
  { "code": "TN", "name": "Tunisia" },
  { "code": "TO", "name": "Tonga" },
  { "code": "TR", "name": "Turkey" },
  { "code": "TT", "name": "Trinidad and Tobago" },
  { "code": "TV", "name": "Tuvalu" },
  { "code": "TW", "name": "Taiwan, Province of China" },
  { "code": "TZ", "name": "Tanzania, United Republic of" },
  { "code": "UA", "name": "Ukraine" },
  { "code": "UG", "name": "Uganda" },
  { "code": "UM", "name": "United States Minor Outlying Islands" },
  { "code": "US", "name": "United States of America" },
  { "code": "UY", "name": "Uruguay" },
  { "code": "UZ", "name": "Uzbekistan" },
  { "code": "VA", "name": "Holy See" },
  { "code": "VC", "name": "Saint Vincent and the Grenadines" },
  { "code": "VE", "name": "Venezuela, Bolivarian Republic of" },
  { "code": "VG", "name": "Virgin Islands, British" },
  { "code": "VI", "name": "Virgin Islands, U.S." },
  { "code": "VN", "name": "Viet Nam" },
  { "code": "VU", "name": "Vanuatu" },
  { "code": "WF", "name": "Wallis and Futuna" },
  { "code": "WS", "name": "Samoa" },
  { "code": "YE", "name": "Yemen" },
  { "code": "YT", "name": "Mayotte" },
  { "code": "ZA", "name": "South Africa" },
  { "code": "ZM", "name": "Zambia" },
  { "code": "ZW", "name": "Zimbabwe" }
];

for(var i = 0; i < countries.length; i++) {
  region.push(countries[i].name)
  region_codes.push(countries[i].code)
}

var code = ""

function updateLocation() {
  var current = document.getElementById("location").value;
  var index = -1;
  var closest = -1;
  code = ""

  var length = 10000000;

  for(var i = 0; i < region.length; i++) {
    var d = stringDistance2(current, region[i]);
    if (d > closest) {
      index = i;
      closest = d;
      code = region_codes[i]
      length = region[i].length
    } else if(d === closest) {
      if(length > region[i].length) {
        index = i;
        closest = d;
        code = region_codes[i]
        length = region[i].length
      }
    }
  }
  console.log(closest)

  if(index <= 58) {
    code = "US-" + code
  }

  document.getElementById("state").innerHTML = code + " - " + region[index]

  //0-58 us state

}

function stringDistance2(a, b) {
  var l = 0;

  a = a.toLowerCase()
  b = b.toLowerCase()

  if(a.length > b.length) {
    for(var i = 0; i < a.length; i++) {
      if(a[i] != b[i]) {
        return l;
      }

      l++;
    }
  } else {
    for(var i = 0; i <b.length; i++) {
      if(a[i] != b[i]) {
        return l;
      }
      l++;
    }
  }

  return l;


}

function stringDistance(a, b) {
            if(a.length == 0) return b.length;
            if(b.length == 0) return a.length;

            var matrix = [];

            // increment along the first column of each row
            var i;
            for(i = 0; i <= b.length; i++){
                matrix[i] = [i];
            }

            // increment each column in the first row
            var j;
            for(j = 0; j <= a.length; j++){
                matrix[0][j] = j;
            }

            // Fill in the rest of the matrix
            for(i = 1; i <= b.length; i++){
                for(j = 1; j <= a.length; j++){
                if(b.charAt(i-1) == a.charAt(j-1)){
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                            Math.min(matrix[i][j-1] + 1, // insertion
                                                    matrix[i-1][j] + 1)); // deletion
                }
                }
            }

        return matrix[b.length][a.length];
}
