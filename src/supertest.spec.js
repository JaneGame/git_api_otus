// eslint-disable-next-line import/no-named-default
import {default as user} from '../framework/services/user.js'

describe('Автотесты с супертестом',()=>{
    let name
    let pass
    
    beforeEach(() =>{
        const date = new Date().getTime()
        name = 'Hi' + date
        pass = 'True!' + date
    });
    
    it('Авторизация', async ()=>{
        const addUsers = await user.addUser(name, pass)
      
        expect(addUsers.status).toEqual(201)


        const login = await user.login(name, pass)
        

        expect(login.status).toEqual(200)
        expect(login.body).toBe(true)
        
    })

    it('Получение информации о пользователе', async ()=>{
        const addUsers = await user.addUser(name, pass)
        const userID = addUsers.body.userID
      
        expect(addUsers.status).toEqual(201)

        const getUser = await user.getUser(name, pass, userID)

        expect(getUser.status).toEqual(200)
        expect(getUser.body.username).toBe(name)
        
    })

    it('Удаление пользователя', async ()=>{
        const addUsers = await user.addUser(name, pass)
        const userID = addUsers.body.userID
        expect(addUsers.status).toEqual(201)


        const login = await user.login(name, pass)
        expect(login.status).toEqual(200)
        expect(login.body).toBe(true)

        const delUser = await user.delUser(name, pass, userID)
        expect(delUser.status).toEqual(204)

        const getUser = await user.getUser(name, pass, userID)
        expect(getUser.status).toEqual(401)
        expect(getUser.body.message).toBe('User not found!')
        
    }, 10000)
})