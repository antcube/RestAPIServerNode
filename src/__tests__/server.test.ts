import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe('GET /api/test', () => {
    it('should send back a JSON response', async () => {
        const res = await request(server).get('/api/test');

        expect(res.status).toBe(200);
        expect(res.header['content-type']).toMatch(/json/);
        expect(res.body.message).toBe('Desde API Test');

        expect(res.status).not.toBe(404);
        expect(res.body.message).not.toBe('desde api test');
    })
});

jest.mock('../config/db')

describe('Connection to the database', () => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Unable to connect to the database'));
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Unable to connect to the database')
        )
    })
})