import { defineType, defineField } from "sanity";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Frontend & Backend", value: "frontendbackend" },
          { title: "Databases", value: "databases" },
          { title: "Tools", value: "tools" },
        ],
      },
    }),
    defineField({
      name: "level",
      title: "Skill Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
          
        ],
      },
    }),
    // defineField({
    //   name: "level",
    //   title: "Skill Level",
    //   type: "number",
    //   validation: (Rule) => Rule.min(1).max(100),
    // }),
  ],
});
