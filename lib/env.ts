/**
 * Environment variable validation using Zod
 * Validates environment variables at build time and runtime
 */

import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Public environment variables (accessible in browser)
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default('http://localhost:3000'),
  NEXT_PUBLIC_FB_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),

  // Server-only environment variables
  MAPBOX_TOKEN: z.string().optional(),
});

// Type inference from the schema
export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables and returns typed object
 * Throws error if validation fails
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(parsed.error.format(), null, 2));
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

// Validate and export environment variables
export const env = validateEnv();

/**
 * Runtime environment variable getter with validation
 * Use this for accessing environment variables to ensure type safety
 */
export function getEnv<K extends keyof Env>(key: K): Env[K] {
  return env[key];
}
