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

// the book object
function Book(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

//*****************************
// DA DISPLAY/CLEAR ZONE
//*****************************
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
// queries the db and creates a book object
// of each entry and calls displayBook()
function displayAll() {
    removeAll();
    books.once("value") 
    .then(function(snapshot) { // iterate books
        snapshot.forEach(function(childSnapshot) { // iterate elements of book
            var title = childSnapshot.val().title;
            var author = childSnapshot.val().author;
            var year = childSnapshot.val().year;
            var read = childSnapshot.val().read;
            if(year === 9999) {
                return;
            } else {
            const book = new Book(title, author, year, read);
            displayBook(book);
            }
        });
    });
}
// search the DOM for all book cards and remove them
function removeAll() {
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        book.remove();
    })
}

// query db on title and remove
function removeBook(title){
    books.orderByChild('title')
        .equalTo(title)
        .once('value', function (snapshot) {
            snapshot.forEach(function(child) {
                child.ref.remove();
            });
        });
}
// helper fxn
function trimTitleRemove(e) {
    return e.target.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML.substr(7).trim();
}
// add an event to call removeBook()
document.addEventListener('click', function(e) {
    if(e.target.className == 'remove-book-button') {
        var s = trimTitleRemove(e);
        console.log(s);
        e.target.innerHTML = "hello";
        removeBook(s);
    }
})

//*****************************
// DA ADD BOOK ZONE
//*****************************
// toggles the addBook() form on and off
function toggleAddForm() {
    var form = document.getElementById("show-hide-toggle");
    if(form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}
// takes post data from the "add" form and creates an 
// entry in the db
function addBook() {
    const form = document.querySelector('.add-book-form');
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
}

//*****************************
// DA UPDATE READ STATUS ZONE
//*****************************
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
// helper fxn
function trimTitleRead(e, elements) {
    return e.target.previousSibling.previousSibling.previousSibling.innerHTML.substr(7).trim();
    
}
// adds an event to call updateReadStatus()
document.addEventListener('click', function(e) {
    if (e.target.className == 'status-button unread-status-button') {
        e.target.className = 'status-button read-status-button';
        e.target.innerHTML = "Read";
        var s = trimTitleRead(e, 7);
        updateReadStatus(s, true);        
    } else if (e.target.className == 'status-button read-status-button') {
        e.target.className = 'status-button unread-status-button';
        e.target.innerHTML = "Unread";
        var s = trimTitleRead(e);
        updateReadStatus(s, false);
    }
});




