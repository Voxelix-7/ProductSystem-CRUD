// Added extra breaks for readability..
let productName = document.getElementById("productName");
let productQuantity = document.getElementById("productQuantity");
let productPrice = document.getElementById("productPrice");

let message = document.getElementById("message");
let saveBtn = document.getElementById("saveBtn");
let productList = document.getElementById("productList");

let products = [];
let editIndex = null;
let savedProducts = localStorage.getItem("products");

let totalPrice = document.getElementById("totalPrice");

if(savedProducts !== null) {
 products = JSON.parse(savedProducts);
}

function save() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Calculates current products' total price if that's okay
function calculateTotal() {
  let total = 0;
  products.forEach(function(product) {
    total += Number(product.price * product.quantity);
  });
  totalPrice.textContent = total;
}

function displayProducts() {
  productList.innerHTML = "";
 
  products.forEach(function(product, index) {
    productList.innerHTML += `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Quantity: ${product.quantity}</p>
      <button class="Btn" onclick="editProduct(${index})">Edit</button>
      <button class="Btn" onclick="deleteProduct(${index})">Delete</button>
    </div>
    `;
  });
  
  calculateTotal();
 
}

saveBtn.addEventListener('click', function() {
   if(!productName.value || !productPrice.value || !productQuantity.value) {
     message.textContent = "Please enter product's full details";
     return;
 }
  
 let product = {
    name: productName.value,
    price: productPrice.value,
    quantity: productQuantity.value
  };
  if(editIndex === null){
    products.push(product);
    message.textContent = "Added product";
  } else {
    products[editIndex] = product;
    editIndex = null;
    saveBtn.textContent = "save product";
    message.textContent = "Product updated";
  }

  save();
  displayProducts();

  productName.value = "";
  productPrice.value = "";
  productQuantity.value = "";
  
});

function editProduct(index) {
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productQuantity.value = products[index].quantity;

  editIndex = index;
  saveBtn.textContent = "Update product";
}

function deleteProduct(index) {
  products.splice(index, 1);
  save();
  displayProducts();
  message.textContent = "Product deleted";
}

// StartUp
displayProducts();
