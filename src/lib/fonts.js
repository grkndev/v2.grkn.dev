import { readFile } from 'fs/promises'
import { cache } from 'react'
import 'server-only'

/**
 * Retrieves the regular font file asynchronously.
 * It returns a Promise that resolves to the font file's array buffer.
 * @returns A Promise resolving to the regular font file as an array buffer.
 */
export const getRegularFont = cache(async () => {
  const buffer = await readFile(new URL('../assets/fonts/Geist-Regular.otf', import.meta.url))
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
})

/**
 * Retrieves the bold font file asynchronously.
 * It returns a Promise that resolves to the font file's array buffer.
 * @returns A Promise resolving to the bold font file as an array buffer.
 */
export const getBoldFont = cache(async () => {
  const buffer = await readFile(new URL('../assets/fonts/Geist-Medium.otf', import.meta.url))
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
})

/**
 * Retrieves the quantify font file asynchronously.
 * It returns a Promise that resolves to the font file's array buffer.
 * @returns A Promise resolving to the quantify font file as an array buffer.
 */
export const getQuantifyFont = cache(async () => {
  const buffer = await readFile(new URL('../assets/fonts/Quantify.ttf', import.meta.url))
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
})