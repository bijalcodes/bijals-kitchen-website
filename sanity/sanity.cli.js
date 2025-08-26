import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'YOUR_PROJECT_ID', // Replace with your actual project ID
    dataset: 'production'
  }
})