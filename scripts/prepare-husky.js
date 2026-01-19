#!/usr/bin/env node

import { execSync } from 'child_process'

// Skip Husky installation in CI environments
const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'

if (isCI) {
  console.log('⏭️  Skipping Husky installation in CI environment')
  process.exit(0)
}

// Run Husky installation
try {
  execSync('husky', { stdio: 'inherit' })
} catch {
  // Husky might not be critical, exit gracefully
  console.warn('⚠️  Husky installation skipped (non-critical)')
  process.exit(0)
}
