// DOM-Ready wrapper for native JS
document.addEventListener("DOMContentLoaded", function () {

  // === jQuery: Toggle Header Menus ===
  $(".menuClick").click(function () {
    $("body").toggleClass("showM");
  });
  $(".overlayBody").click(function () {
    $("body").removeClass("showM showBar");
  });
  $(".barClick").click(function () {
    $("body").toggleClass("showBar");
  });

  // === Slick Sliders ===
  if ($('.sliderInner').length) {
    $('.sliderInner').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  if ($('.slideMain').length && $('.slideThumb').length) {
    $('.slideMain').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.slideThumb'
    });

    $('.slideThumb').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.slideMain',
      dots: false,
      arrows: false,
      vertical: true,
      focusOnSelect: true
    });
  }

  // === AOS Init ===
  AOS.init({ once: true });

  // === Range Sliders ===
  function formatValue(value, type) {
    if (type === 'age') {
      return value < 24 ? `${value} Months` : `${Math.floor(value / 12)} Years`;
    } else if (type === 'price') {
      return value >= 100 ? `$${value} Above` : `$${value}`;
    }
    return value;
  }

  function setupSlider(slider) {
    const minRange = slider.querySelector('.min-range');
    const maxRange = slider.querySelector('.max-range');
    const minLabel = slider.querySelector('.min-label');
    const maxLabel = slider.querySelector('.max-label');
    const track = slider.querySelector('.track-fill');
    const type = slider.dataset.type || 'age';

    function updateTrack() {
      const min = parseInt(minRange.value);
      const max = parseInt(maxRange.value);
      const range = parseInt(minRange.max) - parseInt(minRange.min);

      const percentMin = ((min - minRange.min) / range) * 100;
      const percentMax = ((max - minRange.min) / range) * 100;

      track.style.left = percentMin + '%';
      track.style.width = (percentMax - percentMin) + '%';

      minLabel.textContent = formatValue(min, type);
      maxLabel.textContent = formatValue(max, type);
    }

    minRange.addEventListener('input', () => {
      if (+minRange.value > +maxRange.value) minRange.value = maxRange.value;
      updateTrack();
    });

    maxRange.addEventListener('input', () => {
      if (+maxRange.value < +minRange.value) maxRange.value = minRange.value;
      updateTrack();
    });

    updateTrack();
  }

  document.querySelectorAll('[data-slider]').forEach(setupSlider);

  // === Color Option Active Toggle ===
  document.querySelectorAll('.colorOp li').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.colorOp li').forEach(li => li.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // === Login and Signup Toggle ===
  $(".loginUp").click(function () {
    $(".loginBox").addClass("active");
    $(".signUp").hide();
  });

  $(".signUpB").click(function () {
    $(".loginBox").removeClass("active");
    $(".signUp").show();
  });

  // === Accordion ===
  $(".accordionWrp").on("click", ".heading", function () {
    $(this).toggleClass("active").next().slideToggle();
    $(".contents").not($(this).next()).slideUp(300);
    $(this).siblings().removeClass("active");
  });

  // === AJAX Fetch JSON ===

  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log("JSON Loaded Successfully");
      console.log(data);
      data.forEach(product => {
        console.log(`${product.name} - $${product.price} - $${product.type}`);
      });
    })
    .catch(error => {
      console.error("Failed to load JSON:", error);
    });

});


