function post(url, load, callback) {
  var req = new XMLHttpRequest();   // new HttpRequest instance
  req.open("POST", url);
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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

async function new_game() {

  var load = {
    "id": await localStorage.getItem('id')
  }

  post("/api/auth/startMatch", load, callback)

}
