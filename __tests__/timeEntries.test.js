const request = require("supertest");
const app = require("../src/app/main");

describe("Time Entry Route Testing", () => {
  let token = null;
  let id = null;

  beforeAll(async () => {
    jest.mock("../src/app/services/auth.service.js");
    jest.mock("../src/app/utils/auth.utils.js");

    const authResult = await request(app).post("/api/exp/auth/v1/login").send({
      userName: "username",
      password: "password",
    });

    token = JSON.parse(authResult.text).token;
  });

  describe("POST /entries", () => {
    beforeEach(() => {
      jest.mock("../src/app/services/timeEntries.service");
      jest.mock("../src/app/utils/passport.utils.js");
    });

    test("POST /entries - 200", async () => {
      const response = await request(app)
        .post("/api/exp/time-management/v1/entries")
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send({
          startTime: "03/20/2023",
          endTime: "03/25/2023",
          employeeId: "10",
          type: "Vacation",
          description: "PTO",
        });

      expect(response.statusCode).toBe(200);
    });

    test("POST /entries - 400", async () => {
      const response = await request(app)
        .post("/api/exp/time-management/v1/entries")
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send({
          startTime: "03/20/2023",
          endTime: "03/25/2023",
          type: "Vacation",
          description: "PTO",
        });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /entries/:employeeId", () => {
    beforeEach(() => {
      jest.mock("../src/app/services/timeEntries.service");
      jest.mock("../src/app/utils/passport.utils.js");
    });

    test("GET /entries/:employeeId - 200", async () => {
      const response = await request(app)
        .get("/api/exp/time-management/v1/entries/10")
        .set({
          Authorization: `Bearer ${token}`,
        });
      id = JSON.parse(response.text)._id;
      expect(response.statusCode).toBe(200);
    });

    test("GET /entries/:employeeId - 400", async () => {
      const response = await request(app)
        .get("/api/exp/time-management/v1/entries/0")
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("PUT /entries/:id", () => {
    beforeEach(() => {
      jest.mock("../src/app/services/timeEntries.service");
      jest.mock("../src/app/utils/passport.utils.js");
    });

    // test("PUT /entries/:id - 200", async () => {
    //   const response = await request(app)
    //     .put(`/api/exp/time-management/v1/entries/${id}`)
    //     .set({
    //       Authorization: `Bearer ${token}`,
    //     })
    //     .send({
    //       description: "PTO",
    //     });
    //   expect(response.statusCode).toBe(200);
    // });

    test("PUT /entries/:id - 400", async () => {
      const response = await request(app)
        .put(`/api/exp/time-management/v1/entries/${id}`)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send({
          startTime: 123,
        });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("DELETE /entries/:id", () => {
    beforeEach(() => {
      jest.mock("../src/app/services/timeEntries.service");
      jest.mock("../src/app/utils/passport.utils.js");
    });

    test("DELETE /entries/:id - 200", async () => {
      const response = await request(app)
        .delete(`/api/exp/time-management/v1/entries/${id}`)
        .set({
          Authorization: `Bearer ${token}`,
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
