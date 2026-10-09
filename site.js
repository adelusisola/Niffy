const currentYearNodes = document.querySelectorAll("[data-current-year]");
const filterButtons = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");
const emptyState = document.querySelector("[data-empty-state]");
const categoryEnquiry = document.querySelector("#category-enquiry-link");
const filterStatus = document.querySelector("[data-filter-status]");
const servicePreviewButtons = document.querySelectorAll("[data-service-preview]");
const servicePreviewPanel = document.querySelector("[data-service-preview-panel]");
const videoPreviews = document.querySelectorAll("[data-youtube-id]");

if (currentYearNodes.length) {
    const currentYear = new Date().getFullYear();
    currentYearNodes.forEach((node) => {
        node.textContent = currentYear;
    });
}

if (servicePreviewButtons.length && servicePreviewPanel) {
    const servicePreviewImage = servicePreviewPanel.querySelector("img");

    const showPreview = (button) => {
        if (!button || !servicePreviewImage) {
            return;
        }

        servicePreviewImage.src = button.dataset.servicePreview;
        servicePreviewImage.alt = `${button.textContent.trim()} service preview`;
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

videoPreviews.forEach((preview) => {
    preview.addEventListener("click", () => {
        const videoId = preview.dataset.youtubeId;
        const title = preview.dataset.youtubeTitle;
        const frame = document.createElement("iframe");
        frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
        frame.title = title;
        frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        preview.replaceChildren(frame);
        preview.setAttribute("aria-label", `${title} is playing`);
        preview.removeAttribute("data-youtube-id");
        frame.focus();
    }, { once: true });
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.projectFilter;
        let visibleProjects = 0;

        filterButtons.forEach((filterButton) => {
            const isSelected = filterButton === button;
            filterButton.classList.toggle("is-active", isSelected);
            filterButton.setAttribute("aria-pressed", String(isSelected));
        });

        projectCards.forEach((card) => {
            const matches = selectedCategory === "all"
                || card.dataset.projectCategory.split(" ").includes(selectedCategory);
            card.hidden = !matches;
            visibleProjects += Number(matches);
        });

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
    });
});
