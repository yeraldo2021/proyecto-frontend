import { getProducts } from "../products/products.js";

export function validateTemplateProduct() {
  const id_product = window.localStorage.getItem("id_product");
  const mainContent = document.getElementById("main_content");

  console.log(id_product);

  if (id_product) {
    fetch("../../templates/detail.html")
      .then((response) => response.text())
      .then((html) => {
        mainContent.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error al cargar el archivo detail.html:", error);
      });
  } else {
    fetch("../../templates/products.html")
      .then((response) => response.text())
      .then((html) => {
        console.log(html);
        mainContent.innerHTML = html;
        getProducts();
      })
      .catch((error) => {
        console.error("Error al cargar el archivo products.html:", error);
      });
  }
}
