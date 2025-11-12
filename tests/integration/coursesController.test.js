const request = require("supertest");
const app = require("../../src/app");
const storage = require("../../src/services/storage");

describe("Courses Controller Integration", () => {
  beforeEach(() => {
    storage.reset();
    storage.seed();
  });

  // Liste des cours (GET /courses)
  test("GET /courses should return paginated list of courses", async () => {
    const res = await request(app).get("/courses");
    expect(res.statusCode).toBe(200);
    expect(res.body.courses.length).toBeGreaterThan(0);
    expect(res.body.total).toBeDefined();
  });

  test("GET /courses should filter by title", async () => {
    const res = await request(app).get("/courses?title=Math");
    expect(res.statusCode).toBe(200);
    res.body.courses.forEach((c) => {
      expect(c.title).toContain("Math");
    });
  });

  //Récupérer un cours existant (GET /courses/:id)
  test("GET /courses/:id should return course with students", async () => {
    const res = await request(app).get("/courses/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.course).toBeDefined();
    expect(res.body.students).toBeInstanceOf(Array);
  });

  test("GET /courses/:id should return 404 if course not found", async () => {
    const res = await request(app).get("/courses/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Course not found");
  });

  // Créer un cours (POST /courses)
  test("POST /courses should create a new course", async () => {
    const res = await request(app)
      .post("/courses")
      .send({ title: "Science", teacher: "Dr. Newton" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Science");
  });

  test("POST /courses should return 400 if title or teacher missing", async () => {
    const res = await request(app).post("/courses").send({ title: "" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("title and teacher required");
  });

  // Supprimer un cours (DELETE /courses/:id)
  test("DELETE /courses/:id should delete existing course", async () => {
    const newCourse = storage.create("courses", {
      title: "Temp",
      teacher: "T",
    });
    const res = await request(app).delete(`/courses/${newCourse.id}`);
    expect(res.statusCode).toBe(204);
  });

  test("DELETE /courses/:id should return 404 if course not found", async () => {
    const res = await request(app).delete("/courses/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Course not found");
  });

  test("DELETE /courses/:id should return 400 if students are enrolled", async () => {
    const course = storage.list("courses")[0];
    storage.enroll(1, course.id); // on inscrit un étudiant
    const res = await request(app).delete(`/courses/${course.id}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Cannot delete course: students are enrolled");
  });

  //  Mettre à jour un cours (PUT /courses/:id)
  test("PUT /courses/:id should update title and teacher", async () => {
    const course = storage.list("courses")[0];
    const res = await request(app)
      .put(`/courses/${course.id}`)
      .send({ title: "Updated Course", teacher: "Updated Teacher" });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Course");
  });

  test("PUT /courses/:id should return 404 if course not found", async () => {
    const res = await request(app)
      .put("/courses/999")
      .send({ title: "DoesNotExist" });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Course not found");
  });

  test("PUT /courses/:id should return 400 if title already exists", async () => {
    const courses = storage.list("courses");
    const course1 = courses[0];
    const course2 = courses[1];

    const res = await request(app)
      .put(`/courses/${course2.id}`)
      .send({ title: course1.title });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Course title must be unique");
  });
});
