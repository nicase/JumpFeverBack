function get(url, load, callback) {
  var req = new XMLHttpRequest();   // new HttpRequest instance
  req.open("POST", url);
  req.setRequestHeader("Content-Type", "application/json");
  let tokenHeader = 'Bearer ' + localStorage.getItem('token');
  req.setRequestHeader('Authorization', tokenHeader);
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      callback(req.responseText)
    }
  }
  req.send(JSON.stringify(load));
}

function saveMatchID(matchID) {
    localStorage.setItem("matchID", matchID);
}

function joinGame() {

  var matchID = document.getElementById("code").value
  saveMatchID(matchID)
  var url = "/api/match/" + matchID;
  //console.log(url)
  window.location.href = url;

}
