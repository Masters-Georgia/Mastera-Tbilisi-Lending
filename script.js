// ============================================
// ОПТИМИЗИРОВАННЫЙ SCRIPT.JS — MULTILINGUAL
// Языки: RU / KA / GE
// ============================================

// ============================================
// ГЛОБАЛЬНЫЕ ПЕРЕВОДЫ (все alert и тексты)
// ============================================

const i18n = {
    ru: {
        phoneInvalid:        'Пожалуйста, введите корректный грузинский номер телефона в формате: +995XXXXXXXXX (9 цифр после +995)',
        phoneOperator:       'Пожалуйста, введите корректный код оператора. Номер должен начинаться с +995 и далее 55, 56, 57, 58, 59, 51-54, 68, 70-79, 90-99',
        telegramInvalid:     'Пожалуйста, введите корректный Telegram username (например: @username) или номер телефона',
        contactRequired:     'Пожалуйста, заполните хотя бы один из контактов: Telegram или WhatsApp',
        submitError:         'Ошибка при отправке. Попробуйте ещё раз.',
        subdistrictRequired: 'Пожалуйста, выберите подрайон',
    },
    ka: {
        phoneInvalid:        'გთხოვთ, შეიყვანოთ სწორი ქართული ტელეფონის ნომერი ფორმატში: +995XXXXXXXXX (9 ციფრი +995-ის შემდეგ)',
        phoneOperator:       'გთხოვთ, შეიყვანოთ სწორი ოპერატორის კოდი. ნომერი უნდა იწყებოდეს +995-ით და შემდეგ 55, 56, 57, 58, 59, 51-54, 68, 70-79, 90-99',
        telegramInvalid:     'გთხოვთ, შეიყვანოთ სწორი Telegram მომხმარებლის სახელი (მაგ: @username) ან ტელეფონის ნომერი',
        contactRequired:     'გთხოვთ, შეავსოთ ერთ-ერთი საკონტაქტო ველი: Telegram ან WhatsApp',
        submitError:         'გაგზავნისას მოხდა შეცდომა. სცადეთ კიდევ ერთხელ.',
        subdistrictRequired: 'გთხოვთ, აირჩიოთ უბანი',
    },
    en: {
        phoneInvalid:        'Please enter a valid Georgian phone number in the format: +995XXXXXXXXX (9 digits after +995)',
        phoneOperator:       'Please enter a valid operator code. The number must start with +995 followed by 55, 56, 57, 58, 59, 51-54, 68, 70-79, 90-99',
        telegramInvalid:     'Please enter a valid Telegram username (e.g. @username) or phone number',
        contactRequired:     'Please fill in at least one contact field: Telegram or WhatsApp',
        submitError:         'An error occurred while submitting. Please try again.',
        subdistrictRequired: 'Please select a subdistrict',
    }
};

// Глобальная переменная текущего языка
// window.__FORCE_LANG__ устанавливается в языковых подстраницах (/ru/, /ge/, /en/)
let currentLang = window.__FORCE_LANG__ || 'ru';

// Вспомогательная функция — получить перевод
function t(key) {
    return (i18n[currentLang] || i18n.ru)[key] || i18n.ru[key] || key;
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initStatsAnimation();
    initScrollAnimation();
    initSmoothScroll();
    initButtonHoverEffects();
    initOnlineCounter();
    initLanguageSwitcher();
    initTypingEffect();
    initServiceTypingEffect();
    initModalForms();
    initScrollToTop();
    initClientLeadFormTracking();
    initDistrictCascade();
    initMasterLeadFormTracking();
    initWhatsAppButtonTracking();
    initFAQ();
});

// ============================================
// 1. АНИМАЦИЯ ЦИФР (УНИВЕРСАЛЬНАЯ)
// ============================================

function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const element = entry.target;
                const target = parseInt(element.dataset.target, 10);
                const suffix = element.dataset.suffix || '';
                const startVal = parseInt(element.dataset.start, 10) || 0;
                element.dataset.animated = 'true';
                animateCounter(element, target, 2500, suffix, startVal);
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        if (!stat.dataset.target) {
            const rawText = stat.textContent.trim();
            const match = rawText.match(/^(\d+)(.*)$/);
            if (match) {
                stat.dataset.target = match[1];
                stat.dataset.suffix = match[2];
            } else {
                return;
            }
        }
        stat.textContent = '0' + (stat.dataset.suffix || '');
        observer.observe(stat);
    });
}

