/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    reporters: ['junit'],
    outputFile: 'testsReports/test-junit.xml'
  },
})
