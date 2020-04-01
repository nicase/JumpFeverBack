function put(url, load, callback) {
  var req = new XMLHttpRequest();   // new HttpRequest instance
  req.open("PUT", url);
  req.setRequestHeader("Content-Type", "application/json");
  let tokenHeader = 'Bearer ' + localStorage.getItem('token');
  req.setRequestHeader('Authorization', tokenHeader);
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      callback(req.responseText, req.status)
    }
  }
  req.send(JSON.stringify(load));
}

function saveMatchID(matchID) {
    localStorage.setItem("matchID", matchID);
}

function joinGame() {
  var matchID = document.getElementById("code").value;
  let url = '/api/match/' + matchID + '/join';
  let user2 = localStorage.getItem('userId')
  put(url, {user2}, (res, status) => {
    if (status != 200) {
      window.location.href = "/match/" + matchID;
      saveMatchID(matchID);
    }
    else {
      console.log("Wrong match id!");
    }
  })
}


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

function new_game() {
  const user1 = localStorage.getItem('userId');
  var load = {
    user1
  }
  post("/api/match", load, (resp) => {
    try {
      resp = JSON.parse(resp);
    }
    catch (err) {
      console.log("Something went wrong!");
    }
    localStorage.setItem('matchId', resp._id);
    window.location.href = "/match/" + resp._id;

  })
}
