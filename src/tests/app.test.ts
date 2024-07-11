const request = require('supertest');
const app = require('../app');

console.log("APP", app)

describe('CRUD operations for users', () => {

    let server;
    beforeAll(async () => {
        const mod = await import('../app');
        server = (mod).default;
    });
    afterAll(() => {
        app.close();
    })


    it('should create a new user', async () => {
        const response = await request(server)
            .post('api/register')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@doe.com',
                password: 'password'
            });
        console.log('create user response', response)
        expect(response.statusCode).toBe(201);
    });

    it('should get all users', async () => {
        const response = await request(server).get('/api/users');
        expect(response.statusCode).toBe(200);
    });

    it('should get a user by id', async () => {
        const response = await request(server).get('/api/user/1');
        expect(response.statusCode).toBe(200);
    });


    it('should update a user', async () => {
        const response = await request(server)
            .put('/api/user/1')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@doe.com',
            });
        expect(response.statusCode).toBe(200);
    });
})