class Book{
  constructor(title, author,lbl, isbn) {
    this.title = title;
    this.author = author;
    this.lbl = lbl;
    this.isbn = isbn;
    console.log(title, author, lbl, isbn);

  }
}
class UI{
    showAlert(message, className){
    //create div
    const div = document.createElement('div');
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    //timeout after 2 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 1000);
  }

 deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  
  clearFields(){
    document.getElementById('title').value = '';  
    document.getElementById('author').value = '';
    document.getElementById('category').value = '';
    document.getElementById('isbn').value = '';
  }

}
//local storage class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }
}
//dom load event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

//event listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    lbl = document.getElementById('category').value,
    isbn = document.getElementById('isbn').value
    console.log(title, author, lbl, isbn);
    
  const book = new Book(title, author, lbl, isbn);
  
  const ui = new UI();

  if(title === '' || author === '' || lbl === '' || isbn === '' ){
    //error alert
    //alert('Please fill in all fields !!');
    ui.showAlert('Please fill in all fields !!', 'error');
  } else {
     //add to list 
    //ui.addBookToList(book);  
    
    //add to local storage
    Store.addBook(book);

    //show success
    ui.showAlert('Book Added !!','success');
   
    ui.clearFields();
  }

   e.preventDefault();
});

