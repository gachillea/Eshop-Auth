// Wishlist state
const wishlist = [];
let wishlistOpen = false;

// Toggle wishlist visibility
function toggleWishlist() {
    wishlistOpen = !wishlistOpen;
    const wishlistDropdown = document.querySelector('.wishlist-dropdown');
    if (wishlistOpen) {
        wishlistDropdown.classList.add('open');
      } else {
        wishlistDropdown.classList.remove('open');
      }
    updateWishlistUI();
}

// Add to wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || wishlist.some(item => item.id === productId)) return;
    if(cart.find(p => p.id === productId)) return;
    
    wishlist.push(product);
    updateWishlistUI();
    showNotification(`${product.name} added to wishlist`);
}

// Remove from wishlist
function removeFromWishlist(productId) {
    console.log("k")
    const index = wishlist.findIndex(item => item.id === productId);
    if (index !== -1) {
        const [removed] = wishlist.splice(index, 1);
        updateWishlistUI();
        showNotification(`${removed.name} removed from wishlist`);
    }
}

// Update wishlist UI
function updateWishlistUI() {
    const wishlistItems = document.querySelector('.wishlist-items');
    wishlistItems.innerHTML = ''; // Καθαρίστε τα παλιά προϊόντα

    wishlist.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');
        itemElement.innerHTML = `
            <img class="wishlistitem-img" src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-details">
                <h4>${item.name}</h4>
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="add-to-cart">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
                <button class="remove-from-wishlist">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>
            </div>
        `;
        wishlistItems.appendChild(itemElement);

        // Προσθέστε event listeners για τα κουμπιά
        const addToCartBtn = itemElement.querySelector('.add-to-cart');
        const removeFromWishlistBtn = itemElement.querySelector('.remove-from-wishlist');

        // Ελέγξτε αν τα κουμπιά υπάρχουν πριν προσθέσετε τα event listeners
        if (addToCartBtn) {
            console.log("nai")
            addToCartBtn.addEventListener('click', () => {
                console.log(`Add ${item.name} to cart`);
                addToCart(item.id);
            });
        }

        if (removeFromWishlistBtn) {
            console.log("nauo")
            removeFromWishlistBtn.addEventListener('click', () => {
                console.log(`Remove ${item.name} from wishlist`);
                removeFromWishlist(item.id);
            });
        }
    });
}


// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateWishlistUI);