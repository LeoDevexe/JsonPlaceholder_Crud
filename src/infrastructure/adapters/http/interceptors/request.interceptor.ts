import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = (
  config: AxiosRequestConfig
): InternalAxiosRequestConfig => {
  // Aquí puedes agregar tokens de autenticación, logs, etc.
  const timestamp = new Date().toISOString();
  console.debug(`[${timestamp}] Request to ${config.url}`);

  return config as InternalAxiosRequestConfig;
};

