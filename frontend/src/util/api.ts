import axios, { AxiosResponse } from 'axios';

export async function get(
  endpoint: string,
  params?: { [key: string]: any; }
): Promise<AxiosResponse> {
  try {
    const url = `${process.env.API_URL}${endpoint}`
    return await axios.get(url, { params });
  } catch (error) {
    throw error;
  }
}

export async function post(
  endpoint: string,
  data: { [key: string]: any; }
): Promise<AxiosResponse> {
  try {
    const url = `${process.env.API_URL}${endpoint}`
    return await axios.post(url, data);
  } catch (error) {
    throw error;
  }
}
