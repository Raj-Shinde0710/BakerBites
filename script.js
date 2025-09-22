document.addEventListener('DOMContentLoaded', () => {

    // --- Shared Data and Functions ---
    const productsData = [
        { id: '1', name: 'Nankhatai', price: 50, image: 'images/nankhatai.jpg', desc: 'A classic Indian shortbread cookie, light and crumbly with a delicate cardamom flavor.', category: 'biscuits' },
        { id: '2', name: 'Jeera Biscuits', price: 45, image: 'images/jeera_biscuits.jpg', desc: 'Savory, buttery biscuits spiced with cumin seeds, perfect with a cup of chai.', category: 'biscuits' },
        { id: '3', name: 'Plum Cake', price: 95, image: 'images/plum_cake.jpg', desc: 'A dense, fruity cake rich with dried fruits and nuts, a festive favorite.', category: 'cakes' },
        { id: '4', name: 'Pav', price: 80, image: 'images/pav.jpg', desc: 'Soft, fluffy white bread rolls, a staple for vada pav and bhaji pav.', category: 'breads' },
        { id: '5', name: 'Veg Puff', price: 60, image: 'images/veg_puff.jpg', desc: 'A flaky pastry filled with a spiced vegetable mixture, a popular snack.', category: 'savories' },
        { id: '6', name: 'Garlic Bread', price: 120, image: 'images/garlic_bread.jpg', desc: 'Crispy bread with a rich, buttery garlic spread.', category: 'breads' },
        { id: '7', name: 'Black Forest Pastry', price: 150, image: 'images/black_forest_pastry.jpg', desc: 'A delicious layered pastry with chocolate, whipped cream, and cherries.', category: 'cakes' },
        { id: '8', name: 'Chocolate Truffle Cake', price: 110, image: 'images/chocolate_truffle_cake.jpg', desc: 'Rich, moist chocolate cake with a creamy truffle glaze.', category: 'cakes' },
        { id: '9', name: 'Chicken Puff', price: 70, image: 'images/chicken_puff.jpg', desc: 'A savory puff pastry filled with a spiced chicken mix.', category: 'savories' },
        { id: '10', name: 'Shrewsbury Biscuit', price: 40, image: 'images/shrewsbury_biscuit.jpg', desc: 'A famous butter-rich biscuit with a unique, crumbly texture.', category: 'biscuits' },
        { id: '11', name: 'Ladi Pav', price: 90, image: 'images/ladi_pav.jpg', desc: 'Soft, connected dinner rolls, perfect for various Indian dishes.', category: 'breads' },
        { id: '12', name: 'Pineapple Cake', price: 180, image: 'images/pineapple_cake.jpg', desc: 'Light and fluffy sponge cake with sweet pineapple chunks and cream.', category: 'cakes' },
        { id: '13', name: 'Chicken Patty', price: 65, image: 'images/chicken_patty.jpg', desc: 'A crispy, golden patty filled with savory spiced minced chicken.', category: 'savories' },
        { id: '14', name: 'Almond Croissant', price: 90, image: 'images/almond_croissant.jpg', desc: 'Flaky croissant filled and topped with a sweet almond paste.', category: 'pastries' },
        { id: '15', name: 'Masala Bread', price: 75, image: 'images/masala_bread.jpg', desc: 'Soft bread with a spicy masala flavor, a unique Indian twist.', category: 'breads' },
        { id: '16', name: 'Choco Lava Cake', price: 200, image: 'images/choco_lava_cake.jpg', desc: 'A rich chocolate cake with a molten chocolate center that oozes out.', category: 'cakes' }
    ];

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElement.innerText = totalCount;
        }
    };
    updateCartCount();

    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Home Page Functions ---
    if (document.body.id === 'home-page') {
        // Animated Counters on Scroll
        const counters = document.querySelectorAll('.counter');
        const statsSection = document.getElementById('stats');
        let hasAnimated = false;
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            let count = 0;
            const speed = 200;
            const updateCount = () => {
                if (count < target) {
                    count += Math.ceil(target / speed);
                    if (count > target) count = target;
                    counter.innerText = count;
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };
        const handleScroll = () => {
            if (!statsSection) return;
            const rect = statsSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0 && !hasAnimated) {
                counters.forEach(animateCounter);
                hasAnimated = true;
            }
        };
        window.addEventListener('scroll', handleScroll);

        // Modal Pop-up for Promotions
        const promoModal = document.getElementById('promo-modal');
        const closeModalBtn = document.querySelector('.close-button');
        setTimeout(() => {
            promoModal.style.visibility = 'visible';
            promoModal.style.opacity = '1';
        }, 3000);
        closeModalBtn.addEventListener('click', () => {
            promoModal.style.opacity = '0';
            setTimeout(() => {
                promoModal.style.visibility = 'hidden';
            }, 300);
        });
        window.addEventListener('click', (e) => {
            if (e.target === promoModal) {
                promoModal.style.opacity = '0';
                setTimeout(() => {
                    promoModal.style.visibility = 'hidden';
                }, 300);
            }
        });

        // Contact Form Validation
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            if (name && email && message) {
                alert('Thank you for your message! We will get back to you shortly.');
                contactForm.reset();
            } else {
                alert('Please fill out all the fields before submitting.');
            }
        });
    }

    // --- Products Page Functions ---
    if (document.body.id === 'products-page') {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const mainProductGrid = document.getElementById('main-product-grid');
        const searchBar = document.getElementById('product-search');
        const productsPage = document.getElementById('products');
        
        // Render All Products
        productsData.forEach(product => {
            const cardHTML = `
                <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3 class="product-name">${product.name}</h3>
                    <p>${product.desc}</p>
                    <div class="product-footer">
                        <span class="price">₹${product.price}</span>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            mainProductGrid.innerHTML += cardHTML;
        });

        // Recently Viewed
        const recentlyViewedGrid = document.getElementById('recently-viewed-grid');
        const renderRecentlyViewed = () => {
            const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
            if (recentlyViewed.length > 0) {
                recentlyViewedGrid.innerHTML = '';
                document.getElementById('recently-viewed-section').style.display = 'block';
                const uniqueViewed = [...new Set(recentlyViewed)].slice(0, 4);
                uniqueViewed.forEach(id => {
                    const product = productsData.find(p => p.id === id);
                    if (product) {
                        const cardHTML = `
                            <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-id="${product.id}">
                                <img src="${product.image}" alt="${product.name}" class="product-image">
                                <h3 class="product-name">${product.name}</h3>
                                <div class="product-footer">
                                    <span class="price">₹${product.price}</span>
                                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                                </div>
                            </div>
                        `;
                        recentlyViewedGrid.innerHTML += cardHTML;
                    }
                });
            } else {
                document.getElementById('recently-viewed-section').style.display = 'none';
            }
        };
        renderRecentlyViewed();

        // Product Filtering
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.getAttribute('data-category');
                const allProductCards = document.querySelectorAll('.product-card');
                allProductCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        // Product Search
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allProductCards = document.querySelectorAll('.product-card');
            allProductCards.forEach(card => {
                const productName = card.querySelector('.product-name').innerText.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });

        // Product Quick View Modal & Review System
        const quickViewModal = document.getElementById('quick-view-modal');
        const quickViewCloseBtn = document.querySelector('.quick-view-close');
        const quickViewImage = document.getElementById('quick-view-image');
        const quickViewName = document.getElementById('quick-view-name');
        const quickViewDesc = document.getElementById('quick-view-description');
        const quickViewPrice = document.getElementById('quick-view-price');
        const quickViewAddToCartBtn = document.getElementById('quick-view-add-to-cart');
        const starRating = document.querySelector('.star-rating');
        const reviewForm = document.getElementById('review-form');
        const reviewsList = document.getElementById('reviews-list');

        const saveRecentlyViewed = (id) => {
            let viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
            viewed = viewed.filter(item => item !== id);
            viewed.unshift(id);
            localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
        };
        
        const renderReviews = (productId) => {
            const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
            reviewsList.innerHTML = '';
            const productReviews = reviews[productId] || [];
            if (productReviews.length === 0) {
                reviewsList.innerHTML = '<p>No reviews yet. Be the first!</p>';
            } else {
                productReviews.forEach(review => {
                    const reviewItem = document.createElement('div');
                    reviewItem.classList.add('review-item');
                    reviewItem.innerHTML = `
                        <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                        <p>${review.text}</p>
                    `;
                    reviewsList.appendChild(reviewItem);
                });
            }
        };

        let currentRating = 0;
        starRating.addEventListener('click', (e) => {
            const rating = e.target.getAttribute('data-rating');
            if (rating) {
                currentRating = parseInt(rating, 10);
                document.querySelectorAll('.star-rating i').forEach(star => {
                    star.className = star.getAttribute('data-rating') <= currentRating ? 'fas fa-star' : 'far fa-star';
                });
            }
        });

        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewText = document.getElementById('review-text').value;
            const productId = starRating.getAttribute('data-product-id');

            if (currentRating === 0 || reviewText.trim() === '') {
                alert('Please provide both a rating and a review.');
                return;
            }

            let reviews = JSON.parse(localStorage.getItem('reviews')) || {};
            if (!reviews[productId]) {
                reviews[productId] = [];
            }
            reviews[productId].push({ rating: currentRating, text: reviewText });
            localStorage.setItem('reviews', JSON.stringify(reviews));

            reviewForm.reset();
            currentRating = 0;
            renderReviews(productId);
            alert('Review submitted successfully!');
        });
        
        productsPage.addEventListener('click', (e) => {
            const target = e.target;
            const productCard = target.closest('.product-card');

            if (productCard && target.classList.contains('product-image')) {
                const productId = productCard.getAttribute('data-id');
                const product = productsData.find(p => p.id === productId);

                quickViewImage.src = product.image;
                quickViewImage.alt = product.name;
                quickViewName.innerText = product.name;
                quickViewDesc.innerText = product.desc;
                quickViewPrice.innerText = `₹${product.price}`;
                quickViewAddToCartBtn.setAttribute('data-id', product.id);
                starRating.setAttribute('data-product-id', product.id);

                document.querySelectorAll('.star-rating i').forEach(star => star.className = 'far fa-star');
                renderReviews(productId);
                saveRecentlyViewed(productId);

                quickViewModal.style.visibility = 'visible';
                quickViewModal.style.opacity = '1';
            }
        });

        quickViewCloseBtn.addEventListener('click', () => {
            quickViewModal.style.opacity = '0';
            setTimeout(() => {
                quickViewModal.style.visibility = 'hidden';
            }, 300);
        });

        // Add to Cart Functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = e.target.getAttribute('data-id');
                const product = productsData.find(p => p.id === productId);

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                alert(`${product.name} added to cart!`);
                if (quickViewModal.style.visibility === 'visible') {
                    quickViewModal.style.opacity = '0';
                    setTimeout(() => {
                        quickViewModal.style.visibility = 'hidden';
                    }, 300);
                }
            }
        });
    }

    // --- Cart Page Functions ---
    if (document.body.id === 'cart-page') {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const clearCartBtn = document.getElementById('clear-cart-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        const renderCart = () => {
            cartItemsContainer.innerHTML = '';
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
            } else {
                cart.forEach(item => {
                    const cartItemEl = document.createElement('div');
                    cartItemEl.classList.add('cart-item');
                    cartItemEl.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>Price: ₹${item.price}</p>
                            <div class="quantity-control">
                                Quantity: <input type="number" class="cart-quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
                            </div>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItemEl);
                    total += item.price * item.quantity;
                });
            }
            cartTotalElement.innerText = `₹${total}`;
        };

        const updateItemQuantity = (id, quantity) => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        };

        const removeItem = (id) => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        };

        const clearCart = () => {
            localStorage.removeItem('cart');
            renderCart();
            updateCartCount();
        };
        
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item-btn')) {
                const id = e.target.getAttribute('data-id');
                removeItem(id);
            }
        });
        
        cartItemsContainer.addEventListener('input', (e) => {
            if (e.target.classList.contains('cart-quantity-input')) {
                const id = e.target.getAttribute('data-id');
                const quantity = parseInt(e.target.value, 10);
                if (!isNaN(quantity) && quantity >= 1) {
                    updateItemQuantity(id, quantity);
                }
            }
        });

        clearCartBtn.addEventListener('click', clearCart);
        checkoutBtn.addEventListener('click', () => {
            alert('Proceeding to checkout!');
        });
        renderCart();
    }
    
    // --- Dashboard Page Functions ---
    if (document.body.id === 'dashboard-page') {
        const totalSalesCount = document.getElementById('total-sales-count');
        const mostPopularItem = document.getElementById('most-popular-item');
        
        // Generate mock sales data if none exists
        if (!localStorage.getItem('sales')) {
            const mockSales = [];
            const numberOfSales = Math.floor(Math.random() * 50) + 50; // Between 50 and 100 sales
            for (let i = 0; i < numberOfSales; i++) {
                const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
                mockSales.push({
                    id: randomProduct.id,
                    date: new Date().toISOString()
                });
            }
            localStorage.setItem('sales', JSON.stringify(mockSales));
        }

        const renderDashboard = () => {
            const sales = JSON.parse(localStorage.getItem('sales')) || [];
            
            // Count sales per product
            const salesCount = sales.reduce((acc, sale) => {
                acc[sale.id] = (acc[sale.id] || 0) + 1;
                return acc;
            }, {});
            
            // Find the most popular item
            let maxSales = 0;
            let mostPopularId = null;
            for (const id in salesCount) {
                if (salesCount[id] > maxSales) {
                    maxSales = salesCount[id];
                    mostPopularId = id;
                }
            }

            const mostPopularProduct = productsData.find(p => p.id === mostPopularId);

            totalSalesCount.innerText = sales.length;
            mostPopularItem.innerText = mostPopularProduct ? `${mostPopularProduct.name} (${maxSales} sold)` : 'N/A';
        };

        // Example: Simulating a sale on "Add to Cart"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = e.target.getAttribute('data-id');
                let sales = JSON.parse(localStorage.getItem('sales')) || [];
                sales.push({ id: productId, date: new Date().toISOString() });
                localStorage.setItem('sales', JSON.stringify(sales));
            }
        });

        renderDashboard();
    }
});
