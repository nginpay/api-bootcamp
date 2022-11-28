const request = require('supertest')
const app = require('../app')

//testar o cadastro de um usuário com sucesso
describe('Create User Test', () => {
    it('should create a new user with valid values', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                firstName: "jane",
                lastName: "Doe",
                email: "jane.doe@email.com"
            })
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('user')
    })
})

describe('Create User Test', () => {
    it('should not create user with invalid values', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                firstName: "jane",
                lastName: "Doe",
            })
            expect(res.statusCode).toEqual(400)
    })
})

describe('List All Users', () => {
    it('should list all user from database', async () => {
        const res = await request(app)
            .get('/api/users')
        expect(res.statusCode).toEqual(200)
    })
})
