let myLibrary = []; //Book Array

const formCard = document.querySelector(".form-card")
const newBookButton = document.querySelector("#new-book");
const submitButton = document.querySelector("#submit-button"); 

function Books(image, title, author, pages,read) {
    this.id = crypto.randomUUID();
    this.image = image;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

//Prototype function to toggle read status
    Books.prototype.toggleRead = function() {
        this.read = !this.read;
        //read = not read yet - flips the read.
    };

function addBookToLibrary(image, title, author, pages, read) {
    const newBook = new Books(image, title, author, pages, read);
    myLibrary.push(newBook);
    display();
}

function removeBook(id) {
    // Find index of book with matching ID and remove it
    myLibrary = myLibrary.filter(book => book.id !== id);
    /* 
    function (book) {
    return book.id !== id;}
    */ 
    display();
}

function display() {
    const books = document.querySelector(".books");
    books.innerHTML = "";


    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card");
        bookCard.setAttribute("data-id", book.id);

        bookCard.innerHTML =
        `
            <img src="${book.image}" alt="${book.title}">

            <div class="text">
                <h2>${book.title}</h2>
                <p>${book.author}</p>
                <p>${book.pages} pages</p>
                <p>Status: ${book.read ? "Read" : "Not Read Yet"}</p> 
                
                <button class="toggle-btn">Change Status</button>
                <button class="remove-button">Remove</button>
            </div> 
        `;

        //Remove button event listener
        const removeButton = bookCard.querySelector(".remove-button");
        removeButton.addEventListener("click", () => {
            removeBook(book.id);
        });

        //Toggle Read Event Listener
        const toggleButton = bookCard.querySelector(".toggle-btn");
        toggleButton.addEventListener("click", () => {
            book.toggleRead();
            display()
        })
        
        books.appendChild(bookCard);
    });
}

//Event Listeners
newBookButton.addEventListener("click", () => {
    formCard.style.display = "block";
})

formCard.addEventListener("submit", (e) => {
    e.preventDefault();

    const image = document.querySelector('input[name="image"]').value;
    const title = document.querySelector('input[name="title"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const pages = document.querySelector('input[name="pages"]').value;
    const read = document.querySelector('input[name="read"]').checked;

    addBookToLibrary(image, title, author, pages, read);
    formCard.style.display = "none";
    formCard.reset();
})


addBookToLibrary("./Images/credo mutwa.jpg", "Indaba, my children", "Credo Mutwa", 296, false);
addBookToLibrary("./Images/The Hobbit.jpeg", 'The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary("./Images/Deep Work.jpeg", 'Deep Work', 'Cal Newport', 304, false);

