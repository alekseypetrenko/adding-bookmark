const modal = document.getElementById("modal");
const modalShow = document.getElementById("modal-show");
const modalClose = document.getElementById("modal-close");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

// let bookmarks = [];
let bookmarks = {};

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
        return false;
    }

    return true;
}

function deleteBookmark(url) {
    // bookmarks.forEach((el, index) => {
    //     if (el.url === url) {
    //         bookmarks.splice(index, 1);
    //     }
    // });

    if (bookmarks[url]) {
        delete bookmarks[url];
    }

    // Update bookmarks array in localstorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarksFromLocalStorage();
}

// Build bookmarks DOM
function buildBookmarks() {
    bookmarksContainer.textContent = "";
    Object.keys(bookmarks).forEach((id) => {
        const { name, url } = bookmarks[id];

        // Item
        const item = document.createElement("div");
        item.classList.add("item");
        // Close icon
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("fas", "fa-times");
        closeIcon.setAttribute("title", "Delete Bookmarks");
        closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
        // Favicon / Link container
        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");
        // Favicon
        const favicon = document.createElement("img");
        favicon.setAttribute(
            "src",
            `https://s2.googleusercontent.com/s2/favicons?domain=${url}`,
        );
        favicon.setAttribute("alt", "Favicon");
        // Link

        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank");
        link.textContent = name;

        // Append to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
}

function fetchBookmarksFromLocalStorage() {
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else {
        let id = "http://google.com";
        bookmarks[id] = {
            name: "Google",
            url: "http://google.com",
        };
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    buildBookmarks();
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

    const bookmark = {
        name: nameValue,
        url: urlName,
    };

    // bookmarks.push(bookmark);
    bookmarks[urlName] = bookmark;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarksFromLocalStorage();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

bookmarkForm.addEventListener("submit", storeBookmark);
fetchBookmarksFromLocalStorage();
