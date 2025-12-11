import { environment } from './environment';
import { HTTP_TIMEOUT } from './constants';

export const apiConfig = {
  baseURL: environment.apiBaseUrl,
  timeout: HTTP_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

