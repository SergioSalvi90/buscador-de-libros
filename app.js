
document.addEventListener('DOMContentLoaded', loadDefaultBooks);

function loadDefaultBooks() {
    const defaultBooks = [

        { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", coverURL: "https://covers.openlibrary.org/b/id/1-M.jpg" },
        { title: "To Kill a Mockingbird", author: "Harper Lee", coverURL: "https://covers.openlibrary.org/b/id/2-M.jpg" },
        { title: "1984", author: "George Orwell", coverURL: "https://covers.openlibrary.org/b/id/3-M.jpg" },
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverURL: "https://covers.openlibrary.org/b/id/4-M.jpg" },
        { title: "Pride and Prejudice", author: "Jane Austen", coverURL: "https://covers.openlibrary.org/b/id/5-M.jpg" },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", coverURL: "https://covers.openlibrary.org/b/id/6-M.jpg" },
        { title: "To Kill a Mockingbird", author: "Harper Lee", coverURL: "https://covers.openlibrary.org/b/id/7-M.jpg" },
        { title: "The Hobbit", author: "J.R.R. Tolkien", coverURL: "https://covers.openlibrary.org/b/id/8-M.jpg" },
        { title: "The Hunger Games", author: "Suzanne Collins", coverURL: "https://covers.openlibrary.org/b/id/9-M.jpg" },
        { title: "The Da Vinci Code", author: "Dan Brown", coverURL: "https://covers.openlibrary.org/b/id/10-M.jpg" },
        { title: "The Lord of the Rings", author: "J.R.R. Tolkien", coverURL: "https://covers.openlibrary.org/b/id/11-M.jpg" },
        { title: "The Chronicles of Narnia", author: "C.S. Lewis", coverURL: "https://covers.openlibrary.org/b/id/12-M.jpg" },
        { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", coverURL: "https://covers.openlibrary.org/b/id/13-M.jpg" },
        { title: "Brave New World", author: "Aldous Huxley", coverURL: "https://covers.openlibrary.org/b/id/14-M.jpg" },
        { title: "The Shining", author: "Stephen King", coverURL: "https://covers.openlibrary.org/b/id/15-M.jpg" },
        { title: "Moby-Dick", author: "Herman Melville", coverURL: "https://covers.openlibrary.org/b/id/16-M.jpg" },
        { title: "The Odyssey", author: "Homer", coverURL: "https://covers.openlibrary.org/b/id/17-M.jpg" },
        { title: "The Iliad", author: "Homer", coverURL: "https://covers.openlibrary.org/b/id/18-M.jpg" },
        { title: "The Picture of Dorian Gray", author: "Oscar Wilde", coverURL: "https://covers.openlibrary.org/b/id/19-M.jpg" },
        { title: "The Road", author: "Cormac McCarthy", coverURL: "https://covers.openlibrary.org/b/id/20-M.jpg" },
        { title: "The Old Man and the Sea", author: "Ernest Hemingway", coverURL: "https://covers.openlibrary.org/b/id/21-M.jpg" },
        { title: "The Grapes of Wrath", author: "John Steinbeck", coverURL: "https://covers.openlibrary.org/b/id/22-M.jpg" },
        { title: "The Diary of a Young Girl", author: "Anne Frank", coverURL: "https://covers.openlibrary.org/b/id/23-M.jpg" },
        { title: "The Kite Runner", author: "Khaled Hosseini", coverURL: "https://covers.openlibrary.org/b/id/24-M.jpg" },
        { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", coverURL: "https://covers.openlibrary.org/b/id/25-M.jpg" },
        { title: "The Alchemist", author: "Paulo Coelho", coverURL: "https://covers.openlibrary.org/b/id/26-M.jpg" },
        { title: "The Count of Monte Cristo", author: "Alexandre Dumas", coverURL: "https://covers.openlibrary.org/b/id/27-M.jpg" },
        { title: "The Wind in the Willows", author: "Kenneth Grahame", coverURL: "https://covers.openlibrary.org/b/id/28-M.jpg" },
        { title: "The War of the Worlds", author: "H.G. Wells", coverURL: "https://covers.openlibrary.org/b/id/29-M.jpg" },
        { title: "The Stand", author: "Stephen King", coverURL: "https://covers.openlibrary.org/b/id/30-M.jpg" }
    ];

    const resultsContainer = document.getElementById("resultsContainer");

    // Limpia los resultados anteriores
    resultsContainer.innerHTML = "";

    defaultBooks.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <img src="${book.coverURL}" alt="Portada del libro">
    `;

        bookElement.addEventListener("click", () => showBookDetails(book));

        resultsContainer.appendChild(bookElement);
    });
}

function searchBooks() {
    const searchTerm = document.getElementById("searchInput").value;
    const resultsContainer = document.getElementById("resultsContainer");

    // Limpia los resultados anteriores
    resultsContainer.innerHTML = "";

    // Realiza una solicitud a la API de Open Library
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            console.log('Datos de la API:', data);
            const books = data.docs || [];

            books.forEach(book => {
                const bookElement = document.createElement("div");

                const coverURL = book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : 'https://via.placeholder.com/150';

                bookElement.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
          <img src="${coverURL}" alt="Portada del libro">
        `;

                bookElement.addEventListener("click", () => showBookDetails(book));

                resultsContainer.appendChild(bookElement);
            });
        })
        .catch(error => {
            console.error('Error al buscar libros:', error);
        });
}

function showBookDetails(book) {
    const detailsContainer = document.getElementById("detailsContainer");

    detailsContainer.innerHTML = "";

    const detailsElement = document.createElement("div");
    detailsElement.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
  `;

    detailsContainer.appendChild(detailsElement);
}
