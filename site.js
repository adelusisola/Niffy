const showBookingToast = (message) => {
    let toast = document.getElementById("booking-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "booking-toast";
        toast.className = "booking-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.setAttribute("aria-atomic", "true");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(showBookingToast.timeoutId);
    showBookingToast.timeoutId = setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 3200);
};

const phoneCountries = [
    ["GB", "+44"], ["AC", "+247"], ["AD", "+376"], ["AE", "+971"], ["AF", "+93"], ["AG", "+1"], ["AI", "+1"], ["AL", "+355"], ["AM", "+374"], ["AO", "+244"],
    ["AR", "+54"], ["AS", "+1"], ["AT", "+43"], ["AU", "+61"], ["AW", "+297"], ["AX", "+358"], ["AZ", "+994"], ["BA", "+387"], ["BB", "+1"], ["BD", "+880"],
    ["BE", "+32"], ["BF", "+226"], ["BG", "+359"], ["BH", "+973"], ["BI", "+257"], ["BJ", "+229"], ["BL", "+590"], ["BM", "+1"], ["BN", "+673"], ["BO", "+591"],
    ["BQ", "+599"], ["BR", "+55"], ["BS", "+1"], ["BT", "+975"], ["BW", "+267"], ["BY", "+375"], ["BZ", "+501"], ["CA", "+1"], ["CC", "+61"], ["CD", "+243"],
    ["CF", "+236"], ["CG", "+242"], ["CH", "+41"], ["CI", "+225"], ["CK", "+682"], ["CL", "+56"], ["CM", "+237"], ["CN", "+86"], ["CO", "+57"], ["CR", "+506"],
    ["CU", "+53"], ["CV", "+238"], ["CW", "+599"], ["CX", "+61"], ["CY", "+357"], ["CZ", "+420"], ["DE", "+49"], ["DJ", "+253"], ["DK", "+45"], ["DM", "+1"],
    ["DO", "+1"], ["DZ", "+213"], ["EC", "+593"], ["EE", "+372"], ["EG", "+20"], ["EH", "+212"], ["ER", "+291"], ["ES", "+34"], ["ET", "+251"], ["FI", "+358"],
    ["FJ", "+679"], ["FK", "+500"], ["FM", "+691"], ["FO", "+298"], ["FR", "+33"], ["GA", "+241"], ["GD", "+1"], ["GE", "+995"], ["GF", "+594"], ["GG", "+44"],
    ["GH", "+233"], ["GI", "+350"], ["GL", "+299"], ["GM", "+220"], ["GN", "+224"], ["GP", "+590"], ["GQ", "+240"], ["GR", "+30"], ["GT", "+502"], ["GU", "+1"],
    ["GW", "+245"], ["GY", "+592"], ["HK", "+852"], ["HN", "+504"], ["HR", "+385"], ["HT", "+509"], ["HU", "+36"], ["ID", "+62"], ["IE", "+353"], ["IL", "+972"],
    ["IM", "+44"], ["IN", "+91"], ["IO", "+246"], ["IQ", "+964"], ["IR", "+98"], ["IS", "+354"], ["IT", "+39"], ["JE", "+44"], ["JM", "+1"], ["JO", "+962"],
    ["JP", "+81"], ["KE", "+254"], ["KG", "+996"], ["KH", "+855"], ["KI", "+686"], ["KM", "+269"], ["KN", "+1"], ["KP", "+850"], ["KR", "+82"], ["KW", "+965"],
    ["KY", "+1"], ["KZ", "+7"], ["LA", "+856"], ["LB", "+961"], ["LC", "+1"], ["LI", "+423"], ["LK", "+94"], ["LR", "+231"], ["LS", "+266"], ["LT", "+370"],
    ["LU", "+352"], ["LV", "+371"], ["LY", "+218"], ["MA", "+212"], ["MC", "+377"], ["MD", "+373"], ["ME", "+382"], ["MF", "+590"], ["MG", "+261"], ["MH", "+692"],
    ["MK", "+389"], ["ML", "+223"], ["MM", "+95"], ["MN", "+976"], ["MO", "+853"], ["MP", "+1"], ["MQ", "+596"], ["MR", "+222"], ["MS", "+1"], ["MT", "+356"],
    ["MU", "+230"], ["MV", "+960"], ["MW", "+265"], ["MX", "+52"], ["MY", "+60"], ["MZ", "+258"], ["NA", "+264"], ["NC", "+687"], ["NE", "+227"], ["NF", "+672"],
    ["NG", "+234"], ["NI", "+505"], ["NL", "+31"], ["NO", "+47"], ["NP", "+977"], ["NR", "+674"], ["NU", "+683"], ["NZ", "+64"], ["OM", "+968"], ["PA", "+507"],
    ["PE", "+51"], ["PF", "+689"], ["PG", "+675"], ["PH", "+63"], ["PK", "+92"], ["PL", "+48"], ["PM", "+508"], ["PR", "+1"], ["PS", "+970"], ["PT", "+351"],
    ["PW", "+680"], ["PY", "+595"], ["QA", "+974"], ["RE", "+262"], ["RO", "+40"], ["RS", "+381"], ["RU", "+7"], ["RW", "+250"], ["SA", "+966"], ["SB", "+677"],
    ["SC", "+248"], ["SD", "+249"], ["SE", "+46"], ["SG", "+65"], ["SH", "+290"], ["SI", "+386"], ["SJ", "+47"], ["SK", "+421"], ["SL", "+232"], ["SM", "+378"],
    ["SN", "+221"], ["SO", "+252"], ["SR", "+597"], ["SS", "+211"], ["ST", "+239"], ["SV", "+503"], ["SX", "+1"], ["SY", "+963"], ["SZ", "+268"], ["TA", "+290"],
    ["TC", "+1"], ["TD", "+235"], ["TG", "+228"], ["TH", "+66"], ["TJ", "+992"], ["TK", "+690"], ["TL", "+670"], ["TM", "+993"], ["TN", "+216"], ["TO", "+676"],
    ["TR", "+90"], ["TT", "+1"], ["TV", "+688"], ["TW", "+886"], ["TZ", "+255"], ["UA", "+380"], ["UG", "+256"], ["US", "+1"], ["UY", "+598"], ["UZ", "+998"],
    ["VA", "+39"], ["VC", "+1"], ["VE", "+58"], ["VG", "+1"], ["VI", "+1"], ["VN", "+84"], ["VU", "+678"], ["WF", "+681"], ["WS", "+685"], ["XK", "+383"],
    ["YE", "+967"], ["YT", "+262"], ["ZA", "+27"], ["ZM", "+260"], ["ZW", "+263"]
];