function animateCounter(element, target, duration, suffix, start) {
    start = start || 0;
    const range = target - start;
    const isReverse = start > target;
    const startTime = performance.now();

    function ease(t) {
        return isReverse ? t : (1 - Math.pow(1 - t, 5));
    }

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = ease(progress);
        const current = Math.floor(start + easedProgress * range);
        element.textContent = current + suffix;
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(animate);
}

// ============================================
// 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
// ============================================

function initScrollAnimation() {
    const elementsToAnimate = document.querySelectorAll('.section-card');

    if (!window.IntersectionObserver) {
        elementsToAnimate.forEach(el => el.style.opacity = 1);
        return;
    }

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.scrollAnimated) {
                entry.target.dataset.scrollAnimated = 'true';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(card);
    });
}

// ============================================
// 3. ПЛАВНАЯ ПРОКРУТКА
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// 4. ЭФФЕКТЫ НАВЕДЕНИЯ НА КНОПКИ
// ============================================

function initButtonHoverEffects() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// 5. СЧЕТЧИК ОНЛАЙН МАСТЕРОВ
// ============================================

function initOnlineCounter() {
    const counterElement = document.querySelector('.online-count');
    if (!counterElement) return;

    const minCount = 3;
    const maxCount = 16;
    const baseVal = parseInt(counterElement.dataset.base, 10);
    const initialCount = !isNaN(baseVal) ? baseVal : Math.floor(Math.random() * 8) + 1;
    counterElement.textContent = initialCount;
    let currentCount = initialCount;

    function updateCounter() {
        const change = Math.floor(Math.random() * 7) - 3; // -3..+3
        let targetCount = Math.max(minCount, Math.min(maxCount, currentCount + change));
        counterElement.classList.add('updating');
        setTimeout(() => {
            counterElement.textContent = targetCount;
            counterElement.classList.remove('updating');
            currentCount = targetCount;
        }, 150);
    }

    function scheduleNextUpdate() {
        const delay = Math.random() * 8000 + 12000;
        setTimeout(() => {
            updateCounter();
            scheduleNextUpdate();
        }, delay);
    }

    setTimeout(scheduleNextUpdate, 5000);
}

// ============================================
// 6. FAQ АККОРДЕОН
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
}

// ============================================
// 7. ПЕРЕКЛЮЧЕНИЕ ЯЗЫКОВ
// ============================================

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    // На языковых подстраницах (/ru/, /ge/, /en/) язык задан принудительно
    if (window.__FORCE_LANG__) {
        setLanguage(window.__FORCE_LANG__);
        return;
    }

    const browserLang = navigator.language || navigator.userLanguage;

    let defaultLang = 'ru';
    if (browserLang.startsWith('ka')) defaultLang = 'ka';
    else if (browserLang.startsWith('en')) defaultLang = 'en';

    const savedLang = localStorage.getItem('language') || defaultLang;
    setLanguage(savedLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
}

function setLanguage(lang) {
    // Обновляем глобальную переменную
    currentLang = lang;

    // Активная кнопка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // HTML lang атрибут
    document.documentElement.lang = lang;

    // Переводим все элементы с data-атрибутами
    document.querySelectorAll('[data-ru], [data-ka], [data-en]').forEach(element => {
        if (element.classList.contains('hero-title')) {
            const cursor = element.querySelector('.typing-cursor');
            if (cursor) cursor.remove();
            const text = element.dataset[lang];
            if (text) element.textContent = text;
            return;
        }

        const text = element.dataset[lang];
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else if (element.hasAttribute('content')) {
                element.setAttribute('content', text);
            } else {
                element.textContent = text;
            }
        }
    });

    // Placeholders через отдельные атрибуты
    document.querySelectorAll('[data-ru-placeholder], [data-ka-placeholder], [data-en-placeholder]').forEach(element => {
        const placeholder = element.dataset[lang + 'Placeholder'];
        if (placeholder) element.placeholder = placeholder;
    });

    // Title страницы
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.dataset[lang]) {
        titleElement.textContent = titleElement.dataset[lang];
    }

    // Суффиксы счётчиков статистики
    document.querySelectorAll('.stat-number[data-suffix-ru], .stat-number[data-suffix-ka], .stat-number[data-suffix-en]').forEach(element => {
        const suffixKey = lang === 'en' ? 'suffixEn' : lang === 'ka' ? 'suffixKa' : 'suffixRu';
        const newSuffix = element.dataset[suffixKey];
        if (newSuffix) {
            element.dataset.suffix = newSuffix;
            if (element.dataset.animated === 'true') {
                const target = parseInt(element.dataset.target, 10);
                element.textContent = target + newSuffix;
            } else {
                element.textContent = '0' + newSuffix;
            }
        }
    });

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && metaDesc.dataset[lang]) {
        metaDesc.setAttribute('content', metaDesc.dataset[lang]);
    }

    // title-атрибуты на полях ввода (браузерные подсказки при нативной валидации)
    document.querySelectorAll('input[type="tel"][pattern]').forEach(el => {
        el.title = t('phoneInvalid');
    });
    document.querySelectorAll('input[name="telegram"][pattern]').forEach(el => {
        el.title = t('telegramInvalid');
    });
}

