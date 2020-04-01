let matchId = localStorage.getItem('matchId');
document.getElementById('codeMatch').innerText = "Code: " + matchId;
var keys = {}

onkeydown = onkeyup = function(e){
    e = e || event
    keys[e.keyCode] = e.type == 'keydown'
}

function get(url, callback) {
  var req = new XMLHttpRequest();   // new HttpRequest instance
  req.open("GET", url);
  req.setRequestHeader("Content-Type", "application/json");
  let tokenHeader = 'Bearer ' + localStorage.getItem('token');
  req.setRequestHeader('Authorization', tokenHeader);
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      callback(req.responseText, req.status)
    }
  }
  req.send();
}

function checkKeys() {
    // Up
    if (keys[38]) {
        g.me.jump()
    }
    // Left
    if (keys[37]) {
        g.me.moveLeft()
    }
    // Right
    if (keys[39]) {
        g.me.moveRight()
    }
}

const cnv = document.getElementById("mycanvas")
cnv.height = document.documentElement.clientHeight - 50;
cnv.width = 500

const d = new drawTool("mycanvas")
const g = new Game(Math.random()*9999, [])

g.start()
var updateAll = () => g.update()

d.setInterval(updateAll, 2)

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
  /*
  socket.emit('player' + vars[0], {
    'x': x,
    'y': y
  });
  */
}

function checkStatus() {
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

let statusInterval = setInterval(checkStatus, 1000);
