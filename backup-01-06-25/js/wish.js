function getWishDetails() {

  let wishData = []

  localStorage.getItem("wish") && (wishData = JSON.parse(localStorage.getItem("wish")));

  let element = "";

  if (wishData.length === 0) {
    element = `<p c class="emptyMsg">Your wishlist is empty.</p>`;
  } else {

  wishData.forEach(product => {
    element += `
    <div class="col-lg-3 col-sm-6">
      <div class="proCell">
          <div class="cellHead d-flex justify-content-between">
            <div class="cellLeft">
                <span>Standerd primium</span>
                <h5>${product.name}</h5>
            </div>
            <div class="cellRight">
                <a href="javascript:void(0);" onclick="removeItem(${product.id})"><i class="fa-solid fa-trash"></i></a>
            </div>
          </div>
          <div class="proSec">
            <a href="javascript:void(0);">
            <img src="images/${product.image}" alt="${product.name}">
            </a>
          </div>
          <div class="priceTag">$${product.price.toFixed(2)}</div>
          <div class="globalBtn2">
          <a href="javascript:void(0);" onclick='addToCart(${JSON.stringify(product)}, 1)'>Add To Cart</a>
        </div>
      </div>
    </div>
    `;
  });
}
  $('#wishWrap').html(element);
}

getWishDetails();

function addToWish(product, quantity) {
  let wishData = [];
  localStorage.getItem("wish") && (wishData = JSON.parse(localStorage.getItem("wish")));

  let index = wishData.findIndex(item => item.id === product.id);

  if (index === -1) {
    product.quantity = quantity;
    wishData.push(product);
  } else {
    wishData[index].quantity += quantity;
  }

  localStorage.setItem("wish", JSON.stringify(wishData));

  getWishDetails();
}

////for removing item from wish list////

function removeItem(id) {
  let wishData = [];
  localStorage.getItem("wish") && (wishData = JSON.parse(localStorage.getItem("wish")));

  let index = wishData.findIndex(product => product.id === id);

  wishData.splice(index, 1); 
  localStorage.setItem("wish", JSON.stringify(wishData)); 

  getWishDetails();
}