import supertest from "supertest";

import config from "../config/config.js";

const {url} = config;


function getToken(name, pass){
    return supertest(url)
    .post('/Account/v1/GenerateToken')
    .set('Accept', 'application/json')
    .send({userName: name, password: pass})
}


export default getToken