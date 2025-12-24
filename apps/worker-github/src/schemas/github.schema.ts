import { z } from 'zod';

export const GithubRepoSchema = z.object({
  name: z.string(),
  url: z.string(),
  visibility: z.string().transform((val) => val.toUpperCase()), // Force MAJUSCULES
  owner_login: z.string().optional(),
});

export const GithubUserSchema = z.object({
  login: z.string(),
  url: z.string(),
});

export type GithubRepo = z.infer<typeof GithubRepoSchema>;
export type GithubUser = z.infer<typeof GithubUserSchema>;