const formatBookingDate = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
        return "";
    }

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
        return "";
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }).format(date);
};

const createBookingModal = () => {
    if (document.getElementById("booking-modal")) {
        return;
    }

    const modal = document.createElement("div");
    modal.id = "booking-modal";
    modal.className = "booking-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="booking-modal__backdrop" data-close-booking></div>
        <div class="booking-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
            <button class="booking-modal__close" type="button" aria-label="Close booking form" data-close-booking>×</button>
            <p class="section-label">Book a shoot</p>
            <h2 id="booking-modal-title">Tell us about your project</h2>
            <form id="booking-form" class="booking-form" novalidate>
                <div class="form-grid">
                    <label class="form-field form-field--company" aria-hidden="true">
                        <span>Company</span>
                        <input type="text" name="company_website" tabindex="-1" autocomplete="off" placeholder="Leave this field empty">
                    </label>
                    <label class="form-field">
                        <span>Name</span>
                        <input type="text" name="name" placeholder="Your name" required>
                    </label>
                    <label class="form-field">
                        <span>Email</span>
                        <input type="email" name="email" placeholder="you@example.com" required>
                    </label>
                    <label class="form-field">
                        <span>Service</span>
                        <select name="service">
                            <option value="Portrait and family photography">Portrait and family photography</option>
                            <option value="Wedding photography and videography">Wedding photography and videography</option>
                            <option value="Event photography and videography">Event photography and videography</option>
                            <option value="Brand and commercial content">Brand and commercial content</option>
                            <option value="Documentary photography and filmmaking">Documentary photography and filmmaking</option>
                            <option value="Creative and editorial project">Creative and editorial project</option>
                            <option value="General enquiry">General enquiry</option>
                        </select>
                    </label>
                    <label class="form-field booking-date-field">
                        <span>Preferred date</span>
                        <div class="booking-date-control">
                            <input id="booking-date" type="date" name="date" autocomplete="off">
                            <output class="booking-date__formatted" for="booking-date" aria-live="polite">Leave blank if flexible.</output>
                        </div>
                    </label>
                    <div class="phone-field">
                        <label class="form-field">
                            <span>Country code</span>
                            <select name="phone_country" autocomplete="tel-country-code" aria-label="Country calling code"></select>
                        </label>
                        <label class="form-field">
                            <span>Phone number <span class="form-field__optional">Optional</span></span>
                            <input type="tel" name="phone" autocomplete="tel-national" inputmode="tel" placeholder="Your number">
                        </label>
                    </div>
                    <label class="form-field form-field--full">
                        <span>Project details</span>
                        <textarea name="message" rows="5" placeholder="Tell us about the people, place, timeline and feeling you want to capture." required></textarea>
                    </label>
                </div>
                <div class="booking-form__actions">
                    <button class="booking-submit" type="submit">Send enquiry</button>
                    <button class="booking-cancel" type="button" data-close-booking>Cancel</button>
                </div>
                <p class="booking-form__status" aria-live="polite"></p>
            </form>
        </div>
    `;

    const phoneCountrySelect = modal.querySelector('[name="phone_country"]');
    const regionNames = typeof Intl.DisplayNames === "function"
        ? new Intl.DisplayNames(["en"], { type: "region" })
        : null;
    const seenRegions = new Set();
    const countryOptions = phoneCountries
        .filter(([region]) => {
            if (seenRegions.has(region)) {
                return false;
            }

            seenRegions.add(region);
            return true;
        })
        .map(([region, callingCode]) => ({
            region,
            callingCode,
            name: regionNames?.of(region) || region,
            flag: Array.from(region, (character) => String.fromCodePoint(127397 + character.charCodeAt(0))).join("")
        }))
        .sort((countryA, countryB) => {
            if (countryA.region === countryB.region) {
                return 0;
            }
            if (countryA.region === "GB") {
                return -1;
            }
            if (countryB.region === "GB") {
                return 1;
            }
            return countryA.name.localeCompare(countryB.name, "en");
        });

    phoneCountrySelect.replaceChildren();

    countryOptions.forEach(({ region, callingCode, name, flag }) => {
        const option = document.createElement("option");
        option.value = callingCode;
        option.textContent = `${flag} ${name} (${callingCode})`;
        option.selected = region === "GB";
        phoneCountrySelect.appendChild(option);
    });

    const otherCountryOption = document.createElement("option");
    otherCountryOption.value = "";
    otherCountryOption.textContent = "🌐 Other (include country code)";
    phoneCountrySelect.appendChild(otherCountryOption);

    const closeModal = () => {
        closeBookingModal();
    };

    modal.querySelectorAll("[data-close-booking]").forEach((control) => {
        control.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    modal.addEventListener("keydown", (event) => {
        if (event.key !== "Tab" || !modal.classList.contains("is-open")) {
            return;
        }

        const focusables = modal.querySelectorAll('.booking-modal__dialog a[href]:not([tabindex="-1"]), .booking-modal__dialog button:not([disabled]):not([tabindex="-1"]), .booking-modal__dialog input:not([disabled]):not([tabindex="-1"]), .booking-modal__dialog select:not([disabled]):not([tabindex="-1"]), .booking-modal__dialog textarea:not([disabled]):not([tabindex="-1"])');

        if (!focusables.length) {
            return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    const form = modal.querySelector("#booking-form");
    const status = modal.querySelector(".booking-form__status");
    const dateInput = form.querySelector('[name="date"]');
    const formattedDate = form.querySelector(".booking-date__formatted");
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    dateInput.min = today.toISOString().slice(0, 10);

    const updateFormattedDate = () => {
        const formatted = formatBookingDate(dateInput.value);
        formattedDate.textContent = formatted || "Leave blank if flexible.";
        formattedDate.classList.toggle("is-selected", Boolean(formatted));
    };

    dateInput.addEventListener("input", updateFormattedDate);
    dateInput.addEventListener("change", updateFormattedDate);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const submitButton = form.querySelector(".booking-submit");
        const originalLabel = submitButton ? submitButton.textContent : "Send enquiry";

        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());

        if (values.company_website) {
            status.textContent = "Thanks — your enquiry has been sent.";
            return;
        }

        const name = values.name?.trim() || "Hello";
        const service = values.service || "General enquiry";
        const date = formatBookingDate(values.date) || "Flexible";
        const message = values.message?.trim() || "No additional details provided.";
        const email = values.email?.trim() || "";
        const phoneNumber = values.phone?.trim() || "";
        const countryCode = values.phone_country || "";
        const phone = phoneNumber
            ? countryCode && !/^(?:\+|00)/.test(phoneNumber)
                ? `${countryCode} ${phoneNumber}`
                : phoneNumber
            : "";

        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "Not provided"}`,
            `Service: ${service}`,
            `Preferred date: ${date}`,
            "",
            `Project details: ${message}`
        ].join("\n");

        const payload = {
            name,
            email,
            phone,
            service,
            date,
            message,
            company_website: values.company_website || ""
        };

        const mailto = `mailto:Neefstudios.uk@gmail.com?subject=${encodeURIComponent(`Booking enquiry: ${service}`)}&body=${encodeURIComponent(body)}`;

        status.textContent = "Sending your enquiry…";
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending…";
        }

        fetch("/.netlify/functions/send-booking-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                return response.json().catch(() => ({ ok: true }));
            })
            .then(() => {
                form.reset();
                updateFormattedDate();
                status.textContent = "Thanks — your enquiry has been sent.";
                showBookingToast("Thanks! Your enquiry has been sent.");
                setTimeout(() => closeModal(), 1200);
            })
            .catch(() => {
                status.textContent = "We could not send it automatically, so we opened your email app with your message ready to send.";
                form.reset();
                updateFormattedDate();
                showBookingToast("Your email draft is ready to send.");
                window.location.href = mailto;
                setTimeout(() => closeModal(), 1800);
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalLabel;
                }
            });
    });

    document.body.appendChild(modal);
    return modal;
};

