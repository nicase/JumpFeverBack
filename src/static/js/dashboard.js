function put(url, load, callback) {
  const req = new XMLHttpRequest(); // new HttpRequest instance
  req.open('PUT', `http://localhost:5000${url}`);
  req.setRequestHeader('Content-Type', 'application/json');
  const tokenHeader = `Bearer ${localStorage.getItem('token')}`;
  req.setRequestHeader('Authorization', tokenHeader);
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      callback(req.responseText, req.status);
    }
  };
  req.send(JSON.stringify(load));
}

function saveMatchID(matchID) {
  localStorage.setItem('matchId', matchID);
}

function joinGame() {
  const matchID = document.getElementById('code').value;
  const url = `/api/match/${matchID}/join`;
  const user2 = localStorage.getItem('userId');
  put(url, { user2 }, (res, status) => {
    if (status == 200) {
      saveMatchID(matchID);
      window.location.href = `/match/${matchID}`;
    } else {
      console.log('Wrong match id!');
    }
  });
}


function post(url, load, callback) {
  const req = new XMLHttpRequest(); // new HttpRequest instance
  req.open('POST', `http://localhost:5000${url}`);
  req.setRequestHeader('Content-Type', 'application/json');
  const tokenHeader = `Bearer ${localStorage.getItem('token')}`;
  req.setRequestHeader('Authorization', tokenHeader);
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      callback(req.responseText);
    }
  };
  req.send(JSON.stringify(load));
}

function new_game() {
  const user1 = localStorage.getItem('userId');
  const load = {
    user1,
  };
  post('/api/match', load, (resp) => {
    try {
      resp = JSON.parse(resp);
    } catch (err) {
      console.log('Something went wrong!');
    }
    localStorage.setItem('matchId', resp._id);
    window.location.href = `/match/1/${resp._id}`;
  });
}

window.onload = function () {
  localStorage.removeItem('matchStarted');
  localStorage.removeItem('machId');
};
