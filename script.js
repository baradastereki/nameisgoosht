let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        category: 'Chicken',
        id: 'fresh-chicken-with-tomatoes',
        name: 'Fresh Chicken',
        price: 15,
        inCart: 0
    },
    {
        category: 'Beef',
        id: 'raw-rib-eye-steak-beef-marbled-meat-wooden-board-with-rosemary',
        name: 'Rib Eye Steak',
        price: 35,
        inCart: 0
    },
    {
        category: 'Seafood',
        id: 'raw-tuna-fillet-seafood',
        name: 'Tunna Fillet',
        price: 30,
        inCart: 0
    },
    {
        category: 'Beef',
        id: 'raw-beef-steak-with-bone-ossobuco',
        name: 'Beef Ossobuco',
        price: 40,
        inCart: 0
    }
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadcartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart-btn span').textContent = productNumbers;
    }
}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-btn span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-btn span').textContent = 1;
    }

    setItem(products);
}

function setItem(products) {
    let cartItems = localStorage.getItem('itemInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[products.id] == undefined) {
            cartItems = {
                ...cartItems,
                [products.id]: products
            }
        }
        cartItems[products.id].inCart += 1;
    } else {
        products.inCart = 1;

        cartItems = {
            [products.id]: products
        }
    }

    localStorage.setItem('itemInCart', JSON.stringify(cartItems));
}

function totalCost(products) {
    let itemCost = localStorage.getItem('totalCost');

    if (itemCost != null) {
        itemCost = parseInt(itemCost);
        localStorage.setItem('totalCost', itemCost + products.price);
    } else {
        localStorage.setItem('totalCost', products.price);
    }
}

function displayCart() {
    let itemCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('itemInCart');
    cartItems = JSON.parse(cartItems);
    let cartContainer = document.querySelector('.item-container');
    let cartTotal = document.querySelector('.item-total');

    if (cartItems && cartContainer) {
        cartContainer.innerHTML = '';
        Object.values(cartItems).map((products) => {
            let { id, category, name, price, inCart } = products;
            cartContainer.innerHTML += `
            <div id=product-id-${id} class="d-flex justify-content-start align-items-start mb-3">
            <img class="cart-img rounded-2" src="images/Best-Selling-Meat/${id}.jpg" alt=""
            height="130px" width="130px" style="object-fit: cover; object-position: 50%;">
        <div class="ms-3">
            <span class="text-grey cart-item-id">${category}</span>
            <p class="fs-5 my-auto cart-item-title">${name}</p>
            <span class="text-warning fs-5">$${inCart * price}.00</span>
            <div class="mt-4">
                <i class="fa-solid fa-circle-minus text-warning minus"></i>
                <span class="mx-2 item-qty">${inCart}</span>
                <i class="fa-solid fa-circle-plus text-warning plus"></i>
            </div>
        </div>
        <div class="align-self-center ms-auto">
            <a href="#" onclick="itemDel(${id})">
                <i class="fa-regular fa-trash-can text-warning"></i>
            </a>
            </div>
            `;
        });

        cartTotal.innerHTML += `
        <div class="d-flex justify-content-between align-items-center py-3 border-top border-warning del-element">
            <span class="fs-5">Subtotal</span>
            <span class="fs-5">$${itemCost}.00</span>
        </div>
        <div class="checkout del-element">
            <button class="btn btn-bg d-flex justify-content-between align-items-center" style="width: 100%; font-size: 18px !important; padding-inline: 12px !important;">Check Out
            <i class="fa-solid fa-cart-shopping"></i>
            </button>
        </div>
        `;
    };
};

onLoadcartNumbers();
displayCart();