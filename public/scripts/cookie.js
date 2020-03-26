function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//cookies: user, email, location, phone number


function submit() {
  var name = document.getElementById("name").value;
  var location = document.getElementById("location").value;
  var number = document.getElementById("number").value;

  //error

  var err = ""

  //make sure they are in the proper format

  var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;

  if(!Regex.test(number)) {
    err += "not a phone number, please try again"
  }

  if (err != "") {
    document.getElementById("error").innerHTML = err
  } else {
    document.getElementById("error").innerHTML = ""

    //set cookies and redirect to home

    setCookie("user", "yes", 365)
    setCookie("name", name, 365)
    setCookie("location", location, 365)
    setCookie("number", number, 365)

    window.location = "/home"
  }

}
