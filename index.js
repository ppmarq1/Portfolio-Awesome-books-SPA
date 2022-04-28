// Form local storage availability checker function
function isStorageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // 1) everything except Firefox
      // 2) Firefox
      // test name field too, because code might not be present
      // 3) everything except Firefox
      // 4) Firefox
      // 5) acknowledge QuotaExceededError only if there's something already stored
      e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && (storage && storage.length !== 0);
  }
}

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector('#added-book');
const bookList = document.querySelector('.added-bklist');

let books = [];

// If there's local data available,
if (isStorageAvailable('localStorage')) {
  const data = JSON.parse(localStorage.getItem('bookList'));
  // and if it's not empty, update it
  if (data) {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
}

// Create classes
class Bookshelf {
  constructor(books) {
    this.books = books;
  }

  addBook(title, author) {
    const book = {
      id: Math.floor(Math.random() * 1000000),
      title: title.value,
      author: author.value,
    };

    this.books.push(book);

    if (isStorageAvailable('localStorage')) {
      localStorage.setItem('bookList', JSON.stringify(this.books));
    }
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== parseInt(id, 10));
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.updateBookList();
  }

  updateBookList() {
    bookList.innerHTML = '';

    this.books.forEach((el) => {
      bookList.innerHTML += `<div>
      <p>"<span class="title">${el.title}</span>" by <span class="author">${el.author}</span></p>
      <button id="${el.title}" onclick="remove('${el.id}')" class="remove">Remove</button>
      </div>`;
    });
  }
}

const newbook = new Bookshelf(books);

form.onsubmit = () => {
  newbook.addBook(title, author);

  newbook.updateBookList();

  form.reset();
};

newbook.updateBookList();

const remove = (id) => {
  newbook.remove(id);
};
remove();
const allBooks = document.querySelector('.all-books');
const addBook = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const navList = document.querySelector('#list');
const navAdd = document.querySelector('#add');
const navContact = document.querySelector('#contact');

navList.onclick = () => {
  navList.style.color = 'darkblue';
  navAdd.style.removeProperty('color');
  navContact.style.removeProperty('color');
  allBooks.classList.remove('hide');
  addBook.classList.add('hide');
  contact.classList.add('hide');
};

navAdd.onclick = () => {
  navAdd.style.color = 'darkblue';
  navList.style.removeProperty('color');
  navContact.style.removeProperty('color');
  addBook.classList.remove('hide');
  allBooks.classList.add('hide');
  contact.classList.add('hide');
};

navContact.onclick = () => {
  navContact.style.color = 'darkblue';
  navList.style.removeProperty('color');
  navAdd.style.removeProperty('color');
  contact.classList.remove('hide');
  addBook.classList.add('hide');
  allBooks.classList.add('hide');
};

const siteDate = document.querySelector('#date');

function time() {
  const date = new Date();
  const locale = navigator.language;
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: 'true',
  };
  siteDate.textContent = `${date.toLocaleTimeString(locale, options)}`;
  return siteDate;
}
setInterval(time, 1000);
