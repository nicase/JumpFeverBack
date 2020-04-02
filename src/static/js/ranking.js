function get(url, callback) {
  const req = new XMLHttpRequest(); // new HttpRequest instance
  req.open('GET', `http://209.97.187.129:5000${url}`);
  req.setRequestHeader('Content-Type', 'application/json');
  const tokenHeader = `Bearer ${localStorage.getItem('token')}`;
  req.setRequestHeader('Authorization', tokenHeader);
  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      callback(req.response);
    }
  };
  req.send();
}
function error() {
  console.log('Something went wrong!');
}

function displayRanking(resp) {
  try {
    resp = JSON.parse(resp);
  } catch (err) {
    error();
  }
  console.log(resp);
  if (resp.length > 0) {
    if (resp[0].role === 'admin') {
      document.getElementById('oneUsername').setAttribute('class', 'adminClass');
    }
    document.getElementById('oneUsername').innerHTML = resp[0].username;
    document.getElementById('oneXP').innerHTML = resp[0].XP;
    if (resp.length > 1) {
      if (resp[1].role === 'admin') {
        document.getElementById('oneUsername').setAttribute('class', 'adminClass');
      }
      document.getElementById('twoUsername').innerHTML = resp[1].username;
      document.getElementById('twoXP').innerHTML = resp[1].XP;
      if (resp.length > 2) {
        if (resp[2].role === 'admin') {
          document.getElementById('oneUsername').setAttribute('class', 'adminClass');
        }
        document.getElementById('threeUsername').innerHTML = resp[2].username;
        document.getElementById('threeXP').innerHTML = resp[2].XP;
        if (resp.length > 3) {
          if (resp[3].role === 'admin') {
            document.getElementById('oneUsername').setAttribute('class', 'adminClass');
          }
          document.getElementById('fourUsername').innerHTML = resp[3].username;
          document.getElementById('fourXP').innerHTML = resp[3].XP;
          if (resp.length > 4) {
            if (resp[4].role === 'admin') {
              document.getElementById('oneUsername').setAttribute('class', 'adminClass');
            }
            document.getElementById('fiveUsername').innerHTML = resp[4].username;
            document.getElementById('fiveXP').innerHTML = resp[4].XP;
            if (resp.length > 5) {
              if (resp[5].role === 'admin') {
                document.getElementById('oneUsername').setAttribute('class', 'adminClass');
              }
              document.getElementById('sixUsername').innerHTML = resp[5].username;
              document.getElementById('sixXP').innerHTML = resp[5].XP;
              if (resp.length > 6) {
                if (resp[6].role === 'admin') {
                  document.getElementById('oneUsername').setAttribute('class', 'adminClass');
                }
                document.getElementById('sevenUsername').innerHTML = resp[6].username;
                document.getElementById('sevenXP').innerHTML = resp[6].XP;
                if (resp.length > 7) {
                  if (resp[7].role === 'admin') {
                    document.getElementById('oneUsername').setAttribute('class', 'adminClass');
                  }
                  document.getElementById('eightUsername').innerHTML = resp[7].username;
                  document.getElementById('eightXP').innerHTML = resp[7].XP;
                  if (resp.length > 8) {
                    if (resp[8].role === 'admin') {
                      document.getElementById('oneUsername').setAttribute('class', 'adminClass');
                    }
                    document.getElementById('nineUsername').innerHTML = resp[8].username;
                    document.getElementById('nineXP').innerHTML = resp[8].XP;
                    if (resp.length > 9) {
                      if (resp[9].role === 'admin') {
                        document.getElementById('oneUsername').setAttribute('class', 'adminClass');
                      }
                      document.getElementById('tenUsername').innerHTML = resp[9].username;
                      document.getElementById('tenXP').innerHTML = resp[9].XP;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

window.onload = function () {
  localStorage.removeItem('matchStarted');
  localStorage.removeItem('machId');
  get('/api/user/ranking', displayRanking);
};