const openBookingModal = (trigger) => {
    const modal = document.getElementById("booking-modal") || createBookingModal();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const requestedService = trigger instanceof HTMLElement ? trigger.dataset.service : "";

    if (requestedService) {
        const serviceSelect = modal.querySelector('select[name="service"]');

        if (serviceSelect) {
            const matchingOption = Array.from(serviceSelect.options)
                .find((option) => option.value.toLowerCase().startsWith(requestedService.toLowerCase().split(" ")[0]));

            if (matchingOption) {
                serviceSelect.value = matchingOption.value;
            }
        }
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--modal-scrollbar", `${Math.max(scrollbarWidth, 0)}px`);

    const dialog = modal.querySelector(".booking-modal__dialog");
    const focusables = dialog
        ? dialog.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])')
        : [];
    const firstField = focusables[1] || focusables[0] || modal.querySelector("input, select, textarea");

    if (firstField) {
        setTimeout(() => firstField.focus(), 60);
    }

    modal._lastTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
};
const closeBookingModal = () => {
    const modal = document.getElementById("booking-modal");

    if (!modal || !modal.classList.contains("is-open")) {
        return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (modal._lastTrigger && document.contains(modal._lastTrigger)) {
        modal._lastTrigger.focus();
    }
};

const prefersReducedMotion = () =>
    typeof window.matchMedia === "function"
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const initScrollProgress = () => {
    const caseMain = document.querySelector(".case-hero");

    if (!caseMain || document.querySelector(".scroll-progress")) {
        return;
    }

    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
        ticking = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min((window.scrollY || 0) / max, 1) : 0;
        bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    update();
};

const initGalleryLightbox = () => {
    const galleryImages = document.querySelectorAll(".case-gallery .gallery-image");

    if (!galleryImages.length || document.getElementById("lightbox")) {
        return;
    }

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
        <button class="lightbox__close" type="button" aria-label="Close image viewer">×</button>
        <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous image">←</button>
        <img class="lightbox__image" src="" alt="">
        <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next image">→</button>
        <p class="lightbox__counter" aria-live="polite"></p>
    `;
    document.body.appendChild(lightbox);

    const image = lightbox.querySelector(".lightbox__image");
    const counter = lightbox.querySelector(".lightbox__counter");
    const closeButton = lightbox.querySelector(".lightbox__close");
    let currentIndex = 0;
    let lastTrigger = null;

    const render = () => {
        const source = galleryImages[currentIndex];
        image.src = source.currentSrc || source.src;
        image.alt = source.alt;
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    };

    const open = (index) => {
        currentIndex = index;
        render();
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        lastTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        closeButton.focus();
    };

    const close = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (lastTrigger && document.contains(lastTrigger)) {
            lastTrigger.focus();
        }
    };

    const step = (delta) => {
        currentIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
        render();
    };

    galleryImages.forEach((galleryImage, index) => {
        galleryImage.classList.add("is-lightboxable");
        galleryImage.setAttribute("tabindex", "0");
        galleryImage.setAttribute("role", "button");
        galleryImage.setAttribute("aria-label", `${galleryImage.alt} — open image viewer`);
        galleryImage.addEventListener("click", () => open(index));
        galleryImage.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open(index);
            }
        });
    });

    closeButton.addEventListener("click", close);
    lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", () => step(-1));
    lightbox.querySelector(".lightbox__nav--next").addEventListener("click", () => step(1));
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            close();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            close();
        } else if (event.key === "ArrowLeft") {
            step(-1);
        } else if (event.key === "ArrowRight") {
            step(1);
        }
    });
};

const initCookieNotice = () => {
    if (document.getElementById("cookie-notice")) {
        return;
    }

    let storedChoice = null;

    try {
        storedChoice = window.localStorage.getItem("neef-cookie-choice");
    } catch {
        storedChoice = null;
    }

    if (storedChoice) {
        return;
    }

    const notice = document.createElement("aside");
    notice.id = "cookie-notice";
    notice.className = "cookie-notice";
    notice.setAttribute("role", "region");
    notice.setAttribute("aria-label", "Cookie notice");
    notice.innerHTML = `
        <p>We use a few essential cookies to keep this site working. No tracking, no ad networks.</p>
        <div class="cookie-notice__actions">
            <button class="cookie-notice__accept" type="button">That's fine</button>
            <a class="cookie-notice__link" href="privacy.html">Privacy policy</a>
        </div>
    `;
    document.body.appendChild(notice);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => notice.classList.add("is-visible"));
    });

    const dismiss = () => {
        notice.classList.remove("is-visible");

        try {
            window.localStorage.setItem("neef-cookie-choice", "essential");
        } catch {
            /* storage unavailable: dismiss for this visit only */
        }

        setTimeout(() => notice.remove(), 400);
    };

    notice.querySelector(".cookie-notice__accept").addEventListener("click", dismiss);
};

/* iOS Safari only applies :active if a touch listener exists on the element */
const initTouchFeedback = () => {
    if (typeof window.matchMedia === "function"
        && !window.matchMedia("(hover: none)").matches) {
        return;
    }

    const targets = document.querySelectorAll(
        ".project-card-link, .journal-card-link, .testimonial-card, .work-index__row, .filter-button, .service-item, .faq-item summary, .floating-cta, .booking-submit, .booking-cancel, .cookie-notice__accept, .text-link, .round-link"
    );

    targets.forEach((el) => {
        el.addEventListener("touchstart", () => {}, { passive: true });
    });
};

const initMobileNav = () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");

    if (!toggle || !nav || toggle.dataset.navBound) {
        return;
    }

    toggle.dataset.navBound = "true";

    const setOpen = (open) => {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", () => {
        setOpen(!nav.classList.contains("is-open"));
    });

    nav.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            setOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
            setOpen(false);
            toggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target instanceof Element
            && nav.classList.contains("is-open")
            && !nav.contains(event.target)
            && !toggle.contains(event.target)) {
            setOpen(false);
        }
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", (media) => {
        if (media.matches) {
            setOpen(false);
        }
    });
};

const initWorkIndex = () => {
    const indexBlock = document.querySelector("[data-work-index]");

    if (!indexBlock || indexBlock.dataset.indexBound) {
        return;
    }

    const finePointer = typeof window.matchMedia === "function"
        && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const previewPanel = indexBlock.querySelector("[data-index-preview-panel]");
    const rows = indexBlock.querySelectorAll("[data-index-preview]");

    if (!finePointer || !previewPanel || !rows.length) {
        return;
    }

    indexBlock.dataset.indexBound = "true";
    const previewImage = previewPanel.querySelector("img");
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const tick = () => {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        previewPanel.style.transform = `translate(${currentX}px, ${currentY}px)`;

        if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
            rafId = requestAnimationFrame(tick);
        } else {
            rafId = null;
        }
    };

    rows.forEach((row) => {
        row.addEventListener("pointerenter", () => {
            const src = row.dataset.indexPreview;
            let image = previewPanel.querySelector("img.is-current");

            if (!image || image.src !== src) {
                const next = document.createElement("img");
                next.src = src;
                next.alt = "";
                next.classList.add("is-current");
                previewPanel.appendChild(next);

                if (image) {
                    image.classList.remove("is-current");
                    setTimeout(() => image.remove(), 400);
                }
            }

            previewPanel.classList.add("is-visible");
        });

        row.addEventListener("pointerleave", () => {
            previewPanel.classList.remove("is-visible");
        });
    });

    indexBlock.addEventListener("pointermove", (event) => {
        targetX = event.clientX + 28;
        targetY = event.clientY - previewPanel.offsetHeight / 2;

        if (rafId === null) {
            rafId = requestAnimationFrame(tick);
        }
    });
};

const initCustomCursor = () => {
    const finePointer = typeof window.matchMedia === "function"
        && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!finePointer || document.querySelector(".cursor-dot") || prefersReducedMotion()) {
        return;
    }

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.innerHTML = '<span class="cursor-dot__label"></span>';
    document.body.appendChild(dot);
    document.documentElement.classList.add("has-custom-cursor");

    const label = dot.querySelector(".cursor-dot__label");
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = null;

    const tick = () => {
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;
        dot.style.left = `${currentX}px`;
        dot.style.top = `${currentY}px`;
        rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", (event) => {
        const target = event.target instanceof Element ? event.target : null;
        const interactive = target?.closest("a, button, [role='button'], summary");
        const labelFrom = interactive?.dataset.cursorLabel;

        targetX = event.clientX;
        targetY = event.clientY;

        if (labelFrom) {
            label.textContent = labelFrom;
            dot.classList.add("is-large");
        } else {
            dot.classList.remove("is-large");
        }

        if (rafId === null) {
            rafId = requestAnimationFrame(tick);
        }
    }, { passive: true });

    document.addEventListener("pointerdown", () => dot.style.scale = "0.8");
    document.addEventListener("pointerup", () => dot.style.scale = "1");
    document.addEventListener("pointerleave", () => {
        dot.style.opacity = "0";
    });
    document.addEventListener("pointerenter", () => {
        dot.style.opacity = "1";
    });
};

const initFooterSignature = () => {
    const footer = document.querySelector(".site-footer");

    if (!footer || footer.querySelector(".footer-signature")) {
        return;
    }

    const signature = document.createElement("div");
    signature.className = "footer-signature";
    signature.setAttribute("aria-hidden", "true");
    signature.textContent = "Neef Studios";
    footer.appendChild(signature);

    const owner = document.createElement("p");
    owner.className = "footer-owner";
    owner.textContent = "Oluwanifemi Fayefunmi · Founder & CEO";
    footer.appendChild(owner);

    const meta = document.createElement("p");
    meta.className = "footer-meta";

    const time = document.createElement("time");
    time.className = "footer-time";
    time.setAttribute("data-local-time", "");
    meta.appendChild(time);
    footer.appendChild(meta);

    const clock = footer.querySelector("[data-local-time]");

    const updateClock = () => {
        try {
            clock.textContent = `Liverpool, UK — ${new Intl.DateTimeFormat("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/London"
            }).format(new Date())} local`;
        } catch {
            clock.textContent = "Liverpool, UK";
        }
    };

    updateClock();
    setInterval(updateClock, 30000);
};

/* Accepts a bare YouTube ID or any common YouTube URL form
   (watch?v=, youtu.be/, /embed/, /shorts/, /live/) and returns the 11-char ID. */
const parseYouTubeId = (value) => {
    if (!value) {
        return "";
    }

    const raw = String(value).trim();

    if (/^[A-Za-z0-9_-]{11}$/.test(raw)) {
        return raw;
    }

    const patterns = [
        /[?&]v=([A-Za-z0-9_-]{11})/,
        /youtu\.be\/([A-Za-z0-9_-]{11})/,
        /\/embed\/([A-Za-z0-9_-]{11})/,
        /\/shorts\/([A-Za-z0-9_-]{11})/,
        /\/live\/([A-Za-z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
        const match = raw.match(pattern);
        if (match) {
            return match[1];
        }
    }

    return "";
};

const initVideoEmbeds = () => {
    const videoBlocks = document.querySelectorAll("[data-video-id]");

    if (!videoBlocks.length) {
        return;
    }

    videoBlocks.forEach((block) => {
        if (block.dataset.videoBound) {
            return;
        }

        const videoId = parseYouTubeId(block.dataset.videoId);
        const trigger = block.querySelector(".case-video__trigger");

        if (!trigger) {
            return;
        }

        // No link configured yet: show an honest placeholder instead of a dead play button
        if (!videoId) {
            block.classList.add("is-unavailable");
            const label = trigger.querySelector(".case-video__play");
            if (label) {
                label.classList.add("case-video__play--pending");
            }
            trigger.setAttribute("aria-disabled", "true");
            trigger.setAttribute("aria-label", "Film coming soon");
            return;
        }

        block.dataset.videoBound = "true";
        block.classList.add("is-ready");

        trigger.addEventListener("click", () => {
            const frame = document.createElement("iframe");
            // YouTube's embedded-player terms require identification via the HTTP Referer
            // header; without it the player returns "Error 153". Notes on the settings below:
            //  - Use www.youtube.com/embed (the standard host). The youtube-nocookie host
            //    is stricter and is a common cause of 153 on sites with tight referrer policy.
            //  - `origin` must be the real page origin, sent unencoded host only.
            //  - `fullscreen` must NOT appear in the allow list: it is not a permissions-policy
            //    feature, and including it makes browsers ignore the allowfullscreen attribute.
            const pageOrigin = (window.location.protocol === "http:" || window.location.protocol === "https:")
                ? window.location.origin
                : "https://neefstudios.co.uk";
            frame.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`
                + "?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1"
                + `&origin=${encodeURIComponent(pageOrigin)}`;
            frame.title = block.dataset.videoTitle || "Neef Studios film";
            frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            frame.allowFullscreen = true;
            frame.setAttribute("frameborder", "0");
            frame.referrerPolicy = "strict-origin-when-cross-origin";
            block.replaceChildren(frame);
            frame.focus();

            // Fallback: if the player cannot load (network, policy, or YouTube error),
            // give the visitor a direct link instead of a dead frame.
            setTimeout(() => {
                if (!block.querySelector(".case-video__fallback")) {
                    const link = document.createElement("p");
                    link.className = "case-video__fallback";
                    const a = document.createElement("a");
                    a.href = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                    a.textContent = "Watch this film on YouTube ↗";
                    link.appendChild(a);
                    block.appendChild(link);
                }
            }, 3500);
        }, { once: true });
    });
};

