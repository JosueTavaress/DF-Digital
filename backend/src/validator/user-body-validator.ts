import z from 'zod';
// config schema User
export default {
  path: "/user",
  schema: z.object({
    name: z.string(),
    email: z.string(),
  })
}