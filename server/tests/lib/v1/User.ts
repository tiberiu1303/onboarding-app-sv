const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const app = require('../../../app')
import { Model, Query } from 'mongoose'
import { UserInterface } from "../../../src/interfaces/user"
import UserController from "../../../src/controller/userController"
const User: Model<UserInterface> = require('../../../src/models/user')

chai.use(chaiHttp);

type fnc = Function

let token: string = ''

describe("User", () => {
  context('Api', () => {
      it('Should login', (resolve: fnc) => {
        chai.request(app)
        .post('/api/user/login')
        .send({
          email: 'tiberiu.stancu@softvision.com',
          password: '!Mypassword123'
        })
        .end((err: any, res: any) => {
          res.should.have.status(201);
          res.body.should.have.property('user');
          res.body.user.should.have.property('email').eql('tiberiu.stancu@softvision.com');
          res.body.should.have.property('token');

          token = res.body.token
          resolve()
        })
    })
    it('Should not login: wrong email', (resolve: fnc) => {
      chai.request(app)
      .post('/api/user/login')
      .send({
        email: 'tiberiu.stancu@softvision123.com',
        password: '!Mypassword123'
      })
      .end((err: any, res: any) => {
        res.should.have.status(404);
        res.body.should.have.property('message');

        resolve()
      })
    })
    it('Should not login: wrong password', (resolve: fnc) => {
      chai.request(app)
      .post('/api/user/login')
      .send({
        email: 'tiberiu.stancu@softvision.com',
        password: '!Mypassword1234'
      })
      .end((err: any, res: any) => {
        res.should.have.status(400);
        res.body.should.have.property('message');

        resolve()
      })
    })
    it("Should log out", (resolve: fnc) => {
        if (token) {
            chai.request(app)
            .post('/api/user/logout')
            .set('Authorization', 'Bearer ' + token)
            .end((err: any, res: any) => {
              res.should.have.status(200);
              res.body.should.have.property('message');
    
              resolve()
            })
        }
    })
  })
  context('Model', () => {
    it('Should get users', (resolve: fnc) => {
        const user = new UserController()

        user.getUser()
        .then(resp => {
            should(resp).to.be.a('array')
            should(resp).to.not.be.null
        })

        resolve()
    })
  })
});