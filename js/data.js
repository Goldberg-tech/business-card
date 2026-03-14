// ===== ДАННЫЕ ПРИЛОЖЕНИЯ =====

const SERVICES = {
    parser: {
        name: "Парсер Telegram",
        icon: "🔍",
        desc: "Сбор контактов и отправка рассылок",
        fullDesc: "Парсим участников из групп и каналов в CSV, отправляем сообщения с контролем лимитов.",
        features: [
            "Экспорт в CSV (id, username, first_name, phone)",
            "Защита от дублей через логирование",
            "Умные лимиты (45-90 сек между письмами)",
            "Автопаузы каждые 40 сообщений"
        ],
        pricing: [
            { label: "500 контактов", price: "299₽" },
            { label: "2000 контактов", price: "799₽" }
        ]
    },
    vpn: {
        name: "VPN Швеция",
        icon: "🔐",
        desc: "Защищённое соединение",
        fullDesc: "OpenVPN сервер в Стокгольме с надёжным шифрованием AES-256-GCM.",
        features: [
            "Локация: Стокгольм, Швеция",
            "Протокол: AES-256-GCM",
            "Поддержка на русском языке",
            "Триал 2 часа (бесплатно)"
        ],
        pricing: [
            { label: "1 месяц", price: "199₽" },
            { label: "1 год", price: "999₽" }
        ]
    },
    tma: {
        name: "Разработка TMA",
        icon: "⚡",
        desc: "Telegram Mini Apps",
        fullDesc: "Создаю боты, минимальные приложения и кастомные решения для Telegram.",
        features: [
            "Чистый HTML/CSS/JS (без фреймворков)",
            "Полная интеграция с Telegram API",
            "Адаптивный дизайн",
            "GitHub Pages + собственный сервер"
        ],
        pricing: [
            { label: "По запросу", price: "Индивидуально" }
        ]
    }
};

const CONTACTS = {
    telegram: "@Goldberg_tech",
    telegramUrl: "https://t.me/Goldberg_tech",
    github: "@Goldberg-tech",
    githubUrl: "https://github.com/Goldberg-tech",
    phone: "+77476512844"
};