// ============================================
// 8. МОДАЛЬНЫЕ ОКНА
// ============================================

function initModalForms() {
    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeClientLeadForm();
            closeMasterLeadForm();
            closeThankYou();
            closeMasterThankYou();
        }
    });

    initPhoneFormatting();
}

// Форматирование телефонных номеров
function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('#leadPhone, #masterLeadPhone');

    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (!value.startsWith('995') && value.length > 0) {
                value = '995' + value;
            }
            if (value.length > 12) value = value.substring(0, 12);
            e.target.value = value.length > 0 ? '+' + value : '';
        });

        input.addEventListener('focus', (e) => {
            if (e.target.value === '') e.target.value = '+995';
        });

        input.addEventListener('blur', (e) => {
            if (e.target.value === '+995') e.target.value = '';
        });
    });
}

// ============================================
// 9. ВАЛИДАЦИЯ — ОБЩИЕ ФУНКЦИИ
// ============================================

const VALID_OPERATOR_CODES = ['55','56','57','58','59','51','52','53','54','68','70','71','72','74','75','77','79','90','91','92','93','94','95','96','97','98','99'];
const PHONE_PATTERN    = /^\+995[0-9]{9}$/;
const TELEGRAM_PATTERN = /^(@[a-zA-Z0-9_]{5,32}|[0-9]{9,15})$/;

function validatePhone(phoneInput) {
    if (!phoneInput) return true;
    const val = phoneInput.value;

    if (!PHONE_PATTERN.test(val)) {
        alert(t('phoneInvalid'));
        phoneInput.focus();
        return false;
    }

    const code = val.substring(4, 6);
    if (!VALID_OPERATOR_CODES.includes(code)) {
        alert(t('phoneOperator'));
        phoneInput.focus();
        return false;
    }

    return true;
}

function validateTelegram(telegramInput) {
    if (!telegramInput) return true;
    const val = telegramInput.value.trim();
    if (!val) return true; // необязательное поле — проверяем только если заполнено

    if (!TELEGRAM_PATTERN.test(val)) {
        alert(t('telegramInvalid'));
        telegramInput.focus();
        return false;
    }
    return true;
}

// Валидация стандартных форм (clientForm / masterForm)
function validateForm(e) {
    const form = e.target;
    const phoneInput    = form.querySelector('input[type="tel"]');
    const telegramInput = form.querySelector('input[name="telegram"]');

    if (!validatePhone(phoneInput)) { e.preventDefault(); return false; }
    if (!validateTelegram(telegramInput)) { e.preventDefault(); return false; }

    return true;
}

// ============================================
// 10. ЛИД-ФОРМА КЛИЕНТА
// ============================================

// Адрес эндпоинта бота для приёма заявок с сайта (напрямую, без секрета).
// Защита от спама на стороне бота: проверка домена-источника + honeypot.
const BOT_REQUEST_URL = 'https://mastera-tbilisi-mastera-tbilisi.up.railway.app/site/new-request';

// Район на сайте выбирается слугами (Vake, Saburtalo...), а бот ждёт названия по-русски.
const BOT_DISTRICT_MAP = {
    Vake: 'Ваке', Saburtalo: 'Сабуртало', Mtatsminda: 'Мтацминда', Didube: 'Дидубе',
    Isani: 'Исани', Gldani: 'Глдани', Nadzaladevi: 'Надзаладеви', Chugureti: 'Чугурети',
    Krtsanisi: 'Крцаниси', Samgori: 'Самгори', Other: 'Другой'
};

