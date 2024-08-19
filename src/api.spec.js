// eslint-disable-next-line import/no-named-default
import {default as user} from '../framework/services/user.js'
import getToken from '../framework/fixtures/token.js'





describe('Проверка апишек', ()=>{
    
    let name
    let pass
    
    beforeEach(() =>{
        const date = new Date().getTime()
        name = 'Hi' + date
        pass = 'True!' + date
    });
    

    it('Успешное создание нового пользователя', async () =>{
      
        const addUsers = await user.addUser(name, pass)

      
        expect(addUsers.status).toEqual(201)
        expect(addUsers.body.username).toBe(name)
        });
    
        
    it('Создать пользователя с существующим логином', async () =>{
        
        const addUsers = await user.addUser(name, pass)
      
        expect(addUsers.status).toEqual(201)

        const doublelogin = await user.addUser(name, pass)
      
        expect(doublelogin.status).toEqual(406)
        expect(doublelogin.body.message).toBe('User exists!')

        })

    it('Пароль не подходит для регистрации', async () =>{
        
        const addUsers = await user.addUser(name, '123')
      
        expect(addUsers.status).toEqual(400)
        expect(addUsers.body.message).toContain('Passwords must have')
        })

    it('Генерация токена', async () =>{

        
        const addUsers = await user.addUser(name, pass)
      
        expect(addUsers.status).toEqual(201)
        
        const token = await getToken(name, pass)

        expect(token.status).toEqual(200)
        expect(token.body.result).toBe('User authorized successfully.')
        expect(token.body.token).toString()
    
    }, 10000)


    it('Неудачная генерация токена', async () =>{

        const addUsers = await user.addUser(name, pass)
      
        expect(addUsers.status).toEqual(201)

    
        const token = await getToken(name, '123')


        expect(token.status).toEqual(200)
        expect(token.body.result).toBe('User authorization failed.')
    
    })
    
})