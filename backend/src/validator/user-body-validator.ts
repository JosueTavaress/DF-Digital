import z from 'zod';
// config schema User
export default [
  {
    path: "/user",
    method: "GET",
    schema: z.object({
      name: z.string(),
      email: z.string(),
    })
  },
  {
    path: "/user",
    method: "POST",
    schema: z.object({
      name: z.string().optional(),
      email: z.string().email(),
      password: z.string().optional()
    })
  },
  {
    path: "/user",
    method: "PUT",
    schema: z.object({
      name: z.string(),
      email: z.string(),
      user_links_tag: z.array(z.number()).nonempty().or(z.array(z.number()))
    })
  }];