// Отправка клиентской заявки в Telegram-бота через прокси.
// Не блокирует пользователя и не зависит от ответа — заявка в любом случае уйдёт на email.
function sendLeadToBot(formData) {
    try {
        const get = (k) => (formData.get(k) || '').toString().trim();

        const phone    = get('phone');
        const telegram = get('telegram');
        const whatsapp = get('whatsapp');
        const name     = get('name');

        // Контакты — откроются мастеру ТОЛЬКО после взятия заявки и списания.
        const contactParts = [];
        if (phone)    contactParts.push(phone);
        if (telegram) contactParts.push('Telegram: ' + telegram);
        if (whatsapp) contactParts.push('WhatsApp: ' + whatsapp);

        // Что видят мастера СРАЗУ (в превью, до взятия): имя + задача, без контактов.
        const descParts = [];
        if (name) descParts.push('Имя: ' + name);
        descParts.push('Задача: ' + (get('message') || '—'));

        const payload = {
            district:    BOT_DISTRICT_MAP[get('district')] || get('district') || 'Другой',
            subdistrict: get('subdistrict') || 'Не указан', // подрайон из формы (каскад)
            category:    get('service') || 'Другое',
            description: descParts.join('\n'),              // имя + задача → видно в превью
            address:     'Не указан',                       // в форме нет адреса
            contact:     contactParts.join(', ') || 'Нет контакта', // скрыто до оплаты
            honeypot:    get('_gotcha')                     // антиспам: люди это поле не заполняют
        };

        fetch(BOT_REQUEST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true
        }).catch(() => {}); // молча игнорируем — на email заявка всё равно уходит
    } catch (e) {
        console.error('sendLeadToBot error:', e);
    }
}

// ============================================
// 10.1 КАСКАД: РАЙОН → ПОДРАЙОН (данные из бота, config.yaml)
// ============================================

// Недостающие на сайте районы бота (slug -> подпись по языкам). Добавляются в <select> скриптом.
const DISTRICT_LABELS = {
    Mtatsminda: { ru: 'Мтацминда', en: 'Mtatsminda', ka: 'მთაწმინდა' },
    Krtsanisi:  { ru: 'Крцаниси',  en: 'Krtsanisi',  ka: 'კრწანისი' }
};

