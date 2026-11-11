import axios from 'axios';

const PRODUCTION_API_URL =
  'https://research-ready-production.up.railway.app/api/v1';

const configuredUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
const isLocalhostUrl =
  configuredUrl.includes('localhost') || configuredUrl.includes('127.0.0.1');

const API_BASE_URL = import.meta.env.DEV
  ? configuredUrl || 'http://localhost:8000/api/v1'
  : !isLocalhostUrl && configuredUrl
    ? configuredUrl
    : PRODUCTION_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;
