import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({ command, mode }) => {
  if(command == 'serve') {
    return {
      plugins: [react()],
    }
  } else {
    return {
      plugins: [react()],
      build:{
        outDir: '../server/public',
      }
    }
  }
});