// Подрайоны по районам. Ключ = value района (slug). v = русское название (его ждёт бот).
const SUBDISTRICTS = {
    Saburtalo: [
        { v: 'Верхний Сабуртало', ru: 'Верхний Сабуртало', en: 'Upper Saburtalo', ka: 'ზემო საბურთალო' },
        { v: 'Нижний Сабуртало',  ru: 'Нижний Сабуртало',  en: 'Lower Saburtalo', ka: 'ქვემო საბურთალო' },
        { v: 'Политехнический',    ru: 'Политехнический',    en: 'Polytechnical',  ka: 'პოლიტექნიკური' },
        { v: 'Делиси',             ru: 'Делиси',             en: 'Delisi',         ka: 'დელისი' }
    ],
    Vake: [
        { v: 'Верхний Ваке',    ru: 'Верхний Ваке',    en: 'Upper Vake',   ka: 'ზემო ვაკე' },
        { v: 'Нижний Ваке',     ru: 'Нижний Ваке',     en: 'Lower Vake',   ka: 'ქვემო ვაკე' },
        { v: 'Мухатгверди',     ru: 'Мухатгверди',     en: 'Mukhatgverdi', ka: 'მუხათგვერდი' },
        { v: 'Черепашье озеро', ru: 'Черепашье озеро', en: 'Turtle Lake',  ka: 'კუს ტბა' }
    ],
    Mtatsminda: [
        { v: 'Центр',          ru: 'Центр',          en: 'Center',          ka: 'ცენტრი' },
        { v: 'Вера',           ru: 'Вера',           en: 'Vera',            ka: 'ვერა' },
        { v: 'Сололаки',       ru: 'Сололаки',       en: 'Sololaki',        ka: 'სოლოლაკი' },
        { v: 'Гора Мтацминда', ru: 'Гора Мтацминда', en: 'Mtatsminda Hill', ka: 'მთაწმინდა' }
    ],
    Didube: [
        { v: 'Дидубе-Чугурети', ru: 'Дидубе-Чугурети', en: 'Didube-Chugureti', ka: 'დიდუბე-ჩუღურეთი' },
        { v: 'Автовокзал',      ru: 'Автовокзал',      en: 'Bus Station',      ka: 'ავტოსადგური' },
        { v: 'Дигоми',          ru: 'Дигоми',          en: 'Digomi',           ka: 'დიღომი' },
        { v: 'Лило',            ru: 'Лило',            en: 'Lilo',             ka: 'ლილო' }
    ],
    Isani: [
        { v: 'Исани',    ru: 'Исани',    en: 'Isani',     ka: 'ისანი' },
        { v: 'Самгори',  ru: 'Самгори',  en: 'Samgori',   ka: 'სამგორი' },
        { v: 'Навтлуги', ru: 'Навтлуги', en: 'Navtlugi',  ka: 'ნავთლუღი' },
        { v: 'Ортачала', ru: 'Ортачала', en: 'Ortachala', ka: 'ორთაჭალა' }
    ],
    Gldani: [
        { v: 'Глдани',   ru: 'Глдани',   en: 'Gldani',    ka: 'გლდანი' },
        { v: 'Темка',    ru: 'Темка',    en: 'Temka',     ka: 'თემქა' },
        { v: 'Муштаиди', ru: 'Муштаиди', en: 'Mushtaidi', ka: 'მუშტაიდი' },
        { v: 'Ахметели', ru: 'Ахметели', en: 'Akhmeteli', ka: 'ახმეტელი' }
    ],
    Nadzaladevi: [
        { v: 'Надзаладеви',  ru: 'Надзаладеви',  en: 'Nadzaladevi',     ka: 'ნაძალადევი' },
        { v: 'Вокзал',       ru: 'Вокзал',       en: 'Railway Station', ka: 'სადგური' },
        { v: 'Дидубе Рынок', ru: 'Дидубе Рынок', en: 'Didube Market',   ka: 'დიდუბის ბაზარი' },
        { v: 'Церетели',     ru: 'Церетели',     en: 'Tsereteli',       ka: 'წერეთელი' }
    ],
    Chugureti: [
        { v: 'Чугурети', ru: 'Чугурети', en: 'Chugureti', ka: 'ჩუღურეთი' },
        { v: 'Грмагеле', ru: 'Грмагеле', en: 'Grmaghele', ka: 'გრმაღელე' },
        { v: 'Авлабари', ru: 'Авлабари', en: 'Avlabari',  ka: 'ავლაბარი' },
        { v: 'Метехи',   ru: 'Метехи',   en: 'Metekhi',   ka: 'მეტეხი' }
    ],
    Krtsanisi: [
        { v: 'Крцаниси',  ru: 'Крцаниси',  en: 'Krtsanisi', ka: 'კრწანისი' },
        { v: 'Понтичала', ru: 'Понтичала', en: 'Ponichala', ka: 'ფონიჭალა' },
        { v: 'Лочини',    ru: 'Лочини',    en: 'Lochini',   ka: 'ლოჭინი' },
        { v: 'Аэропорт',  ru: 'Аэропорт',  en: 'Airport',   ka: 'აეროპორტი' }
    ],
    Samgori: [
        { v: 'Самгори',   ru: 'Самгори',   en: 'Samgori',   ka: 'სამგორი' },
        { v: 'Восток',    ru: 'Восток',    en: 'Vostok',    ka: 'ვოსტოკი' },
        { v: 'Варкетили', ru: 'Варкетили', en: 'Varketili', ka: 'ვარკეთილი' },
        { v: 'Лило',      ru: 'Лило',      en: 'Lilo',      ka: 'ლილო' }
    ]
};

// Подписи-плейсхолдеры для select подрайона
const SUBDISTRICT_UI = {
    first:  { ru: 'Выберите подрайон', en: 'Select subdistrict', ka: 'აირჩიეთ უბანი' },
    choose: { ru: 'Выберите подрайон',      en: 'Select subdistrict',    ka: 'აირჩიეთ უბანი' }
};

