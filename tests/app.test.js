const request = require('supertest')
const app = require('../app')

describe('Teste hello world', () => {
    it('should show hello world', async () => {
        const res = await request(app)
        .get('/api')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('msg')
    })
})