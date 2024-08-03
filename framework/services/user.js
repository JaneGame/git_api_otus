import supertest from "supertest";

import config from "../config/config.js";

const {url} = config;


const user = {
    addUser:(name, pass) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send({userName: name, password: pass})

    },

    getToken:(name, pass) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send({userName: name, password: pass})
    },

    login:(name, pass, token) => {
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .set('Authorization', `${token}`)
            .send({userName: name, password: pass})
    },

    getUser:(name, pass, token, UUID) => {
        return supertest(url)
            .get(`/Account/v1/User/${UUID}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({userName: name, password: pass})
    },

    delUser:(name, pass, token, UUID) => {
        return supertest(url)
            .del(`/Account/v1/User/${UUID}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({userName: name, password: pass})
    }

}


export default user