// Строит зависимый список «Подрайон» под «Районом» в клиентской форме (на всех 12 страницах).
function initDistrictCascade() {
    const form = document.getElementById('clientLeadForm');
    if (!form) return;
    const districtSel = form.querySelector('select[name="district"]');
    if (!districtSel) return;

    const lang = ['ru', 'en', 'ka'].includes(currentLang) ? currentLang : 'ru';

    // 1. Дозаполняем недостающие районы бота (Мтацминда, Крцаниси) — перед «Other», если он есть
    Object.keys(DISTRICT_LABELS).forEach(function (slug) {
        if (districtSel.querySelector('option[value="' + slug + '"]')) return;
        const opt = document.createElement('option');
        opt.value = slug;
        opt.textContent = DISTRICT_LABELS[slug][lang] || DISTRICT_LABELS[slug].ru;
        const other = districtSel.querySelector('option[value="Other"]');
        if (other) districtSel.insertBefore(opt, other);
        else districtSel.appendChild(opt);
    });

    // 2. Создаём select подрайона сразу после района (если ещё нет)
    let subSel = form.querySelector('select[name="subdistrict"]');
    if (!subSel) {
        subSel = document.createElement('select');
        subSel.name = 'subdistrict';
        subSel.className = districtSel.className; // тот же стиль, что у района
        districtSel.insertAdjacentElement('afterend', subSel);
    }

    function fill() {
        const subs = SUBDISTRICTS[districtSel.value] || [];
        subSel.innerHTML = '';
        const ph = document.createElement('option');
        ph.value = '';
        ph.disabled = true;
        ph.selected = true;
        ph.textContent = subs.length
            ? (SUBDISTRICT_UI.choose[lang] || SUBDISTRICT_UI.choose.ru)
            : (SUBDISTRICT_UI.first[lang] || SUBDISTRICT_UI.first.ru);
        subSel.appendChild(ph);
        subs.forEach(function (s) {
            const o = document.createElement('option');
            o.value = s.v;
            o.textContent = s[lang] || s.ru;
            subSel.appendChild(o);
        });
        subSel.disabled = subs.length === 0; // нет подрайонов (например, «Other») → выключен
    }

    fill();
    districtSel.addEventListener('change', fill);
}

function initClientLeadFormTracking() {
    const leadForm = document.getElementById('clientLeadForm');
    if (!leadForm) return;

    let isSubmitting = false;

    leadForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (isSubmitting) return;
        if (!validateLeadForm(e)) return;

        isSubmitting = true;

        const formData = new FormData(leadForm);
        const transactionId = 'client_' + Date.now();

        // Дублируем заявку в Telegram-бота (fire-and-forget, не влияет на отправку на email)
        sendLeadToBot(formData);

        try {
            const response = await fetch('https://formspree.io/f/xpqjbpyk', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Submit failed');

            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead_client', {
                    form_name: 'client_lead_form',
                    form_location: 'Заявка клиента',
                    user_type: 'client',
                    value: 1,
                    currency: 'USD'
                });
            }

            closeClientLeadForm();
            openThankYou();
            leadForm.reset();

        } catch (error) {
            console.error(error);
            alert(t('submitError'));
            isSubmitting = false;
        }
    });

    // Checkbox
    const leadConsent   = document.getElementById('leadConsent');
    const leadSubmitBtn = document.getElementById('leadSubmitBtn');
    if (leadConsent && leadSubmitBtn) {
        leadSubmitBtn.disabled = !leadConsent.checked;
        leadConsent.addEventListener('change', function () {
            leadSubmitBtn.disabled = !this.checked;
        });
    }
}

function validateLeadForm(e) {
    const form          = e.target;
    const phoneInput    = document.getElementById('leadPhone');
    const telegramInput = form.querySelector('input[name="telegram"]');
    const whatsappInput = form.querySelector('input[name="whatsapp"]');

    const telegramValue = telegramInput ? telegramInput.value.trim() : '';
    const whatsappValue = whatsappInput ? whatsappInput.value.trim() : '';

    if (!telegramValue && !whatsappValue) {
        alert(t('contactRequired'));
        if (telegramInput && !telegramValue) telegramInput.focus();
        else if (whatsappInput) whatsappInput.focus();
        return false;
    }

    if (!validatePhone(phoneInput)) return false;
    if (telegramValue && !validateTelegram(telegramInput)) return false;

    // Подрайон обязателен, если у выбранного района он есть (select активен)
    const subdistrictInput = form.querySelector('select[name="subdistrict"]');
    if (subdistrictInput && !subdistrictInput.disabled && !subdistrictInput.value) {
        alert(t('subdistrictRequired'));
        subdistrictInput.focus();
        return false;
    }

    return true;
}

