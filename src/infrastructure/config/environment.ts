export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  appName: import.meta.env.VITE_APP_NAME || 'JSONPlaceholder CRUD',
  enableLogger: import.meta.env.VITE_ENABLE_LOGGER === 'true',
};

