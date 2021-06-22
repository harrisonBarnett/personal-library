const bookContainer = document.getElementById('book-container');
const myLibrary = [];

function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = false;
}

let book1 = new Book("book1", "author1", 1111);
let book2 = new Book("book2", "author2", 2222);
let book3 = new Book("book3", "author3", 3333);
let erin = new Book("erin", "barnett", 1990);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(erin);

function displayBook(book) {
    let div = document.createElement("div");
    div.className = "book-card";

    let title = document.createElement("p");
    let author = document.createElement("p");
    let year = document.createElement("p");
    title.className = "book-title";
    title.innerHTML = "title: " + book.title;
    author.className = "book-author";
    author.innerHTML = "author: " + book.author;
    year.className = "year";
    year.innerHTML = "published: " + book.year;

    let status = document.createElement("button");
    if(!book.read) {
        status.className = "status-button unread-status-button";
        status.innerHTML = "Unread";
    } else {
        status.className = "status-button read-status-button";
        status.innerHTML = "Read";
    }

    let remove = document.createElement("button");
    remove.className = "remove-book-button";
    remove.innerHTML = "Remove";

    div.append(title, author, year, status, remove);

    bookContainer.appendChild(div);
}

function displayAll() {
    myLibrary.forEach(book => {
        displayBook(book);
    })
}

function toggleAddForm() {
    var form = document.getElementById("show-hide-toggle");
    if(form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
function addBook() {
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);
    const title = data.title;
    const author = data.author;
    const year = data.year;
    const read = data.read;

    const book = new Book(title, author, year);
    if(read == "on") {
        book.read = true;
    } else {
        book.read = false;
    }
    myLibrary.push(book);
}

