#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { config } from 'dotenv';
import { BASE_API_URL } from '../src/utils/env.config';

// Load environment variables from .env file
config();

// Check if generated types already exist
const typesExist = existsSync('src/client/types.gen.ts') && 
                  existsSync('src/client/services.gen.ts') && 
                  existsSync('src/client/schemas.gen.ts');

// Get the API URL from environment variables (now properly loaded from .env)
const API_URL = process.env.VITE_API_URL || process.env.API_URL || BASE_API_URL;

if (!API_URL) {
  if (typesExist) {
    console.log('✅ No API URL found in .env file, but existing types found. Using committed types.');
    console.log('💡 To regenerate types, add VITE_API_URL to your .env file and run: pnpm generate:types');
    process.exit(0);
  } else {
    console.error('❌ No API URL found in .env file and no existing types available!');
    console.error('📝 Please add VITE_API_URL to your .env file or commit generated types to git.');
    process.exit(1);
  }
}

console.log(`🔄 Generating types from: ${API_URL}-json`);

try {
  // Set the API_URL for the openapi-ts config
  process.env.API_URL = API_URL;
  
  // Run openapi-ts via pnpm to use the locally installed version
  execSync('pnpm openapi-ts', { 
    stdio: 'inherit',
    env: { ...process.env, API_URL } 
  });
  
  console.log('✅ Types generated successfully!');
} catch (error) {
  console.error('❌ Failed to generate types:', error.message);
  
  // Check if this is an API-related error that we can recover from
  const errorMessage = error.message.toLowerCase();
  const isRecoverableError = 
    // Network errors
    errorMessage.includes('enotfound') || 
    errorMessage.includes('econnrefused') ||
    errorMessage.includes('etimedout') ||
    errorMessage.includes('econnreset') ||
    // OpenAPI/API schema errors
    errorMessage.includes('token') && errorMessage.includes('does not exist') ||
    errorMessage.includes('unexpected error occurred') ||
    errorMessage.includes('error opening file') ||
    // HTTP errors
    errorMessage.includes('404') ||
    errorMessage.includes('500') ||
    errorMessage.includes('502') ||
    errorMessage.includes('503') ||
    // Command failures (common in CI)
    errorMessage.includes('command failed');
  
  if (isRecoverableError && typesExist) {
    console.warn('⚠️  API not accessible or schema invalid, but existing types found.');
    console.warn('💡 Using committed types. This is normal for CI/CD environments.');
    process.exit(0);
  } else if (isRecoverableError && !typesExist) {
    console.error('❌ API not accessible and no existing types available!');
    console.error('📝 Please ensure your API is running or commit generated types to git.');
  }
  
  // Don't fail the build in CI environments if we have existing types
  const isCI = process.env.CI || process.env.RENDER || process.env.VERCEL || process.env.NETLIFY;
  if (isCI && typesExist) {
    console.warn('⚠️  CI environment detected. Using existing committed types.');
    process.exit(0);
  }
  
  process.exit(1);
} 