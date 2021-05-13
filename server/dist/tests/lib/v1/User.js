"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../../app');
const userController_1 = __importDefault(require("../../../src/controller/userController"));
const User = require('../../../src/models/user');
chai.use(chaiHttp);
let token = '';
describe("User", () => {
    context('Api', () => {
        it('Should login', (resolve) => {
            chai.request(app)
                .post('/api/user/login')
                .send({
                email: 'tiberiu.stancu@softvision.com',
                password: '!Mypassword123'
            })
                .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('user');
                res.body.user.should.have.property('email').eql('tiberiu.stancu@softvision.com');
                res.body.should.have.property('token');
                token = res.body.token;
                resolve();
            });
        });
        it('Should not login: wrong email', (resolve) => {
            chai.request(app)
                .post('/api/user/login')
                .send({
                email: 'tiberiu.stancu@softvision123.com',
                password: '!Mypassword123'
            })
                .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('message');
                resolve();
            });
        });
        it('Should not login: wrong password', (resolve) => {
            chai.request(app)
                .post('/api/user/login')
                .send({
                email: 'tiberiu.stancu@softvision.com',
                password: '!Mypassword1234'
            })
                .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message');
                resolve();
            });
        });
        it("Should log out", (resolve) => {
            if (token) {
                chai.request(app)
                    .post('/api/user/logout')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    resolve();
                });
            }
        });
    });
    context('Model', () => {
        it('Should get users', (resolve) => {
            const user = new userController_1.default();
            user.getUser()
                .then(resp => {
                should(resp).to.be.a('array');
                should(resp).to.not.be.null;
            });
            resolve();
        });
    });
});
