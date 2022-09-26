import request from "supertest";
import makeApp from "../../src/app.js";
import { jest } from "@jest/globals";

// Stop logging
beforeAll(() => {
  global.console = { log: jest.fn() }
})

const getAllVehicles = jest.fn();

const mockDB = {
  relations: {
    vehicle: {
      getAllVehicles,
    },
  },
};

const app = makeApp(mockDB);

describe("GET /api/vehicles", () => {
  const endpoint = "/api/vehicles";

  describe("GET request sent", () => {
    test("should respond with 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /api/vehicles/all", () => {
  const endpoint = "/api/vehicles/all";

  beforeEach(() => {
    getAllVehicles.mockReset();
    getAllVehicles.mockResolvedValue({
      rows: [
        { id: 1, vehicle: "Honda" },
        { id: 2, vehicle: "Mitsubishi" },
        { id: 3, vehicle: "BMW" },
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
      getAllVehicles.mockImplementation(() => {
        throw new Error();
      });
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(500);
    });

    test("should receive a json object that contains vehicles", async () => {
      const vehicles = ["Honda", "Mitsubishi", "BMW"];

      const response = await request(app).get(endpoint);
      for (const vehicle of vehicles) {
        expect(response.body.some((item) => item.vehicle === vehicle)).toBe(true);
      }
    });
  });
});
