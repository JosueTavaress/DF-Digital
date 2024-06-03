import z from 'zod';

export default {
  path: "/tag",
  method: "POST",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
  })
}