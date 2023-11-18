function handleDetail(id) {
  window.localStorage.setItem("id_product", id);
  location.assign("detail.html");
}

function handleDeleteProduct(id) {
  const res = window.localStorage.getItem("user");
  const dataLocal = JSON.parse(res);
  fetch("http://localhost:8000/api/products/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${dataLocal.token}`,
    },
  })
    .then((response) => {
      window.location.assign("index.html");
    })
    .catch((err) => {
      alert(err);
    });
}
