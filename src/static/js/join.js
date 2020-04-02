const matchId = localStorage.getItem('matchId');
localStorage.setItem('matchStarted', true);
document.getElementById('codeMatch').innerText = `Code: ${matchId}`;
const keys = {};

onkeydown = onkeyup = function (e) {
  e = e || event;
  keys[e.keyCode] = e.type == 'keydown';
};

function get(url, callback) {
  const req = new XMLHttpRequest(); // new HttpRequest instance
  req.open('GET', `http://209.97.187.129:5000${url}`);
  req.setRequestHeader('Content-Type', 'application/json');
  const tokenHeader = `Bearer ${localStorage.getItem('token')}`;
  req.setRequestHeader('Authorization', tokenHeader);
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      callback(req.responseText, req.status);
    }
  };
  req.send();
}

function checkKeys() {
  // Up
  if (keys[38]) {
    g.me.jump();
  }
  // Left
  if (keys[37]) {
    g.me.moveLeft();
  }
  // Right
  if (keys[39]) {
    g.me.moveRight();
  }
}

const cnv = document.getElementById('mycanvas');
cnv.height = 650;
cnv.width = 500;

let xOther = null;
let yOther = null;
const d = new drawTool('mycanvas');
let g = null;
let updateAll = null;

const socket = io('http://209.97.187.129:5000');
socket.on('seed', (data) => {
  console.log(data);
  g = new Game(data.seed, [1]);

  g.start();
  updateAll = () => g.update();

  d.setInterval(updateAll, 2);

  socket.on('player2', (data) => {
    xOther = data.x;
    yOther = data.y;
  });
});

/*
var xOther, yOther;
var query = window.location.search.substring(1);
var vars = query.split("&");
var socket = io('http://localhost:5000');
socket.on('player' + vars[0], function (data) {
    xOther = data.x;
    yOther = data.y;
    console.log(data)
});
*/
function emitPosition(x, y) {
  socket.emit('player2', {
    x,
    y,
  });
}

/* function checkStatus() {
  console.log('Checking status...')
  get("/api/match/" + localStorage.getItem('matchId'), (res, status) => {
    if (status != 200) console.log('Error checking status!')
    else {
      res = JSON.parse(res);
      if (res.user2) {
        console.log('Somebody joined!')
        clearInterval(statusInterval);
        get("/api/user/" + res.user2, (res, status) => {
          if (status != 200) console.log('Error getting enemy!')
          else {
            res = JSON.parse(res);
            console.log("User " + res.username + " joined the match!")
          }
        })
      }
    }
  });
}

let statusInterval = setInterval(checkStatus, 1000); */