// ============================================
// 11. ЛИД-ФОРМА МАСТЕРА
// ============================================

function initMasterLeadFormTracking() {
    const masterLeadForm = document.getElementById('masterLeadForm');
    if (!masterLeadForm) return;

    let isSubmitting = false;

    masterLeadForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (isSubmitting) return;
        if (!validateMasterLeadForm(e)) return;

        isSubmitting = true;

        const formData = new FormData(masterLeadForm);

        try {
            const response = await fetch('https://formspree.io/f/mykdoebj', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Submit failed');

            if (typeof gtag === 'function') {          
                gtag('event', 'generate_lead_master', {
                    form_name: 'master_lead_form',
                    form_location: 'Регистрация мастера',
                    user_type: 'master',
                    value: 0,
                    currency: 'USD'
                });
            }

            closeMasterLeadForm();
            openMasterThankYou();
            masterLeadForm.reset();

        } catch (error) {
            console.error('Master form error:', error);
            alert(t('submitError'));
            isSubmitting = false;
        }
    });

    // Checkbox
    const masterLeadConsent   = document.getElementById('masterLeadConsent');
    const masterLeadSubmitBtn = document.getElementById('masterLeadSubmitBtn');
    if (masterLeadConsent && masterLeadSubmitBtn) {
        masterLeadSubmitBtn.disabled = !masterLeadConsent.checked;
        masterLeadConsent.addEventListener('change', function () {
            masterLeadSubmitBtn.disabled = !this.checked;
        });
    }
}

function validateMasterLeadForm(e) {
    const form          = e.target;
    const phoneInput    = document.getElementById('masterLeadPhone');
    const telegramInput = form.querySelector('input[name="telegram"]');
    const whatsappInput = form.querySelector('input[name="whatsapp"]');

    const telegramValue = telegramInput ? telegramInput.value.trim() : '';
    const whatsappValue = whatsappInput ? whatsappInput.value.trim() : '';

    if (!telegramValue && !whatsappValue) {
        alert(t('contactRequired'));
        if (telegramInput && !telegramValue) telegramInput.focus();
        else if (whatsappInput) whatsappInput.focus();
        return false;
    }

    if (!validatePhone(phoneInput)) return false;
    if (telegramValue && !validateTelegram(telegramInput)) return false;

    return true;
}

// ============================================
// 12. УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ
// ============================================

function openClientLeadForm()  { _modal('clientLeadFormModal',   'flex'); }
function closeClientLeadForm() { _modal('clientLeadFormModal',   'none'); }
function openThankYou()        { _modal('thankYouModal',          'flex'); }
function closeThankYou()       { _modal('thankYouModal',          'none'); }
function openMasterThankYou()  { _modal('masterThankYouModal',   'flex'); }
function closeMasterThankYou() { _modal('masterThankYouModal',   'none'); }
function openMasterLeadForm()  { _modal('masterLeadFormModal',   'flex'); }
function closeMasterLeadForm() { _modal('masterLeadFormModal',   'none'); }

function _modal(id, display) {
    const el = document.getElementById(id);
    if (el) el.style.display = display;
}

// ============================================
// 13. КНОПКА «НАВЕРХ» / TELEGRAM FAB
// ============================================

function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
        scrollButton.classList.toggle('visible', window.pageYOffset > 300);
    });
}

// ============================================
// 14. ТРЕКИНГ КНОПКИ WHATSAPP
// ============================================

