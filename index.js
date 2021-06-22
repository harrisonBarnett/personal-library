const bookContainer = document.getElementById('book-container');
const myLibrary = [];

function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

let book1 = new Book("book1", "author1", 1111);
let book2 = new Book("book2", "author2", 2222);
let book3 = new Book("book3", "author3", 3333);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

function displayBook(book) {
    let div = document.createElement("div");
    div.className = "book-card";

    let title = document.createElement("p");
    let author = document.createElement("p");
    let year = document.createElement("p");
    title.className = "book-title";
    title.innerHTML = book.title;
    author.className = "book-author";
    author.innerHTML = book.author;
    year.className = "year";
    year.innerHTML = book.year;
    
    let button = document.createElement("button");
    button.className = "remove-book-button";
    button.innerHTML = "Remove";

    div.append(title, author, year, button)

    bookContainer.appendChild(div);
}

function displayAll() {
    myLibrary.forEach(book => {
        displayBook(book);
    })
}

