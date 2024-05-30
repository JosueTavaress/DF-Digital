import { describe, test, expect } from "@jest/globals";
import superTest from "supertest";
import { app } from '../../app';

describe("API Suite E2E Users", () => {
  test("GET /user should return an array", async () => {
    const response = await superTest(app).get('/user');
    const data = response.body;
    expect(data).toBeInstanceOf(Array);
  });
});