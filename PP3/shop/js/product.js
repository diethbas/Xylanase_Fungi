class productItem {
    constructor() {
        this.id = 0;
        this.name = "";
        this.weight = "";
        this.price = 0;
        this.image = "";
    }
} 

class cartItem {
    constructor() {
        this.productId = 0;
        this.name = "";
        this.qty = 0;
        this.price = 0;
    }
}

class person {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.contact = "";
        this.deladdress = "";
        this.pos = {
            lat: 0,
            lng: 0
        }
    }
}

let productList = [];
let cart = [];
let cust = new person();

let productName =  (nameProduct, price) => {
    return "Your order is " + nameProduct + "at" + price;
}

// async function fetches data from JSON
let getProduct = async () => {
    let response = await fetch("https://diethbas.github.io/PP3/shop/products/shoproducts.json");
    let result = await response.json();
    return result;
}

// add product to cart
let addToCart = (id) => {
    const productSelected = productList.find((element) => element.id == id);
    const isInCart = cart.find((element) => +element.productId == productSelected.id);
    
    if (isInCart){
        console.log('in cart');
        cart.map((element) => {
            if (element.productId == productSelected.id) {
                element.qty += 1;
            }
        });
    }else {
        console.log('not in cart');
        let item = new cartItem();
        item.productId = productSelected.id;
        item.qty = 1;
        item.name = productSelected.name;
        item.price = productSelected.price;
        console.log(item);
        cart.push(item);
    }
    showModal();
}

// increment quantity in the cart
let incCartItem = (productId) => {
    var cartItem = cart.find((element) => element.productId == productId);
    if (cartItem) {
        cart.map((element) => {
            if (element.productId == productId){
                element.qty += 1;
            }
        });
    }
    showModal();
};

// decrementing the qty of product in the cart
let decCartItem = (productId) => {
    var cartItem = cart.find((element) => element.productId == productId);
    let movingToZero = false;
    let getIndex = -1;
    if (cartItem) {
        cart.map((element, index) => {
            if (element.productId == productId){
                if (element.qty == 1) {
                    movingToZero = true;
                    getIndex = index;
                } else {
                    element.qty -= 1;
                }
            }
        });
    }
    if (movingToZero) {
        if (confirm("Are you sure you want to remove this item?")) {
           cart.splice(getIndex, 1);
        }
    }
    showModal();
};

// modal
let showModal = () => {
    let cartCount = cart.length;
    let modalBody = document.getElementById("modalBody");
    let cartContent = '';
    let totalAmount = 0;
    cart.map((element) => {
        totalAmount += element.price * element.qty;
        cartContent += `
        <tr>
            <td class="w-50">
            ${element.name}
            </td>
            <td class="w-50 text-end">
            ${element.qty} x PHP ${parseFloat(element.price).toFixed(2)}
            <button onClick="incCartItem(${element.productId})">+</button>
            <button onClick="decCartItem(${element.productId})">-</button>
            </td>
        </tr>
        `;
    });


    let cartTableList = `
        <table class="table">
            <tbody>
                ${cartContent}
            </tbody>
        </table>
        `;
    let total = `
        <table class="table">
            <tbody>
            <tr>
                <td class="w-50 fw-bold">
                Total Price
                </td>
                <td class="w-50 fw-bold text-end">
                PHP ${parseFloat(totalAmount).toFixed(2)}
                </td>
            </tr>productItem
            </tbody>
        </table>
        `;
    modalBody.innerHTML = `
    <div>
            <h4>Order Qoutation:</h4>
            <h5>Item(${cartCount})</h5>
        </div>
        <div class="mdl-content"> 
            ${cartTableList}
        </div>
        <div class="mdl-line"></div>
        <div class="mdl-gtotal">
            ${total}
        </div>
    </div>
    `;
}

// card
let addCardProduct = () => {
    let shopList = document.getElementById("shopList");
    shopList.innerHTML += `
    <div class="card" data-id=${productItem.id}>
        <div class="card-img-c">
            <img src="${productItem.image}" class="card-img-top img-fluid" alt="...">
        </div>
        <div class="card-body">
        <p class="card-text text-center product-name">${productItem.name}</p>
        <p class="card-text text-center">${productItem.weight}</p>
        <p class="card-text text-center">PHP ${parseFloat(productItem.price).toFixed(2)}</p>
        <button class="addToCartbtn card-text text-center product-action" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" onClick='addToCart(${productItem.id})'>
            Add to Cart
        </button>
        </div>
    </div>
    `;
}

(async() => {
    let data = await getProduct();
    if (data.products){
        data.products.forEach(element => {
            let product = new productItem();
            product.id = element.id;
            product.name = element.name;
            product.image = element.image;
            product.weight = element.weight;
            product.price = element.price;
            productList.push(product);
            addCardProduct(product);
        });
    }
})();

// validate info for email
let validate = () => {
    if (!cust.firstName || cust.firstName == ''){
        alert('Please enter your first name');
        firstNameTxt.focus();
        return false;
    }
    if (!cust.lastName || cust.lastName == ''){
        alert('Please enter your last name');
        lastNameTxt.focus();
        return false;
    }
    if (!cust.contact || cust.contact == ''){
        alert('Please enter your contact number');
        contactTxt.focus();
        return false;
    }
    if (!cust.email || cust.email == ''){
        alert('Please enter your email address');
        emailTxt.focus();
        return false;
    }
    if (!cust.deladdress || cust.deladdress == ''){
        alert('Please enter your delivery address');
        return false;
    }
    return true;
}

// send email
let sendEmail = () => {
    if (!validate()){
        return;
    }
    const htmlContent = getEmailHtml(cart, cust);
    var templateParams = {
        body: htmlContent,
        cc_email: cust.email,
        subject: `${cust.firstName} ${cust.lastName} is asking for the quote`,
      };
      
    emailjs.send('service_hr5xfh5', 'template_ld0wkcx', templateParams).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your request has been successfully sent. Please wait for our call in 2-3 days');
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );


    var myModalEl = document.getElementById('filloutModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();

    cart = [];
    cust = new person();
    firstNameTxt.value = "";
    lastNameTxt.value = "";
    contactTxt.value = "";
    emailTxt.value = "";
}

let firstNameTxt = document.getElementById('txtfname');
let lastNameTxt = document.getElementById('txtlname');
let contactTxt = document.getElementById('txtcontact');
let emailTxt = document.getElementById('txtemail');

firstNameTxt.addEventListener('input', function(event) {
    cust.firstName = firstNameTxt.value;
});

lastNameTxt.addEventListener('input', function(event) {
    cust.lastName = lastNameTxt.value;
});

contactTxt.addEventListener('input', function(event) {
    cust.contact = contactTxt.value;
});

emailTxt.addEventListener('input', function(event) {
    cust.email = emailTxt.value;
});


