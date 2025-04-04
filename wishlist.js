// Wishlist state
const wishlist = [];
let wishlistOpen = false;

// Toggle wishlist visibility
function toggleWishlist() {
    console.log("sdg")
    wishlistOpen = !wishlistOpen;
    const wishlistDropdown = document.querySelector('.wishlist-dropdown');
    if (wishlistOpen) {
        wishlistDropdown.classList.add('open');
      } else {
        console.log("sdg")
        wishlistDropdown.classList.remove('open');
      }
    updateWishlistUI();
}

// Add to wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || wishlist.some(item => item.id === productId)) return;
    
    wishlist.push(product);
    updateWishlistUI();
    showNotification(`${product.name} added to wishlist`);
}

// Remove from wishlist
function removeFromWishlist(productId) {
    const index = wishlist.findIndex(item => item.id === productId);
    if (index !== -1) {
        const [removed] = wishlist.splice(index, 1);
        updateWishlistUI();
        showNotification(`${removed.name} removed from wishlist`);
    }
}

// Update wishlist UI
function updateWishlistUI() {
    const wishlistCount = document.querySelector('.Wishlist-count');
    const wishlistItems = document.querySelector('.wishlist-items');
    
    // Update counter
    wishlistCount.textContent = wishlist.length;
    wishlistCount.style.display = wishlist.length > 0 ? 'inline-block' : 'none';
    
    // Update items list
    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img class="wishlistitem-img" src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-details">
                <h4>${item.name}</h4>
                <span class="price">$${item.price.toFixed(2)}</span>
                <button onclick="removeFromWishlist(${item.id})">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
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