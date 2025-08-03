const library = [];

document.querySelector("#cancel").addEventListener("click", modalHide);
document.querySelector("#addBook").addEventListener("click", modalShow);
document.querySelector(".close").addEventListener("click", modalHide);
document.querySelector("#add").addEventListener("click", addBook);

function Book(title, author, numberOfPages, isRead) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

function modalShow() {
  let modal = document.querySelector(".modal");
  modal.style.display = "block";
  modal.style.animation = "appear 1s";
  //let modal = document.querySelector(".modal-content");
  //modal.style.animation = "animate-top 0.5s";
}

function modalHide() {
  //let modal = document.querySelector(".modal-content");
  //modal.style.animation = "animate-hide 0.5s";
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#numberOfPages").value = 1;
  document.querySelector("#isRead").checked = false;
  let modal = document.querySelector(".modal");
  modal.style.display = "none";
  modal.style.animation = "vanish 1s";
}

function addBook() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let numberOfPages = document.querySelector("#numberOfPages").value;
  let isRead = document.querySelector("#isRead").checked;
  let book = new Book(title, author, numberOfPages, isRead);
  library.push(book);
  addHTML(book);
  modalHide();
  if (library.length == 1) {
    showTable();
  }
}

function addHTML(book) {
  let tbody = document.querySelector("#myTable");
  let tr = document.createElement("tr");
  tr.id = "T" + book.id;
  let td1 = document.createElement("td");
  td1.innerHTML = book.id;
  let td2 = document.createElement("td");
  td2.innerHTML = book.title;
  let td3 = document.createElement("td");
  td3.innerHTML = book.author;
  let td4 = document.createElement("td");
  td4.innerHTML = book.numberOfPages;
  let td5 = document.createElement("td");
  let td6 = document.createElement("td");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = book.isRead;
  checkbox.id = "C" + book.id;
  td5.appendChild(checkbox);

  let button = document.createElement("button");
  button.innerHTML = "Delete";
  button.id = "B" + book.id;
  button.addEventListener("click", function () {
    deleteBook(button);
  });
  td6.appendChild(button);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tbody.appendChild(tr);
}

function deleteBook(button) {
  let id = button.id.substr(1);
  let book = library.find((a) => a.id === id);
  let index = library.indexOf(book);
  let row = document.querySelector("#T" + id);
  row.remove();
  library.splice(index, 1);
  console.log(library.length);
  if (library.length == 0) {
    hideTable();
  }
}

function showTable() {
  document.querySelector("#table1").style.display = "table";
}

function hideTable() {
  document.querySelector("#table1").style.display = "none";
}
