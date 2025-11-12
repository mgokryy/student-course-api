const request = require("supertest");
const app = require("../../src/app");

describe("Student-Course API integration", () => {
  beforeEach(() => {
    const storage = require("../../src/services/storage");
    storage.reset();
    storage.seed();
    storage.list("enrollments").length = 0;
  });

  //  Étudiants
  test("GET /students should return seeded students", async () => {
    const res = await request(app).get("/students");
    expect(res.statusCode).toBe(200);
    expect(res.body.students.length).toBe(3);
    expect(res.body.students[0].name).toBe("Alice");
  });

  test("POST /students should create a new student", async () => {
    const res = await request(app)
      .post("/students")
      .send({ name: "David", email: "david@example.com" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("David");
  });

  test("POST /students should not allow duplicate email", async () => {
    const res = await request(app)
      .post("/students")
      .send({ name: "Eve", email: "alice@example.com" });
    expect(res.statusCode).toBe(400);
  });

  //  Cours
  test("DELETE /courses/:id should delete a course even if students are enrolled", async () => {
    const courses = await request(app).get("/courses");
    const courseId = courses.body.courses[0].id;
    await request(app).post(`/courses/${courseId}/students/1`);
    const res = await request(app).delete(`/courses/${courseId}`);
    expect(res.statusCode).toBe(400);
  });

  //  Inscription d’un étudiant à un cours
  test("POST /courses/:courseId/students/:studentId should enroll a student successfully", async () => {
    const courses = await request(app).get("/courses");
    const courseId = courses.body.courses[0].id;
    const res = await request(app).post(`/courses/${courseId}/students/1`);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("POST /courses/:courseId/students/:studentId should return 400 if already enrolled", async () => {
    const courses = await request(app).get("/courses");
    const courseId = courses.body.courses[0].id;
    await request(app).post(`/courses/${courseId}/students/1`);
    const res = await request(app).post(`/courses/${courseId}/students/1`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("POST /courses/:courseId/students/:studentId should return 400 if invalid course", async () => {
    const res = await request(app).post("/courses/9999/students/1");
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  //  Désinscription d’un étudiant
  test("DELETE /courses/:courseId/students/:studentId should unenroll a student successfully", async () => {
    const courses = await request(app).get("/courses");
    const courseId = courses.body.courses[0].id;
    await request(app).post(`/courses/${courseId}/students/1`);
    const res = await request(app).delete(`/courses/${courseId}/students/1`);
    expect(res.statusCode).toBe(204);
  });

  test("DELETE /courses/:courseId/students/:studentId should return 404 if not enrolled", async () => {
    const courses = await request(app).get("/courses");
    const courseId = courses.body.courses[0].id;
    const res = await request(app).delete(`/courses/${courseId}/students/1`);
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe("App integration tests", () => {
  test("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/unknown-route");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Not Found" });
  });
});
