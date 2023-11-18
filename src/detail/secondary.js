setTimeout(() => {
  const form_edit = document.getElementById("form_edit");

  console.log(form_edit);

  if (form_edit) {
    form_edit.addEventListener("submit", (e) => {
      e.preventDefault();
      const id_product = window.localStorage.getItem("id_product");
      const res = window.localStorage.getItem("user");
      const dataLocal = JSON.parse(res);

      const title = document.getElementById("reg_title").value;
      const description = document.getElementById("reg_description").value;
      const image = document.getElementById("reg_image").value;
      const price = document.getElementById("reg_price").value;
      const type_v = document.getElementById("reg_type_v").value;
      const type_a = document.getElementById("reg_type_a").value;

      const requestBody = {
        title,
        description,
        image,
        price,
        type_publication: type_v,
        type: type_a,
        user_id: dataLocal.id,
      };

      fetch("http://localhost:8000/api/products/" + id_product, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    });
  }
}, 1000);

const content_name = document.getElementById("content_name");

if (content_name) {
  console.log("hereee");
  const user = window.localStorage.getItem("user");
  const userToJson = JSON.parse(user);
  if (user) {
    content_name.innerHTML = `
    <span class="text-white fw-bold">Hola ${userToJson.username}!</span>
    `;
  }
}
