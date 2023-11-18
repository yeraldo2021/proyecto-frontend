// import { login } from "./login/login.js";
import { getProducts } from "./products/products.js";

// validateTemplateProduct();
getProducts();

const type_product = document.getElementById("type_product");

if (type_product) {
  type_product.addEventListener("change", () => {
    const value = type_product.value;
    const type = 1;
    getProducts(type, value);
  });
}

const input_product = document.getElementById("input_product");

if (input_product) {
  input_product.addEventListener("input", () => {
    const value = input_product.value;
    const type = 2;
    getProducts(type, value);
  });
}

const btn_plus = document.getElementById("btn_plus");

// if (btn_plus) {
//   btn_plus.addEventListener("click", (e) => {
//     e.preventDefault();
//     const modal_template = document.getElementById("modal_template");

//     modal_template.classList.add("show");

//     setTimeout(() => {
//       modal_template.classList.remove("show");
//       getProducts(3);
//     }, 1000);
//     setTimeout(() => {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: "smooth",
//       });
//     }, 1100);
//   });
// }

if (btn_plus) {
  btn_plus.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtener la posición actual del scroll
    const currentScrollPos = window.scrollY;

    const modal_template = document.getElementById("modal_template");

    modal_template.classList.add("show");

    setTimeout(() => {
      modal_template.classList.remove("show");
      getProducts(3);
    }, 1000);

    setTimeout(() => {
      window.scrollTo({
        top: currentScrollPos,
        behavior: "smooth",
      });
    }, 1100);
  });
}

const content_name = document.getElementById("content_name");

if (content_name) {
  const user = window.localStorage.getItem("user");
  const userToJson = JSON.parse(user);
  if (user) {
    content_name.innerHTML = `
    <span class="text-white fw-bold">Hola ${userToJson.username}!</span>
    `;
  }
}
