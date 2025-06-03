function getCartDetails() {
  let cartData = []

  localStorage.getItem("cart") && (cartData = JSON.parse(localStorage.getItem("cart")));

  let element = "";

  let subTotal = 0;

  let shipping = 0;

  let tax = 0;

  let coupon = 0;

  if (cartData.length === 0) {
    element = `<p c class="emptyMsg">Your cart is empty.</p>`;
  } else {

  cartData.forEach(product => {
    element += `
    <div class="cartTable">
      <div class="cartRow">
        <div class="cartCell">
          <div class="proImgOut">
              <div class="proImg">
                <a href="javascript:void(0);" class="closeBtn" onclick="removeItem(${product.id})">
                    <i class="fa-solid fa-xmark"></i>
                </a>
                <img src="images/${product.image}" alt="${product.name}">
              </div>
              <h5>${product.name}</h5>
          </div>
        </div>
        <div class="cartCell">
          $${product.price.toFixed(2)}
        </div>
        <div class="cartCell">
          <div class="quantity">
            <button class="minus" aria-label="Decrease" onclick="updateCart(${product.id}, 'dec')">−</button>
            <input type="number" class="input-box" value="${product.quantity}" data-id="${product.id}" min="1" max="10">
            <button class="plus" aria-label="Increase" onclick="updateCart(${product.id}, 'inc')">+</button>
          </div>
        </div>
        <div class="cartCell">
          $${(product.quantity*product.price).toFixed(2)}
        </div>
      </div>
    </div>
    `;

      subTotal += (product.quantity * product.price);
    });
  }
  $('#cartWrap').html(element); 

  $('.subTotal').text(`$${subTotal.toFixed(2)}`);
}

getCartDetails();

function updateCart(id, action) {
  let cartData = []

  localStorage.getItem("cart") && (cartData = JSON.parse(localStorage.getItem("cart")));

  let index = cartData.findIndex(product => product.id === id);

  index = cartData.findIndex(product => product.id === id);
  if(index > -1) {
    switch (action) {
      case 'dec':
        if(cartData[index].quantity > 1) {
          cartData[index].quantity -= 1;
        }
        break;
  
      case 'inc':

        if(cartData[index].quantity >= 0) {
          cartData[index].quantity += 1;
        }
        break;
    
      default:
        break;
    
    }  

    localStorage.setItem("cart", JSON.stringify(cartData)); // Save updated cart to localStorage

    getCartDetails();
  }
}

function removeItem(id) {
  let cartData = [];
  localStorage.getItem("cart") && (cartData = JSON.parse(localStorage.getItem("cart")));

  let index = cartData.findIndex(product => product.id === id);

  cartData.splice(index, 1); 
  localStorage.setItem("cart", JSON.stringify(cartData)); // Save updated cart to localStorage

  getCartDetails();
}