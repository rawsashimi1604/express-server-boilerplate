import request from "supertest";
import makeApp from "../../src/app.js";
import { jest } from "@jest/globals";

const getAllTypes = jest.fn();

const mockDB = {
  relations: {
    type: {
      getAllTypes,
    },
  },
};

const app = makeApp(mockDB);

describe("GET /api/types", () => {
  const endpoint = "/api/types";

  describe("GET request sent", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /api/types/all", () => {
  const endpoint = "/api/types/all";

  beforeEach(() => {
    getAllTypes.mockReset();
    getAllTypes.mockResolvedValue({
      rows: [
        { type_id: 1, type: "Fire" },
        { type_id: 2, type: "Grass" },
        { type_id: 3, type: "Water" },
      ],
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("GET request sent", () => {
    test("should receive a json object", async () => {
      const response = await request(app).get(endpoint);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should respond with 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });

    test("should respond with 500 status code when error is encountered", async () => {
      getAllTypes.mockImplementation(() => {
        throw new Error();
      });
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(500);
    });

    test("should receive a json object that contains pokemon types", async () => {
      const types = ["Fire", "Water", "Grass"];

      const response = await request(app).get(endpoint);
      for (const type of types) {
        expect(response.body.some((item) => item.type === type)).toBe(true);
      }
    });
  });
});
