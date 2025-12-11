import { AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  // Procesar respuesta si es necesario
  const timestamp = new Date().toISOString();
  console.debug(`[${timestamp}] Response from ${response.config.url}`, response.status);

  return response;
};

