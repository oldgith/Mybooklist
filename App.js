
// Book class for book
class Book{
    constructor(title,auth,sr){
      this.title=title;
      this.auth=auth;
      this.sr=sr; 
    }
}
//Storage
// local storge is used wgich is predefind in browsers
// it stores as key value pair
// so here i am pushing evey book as keyword 'books'
class Store{
  static  getBooks(){
      let books;
      if(localStorage.getItem('books')===null){
          books=[];
      }
      else {
          books=JSON.parse(localStorage.getItem('books'));
      }
return books;
    }
    static addBook(book){
        const allbooks=Store.getBooks();
        allbooks.push(book);
        localStorage.setItem('books',JSON.stringify(allbooks));

    }

    static removeBook(sr){
        const allbooks=Store.getBooks();
        allbooks.forEach((book,index)=>{
            if(book.sr===sr){
                allbooks.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(allbooks));

    }
  
}

// Class UI: Handle ui
class Ui{
     static displayBooks(){
        
         const books=Store.getBooks();
        books.forEach((book)=> Ui.addBookToList(book) );

     }
     static addBookToList(book){
         const list=document.querySelector('#book-list');
         const row=document.createElement('tr');
         row.innerHTML=
         `<td>${book.title}</td> 
         <td>${book.auth}</td>
         <td>${book.sr}</td>
         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
         `;
        
         list.appendChild(row);
     }
     static addBookToStore(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td> 
        <td>${book.auth}</td>
        <td>${book.sr}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
       
        list.appendChild(row);

        Store.addBook(book);
     }
     static deleteBook(e){
         if(e.classList.contains('delete')){
            e.parentElement.parentElement.remove();
           }
     }
     static showAlert(message,className){
         const temp=document.createElement("div");
        temp.className=`alert alert-${className}`;
        temp.appendChild(document.createTextNode(message));
        const form=document.getElementById("book-form");
        const container=document.querySelector(".container");
        container.insertBefore(temp,form);
        // Vanish alert in 2 sec
        setTimeout(()=>document.querySelector(".alert").remove(),2000);
     }

}
// Event
document.addEventListener('DOMContentLoaded',Ui.displayBooks);

//Take input
const title=document.getElementById("title");
const auth=document.querySelector("#auth");
const sr=document.querySelector("#sr");

function AddBook(){
    if(title.value.length>0 && auth.value.length>0 && sr.value.length>0){
      const book=new Book(title.value,auth.value,sr.value);
        Ui.addBookToStore(book);
        Ui.showAlert("Yayy!! Book added",'success');
        title.value=""; auth.value=""; sr.value="";
    }
    else{
        Ui.showAlert('Please fill the from properly','danger');

    }
}
document.querySelector("#book-form").addEventListener('submit',AddBook);

// REmove a book
document.querySelector("#book-list").addEventListener('click',(e)=>{
 Ui.deleteBook(e.target);

 console.log(e.target.parentElement.previousElementSibling.textContent);
 Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 Ui.showAlert("Yayy!! Book removed",'success');
});



