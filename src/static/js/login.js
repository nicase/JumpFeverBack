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

function save_data_login(resp) {
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
    console.log(resp);
    document.getElementById('loginError').innerHTML = resp;
    error();
  }
}

function save_data_signup(resp) {
  try {
    resp = JSON.parse(resp);
  } catch (err) {
    error();
  }
  // Sign Up correcte
  if (resp.username) {
    document.getElementById('signupSuccess').innerHTML = 'Successfully Signed Up, Please Log In';
  }
  // Sign Up incorrecte
  else {
    console.log(resp);
    let errorLabel = '';
    if (resp.errors) {
      for (const err of resp.errors) {
        errorLabel += `${err.msg}: ${err.param} <br>`;
      }
    } else errorLabel = resp.message;
    document.getElementById('signupError').innerHTML = errorLabel;
    error();
  }
}

function try_login() {
  const username = document.getElementById('usernameLoginInput').value;
  const password = document.getElementById('passwordLoginInput').value;

  const load = {
    username,
    password,
  };

  post('/api/auth/login', load, save_data_login);
}

function try_signup() {
  const username = document.getElementById('usernameSignupInput').value;
  const email = document.getElementById('emailSignupInput').value;
  const password = document.getElementById('passwordSignupInput').value;

  const load = {
    username,
    email,
    password,
  };

  post('/api/auth/signup', load, save_data_signup);
}
