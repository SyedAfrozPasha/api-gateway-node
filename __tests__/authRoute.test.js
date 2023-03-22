const request = require("supertest");
const app = require("../src/app/main");

describe("Auth Route Testing", () => {
  describe("POST /register", () => {
    beforeEach(function () {
      jest.mock("../src/app/services/auth.service.js");
      jest.mock("../src/app/utils/auth.utils.js");
    });

    test("POST /register - 200", async () => {
      const response = await request(app)
        .post("/api/exp/auth/v1/register")
        .send({
          userName: "username",
          password: "password",
        });
      expect(response.statusCode).toBe(200);
    });

    test("POST /register - 400", async () => {
      const response = await request(app)
        .post("/api/exp/auth/v1/register")
        .send({
          userName: "username",
        });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("POST /login", () => {
    beforeEach(function () {
      jest.mock("../src/app/services/auth.service.js");
      jest.mock("../src/app/utils/auth.utils.js");
    });

    test("POST /login - 200", async () => {
      const response = await request(app).post("/api/exp/auth/v1/login").send({
        userName: "username",
        password: "password",
      });
      console.log("response:", response);
      expect(response.statusCode).toBe(200);
    });

    test("POST /login - 404", async () => {
      const response = await request(app).post("/api/exp/auth/v1/login").send({
        userName: "username1",
        password: "password1",
      });
      expect(response.statusCode).toBe(404);
    });

    test("POST /login - 401", async () => {
      const response = await request(app).post("/api/exp/auth/v1/login").send({
        userName: "username",
        password: "password1",
      });
      expect(response.statusCode).toBe(401);
    });

    test("POST /login - 400", async () => {
      const response = await request(app).post("/api/exp/auth/v1/login").send({
        userName: "username",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