/////////////for shop page card

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    
    setProductList(data);
    setCategoryList(data);
    setColorList(data);
  })
  .catch(error => {
    console.error('Failed to load products:', error);
  });

  const setProductList = (data) => {
    let card = '';
    data.forEach(product => {
      card += `
      <div class="col-lg-4 col-sm-6">
      <div class="proCell">
        <div class="cellHead d-flex justify-content-between">
          <div class="cellLeft">
            <span>Standerd primium</span>
            <h5><a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>${product.name}</a></h5>
          </div>
          <div class="cellRight">
            <a href="javascript:void(0);" onclick='addToWish(${JSON.stringify(product)}, 1)'><i class="fa-regular fa-heart"></i></a>
          </div>
        </div>
        <div class="proSec">
          <a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>
            <img src="images/${product.image}" data-rjs="images/${product.image.replace('.', '@2x.')}" alt="${product.name}">
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
    $('#productList').html(card);
  }

  const setCategoryList = (data) => {
    let categoryList = `<li><a href="javascript:void(0);" onclick="filterByCategory('all')">All Products</a></li><li><a href="javascript:void(0);" onclick="filterByCategory('bestseller')">Best Sellers</a></li>`;
    const categories = [...new Set(data.map(product => product.category))];
    categories.forEach(category => {
      categoryList += `<li><a href="javascript:void(0);" onclick='filterByCategory("${category}")'>${category}</a></li>`;
    });
    $('#categoryList').html(categoryList);
  }

  const setColorList = (data) => {
    let colorList = '';
    const colors = [...new Set(data.map(product => product.color))];
    colors.forEach(color => {
      colorList += `<li><a href="javascript:void(0);" onclick='filterByColor("${color}")' style='background: ${color}'></a></li>`;
    });
    $('#colorList').html(colorList);
  }

function filterByColor(color) {
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const filteredProducts = data.filter(product => product.color === color);
    setProductList(filteredProducts);
    setCategoryList(filteredProducts); // Reset category list to include all categories
    setColorList(data); // Reset color list to include all colors
    document.querySelectorAll('.colorOp li').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.colorOp li').forEach(li => {
      if (li.querySelector('a') && li.querySelector('a').getAttribute('onclick')?.includes(`filterByColor("${color}")`)) {
        li.classList.add('active');
      }
    });
    if (filteredProducts.length === 0) {
      alert('No products found for this color.');
    }
  })
  .catch(error => {
    console.error('Failed to filter products by color:', error);
  });
}
function filterByCategory(category) {
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    let filteredProducts = [];
    if(category === "all") {
      filteredProducts = data; // Show all products
    } else if(category === "bestseller") {
      filteredProducts = data.filter(product => product.type === "Best_Seller"); // Filter by Best Sellers
    } else {
      filteredProducts = category === "All Products" ? data : data.filter(product => product.category === category);

    }
    setProductList(filteredProducts);
    setCategoryList(data); // Reset category list to include all categories
    setColorList(filteredProducts); // Update color list based on filtered products
    if (filteredProducts.length === 0) {
      alert('No products found for this category.');
    }
  }
  )
  .catch(error => {
    console.error('Failed to filter products:', error);
  });
}

filterByPrice = () => {
  const minPrice = parseFloat(document.getElementById('minPrice').value);
  const maxPrice = parseFloat(document.getElementById('maxPrice').value);

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const filteredProducts = data.filter(product => product.price >= minPrice && product.price <= maxPrice);
      setProductList(filteredProducts);
    })
    .catch(error => {
      console.error('Failed to filter products by price:', error);
    });
}
//////latest arival////////

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const latestArrivals = data.filter(product => product.type === "Latest_Arrivals");

    let card = '';

    latestArrivals.forEach(product => {
      card += `
      <div class="col-lg-3 col-sm-6">
          <div class="proCell">
            <div class="cellHead d-flex justify-content-between">
              <div class="cellLeft">
                <span>Standerd primium</span>
                <h5><a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>${product.name}</a></h5>
              </div>
              <div class="cellRight">
              <a href="javascript:void(0);" onclick='addToWish(${JSON.stringify(product)}, 1)'><i class="fa-regular fa-heart"></i></a></a>
              </div>
            </div>
            <div class="proSec">
              <a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>
              <img src="images/${product.image}" data-rjs="images/${product.image.replace('.', '@2x.')}" alt="${product.name}">
              </a>
            </div>
            <div class="priceTag">$${product.price.toFixed(2)}</div>
            <div class="globalBtn2">
              <a href="javascript:void(0);" onclick='addToCart(${JSON.stringify(product)}, 1)'>Add To Cart</a>
            </div>
          </div>
        </div>`;
    });

    $('#latest-arrivals').html(card);
  })
  .catch(error => {
    console.error("Failed to load JSON:", error);
  });

//////latest arival end////////

//////best seller////////

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const bestSeller = data.filter(product => product.type === "Best_Seller");

    let card = '';

    bestSeller.forEach(product => {
      card += `
      <div class="col-lg-3 col-sm-6">
          <div class="proCell">
            <div class="cellHead d-flex justify-content-between">
              <div class="cellLeft">
                <span>Standerd primium</span>
                <h5><a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>${product.name}</a></h5>
              </div>
              <div class="cellRight">
              <a href="javascript:void(0);" onclick='addToWish(${JSON.stringify(product)}, 1)'><i class="fa-regular fa-heart"></i></a></a>
              </div>
            </div>
            <div class="proSec">
              <a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>
              <img src="images/${product.image}" data-rjs="images/${product.image.replace('.', '@2x.')}" alt="${product.name}">
              </a>
            </div>
            <div class="priceTag">$${product.price.toFixed(2)}</div>
            <div class="globalBtn2">
              <a href="javascript:void(0);" onclick='addToCart(${JSON.stringify(product)}, 1)'>Add To Cart</a>
            </div>
          </div>
        </div>`;
    });

    $('#best_seller').html(card);
  })
  .catch(error => {
    console.error("Failed to load JSON:", error);
  });

//////best seller end////////

//////related product////////

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const relatedPro = data.filter(product => product.type === "Related_Product");

    let card = '';

    relatedPro.forEach(product => {
      card += `
      <div class="col-lg-3 col-sm-6">
          <div class="proCell">
            <div class="cellHead d-flex justify-content-between">
              <div class="cellLeft">
                <span>Standerd primium</span>
                <h5><a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>${product.name}</a></h5>
              </div>
              <div class="cellRight">
              <a href="javascript:void(0);" onclick='addToWish(${JSON.stringify(product)}, 1)'><i class="fa-regular fa-heart"></i></a>
              </div>
            </div>
            <div class="proSec">
              <a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>
              <img src="images/${product.image}" data-rjs="images/${product.image.replace('.', '@2x.')}" alt="${product.name}">
              </a>
            </div>
            <div class="priceTag">$${product.price.toFixed(2)}</div>
            <div class="globalBtn2">
              <a href="javascript:void(0);" onclick='addToCart(${JSON.stringify(product)}, 1)'>Add To Cart</a>
            </div>
          </div>
        </div>`;
    });

    $('#relate_product').html(card);
  })
  .catch(error => {
    console.error("Failed to load JSON:", error);
  });

//////related product end////////

//////special product////////

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const specialPro = data.filter(product => product.type === "Special_Product");

    let card = '';

    specialPro.forEach(product => {
      card += `
      <div class="col-sm-6" data-aos="fade-right" data-aos-duration="700">
        <div class="proCell whiteBg">
          <div class="cellHead d-flex justify-content-between">
            <div class="cellLeft">
              <span>Standerd primium</span>
              <h5><a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>${product.name}</a></h5>
            </div>
            <div class="cellRight">
            <a href="javascript:void(0);" onclick='addToWish(${JSON.stringify(product)}, 1)'><i class="fa-regular fa-heart"></i></a>
            </div>
          </div>
          <div class="proSec">
            <a href="javascript:void(0);" onclick='goToProductDetails(${JSON.stringify(product)})'>
            <img src="images/${product.image}" data-rjs="images/${product.image.replace('.', '@2x.')}" alt="${product.name}">
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

    $('#special_product').html(card);
  })
  .catch(error => {
    console.error("Failed to load JSON:", error);
  });

//////special product end////////

////add to cart////////

// Basic cart array
  let cart = [];

  function addToCart(product, qty) {
    let productData = product;
 
    localStorage.getItem("cart") && (cart = JSON.parse(localStorage.getItem("cart"))); // Load cart from localStorage
    
    // Find if product already in cart
      const existing = cart.find(item => item.id === productData.id);
      if (existing) {
        existing.quantity += qty;
      } else {
        const data={...productData, quantity: qty}
        cart.push(data);
      }
    console.log("Cart:", cart);
    alert("Product added to cart!");
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    updateCartCount();
  }

  

  // Basic wish array
  let wish = [];

  function addToWish(product, qty) {
    let productData = product;
  
    localStorage.getItem("wish") && (cart = JSON.parse(localStorage.getItem("wish"))); // Load cart from localStorage
    
    // Find if product already in cart
      const existing = wish.find(item => item.id === productData.id);
      if (existing) {
        existing.quantity += qty;
      } else {
        const data={...productData, quantity: qty}
        cart.push(data);
      }
    console.log("Wish:", wish);
    alert("Product added to wish!");
    localStorage.setItem("wish", JSON.stringify(cart)); // Save cart to localStorage
  }

  ///////

  function goToProductDetails(product) {
    // Redirect to product details page with product ID
    localStorage.setItem("singleProductDetails", JSON.stringify(product)); 
    window.location.href = `product-details.html`;
  }
  
 /////for cart count

 function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartValueEl = document.querySelector('.cartValue');
  if (cartValueEl) {
    cartValueEl.textContent = totalQuantity.toString().padStart(2, '0'); // e.g., "01", "02"
  }
}
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});

///////////contact form

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); 
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName || !lastName || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }
    const response = document.getElementById('formResponse');
    response.style.display = 'block';
    response.textContent = "Thank you! Your message has been submitted.";

    setTimeout(() => {
      response.style.display = 'none';
    }, 8000);

    this.reset();
  });
});

