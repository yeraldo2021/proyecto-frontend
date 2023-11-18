import { apiGET } from "../settings/api.js";
import { captureId } from "../user/validate_user.js";

const id_product = window.localStorage.getItem("id_product");
const data_product = document.getElementById("data_product");

data_product.innerHTML = "loading...";

// detail.html
if (id_product) {
  const options = apiGET();
  fetch("http://localhost:8000/api/products/" + id_product, { options })
    .then((response) => response.json())
    .then((product) => {
      console.log(product);
      detailProduct(data_product, product);
    })
    .catch((err) => {
      alert(err);
    });
} else {
  fetch("../../templates/404_detail.html")
    .then((response) => response.text())
    .then((html) => {
      data_product.innerHTML = html;
    })
    .catch((err) => {
      alert(err);
    });
}

function detailProduct(template, product) {
  const response = captureId();

  let render = "";

  if (response && Number(product.user_id) === Number(response.id)) {
    // caso en que este logueado y sea suyo el producto
    render = `
    <div class='row'>
      <div class="col-4">
        <img width='300' src='${product.image}' alt="">
      </div>
      <div class="col-6 ms-3">
        <form id='form_edit' >
          <div class='form-group'>
            <label class='form-label'>Título</label>
            <input id='reg_title' class='form-control mb-2' value='${
              product.title
            }' />
          </div>
          <div class='form-group'>
            <label class='form-label'>Descripción</label>
            <input id="reg_description" class='form-control mb-2' value='${
              product.description
            }' />
          </div>
          <div class='form-group'>
            <label class='form-label'>Imagen</label>
            <input id="reg_image" class='form-control mb-2' value='${
              product.image
            }' />
          </div>
          <div class='form-group'>
            <label class='form-label'>Precio</label>
            <input id="reg_price" class='form-control mb-2' value='${
              product.price
            }' />
          </div>
  
          <div class='form-group'>
            <label class='form-label'>Tipo publicación</label>
            <select class='form-select mb-2' id="reg_type_v">
              <option value='COMPRA' ${
                product.type_publication === "COMPRA" ? "selected" : ""
              }>COMPRA</option>
              <option value='VENTA' ${
                product.type_publication === "VENTA" ? "selected" : ""
              }>VENTA</option>
            </select>
          </div>
  
          <div class='form-group'>
            <label class='form-label'>Tipo producto</label>
            <select class='form-select mb-2' id="reg_type_a">
             
            
            <option value='COCHES' ${
                product.type === "COCHES" ? "selected" : ""
              }>COCHES</option>
              <option value='MOTOS' ${
                product.type === "2" ? "selected" : ""
              }>MOTOS</option>
              <option value='MOTOR Y ACCESORIOS' ${
                product.type === "MOTOR Y ACCESORIOS" ? "selected" : ""
              }>MOTOR Y ACCESORIOS</option>
              <option value='MODA Y ACCESORIOS' ${
                product.type === "MODA Y ACCESORIOS" ? "selected" : ""
              }>MODA Y ACCESORIOS</option>

              <option value='INMOBILIARIA' ${
                product.type === "INMOBILIARIA" ? "selected" : ""
              }>INMOBILIARIA</option>
              <option value='TV, AUDIO Y FOTO' ${
                product.type === "TV, AUDIO Y FOTO" ? "selected" : ""
              }>TV, AUDIO Y FOTO</option>
              <option value='MOVILES Y TELEFONIA' ${
                product.type === "MOVILES Y TELEFONIA" ? "selected" : ""
              }>MOVILES Y TELEFONIA</option>
              <option value='INFORMATICA Y ELECTRONICA' ${
                product.type === "INFORMATICA Y ELECTRONICA" ? "selected" : ""
              }>INFORMATICA Y ELECTRONICA</option>
              <option value='DEPORTE Y OCIO' ${
                product.type === "DEPORTE Y OCIO" ? "selected" : ""
              }>DEPORTE Y OCIO</option>
              <option value='BICICLETAS' ${
                product.type === "BICICLETAS" ? "selected" : ""
              }>BICICLETAS</option>
              <option value='CONSOLAS Y VIDEOJUEGOS' ${
                product.type === "CONSOLAS Y VIDEOJUEGOS" ? "selected" : ""
              }>CONSOLAS Y VIDEOJUEGOS</option>
              <option value='HOGAR Y JARDIN' ${
                product.type === "HOGAR Y JARDIN" ? "selected" : ""
              }>HOGAR Y JARDIN</option>
              <option value='ELECTRODOMESTICOS' ${
                product.type === "ELECTRODOMESTICOS" ? "selected" : ""
              }>ELECTRODOMESTICOS</option>
              <option value='CINE, LIBROS Y MUSICA' ${
                product.type === "CINE, LIBROS Y MUSICA" ? "selected" : ""
              }>CINE, LIBROS Y MUSICA</option>
              <option value='NIÑOS Y BEBES' ${
                product.type === "NIÑOS Y BEBES" ? "selected" : ""
              }>NIÑOS Y BEBES</option>
              <option value='COLECCIONISMO' ${
                product.type === "COLECCIONISMO" ? "selected" : ""
              }>COLECCIONISMO</option>
              <option value='CONSTRUCCION Y REFORMAS' ${
                product.type === "CONSTRUCCION Y REFORMAS" ? "selected" : ""
              }>CONSTRUCCION Y REFORMAS</option>
              <option value='INDUSTRIA Y AGRICULTURA' ${
                product.type === "INDUSTRIA Y AGRICULTURA" ? "selected" : ""
              }>INDUSTRIA Y AGRICULTURA</option>
              <option value='EMPLEO' ${
                product.type === "EMPLEO" ? "selected" : ""
              }>EMPLEO</option>

            </select>
          </div>
          ${
            response
              ? `
          ${
            Number(product.user_id) === Number(response.id)
              ? `<button type="submit" class='btn btn-success mt-3 mb-2'>Guardar cambios</button>
              <button type='button' onclick="handleDeleteProduct(${product.id})" class="btn btn-danger mt-3 mb-2">Eliminar</button>`
              : ""
          }`
              : ""
          }
          
        </form>
  
      </div>
    </div>
    
  `;
  } else {
    // caso donde no esta loogueado o no sea suyo el producto
    render = `
    <div class='row'>
      <div class="col-4">
        <img width='300' src='${product.image}' alt="">
      </div>
      <div class="col-6 ms-3">
        <form id='form_edit' >
          <div class='form-group'>
         
            <h1>${product.title}</h1>
          </div>
          <div class='form-group '>
            <label class='form-label fw-bold'>Descripción</label>
            <p>${product.description}</p>
          </div>
          
          <div class='form-group'>
            <label class='form-label fw-bold'>Precio</label>
            <p>${product.price}.00 €</p>
          </div>
  
          <div class='form-group'>
            <label class='form-label fw-bold'>Tipo publicación</label>
            <p>${product.type_publication}</p>
          </div>
  
          <div class='form-group'>
            <label class='form-label fw-bold'>Tipo producto</label>
            <p>${product.type}</p>
          </div>
          ${
            response
              ? `
          ${
            Number(product.user_id) === Number(response.id)
              ? `<button type="submit" class='btn btn-success mt-3 mb-2'>Guardar cambios</button>
              <button type='button' onclick="handleDeleteProduct(${product.id})" class="btn btn-danger mt-3 mb-2">Eliminar</button>`
              : ""
          }`
              : ""
          }
          
        </form>
  
      </div>
    </div>
    
  `;
  }

  template.innerHTML = render;
}