const initKineticHero = () => {
    const heroTitle = document.querySelector(".hero h1");

    if (!heroTitle || heroTitle.dataset.kineticBound || prefersReducedMotion()) {
        return;
    }

    heroTitle.dataset.kineticBound = "true";
    let ticking = false;

    const update = () => {
        ticking = false;
        const scrollY = window.scrollY || 0;
        const progress = Math.min(scrollY / 640, 1);
        const soft = 0 + progress * 60;
        const opsz = 144 - progress * 60;
        heroTitle.style.fontVariationSettings = `'wght' ${(340 + progress * 160).toFixed(0)}, 'opsz' ${opsz.toFixed(1)}`;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    update();
};

const initVelocitySkew = () => {
    const skews = document.querySelectorAll(".case-gallery .gallery-image, .journal-image");

    if (!skews.length || prefersReducedMotion()) {
        return;
    }

    let lastY = window.scrollY || 0;
    let currentSkew = 0;
    let rafId = null;

    const tick = () => {
        const y = window.scrollY || 0;
        const velocity = y - lastY;
        lastY = y;
        const targetSkew = Math.max(-2, Math.min(2, velocity * 0.06));
        currentSkew += (targetSkew - currentSkew) * 0.1;

        skews.forEach((image) => {
            image.style.transform = `skewY(${currentSkew.toFixed(3)}deg)`;
        });

        if (Math.abs(currentSkew) > 0.02 || Math.abs(targetSkew) > 0.02) {
            rafId = requestAnimationFrame(tick);
        } else {
            skews.forEach((image) => {
                image.style.transform = "";
            });
            rafId = null;
        }
    };

    window.addEventListener("scroll", () => {
        if (rafId === null) {
            rafId = requestAnimationFrame(tick);
        }
    }, { passive: true });
};

const initFaqAnimation = () => {
    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length || prefersReducedMotion()) {
        return;
    }

    faqItems.forEach((item) => {
        if (item.dataset.faqBound) {
            return;
        }

        item.dataset.faqBound = "true";
        const summary = item.querySelector(":scope > summary");
        const answer = item.querySelector(":scope > p");

        if (!summary || !answer) {
            return;
        }

        // Wrap the answer in an animatable container.
        const inner = document.createElement("div");
        inner.className = "faq-item__inner";
        answer.parentNode.insertBefore(inner, answer);
        inner.appendChild(answer);

        const animateHeight = (from, to, then) => {
            inner.style.transition = "none";
            inner.style.height = `${from}px`;
            inner.style.opacity = from === 0 ? "0" : "1";
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    inner.style.transition = "height 420ms cubic-bezier(0.2, 0.65, 0.3, 1), opacity 300ms ease";
                    inner.style.height = `${to}px`;
                    inner.style.opacity = to === 0 ? "0" : "1";
                    inner.addEventListener("transitionend", function onEnd(event) {
                        if (event.propertyName !== "height") {
                            return;
                        }
                        inner.removeEventListener("transitionend", onEnd);
                        inner.style.transition = "";
                        then();
                    });
                });
            });
        };

        summary.addEventListener("click", (event) => {
            event.preventDefault();

            if (item.classList.contains("is-animating")) {
                return;
            }

            item.classList.add("is-animating");

            if (!item.open) {
                item.open = true;
                inner.style.height = "0px";
                inner.style.opacity = "0";
                animateHeight(0, inner.scrollHeight, () => {
                    inner.style.height = "auto";
                    item.classList.remove("is-animating");
                });
                item.classList.add("is-open");
            } else {
                animateHeight(inner.scrollHeight, 0, () => {
                    item.open = false;
                    item.classList.remove("is-animating");
                });
                item.classList.remove("is-open");
            }
        });
    });
};

