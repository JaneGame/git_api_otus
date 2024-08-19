import supertest from "supertest";

import config from "../config/config.js";

import getToken from "../fixtures/token.js";

const {url} = config;




 
const user = {
    addUser:(name, pass) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send({userName: name, password: pass})

    },


    login:async (name, pass) => {
        const {token} = (await getToken(name, pass)).body
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .set('Authorization', `${token}`)
            .send({userName: name, password: pass})
    },

    getUser:async (name, pass, UUID) => {
        const {token} = (await getToken(name, pass)).body
        return supertest(url)
            .get(`/Account/v1/User/${UUID}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({userName: name, password: pass})
    },

    delUser:async (name, pass, UUID) => {
        const {token} = (await getToken(name, pass)).body
        return supertest(url)
            .del(`/Account/v1/User/${UUID}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({userName: name, password: pass})
    }

}


export default user