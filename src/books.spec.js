/* eslint-disable import/no-named-default */
import {default as book} from '../framework/services/book'
import {default as user} from '../framework/services/user.js'



describe('Операции с книгами',() => {

    let name
    let pass
    
    beforeEach(() =>{
        const date = new Date().getTime()
        name = 'Hi' + date
        pass = 'True!' + date
    });

    it('Добавить книгу', async()=>{
        
        const addUsers = await user.addUser(name, pass)
        const UUID = addUsers.body.userID
      
        expect(addUsers.status).toEqual(201)
        
        const addBook = await book.addBook(name, pass, UUID);
        
        expect(addBook.status).toEqual(201);

    });

    it('Обновить книгу', async()=>{
        
        const addUsers = await user.addUser(name, pass)
        const UUID = addUsers.body.userID
      
        expect(addUsers.status).toEqual(201)
        
        const addBook = await book.addBook(name, pass, UUID);
        const book1 = addBook.body.books[0].isbn
        
        expect(addBook.status).toEqual(201);

        const putBook = await book.bookPut(name, pass, UUID, book1)
        expect(putBook.status).toEqual(200);
        expect(putBook.body.books[0].isbn).not.toEqual(book1);

    });

    it('Получить информацию о книге', async()=>{
        
        const addUsers = await user.addUser(name, pass)
        const UUID = addUsers.body.userID
      
        expect(addUsers.status).toEqual(201)
        
        const addBook = await book.addBook(name, pass, UUID);
        
        expect(addBook.status).toEqual(201);
        
        const putBook = await book.bookInfo(name, pass);
        expect(putBook.status).toEqual(200);
        expect(typeof putBook.body.isbn).toEqual('string');

    });

    it('Удалить информацию о книге', async()=>{
        
        const addUsers = await user.addUser(name, pass)
        const UUID = addUsers.body.userID
      
        expect(addUsers.status).toEqual(201)
        
        const addBook = await book.addBook(name, pass, UUID);
        const bookUser = addBook.body.books[0].isbn
        
        expect(addBook.status).toEqual(201);
        
        const bookDelete = await book.bookDel(name, pass,UUID, bookUser);

        expect(bookDelete.status).toEqual(204);

    });
});