import { generateRandomCode } from "@/lib/org";

test("Generate a random code", () => {
  expect(generateRandomCode()).toMatch(/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/);
  expect(generateRandomCode()).toHaveLength(19);
});