function initWhatsAppButtonTracking() {
    const whatsappButton = document.getElementById('scrollToTop');
    if (!whatsappButton) return;

    // Тексты сообщений для WhatsApp
    const isMastersPage = window.location.pathname.includes('/masters/');
    const waTexts = {
        ru: encodeURIComponent(isMastersPage
            ? 'Здравствуйте! Хочу стать партнёром сервиса.'
            : 'Здравствуйте! Нужен мастер в Тбилиси.'),
        ka: encodeURIComponent(isMastersPage
            ? 'გამარჯობა! მინდა გავხდე პარტნიორი.'
            : 'გამარჯობა! მჭირდება ოსტატი თბილისში.'),
        en: encodeURIComponent(isMastersPage
            ? 'Hello! I want to become a partner.'
            : 'Hello! I need a handyman in Tbilisi.')
    };
    const lang = window.__FORCE_LANG__ || 'ru';
    const waText = waTexts[lang] || waTexts.ru;
    whatsappButton.href = 'https://wa.me/995557645196?text=' + waText;

    let isButtonClicked = false;

    whatsappButton.addEventListener('click', function (e) {
        // Защита от повторных кликов
        if (isButtonClicked) return;
        isButtonClicked = true;
        
        // Предотвращаем стандартный переход, чтобы сначала отправить событие в аналитику
        e.preventDefault();

        const goToWhatsApp = () => { 
            window.location.href = whatsappButton.href; 
        };

        // Если Google Analytics (gtag) подключён — отправляем событие
        if (typeof gtag === 'function') {
            gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: 'whatsapp_fab',  // можно добавить метку для отчётов
                method: 'whatsapp'            // параметр для сравнения с другими каналами
            });
            
            // Небольшая задержка, чтобы событие успело отправиться перед переходом
            setTimeout(goToWhatsApp, 600);
        } else {
            // Если аналитики нет — переходим сразу
            goToWhatsApp();
        }
    });
}

// ============================================
// 15. ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ ДЛЯ H1
// ============================================

function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    const isMastersPage = window.location.pathname.includes('/masters/');

    const textParts = {
        ru: {
            start:   'Сервис ',
            option1: 'поиска мастеров Тбилиси',
            option2: 'подбора мастеров Тбилиси'
        },
        en: {
            start:   'Master ',
            option1: 'search service Tbilisi',
            option2: 'matching service Tbilisi'
        },
        ka: {
            start:   'სერვისი ',
            option1: 'ძიების თბილისში',
            option2: 'შერჩევის თბილისში'
        },
        ru_masters: {
            start:   'Сервис ',
            option1: 'поиска заказов Тбилиси',
            option2: 'подбора заказов Тбилиси'
        },
        en_masters: {
            start:   'Order ',
            option1: 'search service Tbilisi',
            option2: 'matching service Tbilisi'
        },
        ka_masters: {
            start:   'შეკვეთების ',
            option1: 'ძიების სერვისი თბილისში',
            option2: 'შერჩევის სერვისი თბილისში'
        }
    };

    const langKey = isMastersPage ? currentLang + '_masters' : currentLang;
    const parts = textParts[langKey] || textParts[currentLang] || textParts.ru;

    const typeSpeed  = 180;
    const deleteSpeed = 50;
    const pauseTime  = 1000;

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    titleElement.innerHTML = '';
    titleElement.appendChild(cursor);

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function typeText(text) {
        for (let i = 0; i < text.length; i++) {
            titleElement.insertBefore(document.createTextNode(text[i]), cursor);
            await wait(typeSpeed);
        }
    }

    async function deleteText(count) {
        for (let i = 0; i < count; i++) {
            if (titleElement.childNodes.length > 1) {
                titleElement.removeChild(titleElement.childNodes[titleElement.childNodes.length - 2]);
            }
            await wait(deleteSpeed);
        }
    }

    async function runAnimation() {
        await typeText(parts.start + parts.option1);
        await wait(pauseTime);
        await deleteText(parts.option1.length);
        await typeText(parts.option2);
        await wait(1000);
        cursor.remove();
    }

    setTimeout(runAnimation, 500);
}

// ============================================
// ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ ДЛЯ H1 НА СТРАНИЦАХ СЕРВИСА
// ============================================

function initServiceTypingEffect() {
    const titleElement = document.querySelector('.service-title');
    if (!titleElement) return;

    const html = titleElement.innerHTML;
    const parts = html.split(/<br\s*\/?>/i);
    const line1 = parts[0] ? parts[0].trim() : '';
    const line2 = parts[1] ? parts[1].trim() : '';

    const typeSpeed = 180;

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    titleElement.innerHTML = '';
    titleElement.appendChild(cursor);

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function typeText(text) {
        for (let i = 0; i < text.length; i++) {
            titleElement.insertBefore(document.createTextNode(text[i]), cursor);
            await wait(typeSpeed);
        }
    }

    async function runAnimation() {
        await typeText(line1);
        if (line2) {
            const br = document.createElement('br');
            titleElement.insertBefore(br, cursor);
            await typeText(line2);
        }
        await wait(400);
        cursor.remove();
    }

    setTimeout(runAnimation, 500);
}