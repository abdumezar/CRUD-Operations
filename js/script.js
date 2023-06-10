var productName = document.getElementById("productNameInput");
var productPrice = document.getElementById("productPriceInput");
var productCategory = document.getElementById("productCategoryInput");
var productDesc = document.getElementById("productDescInput");
var productQuantity = document.getElementById("quantityInput");
var totalBalance = document.getElementById("totalBalance");
var addChangeBtn = document.getElementById("addChangeBtn");
var productSearchInput = document.getElementById("productSearchInput");
var products = [];
var globalIndex = 0;
var hiddenindex = 0;
if (localStorage.getItem("products") != null) {
  products = JSON.parse(localStorage.getItem("products"));
  Display();
}

function addProduct() {
  if (productName.value == "" || productPrice.value == "" || productCategory.value == "" || productDesc.value == "" || productQuantity == "") {
    alert("Please fill all fields");
    return;
  }
  if (addChangeBtn.innerHTML == "Add Product") {
    products.push({
        index: hiddenindex,
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
        quant: productQuantity.value,
        total: productPrice.value * productQuantity.value,
  });
  hiddenindex++;
  } else {
  products[globalIndex] = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
    quant: productQuantity.value,
    total: productPrice.value * productQuantity.value,
  };
    addChangeBtn.innerHTML = "Add Product";
  }
  Display();
  clearForm();
}

function Display() {
  if (products.length == 0) {
    document.getElementById("productsTable").innerHTML = '';
  }
  else {
    var productItem = "";
    for (var i = 0; i < products.length; i++) {
      productItem += `
      <tr>
        <td class="fw-bold">${i + 1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].category}</td>
        <td>${products[i].desc}</td>
        <td>${products[i].price}</td>
        <td>${products[i].quant}</td>
        <td>${products[i].total}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
      </tr>`;
      document.getElementById("productsTable").innerHTML = productItem;
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  updateTotalBalance();
}

function displayProduct(index){
    productItem += `
    <tr>
      <td class="fw-bold">${i + 1}</td>
      <td>${products[index].name}</td>
      <td>${products[index].category}</td>
      <td>${products[index].desc}</td>
      <td>${products[index].price}</td>
      <td>${products[index].quant}</td>
      <td>${products[index].total}</td>
      <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
    document.getElementById("productsTable").innerHTML = productItem;
}

function deleteAll() {
  products.splice(0, );
  Display();
}

function deleteProduct(index) {
  if (products.length == 1) {
    deleteAll();
  } else {
    products.splice(index, 1);
  }
  Display();
}

function updateProduct(index) {
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productCategory.value = products[index].category;
  productDesc.value = products[index].desc;
  productQuantity.value = products[index].quant;
  globalIndex = index;
  addChangeBtn.innerHTML = "Update Product";
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
  productQuantity.value = "";
}

function updateTotalBalance() {
  if (products.length == 0) {
    totalBalance.innerHTML = 0;
  } else {
    var myTotalBalance = 0;
    for (var i = 0; i < products.length; i++) {
      myTotalBalance = myTotalBalance + products[i].total;
    }
    totalBalance.innerHTML = myTotalBalance;
  }
}

function productSearch(word){
  for(var i=0; i<products.length; i++){
    if(products[i].name.toLowerCase().includes(word.toLowerCase())){
      console.log(products[i]);
    }
  }
}

