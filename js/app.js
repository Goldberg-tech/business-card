// ===== ИНИЦИАЛИЗАЦИЯ TELEGRAM WEB APP =====
const tg = window.Telegram?.WebApp;

window.addEventListener("DOMContentLoaded", () => {
    if (tg) {
        tg.ready();  // ОБЯЗАТЕЛЬНО — сигнал что приложение загружено
        try {
            tg.expand();  // Полная высота
        } catch (e) {}
        try {
            if (typeof tg.requestFullscreen === "function") {
                tg.requestFullscreen();  // Fullscreen режим
            }
        } catch (e) {}
        try {
            if (typeof tg.disableVerticalSwipes === "function") {
                tg.disableVerticalSwipes();  // Отключаем свайп назад
            }
        } catch (e) {}

        // Скрываем кнопку "назад" на главной странице
        if (tg.BackButton) {
            tg.BackButton.hide();
        }

        // Модаль выхода при попытке закрыть
        tg.onEvent("close", () => {
            const exitModal = document.getElementById("exitModal");
            if (exitModal) {
                exitModal.classList.add("open");
            }
        });
    }

    // Инициализация приложения
    initApp();
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
function initApp() {
    setupEventListeners();
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
function setupEventListeners() {
    // Кнопки навигации
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach(card => {
        card.addEventListener("click", () => {
            const page = card.getAttribute("data-page");
            navigate(page);
        });
    });

    // Кнопка написать в Telegram (главная)
    document.getElementById("btnTelegram")?.addEventListener("click", () => {
        haptic("selection");
        openTelegram();
    });

    // Кнопки заказать на страницах деталей
    document.getElementById("btnServiceParser")?.addEventListener("click", () => {
        haptic("selection");
        openTelegram();
    });

    document.getElementById("btnServiceVPN")?.addEventListener("click", () => {
        haptic("selection");
        openTelegram();
    });

    document.getElementById("btnServiceTMA")?.addEventListener("click", () => {
        haptic("selection");
        openTelegram();
    });

    // Модаль выхода
    document.getElementById("btnStay")?.addEventListener("click", () => {
        document.getElementById("exitModal").classList.remove("open");
        haptic("selection");
    });

    document.getElementById("btnExit")?.addEventListener("click", () => {
        haptic("success");
        if (tg) {
            tg.close();
        } else {
            window.close();
        }
    });

    // Back button логика
    if (tg?.BackButton) {
        tg.BackButton.onClick(() => {
            navigate("home");
        });
    }
}

// ===== НАВИГАЦИЯ =====
function navigate(page) {
    // Скрыть все страницы
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    // Показать нужную страницу
    const targetPage = document.getElementById("page-" + page);
    if (targetPage) {
        targetPage.classList.add("active");
    }

    // Управление кнопкой "назад"
    if (tg?.BackButton) {
        if (page !== "home") {
            tg.BackButton.show();
        } else {
            tg.BackButton.hide();
        }
    }

    // Haptic feedback
    haptic("selection");

    // Прокрутить в начало
    window.scrollTo(0, 0);
}

// ===== HAPTIC FEEDBACK =====
function haptic(type = "light") {
    try {
        if (tg?.HapticFeedback) {
            if (type === "selection") {
                tg.HapticFeedback.selectionChanged();
            } else if (type === "success") {
                tg.HapticFeedback.notificationOccurred("success");
            } else if (type === "error") {
                tg.HapticFeedback.notificationOccurred("error");
            } else {
                tg.HapticFeedback.impactOccurred(type);
            }
        }
    } catch (e) {}
}

// ===== ОТКРЫТЬ TELEGRAM =====
function openTelegram() {
    const username = "Goldberg_tech";
    const url = `https://t.me/${username}`;

    if (tg) {
        tg.openLink(url);
    } else {
        window.open(url, "_blank");
    }
}
