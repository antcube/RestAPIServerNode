import request from "supertest";
import server from "../server";

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