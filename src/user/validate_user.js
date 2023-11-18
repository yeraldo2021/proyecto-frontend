function isLogin() {
  const user = window.localStorage.getItem("user");
  const content_user = document.getElementById("content_user");
  
  if (user) {
    content_user.innerHTML = `
      <a href='register.html' class='btn btn-warning ms-3'>Registrar</a>
      <button type='button' class='btn btn-outline-danger ms-3' onclick='handleLogout()'>Salir</button>
    `;
  } else {
    content_user.innerHTML = `
      <a href='./login.html'class='btn btn-outline-warning ms-3'>Login</a>
    `;
  }
}

export function captureId() {
  const response = window.localStorage.getItem("user");
  return JSON.parse(response);
}

window.addEventListener("load", () => {
  isLogin();
});
