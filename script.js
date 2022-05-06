const modal = document.getElementById("modal");
const modalShow = document.getElementById("modal-show");
const modalClose = document.getElementById("modal-close");
const bookmarkForm = document.getElementById("bookmark-from");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

function showModal() {
    modal.classList.add("modal-show");
    websiteNameEl.focus();
}

function closeModal() {
    modal.classList.remove("modal-show");
}

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    e.target.id === "modal" ? closeModal() : false;
});
