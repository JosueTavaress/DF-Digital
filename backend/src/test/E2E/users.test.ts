import { describe, test, expect } from "@jest/globals";
import superTest from "supertest";
import { app } from '../../app';

describe("API Suite E2E Users", () => {
  test("POST /user should return an array", async () => {
    const response = await superTest(app).post('/user').send({ name: 'john2', email: "john2@gmail.com", password: "123" })
    const data = response.body;
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("email");
  });
});