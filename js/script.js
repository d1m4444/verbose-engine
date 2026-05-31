'use strict'
document.addEventListener("DOMContentLoaded", function() {
    console.log('Скрипт отработал корректно')
});
document.addEventListener('DOMContentLoaded', function() {
  // Получаем все модальные окна по ID
  const modals = {
    product: document.getElementById('productModal'),
    auth: document.getElementById('authModal'),
    cart: document.getElementById('cartModal')
  };

  // Получаем все кнопки закрытия (крестики)
  const closeButtons = document.querySelectorAll('.close');

  // Функция открытия модального окна по ID
  function openModal(modalId) {
    const modal = modals[modalId];
    if (modal) {
      modal.style.display = 'block';
    } else {
      console.error(`Модальное окно с ID "${modalId}" не найдено`);
    }
  }

  // Функция закрытия модального окна по ID
  function closeModal(modalId) {
    const modal = modals[modalId];
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Обработчик для кнопок закрытия (крестиков)
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Закрытие модального окна при клике вне его области
  window.addEventListener('click', function(event) {
    Object.values(modals).forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Обработчики для товаров — открытие модального окна с информацией о товаре
  document.querySelectorAll('.product-item a, .photo-item1 a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Находим изображение товара
      const productImage = this.querySelector('img');
      if (!productImage) {
        console.warn('Изображение товара не найдено');
        return;
      }

      // Получаем название и описание товара
      const productTitle = this.nextElementSibling?.querySelector('a')?.textContent || 'Товар';
      const productDescription = this.nextElementSibling?.nextElementSibling?.querySelector('a')?.textContent || 'Описание товара';

      // Заполняем данные в модальном окне
      document.getElementById('modalProductImage').src = productImage.src;
      document.getElementById('modalProductImage').alt = productImage.alt || 'Изображение товара';
      document.getElementById('modalProductTitle').textContent = productTitle;
      document.getElementById('modalProductDescription').textContent = productDescription;

      // Устанавливаем цену (в реальном проекте может браться из data‑атрибута)
      document.getElementById('modalProductPrice').textContent = '99$';

      // Открываем модальное окно товара
      openModal('product');
    });
  });

  // Обработчик для иконки пользователя (авторизация)
  const userIcon = document.querySelector('.user-icon');
  if (userIcon) {
    userIcon.addEventListener('click', function(e) {
      e.preventDefault();
      openModal('auth');
    });
  } else {
    console.warn('Элемент .user-icon не найден в DOM');
  }

  // Обработчик для иконки корзины
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      updateCart(); // Обновляем содержимое корзины перед открытием
      openModal('cart');
    });
  } else {
    console.warn('Элемент .cart-icon не найден в DOM');
  }

  // Обработчик для иконки избранного (сердечко)
  const heartIcon = document.querySelector('.heart-icon');
  if (heartIcon) {
    heartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Избранное пока не реализовано, но вы можете добавить товары в избранное!');
    });
  } else {
    console.warn('Элемент .heart-icon не найден в DOM');
  }

  // Обработчик формы авторизации
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const password = this.querySelector('input[type="password"]').value;

      // Здесь будет отправка данных на сервер
      console.log('Авторизация:', { email, password });
      closeModal('auth');
      alert(`Добро пожаловать, ${email}!`);
    });
  }

  // Переключение на регистрацию
  const switchToRegister = document.getElementById('switchToRegister');
  if (switchToRegister) {
    switchToRegister.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Функция регистрации пока в разработке!');
    });
  }

  // Функция обновления корзины
  function updateCart() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');

    // Пример данных корзины (в реальном проекте — из localStorage или API)
    const cartItems = [
      { name: 'V-Neck T-Shirt', price: 99, image: 'images/serrubashka.jpg' },
      { name: 'Cotton T Shirt', price: 79, image: 'images/belbaza.jpg' }
    ];

    cartItemsList.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
      total += item.price;
      cartItemsList.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <strong>${item.name}</strong>
            <span>${item.price}$</span>
          </div>
          <button class="remove-item" data-name="${item.name}">Удалить</button>
        </div>
      `;
    });

    cartTotal.textContent = `${total}$`;

    // Обработчики удаления товаров
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const itemName = this.getAttribute('data-name');
        alert(`Товар "${itemName}" удалён из корзины`);
        updateCart(); // Обновляем корзину после удаления
      });
    });
  }

  // Обработчик для кнопки «Добавить в корзину» в модальном окне товара
  const addToCartBtn = document.querySelector('.modal-add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const productName = document.getElementById('modalProductTitle').textContent;
      alert(`Товар "${productName}" добавлен в корзину!`);
      closeModal('product');
    });
  }

  // Дополнительная функция: закрытие модальных окон по клавише ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      Object.values(modals).forEach(modal => {
        if (modal) modal.style.display = 'none';
      });
    }
  });
});