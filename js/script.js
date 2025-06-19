document.addEventListener('DOMContentLoaded', () => {
    // Фильтрация игр
    function filterGames(category) {
        const cards = document.querySelectorAll('.game-card');
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Обновляем активную ссылку в сайдбаре
        document.querySelectorAll('.sidebar ul a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    // Поиск игр
    function searchGames() {
        const input = document.getElementById('search-input').value.toLowerCase();
        const cards = document.querySelectorAll('.game-card');
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(input) || input === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Модальные окна
    const cards = document.querySelectorAll('.game-card');
    const selectTypeModal = document.getElementById('select-type-modal');
    const lotsModal = document.getElementById('lots-modal');
    const orderModal = document.getElementById('order-modal');
    const paymentModal = document.getElementById('payment-modal');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    const selectTypeTitle = document.getElementById('select-type-title');
    const lotsTitle = document.getElementById('lots-title');
    const lotsList = document.getElementById('lots-list');
    const orderTitle = document.getElementById('order-title');
    const orderDescription = document.getElementById('order-description');
    const orderPrice = document.getElementById('order-price');
    const orderSeller = document.getElementById('order-seller');
    const orderRating = document.getElementById('order-rating');
    const orderOptions = document.getElementById('order-options');

    const paymentDescription = document.getElementById('payment-description');
    const paymentPrice = document.getElementById('payment-price');
    const paymentSeller = document.getElementById('payment-seller');
    const paymentRating = document.getElementById('payment-rating');

    // Закрытие модальных окон
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('show');
            });
        });
    });

    window.addEventListener('click', (e) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.querySelector('h3').textContent;
            const seller = card.getAttribute('data-seller');
            const rating = card.getAttribute('data-rating');
            selectTypeTitle.textContent = `${game} (Продавец: ${seller}, Рейтинг: ${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))})`;
            selectTypeModal.classList.add('show');
        });
    });

    function showLotsModal(type) {
        const game = selectTypeTitle.textContent.split(' (')[0];
        selectTypeModal.classList.remove('show');
        lotsTitle.textContent = `${game} - ${type}`;
        lotsList.innerHTML = '';

        const lotsData = {
            'Star Wars: The Old Republic': {
                'accounts': [
                    { description: 'Аккаунт с 60 уровнем', price: '45 BYN', seller: 'SWTOR Shop', rating: '4.9' },
                    { description: 'Аккаунт с легендарными предметами', price: '75 BYN', seller: 'Galaxy Deals', rating: '4.7' }
                ],
                'keys': [
                    { description: 'Ключ для подписки на 30 дней', basePrice: '25 BYN', seller: 'KeyMaster', rating: '4.6' },
                    { description: 'Ключ для коллекционного издания', basePrice: '60 BYN', seller: 'GameKing', rating: '4.8' }
                ],
                'items': [
                    { description: '1,000,000 кредитов', price: '18 BYN', seller: 'ItemShop', rating: '4.7' },
                    { description: 'Редкий световой меч', price: '35 BYN', seller: 'ForceTrader', rating: '4.9' }
                ],
                'parody': [
                    { description: 'Картофельный световой меч', price: '150 BYN', seller: 'ParodyPal', rating: '5.0' }
                ]
            },
            'Genshin Impact': {
                'accounts': [
                    { description: 'Аккаунт с 5★ персонажем', price: '25 BYN', seller: 'GachaPro', rating: '4.4' },
                    { description: 'Аккаунт с 2× 5★ персонажами', price: '50 BYN', seller: 'GachaKing', rating: '4.8' }
                ],
                'keys': [
                    { description: 'Ключ активации', basePrice: '10 BYN', seller: 'KeyMaster', rating: '4.6' }
                ],
                'items': [
                    { description: '1000 примогемов', basePrice: '12 BYN', seller: 'ItemShop', rating: '4.7', currency: 'примогемы' }
                ],
                'parody': [
                    { description: 'Магический тостер удачи', price: '500 BYN', seller: 'ParodyPal', rating: '5.0' }
                ]
            },
            'World of Warcraft': {
                'accounts': [
                    { description: 'Аккаунт с 70 уровнем', price: '55 BYN', seller: 'WoW Experts', rating: '4.8' },
                    { description: 'Аккаунт с элитным снаряжением', price: '90 BYN', seller: 'Azeroth Trader', rating: '4.7' }
                ],
                'keys': [
                    { description: 'Ключ для Dragonflight', basePrice: '40 BYN', seller: 'KeyMaster', rating: '4.6' }
                ],
                'items': [
                    { description: '100,000 золота', basePrice: '15 BYN', seller: 'ItemShop', rating: '4.8', currency: 'золото' }
                ],
                'parody': [
                    { description: 'Картофельный дракон', price: '250 BYN', seller: 'ParodyPal', rating: '5.0' }
                ]
            },
            // Данные для других игр...
        };

        const lots = lotsData[game]?.[type] || [];
        if (lots.length === 0) {
            lotsList.innerHTML = '<p style="color: #adb5bd; text-align: center; padding: 20px;">Лоты отсутствуют. Попробуйте другой раздел!</p>';
        } else {
            lots.forEach(lot => {
                const lotItem = document.createElement('div');
                lotItem.className = 'lot-item';
                lotItem.innerHTML = `
                    <div class="lot-info">
                        <p class="lot-title">${lot.description}</p>
                        <p class="seller">Продавец: ${lot.seller}</p>
                        <p class="rating">${'★'.repeat(Math.floor(lot.rating))}${'☆'.repeat(5 - Math.floor(lot.rating))}</p>
                    </div>
                    <div class="lot-price">${lot.price || lot.basePrice}</div>
                    <button onclick='showOrderModal("${game}", "${type}", "${lot.description}", "${lot.price || lot.basePrice}", "${lot.seller}", "${lot.rating}", "${lot.currency || ''}")'>Купить</button>
                `;
                lotsList.appendChild(lotItem);
            });
        }

        lotsModal.classList.add('show');
    }

    function showOrderModal(game, type, description, price, seller, rating, currency) {
        lotsModal.classList.remove('show');
        orderTitle.textContent = `${game} - ${type}`;
        orderDescription.textContent = description;
        orderPrice.textContent = price;
        orderSeller.textContent = seller;
        orderRating.textContent = `${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}`;
        orderOptions.innerHTML = '';

        if (type === 'keys') {
            orderOptions.innerHTML = `
                <div class="order-options-row">
                    <div>
                        <label>Платформа</label>
                        <select id="platform-select">
                            <option value="PS5">PS5</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PC">PC</option>
                        </select>
                    </div>
                    <div>
                        <label>Количество</label>
                        <input type="number" id="quantity-input" min="1" value="1">
                    </div>
                </div>
            `;
        } else if (type === 'items' && currency) {
            orderOptions.innerHTML = `
                <div>
                    <label>Количество ${currency}</label>
                    <input type="number" id="quantity-input" min="1" value="1">
                </div>
            `;
        }

        orderModal.classList.add('show');

        document.getElementById('confirm-order').onclick = () => {
            let finalPrice = parseFloat(price.replace(' BYN', ''));
            let finalDescription = description;
            
            if (type === 'keys') {
                const platform = document.getElementById('platform-select').value;
                const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
                finalPrice *= quantity;
                finalDescription = `${quantity}x ${description} (${platform})`;
            } else if (type === 'items' && currency) {
                const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
                finalPrice *= quantity;
                finalDescription = `${quantity} ${currency} ${description}`;
            }
            
            paymentDescription.textContent = finalDescription;
            paymentPrice.textContent = `${finalPrice} BYN`;
            paymentSeller.textContent = seller;
            paymentRating.textContent = `${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}`;
            
            orderModal.classList.remove('show');
            paymentModal.classList.add('show');
        };
    }

    // Система аутентификации
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginSubmit = document.getElementById('login-submit');
    const registerSubmit = document.getElementById('register-submit');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    const username = document.getElementById('username');
    const userAvatar = document.getElementById('user-avatar');

    // Проверяем, авторизован ли пользователь
    function checkAuth() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            authButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            username.textContent = user.username;
            userAvatar.textContent = user.username.charAt(0).toUpperCase();
        }
    }

    // Регистрация
    registerSubmit.addEventListener('click', () => {
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        if (!username || !email || !password) {
            alert('Заполните все поля!');
            return;
        }
        
        if (password !== confirm) {
            alert('Пароли не совпадают!');
            return;
        }
        
        // Простое "хэширование" для демо
        const hashedPassword = btoa(password);
        
        const user = {
            username,
            email,
            password: hashedPassword
        };
        
        // Сохраняем пользователя
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Обновляем интерфейс
        checkAuth();
        registerModal.classList.remove('show');
        alert('Регистрация прошла успешно!');
    });

    // Вход
    loginSubmit.addEventListener('click', () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const hashedPassword = btoa(password);
        
        // В реальном приложении здесь была бы проверка с сервером
        if (username && password) {
            const user = {
                username,
                password: hashedPassword
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            checkAuth();
            loginModal.classList.remove('show');
            alert('Вы успешно вошли!');
        } else {
            alert('Заполните все поля!');
        }
    });

    // Выход
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
    });

    // Переключение между модалками
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('show');
        registerModal.classList.add('show');
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerModal.classList.remove('show');
        loginModal.classList.add('show');
    });

    // Обработчики кнопок
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('show');
    });

    registerBtn.addEventListener('click', () => {
        registerModal.classList.add('show');
    });

    // Обработчик для клавиши Enter в поиске
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchGames();
        }
    });

    // Выбор метода оплаты
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', () => {
            document.querySelectorAll('.payment-method').forEach(m => {
                m.classList.remove('active');
            });
            method.classList.add('active');
        });
    });

    // Форматирование номера карты
    document.querySelector('.card-input')?.addEventListener('input', function(e) {
        const value = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formattedValue += ' ';
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
    });

    // Обработка оплаты
    document.querySelector('.pay-btn')?.addEventListener('click', () => {
        alert('Покупка подтверждена! Спасибо за заказ!');
        paymentModal.classList.remove('show');
    });

    // Инициализация
    checkAuth();
});