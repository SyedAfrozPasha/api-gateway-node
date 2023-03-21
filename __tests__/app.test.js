const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../src/app/routes/auth.route");

const app = new express();
app.use(bodyParser.json());
app.use("/api/exp/auth/v1", router);

describe("POST /register", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/register").send({
      userName: "testUser@test.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
  });
});
