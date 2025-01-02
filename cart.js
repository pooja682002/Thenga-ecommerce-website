// JavaScript for managing the cart

// Helper function to format currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Function to render the cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    // Fetch cart items from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
        subtotalElement.textContent = formatCurrency(0);
        totalElement.textContent = formatCurrency(5);
        return;
    }

    let subtotal = 0;

    // Populate cart items
    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        subtotal += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" /></td>
            <td>${item.name}</td>
            <td>${formatCurrency(item.price)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
            </td>
            <td>${formatCurrency(total)}</td>
            <td>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update summary
    subtotalElement.textContent = formatCurrency(subtotal);
    totalElement.textContent = formatCurrency(subtotal + 5);
}

// Function to handle quantity changes
function handleQuantityChange(event) {
    const index = event.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(event.target.value, 10);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to handle item removal
function handleRemoveItem(event) {
    const index = event.target.dataset.index;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    document.getElementById('cart-items').addEventListener('change', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            handleQuantityChange(event);
        }
    });

    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            handleRemoveItem(event);
        }
    });
});
