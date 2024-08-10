import supertest from "supertest";
import getToken from '../fixtures/token.js';
import config from "../config/config.js";


const {url} = config;


const book = {
    addBook:async(name, pass, UUID) => {
        const {token} = (await getToken(name, pass)).body
        const isbnGet = await (await supertest(url)
            .get('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`))
            .body.books[0].isbn
        return await supertest(url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                userId: UUID,
                collectionOfIsbns: [
                  {
                    isbn: isbnGet
                  }
                ]
              })

            },

    bookPut:async(name, pass, UUID, isbnUser) => {
        const {token} = (await getToken(name, pass)).body
        const isbnGet = await (await supertest(url)
            .get('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`))
            .body.books[3].isbn
        return await supertest(url)
            .put(`/BookStore/v1/Books/${isbnUser}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({userId: UUID, isbn: isbnGet})
    },
    
    bookInfo:async(name, pass)=>{
        const {token} = (await getToken(name, pass)).body
        const isbnGet = await (await supertest(url)
            .get('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`))
            .body.books[0].isbn
        return await supertest(url)
            .get(`/BookStore/v1/Book/`)
            .query({ ISBN: `${isbnGet}` })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
    },
    bookDel:async(name, pass, UUID, isbnUser) => {
        const {token} = (await getToken(name, pass)).body
        return await supertest(url)
            .del(`/BookStore/v1/Book`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({userId: UUID, isbn: isbnUser})
                }
    }

export default book