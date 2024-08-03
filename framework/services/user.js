import supertest from "supertest";

import config from "../config/config.js";

const {url} = config;
const {name} = config;
const {pass} = config;

// let token = '';

const user = {
    addUser:() => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept/', 'application/json')
            .send({userName: name, password: pass})

    }
}


export default user