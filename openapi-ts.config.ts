import { BASE_API_URL } from "./src/utils/env.config";

const API_URL = process.env.API_URL || process.env.VITE_API_URL || BASE_API_URL || 'http://localhost:3005';

export default {
  client: "@hey-api/client-axios",
  input: `${API_URL}-json`,
  output: "src/client",
  types: {
    enums: "typescript",
  },
};
