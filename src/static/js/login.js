function post(url, load, callback) {
  const req = new XMLHttpRequest(); // new HttpRequest instance
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      callback(req.responseText);
    }
  };
  req.send(JSON.stringify(load));
}

function error() {
  console.log('Something went wrong!');
}

function save_data(resp) {
  try {
    resp = JSON.parse(resp);
  } catch (err) {
    error();
  }
  // Login correcte
  if (resp.token) {
    const username = document.getElementById('usernameInput').value;
    localStorage.setItem('token', resp.token);
    localStorage.setItem('userId', resp.user._id);
    localStorage.setItem('email', resp.user.email);
    localStorage.setItem('xp', resp.user.XP);
    localStorage.setItem('username', username);
    // Redirect
    document.cookie = `token=${resp.token}`;
    window.location.replace('/dashboard');
  }
  // Login incorrecte
  else {
    error();
  }
}

function try_login() {
  const username = document.getElementById('usernameInput').value;
  const password = document.getElementById('passwordInput').value;

  const load = {
    username,
    password,
  };

  post('/api/auth/login', load, save_data);
}

function try_signup() {
  const username = document.getElementById('usernameInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  const load = {
    username,
    email,
    password,
  };

  post('/api/auth/signup', load, save_data);
}
