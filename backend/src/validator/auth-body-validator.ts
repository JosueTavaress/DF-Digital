import z from 'zod';
// config schema auth (login)
export default {
  path: "/auth",
  method: "POST",
  schema: z.object({
    password: z.string(),
    email: z.string(),
  })
}