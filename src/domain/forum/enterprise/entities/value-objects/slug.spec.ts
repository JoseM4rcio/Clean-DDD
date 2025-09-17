import { Slug } from "../../../enterprise/entities/value-objects/slug";

test("it should be able to create a new slug from text", () => {
  const slug = Slug.createFromText("An Example Title");

  expect(slug.value).toEqual("an-example-title");
});
