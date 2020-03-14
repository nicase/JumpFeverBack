var username;
var password;

function post(url, load, callback) {
    var req = new XMLHttpRequest();   // new HttpRequest instance
    req.open("POST", url);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            callback(req.responseText)
        }
    };
    req.send(JSON.stringify(load));
}

function error() {
    document.getElementById("hello").innerHTML = "Something went wrong!";
}

function save_data(resp) {
    try {
        resp = JSON.parse(resp);
    }
    catch (err) {
        error()
    }
    // Login correcte
    if (resp.token) {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('username', username);
        // Redirect
        window.location.replace("/dashboard");
    }
    // Login incorrecte
    else {
        error()
    }
}

function try_login() {

    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;

    var load = {
        "username": username,
        "password": password
    }

    post("/api/auth/login", load, save_data)

}