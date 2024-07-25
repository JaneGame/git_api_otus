describe('Проверка апишек', ()=>{
    
    let name
    let pass
    
    beforeEach(() =>{
        const date = new Date()
        name = 'Hi' + date
        pass = 'True!' + date
    });

    it('Успешное создание нового пользователя', async () =>{
      
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
        });
    
        
    it('Создать пользователя с существующим логином', async () =>{
        const date = new Date();
        
        const addUser = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: 'Hi' + date,
                password: 'True!' + date,
            }),
          })
          const data = await addUser.json()
          console.log(data)
      
          expect(addUser.status).toEqual(201)
          expect(data.username).toBe('Hi' + date)

        const doublelogin = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: 'Hi' + date,
                password: 'True!' + date,
            }),
          })
        const dataError = await doublelogin.json()
        console.log(dataError)
      
        expect(doublelogin.status).toEqual(406)
        expect(dataError.message).toBe('User exists!')

        })

    it('Пароль не подходит для регистрации', async () =>{
        const date = new Date();
        
        const addUser = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: 'Hi' + date,
                password: 'True',
            }),
          })
          const data = await addUser.json()
          console.log(data)
      
          expect(addUser.status).toEqual(400)
          expect(data.message).toContain('Passwords must have')
        })

    it.only('Генерация токена', async () =>{

        
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
    
    }, 50000)
    
})