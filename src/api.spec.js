import {user} from '../framework/services/user.js'

describe('Проверка апишек', ()=>{
    
    let name
    let pass
    
    beforeEach(() =>{
        const date = new Date().getTime()
        name = 'Hi' + date
        pass = 'True!' + date
    });

    it.only('Успешное создание нового пользователя', async () =>{
      
        // const addUser = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         userName: name,
        //         password: pass,
        //     }),
        //   })
        const addUsers = await user.addUser()
        const data = await addUsers.json()
        console.log(data)
      
        expect(addUsers.status).toEqual(201)
        expect(data.username).toBe(name)
        });
    
        
    it('Создать пользователя с существующим логином', async () =>{
        
        const addUser = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: name,
                password: pass,
            }),
          })
          const data = await addUser.json()
          console.log(data)
      
          expect(addUser.status).toEqual(201)
          expect(data.username).toBe(name)

        const doublelogin = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: name,
                password: pass,
            }),
          })
        const dataError = await doublelogin.json()
        console.log(dataError)
      
        expect(doublelogin.status).toEqual(406)
        expect(dataError.message).toBe('User exists!')

        })

    it('Пароль не подходит для регистрации', async () =>{
        
        const addUser = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: name,
                password: 'True',
            }),
          })
          const data = await addUser.json()
          console.log(data)
      
          expect(addUser.status).toEqual(400)
          expect(data.message).toContain('Passwords must have')
        })

    it('Генерация токена', async () =>{

        
        const addUser = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: name,
                password: pass,
            }),
          })
          const data = await addUser.json()
          console.log(data)
      
          expect(addUser.status).toEqual(201)
          expect(data.username).toBe(name)
        

        const token = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: data.username,
                password: pass,
        }),

    })
            const dataToken = await token.json()
            console.log(dataToken)

            expect(token.status).toEqual(200)
            expect(dataToken.result).toBe('User authorized successfully.')
            expect(dataToken.token).toString()
    
    }, 10000)


    it('Неудачная генерация токена', async () =>{

        const token = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: name,
                password: 1,
        }),

    })
            const dataToken = await token.json()
            console.log(dataToken)

            expect(token.status).toEqual(200)
            expect(dataToken.result).toBe('User authorization failed.')
    
    })
    
})