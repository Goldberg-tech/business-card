const tg = window.Telegram?.WebApp;

window.addEventListener("DOMContentLoaded", () => {
    if (tg) {
        tg.ready();
        try { tg.expand(); } catch(e) {}
        try { if (typeof tg.requestFullscreen === "function") tg.requestFullscreen(); } catch(e) {}
        try { if (typeof tg.disableVerticalSwipes === "function") tg.disableVerticalSwipes(); } catch(e) {}
        try { tg.setHeaderColor("#080c14"); } catch(e) {}
        try { tg.setBackgroundColor("#080c14"); } catch(e) {}
        if (tg.BackButton) tg.BackButton.hide();
        tg.onEvent("close", () => {
            document.getElementById("exitModal")?.classList.add("open");
        });
    }

    initApp();
});

function initApp() {
    // Кнопки сервисов (главная)
    document.querySelectorAll(".service-card").forEach(card => {
        card.addEventListener("click", () => {
            const page = card.dataset.page;
            navigate(page);
        });
    });

    // Кнопка Telegram
    document.getElementById("btnTelegram")?.addEventListener("click", () => {
        openTelegram();
    });

    // Все кнопки "заказать"
    document.querySelectorAll(".detail-card .btn-primary").forEach(btn => {
        btn.addEventListener("click", openTelegram);
    });

    // Модаль выхода
    document.getElementById("btnStay")?.addEventListener("click", () => {
        document.getElementById("exitModal").classList.remove("open");
    });

    document.getElementById("btnExit")?.addEventListener("click", () => {
        if (tg) tg.close();
        else window.close();
    });

    // Back button
    if (tg?.BackButton) {
        tg.BackButton.onClick(() => navigate("home"));
    }
}

function navigate(page) {
    // Скрыть все страницы
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    // Показать нужную
    const target = document.getElementById("page-" + page);
    if (target) {
        target.classList.add("active");
    }

    // Back button
    if (tg?.BackButton) {
        page !== "home" ? tg.BackButton.show() : tg.BackButton.hide();
    }

    // Скролл в начало
    window.scrollTo(0, 0);

    // Haptic
    haptic("selection");
}

function haptic(type = "light") {
    try {
        if (tg?.HapticFeedback) {
            if (type === "selection") tg.HapticFeedback.selectionChanged();
            else if (type === "success") tg.HapticFeedback.notificationOccurred("success");
            else if (type === "error") tg.HapticFeedback.notificationOccurred("error");
            else tg.HapticFeedback.impactOccurred(type);
        }
    } catch(e) {}
}

function openTelegram() {
    const url = "https://t.me/Goldberg_tech";
    if (tg) tg.openLink(url);
    else window.open(url, "_blank");
}