const initRevealSystem = () => {
    const revealSelector = ".reveal, .reveal-group, .quote-reveal";

    if ("IntersectionObserver" in window && !prefersReducedMotion()) {
        const revealNodes = document.querySelectorAll(revealSelector);

        if (!revealNodes.length) {
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-inview");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        });

        revealNodes.forEach((node) => revealObserver.observe(node));
    } else {
        document.querySelectorAll(revealSelector).forEach((node) => {
            node.classList.add("is-inview");
        });
    }
};

const initSite = () => {
    const currentYearNodes = document.querySelectorAll("[data-current-year]");
    const filterButtons = document.querySelectorAll("[data-project-filter]");
    const projectCards = document.querySelectorAll("[data-project-category]");
    const emptyState = document.querySelector("[data-empty-state]");
    const categoryEnquiry = document.querySelector("#category-enquiry-link");
    const filterStatus = document.querySelector("[data-filter-status]");
    const servicePreviewButtons = document.querySelectorAll("[data-service-preview]");
    const servicePreviewPanel = document.querySelector("[data-service-preview-panel]");
    const bookingLinks = document.querySelectorAll("[data-booking-trigger]");

    bookingLinks.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            openBookingModal(button);
        });
    });

    const siteHeader = document.querySelector(".site-header");
    const floatingCta = document.querySelector(".floating-cta");
    let scrollTicking = false;

    const updateScrollState = () => {
        scrollTicking = false;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        if (siteHeader) {
            siteHeader.classList.toggle("is-condensed", scrollY > 120);
        }

        if (floatingCta) {
            const nearPageEnd = scrollY + window.innerHeight
                > document.documentElement.scrollHeight - 160;
            floatingCta.classList.toggle("is-shown", scrollY > 420 && !nearPageEnd);
        }
    };

    window.addEventListener("scroll", () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(updateScrollState);
        }
    }, { passive: true });

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }

        const topLink = event.target.closest("[data-scroll-top]");

        if (topLink) {
            event.preventDefault();
            const reduceMotion = prefersReducedMotion();
            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
            history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    });

    updateScrollState();
    initFooterSignature();
    initVideoEmbeds();
    initMobileNav();
    initTouchFeedback();
    initWorkIndex();
    initCustomCursor();
    initFaqAnimation();
    initKineticHero();
    initVelocitySkew();
    initScrollProgress();
    initGalleryLightbox();
    initCookieNotice();
    initRevealSystem();

    if (currentYearNodes.length) {
        const currentYear = new Date().getFullYear();
        currentYearNodes.forEach((node) => {
            node.textContent = currentYear;
        });
    }

    if (servicePreviewButtons.length && servicePreviewPanel) {
        const previewImages = [servicePreviewPanel.querySelector("img")].filter(Boolean);

        const showPreview = (button) => {
            if (!button || !previewImages.length) {
                return;
            }

            const nextSrc = button.dataset.servicePreview;
            const serviceName = button.querySelector(".service-name")?.textContent.trim() || button.textContent.trim();
            const currentImage = previewImages.find((image) => image.classList.contains("is-active"));

            if (currentImage && currentImage.src === nextSrc) {
                return;
            }

            let nextImage = previewImages.find((image) => image !== currentImage);

            if (!nextImage) {
                nextImage = currentImage.cloneNode();
                currentImage.after(nextImage);
                previewImages.push(nextImage);
            }

            nextImage.src = nextSrc;
            nextImage.alt = `${serviceName} service preview`;
            nextImage.classList.add("is-active");

            if (currentImage) {
                currentImage.classList.remove("is-active");
            }

            servicePreviewPanel.classList.add("is-visible");
            servicePreviewPanel.setAttribute("aria-hidden", "false");

            servicePreviewButtons.forEach((previewButton) => {
                previewButton.setAttribute("aria-pressed", String(previewButton === button));
            });
        };

        const defaultButton = servicePreviewButtons[0];
        if (defaultButton) {
            showPreview(defaultButton);
        }

        servicePreviewButtons.forEach((button) => {
            button.addEventListener("pointerenter", () => showPreview(button));
            button.addEventListener("focus", () => showPreview(button));
            button.addEventListener("click", () => showPreview(button));
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.projectFilter;
            let visibleProjects = 0;

            filterButtons.forEach((filterButton) => {
                const isSelected = filterButton === button;
                filterButton.classList.toggle("is-active", isSelected);
                filterButton.setAttribute("aria-pressed", String(isSelected));
            });

            const animateFilter = !prefersReducedMotion()
                && typeof projectCards[0]?.getBoundingClientRect === "function";
            const firstPositions = new Map();

            if (animateFilter) {
                projectCards.forEach((card) => {
                    if (!card.hidden) {
                        firstPositions.set(card, card.getBoundingClientRect().top);
                    }
                });
            }

            projectCards.forEach((card) => {
                const matches = selectedCategory === "all"
                    || card.dataset.projectCategory.split(" ").includes(selectedCategory);
                card.hidden = !matches;
                visibleProjects += Number(matches);
            });

            if (animateFilter) {
                projectCards.forEach((card, index) => {
                    if (card.hidden) {
                        return;
                    }

                    const firstTop = firstPositions.get(card);
                    const deltaTop = firstTop === undefined
                        ? 24
                        : firstTop - card.getBoundingClientRect().top;

                    card.animate(
                        [
                            { opacity: firstTop === undefined ? 0 : 1, transform: `translateY(${Math.max(deltaTop, firstTop === undefined ? 24 : 0)}px)` },
                            { opacity: 1, transform: "translateY(0)" }
                        ],
                        {
                            duration: 560,
                            easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
                            delay: Math.min(index * 60, 300),
                            fill: "backwards"
                        }
                    );
                });
            }

            if (emptyState) {
                emptyState.hidden = visibleProjects > 0;
            }

            if (categoryEnquiry) {
                const selectedLabel = button.dataset.serviceLabel;
                categoryEnquiry.dataset.service = selectedLabel
                    ? `${selectedLabel} enquiry`
                    : "General enquiry";
            }

            if (filterStatus) {
                filterStatus.textContent = visibleProjects
                    ? selectedCategory === "all"
                        ? `Showing all ${visibleProjects} projects.`
                        : `Showing ${visibleProjects} ${visibleProjects === 1 ? "project" : "projects"} in ${button.dataset.categoryLabel}.`
                    : `No projects in ${button.dataset.categoryLabel} yet. Use the enquiry link below to ask about this service.`;
            }

            const resultsHeading = document.querySelector("[data-results-heading]");

            if (resultsHeading) {
                resultsHeading.textContent = selectedCategory === "all"
                    ? `Showing all ${visibleProjects} ${visibleProjects === 1 ? "project" : "projects"}`
                    : visibleProjects
                        ? `${button.textContent.replace(/\s*\d+\s*$/, "").trim()} — ${visibleProjects} ${visibleProjects === 1 ? "project" : "projects"}`
                        : `Nothing here yet — ask us about ${button.dataset.categoryLabel}`;
            }
        });
    });

    filterButtons.forEach((button) => {
        const category = button.dataset.projectFilter;
        const countBadge = button.querySelector(".filter-count");

        if (!countBadge) {
            return;
        }

        const count = category === "all"
            ? projectCards.length
            : [...projectCards].filter((card) => card.dataset.projectCategory.split(" ").includes(category)).length;

        countBadge.textContent = String(count);

        if (count === 0 && category !== "all") {
            button.setAttribute("title", "No projects in this category yet");
        }
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSite);
} else {
    initSite();
}
