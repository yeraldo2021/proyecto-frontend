import { apiGET, apiPOST } from "../settings/api.js";
import { captureId } from "../user/validate_user.js";

const options = apiGET();

export function getProducts(type, type_product) {
  console.log(type);
  const table_products = document.getElementById("table_products");
  table_products.innerHTML = `<div class="spinner-grow" role="status">
  <span class="visually-hidden"></span>
</div>`;
  if (type === 1) {
    fetch("http://localhost:8000/api/products", { options })
      .then((response) => response.json())
      .then((response) => {
        const filtered = response.filter(
          (product) => product.type === type_product
        );
        const products = concatProducts(filtered);
        tableProducts(table_products, products);
      })
      .catch((err) => {
        alert(err);
      });
  } else if (type === 2) {
    fetch("http://localhost:8000/api/products", { options })
      .then((response) => response.json())
      .then((response) => {
        const filtered = response.filter((product) => {
          return (
            product.title && product.title.includes(type_product) // Título contiene la letra en type_product
          );
        });
        const products = concatProducts(filtered);
        tableProducts(table_products, products);
      })
      .catch((err) => {
        alert(err);
      });
  } else if (type === 3) {
    fetch("http://localhost:8000/api/products", { options })
      .then((response) => response.json())
      .then((response) => {
        const products = concatProducts(response);
        tableProducts(table_products, products);
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    fetch("http://localhost:8000/api/products", { options })
      .then((response) => response.json())
      .then((response) => {
        const firstEightObjects = response.slice(0, 8);

        const products = concatProducts(firstEightObjects);
        tableProducts(table_products, products);
      })
      .catch((err) => {
        alert(err);
      });
  }
}

function concatProducts(response) {
  let products = "";
  if (response.length > 0) {
    response.map((item) => {
      products =
        products +
        `
      <div style='margin:2rem;position:relative' role='button' class='card col-md-3' onclick='handleDetail(${
        item.id
      })'>

        <img style='min-height:5rem;width:100%' class="card-img-top"  src='${
          item.image
        }' alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.description}</p>
          <h6>${item.price}.00 €</h6>
          <h6>${item.type ? item.type : "No valid"}</h6>
        </div>

        <div class='target_type'>${
          item.type_publication ? item.type_publication : "No valid"
        }</div>
      </div>
      `;
    });
  } else {
    products = "Not products";
  }

  return products;
}

function tableProducts(table_products, products) {
  table_products.innerHTML = `
  <div class='row'  >
      ${products}
  </div>
  `;
}

const form_register = document.getElementById("form_register");
if (form_register) {
  form_register.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("reg_title").value;
    const description = document.getElementById("reg_description").value;
    const image = document.getElementById("reg_image").value;
    const price = document.getElementById("reg_price").value;
    const type_v = document.getElementById("reg_type_v").value;
    const type_a = document.getElementById("reg_type_a").value;
    const dataLocal = captureId();

    const requestBody = {
      title,
      description,
      image,
      price,
      type_publication: type_v,
      type: type_a,
      user_id: dataLocal.id,
    };

    if (title === "" || price === "" || type_a === "" || type_v === "") {
      showModalError();
    } else {
      fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataLocal.token}`,
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          showModalSuccess();
        })
        .catch((err) => {
          showModalError();
        });
    }
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

function showModalSuccess() {
  const modalSuccess = document.getElementById("modalSuccess");
  const bsModal = new bootstrap.Modal(modalSuccess);

  bsModal.show();
  setTimeout(() => {
    bsModal.hide();

    window.location.assign("index.html");
  }, 3000);
}
