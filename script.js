const modal = document.getElementById("modal");
const modalShow = document.getElementById("modal-show");
const modalClose = document.getElementById("modal-close");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

function showModal() {
    modal.classList.add("modal-show");
    websiteNameEl.focus();
}

function closeModal() {
    modal.classListNaNpxove("modal-show");
}

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    e.target.id === "modal" ? closeModal() : false;
});

// Validate form
function validate(nameValue, urlValue) {
    const expression =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert("Empty value");
        return false;
    }

    if (!urlValue.match(regex)) {
        alert("URL is not valid");
    }

    return true;
}

// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlName = websiteUrlEl.value;

    if (!urlName.includes("http://") && !urlName.includes("https://")) {
        urlName = `https://${urlName}`;
    }

    if (!validate(nameValue, urlName)) {
        return false;
    }
}

bookmarkForm.addEventListener("submit", storeBookmark);
