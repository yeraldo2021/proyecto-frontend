function handleLogout() {
  console.log("logout");
  window.localStorage.removeItem("user");
  location.assign("index.html");
}

const pathArray = window.location.pathname.split("/");
const lastSegment = pathArray.pop() || pathArray.pop();

if (lastSegment === "register.html") {
  const response = window.localStorage.getItem("user");

  if (!response) {
    window.location.assign("index.html");
  }
}
