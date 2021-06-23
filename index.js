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

function addBook() {
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);
    const title = data.title;
    const author = data.author;
    const year = data.year;
    const read = data.read;

    let status = true;
    if(typeof read === "undefined") {
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

function toggleAddForm() {
    var form = document.getElementById("show-hide-toggle");
    if(form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
document.addEventListener('click', function(e) {
    if (e.target.className == 'status-button unread-status-button') {
        e.target.className = 'status-button read-status-button';
        e.target.innerHTML = "Read";
    } else if (e.target.className == 'status-button read-status-button') {
        e.target.className = 'status-button unread-status-button';
        e.target.innerHTML = "Unread";
    }
});


