// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVhouISGiJrZaV_hmzBItSwXtRbbxK34o",
    authDomain: "mylibrary-26517.firebaseapp.com",
    databaseURL: "https://mylibrary-26517-default-rtdb.firebaseio.com",
    projectId: "mylibrary-26517",
    storageBucket: "mylibrary-26517.appspot.com",
    messagingSenderId: "706953740885",
    appId: "1:706953740885:web:0577b51f7bf5a941d30adc"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const books = firebase.database().ref('books');

const bookContainer = document.getElementById('book-container');
const myLibrary = [];

books.once("value") 
    .then(function(snapshot) { // iterate books
        snapshot.forEach(function(childSnapshot) { // iterate elements of book
            var key = childSnapshot.key;
            if(childSnapshot.val().year == 9999) {
                return;
            } else {
                var title = childSnapshot.val().title; 
                var author = childSnapshot.val().author;
                var year = childSnapshot.val().year;
                var read = childSnapshot.val().read;

                let book = new Book(title, author, year, read);
                myLibrary.push(book);
            }
        });
    });

function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}
// takes post data from the "add" form and creates an 
// entry in the db
function addBook() {
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());
    // console.log(data);
    const title = data.title.toUpperCase();
    const author = data.author.toUpperCase();
    const year = data.year;
    const read = data.read;

    let status = true;
    if(typeof read === "undefined") { // checkbox value
        status = false;
    }

    var newBooksRef = books.push({
        title: title,
        author: author,
        year: year,
        read: status
    });

    book = new Book(title, author, year);
    myLibrary.push(book);
}

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
    if(book.read == false) {
        status.className = "status-button unread-status-button";
        status.innerHTML = "Unread";
    } else {
        status.className = "status-button read-status-button";
        status.innerHTML = "Read";
    }

    let removeBtn = document.createElement("button");
    removeBtn.className = "remove-book-button";
    removeBtn.innerHTML = "Remove";

    div.append(title, author, year, status, removeBtn);

    bookContainer.appendChild(div);
}

function displayAll() {
    myLibrary.forEach(book => {
        displayBook(book);
    });
}
function removeAll() {
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        book.remove();
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
// changes color/innertext of read/unread status button on book cards
// sets status of the book to "read" in the db
function trimTitle(e) {
    return e.target.previousSibling.previousSibling.previousSibling.innerHTML.substr(7).trim();
}
document.addEventListener('click', function(e) {
    if (e.target.className == 'status-button unread-status-button') {
        e.target.className = 'status-button read-status-button';
        e.target.innerHTML = "Read";
        var s = trimTitle(e);
        updateReadStatus(s, true);        
    } else if (e.target.className == 'status-button read-status-button') {
        e.target.className = 'status-button unread-status-button';
        e.target.innerHTML = "Unread";
        var s = trimTitle(e);
        updateReadStatus(s, false);
    }
});

// updates the "read" status to true/false in the db
function updateReadStatus(title, status) {
    books.orderByChild('title')
        .equalTo(title)
        .once('value', function (snapshot) {
            snapshot.forEach(function(child) {
                child.ref.update({read: status})
            });
        });
}

