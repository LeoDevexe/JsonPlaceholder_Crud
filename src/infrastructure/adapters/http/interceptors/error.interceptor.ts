import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError): Promise<never> => {
  const timestamp = new Date().toISOString();

  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    console.error(`[${timestamp}] API Error:`, {
      status: error.response.status,
      data: error.response.data,
      url: error.config?.url,
    });
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    console.error(`[${timestamp}] Network Error:`, error.message);
  } else {
    // Algo pasó al configurar la petición
    console.error(`[${timestamp}] Request Error:`, error.message);
  }

  return Promise.reject(error);
};

