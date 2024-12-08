import { json } from 'stream/consumers';
import env from '../config/api' // Assuming the 'api' file is located in the 'configs' directory

const baseURL = env.baseUrl

function getToken(): string | null {
  return localStorage.getItem('accessToken') || null
}

// Helper function to handle API errors
async function handleApiError(response: Response, responseBody: any): Promise<any> {
  if (response.ok) {
    return null;
  }

  const error = {
    message: response.statusText,
    status: response.status,
    ...responseBody
  };

  console.error('API Error:', error.status, error.message);

  if (error?.error) {
    return error.error;
  }

  if (Array.isArray(error?.errors)) {
    return error.errors
      .map((e: any, i: any) => (`${i + 1}. ${e?.rule} - ${e?.message}` as string).substring(0, 100))
      .join('\n');
  } else if (typeof error === 'object') {
    return `${error?.code} - ${error?.message}`?.substring(0, 100);
  }
  
  return error.message;
}

// Define the API methods
async function fetchData<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const responseBody = await response.json(); // Read response body once

  const error = await handleApiError(response, responseBody); // Handle errors
  if (error) {
    throw new Error(error);
  }

  return responseBody as T; // Return data
}





export async function get<T>(endpoint: string, options?: { query?: any }): Promise<T> {
  const token = getToken();
  const url = new URL(endpoint, baseURL);
  
  if (options?.query) {
    Object.keys(options.query).forEach(key => url.searchParams.append(key, options.query[key]));
  }
  
  return fetchData<T>(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
}

// export async function post<T>(endpoint: string, data: any, opt?: { formData?: boolean }): Promise<T> {
  
//   console.log("data", data);
//   const token = getToken();
//   const headers: HeadersInit = {
//     'Content-Type': opt?.formData ? 'multipart/form-data' : 'application/json',
//     ...(token ? { 'Authorization': `Bearer ${token}` } : {})
//   };

//   return fetchData<T>(`${baseURL}${endpoint}`, {
//     method: 'POST',
//     headers,
//     body: opt?.formData ? data : JSON.stringify(data)
//   });
// }

// export async function post<T>(endpoint: string, data: any, opt?: { formData?: boolean }): Promise<T> {
//   try {
//     const token = getToken();
//     const headers: HeadersInit = {
//       ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
//       ...(opt?.formData ? {} : { 'Content-Type': 'application/json' })
//     };

   

//     const response = await fetch(`${baseURL}${endpoint}`, {
//       method: 'POST',
//       headers,
//       body: opt?.formData ? data : JSON.stringify(data)
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result: T = await response.json();

   
//     return result;
//   } catch (error) {
//     console.error('Error in POST request:', error);
//     throw error;
//   }
// }

// export async function post<T>(endpoint: string, data: any, opt?: { formData?: boolean }): Promise<{ success: boolean; message: string  }> {
//   try {
//     const token = getToken();
//     const headers: HeadersInit = {
//       ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
//       ...(opt?.formData ? {} : { 'Content-Type': 'application/json' })
//     };

//     const response = await fetch(`${baseURL}${endpoint}`, {
//       method: 'POST',
//       headers,
//       body: opt?.formData ? data : JSON.stringify(data)
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       let errorMessage = 'An error occurred';

//       if (errorText.includes('SQLSTATE[HY000]')) {
//         errorMessage = 'Could NOt reach Server. Please contact support.';
//       } else if (errorText.startsWith('<!DOCTYPE html>')) {
//         errorMessage = 'A server error occurred. Please try again later.';
//       } else {
//         try {
//           const errorJson = JSON.parse(errorText);
//           errorMessage = errorJson.message || errorMessage;
//         } catch {
//           errorMessage = errorText;
//         }
//       }

//       throw new Error(errorMessage);
//     }

//     const contentType = response.headers.get('Content-Type');
//     if (contentType && contentType.includes('application/json')) {
//       const result = await response.json();
//       return { success: result.success || false, message: result.message || 'Unknown error' };
//     } else {
//       throw new Error('Unexpected content type: ' + contentType);
//     }
//   } catch (error) {
//     // if (error instanceof Error) {
//     //   if (error.message.includes('Failed to fetch')) {
//     //     throw new Error('Network error: Could not reach the server.');
//     //   }
//     //   throw new Error(` ${error.message}`);
//     // }
//     throw new Error('An unknown error occurred.');
//   }
// }


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T; // Use generics to specify the data type
  validationErrors?: Record<string, string[]>;
}

export async function post<T>(
  endpoint: string, 
  data: any, 
  opt?: { formData?: boolean }
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      ...(opt?.formData ? {} : { 'Content-Type': 'application/json' })
    };

    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: opt?.formData ? data : JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'An error occurred';
      let validationErrors: Record<string, string[]> | undefined;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || 'Validation Error';
        if (errorJson.data) {
          validationErrors = errorJson.data;
        }
      } catch {
        errorMessage = 'Failed to parse error response.';
      }

      throw { message: errorMessage, validationErrors };
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const result = await response.json();
      return { 
        success: result.success || false, 
        message: result.message || 'Unknown error', 
        data: result.data, // Return the data in the response
        validationErrors: result.validationErrors || undefined 
      };
    } else {
      throw new Error('Unexpected content type: ' + contentType);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Detailed error: ${error.message}`);
    }
    throw error;
  }
}






export async function put<T>(endpoint: string, data: any, opt?: { formData?: boolean }): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': opt?.formData ? 'multipart/form-data' : 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  return fetchData<T>(`${baseURL}${endpoint}`, {
    method: 'PUT',
    headers,
    body: opt?.formData ? data : JSON.stringify(data)
  });
}

export async function patch<T>(endpoint: string, data: any, opt?: { formData?: boolean }): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': opt?.formData ? 'multipart/form-data' : 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  return fetchData<T>(`${baseURL}${endpoint}`, {
    method: 'PATCH',
    headers,
    body: opt?.formData ? data : JSON.stringify(data)
  });
}

export async function del<T>(endpoint: string): Promise<T> {
  const token = getToken();
  return fetchData<T>(`${baseURL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
}

const Api = {
  get,
  post,
  put,
  patch,
  del
}

export default Api;