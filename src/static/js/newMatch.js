function post(url, load, callback) {
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

function error() {
  console.log("Something went wrong!");
}

function callback(resp) {
  try {
    resp = JSON.parse(resp);
  }
  catch (err) {
    error()
  }
  localStorage.setItem('matchId', resp._id);
  window.location.replace("/match/" + resp._id);

}

function new_game() {
  const user1 = localStorage.getItem('userId');
  var load = {
    user1
  }

  post("/api/match", load, callback)

}
