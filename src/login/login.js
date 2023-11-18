function login(username, password) {
  if (username === "" || password === "") {
    showModalError();
  } else {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Annie is Vader",
      },
      body: `username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.message === "Wrong username/password") {
          console.log("error");
          showModalError();
        } else if (response.accessToken) {
          console.log("correcto");
          fetch("http://localhost:8000/api/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Annie is Vader",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              const user = res.find((item) => item.username === username);
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  id: user.id,
                  username: user.username,
                  token: response.accessToken,
                })
              );
            })
            .then(() => {
              showModalSuccess();
            })
            .catch((err) => {
              showModalError();
            });
        }
      })
      .catch((err) => {
        console.log("catch");
        showModalError();
      });
  }
}

const response = window.localStorage.getItem("user");
if (response) {
  window.location.assign("index.html");
}
const form_login = document.getElementById("form_login");

if (form_login) {
  form_login.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    login(username.value, password.value);
  });
}

// register

function register(username, password, confirm_password) {
  if (username === "" || password === "") {
    showModalError();
  } else if (password !== confirm_password) {
    showModalError();
  } else {
    const bodyString = JSON.stringify({
      username,
      password,
    });
    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Annie is Vader",
      },
      body: bodyString,
    })
      .then((response) => response.json())
      .then((response) => {
        showModalSuccess(1);
      })
      .catch((err) => {
        showModalError();
      });
  }
}

const form_sigin = document.getElementById("form_sigin");

if (form_sigin) {
  form_sigin.addEventListener("submit", (e) => {
    console.log("register");
    console.log("register");
    e.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirm_password");
    register(username.value, password.value, confirm_password.value);
  });
}

function showModalError() {
  const modalErrors = document.getElementById("modalErrors");
  const bsModal = new bootstrap.Modal(modalErrors);

  bsModal.show();
  setTimeout(() => {
    bsModal.hide();
  }, 3000);
}

function showModalSuccess(type) {
  const modalSuccess = document.getElementById("modalSuccess");
  const bsModal = new bootstrap.Modal(modalSuccess);

  bsModal.show();
  setTimeout(() => {
    bsModal.hide();
    if (type) {
      window.location.assign("login.html");
    } else {
      window.location.assign("index.html");
    }
  }, 3000);
}
