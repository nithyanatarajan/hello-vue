import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import apiClient from '@/services/apiClient.js';

describe('apiClient', () => {
  let mock;

  beforeEach(() => {
    // Create a new instance of axios-mock-adapter for the apiClient
    mock = new MockAdapter(apiClient);
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Reset the mock adapter
    mock.reset();
    vi.resetAllMocks();
  });

  describe('Configuration', () => {
    it('should have the correct baseURL', () => {
      // Assert
      expect(apiClient.defaults.baseURL).toBe(import.meta.env.VITE_HOST_API);
    });

    it('should have the correct headers', () => {
      // Assert
      expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
      expect(apiClient.defaults.headers['Accept']).toBe('application/json');
    });

    it('should have withCredentials set to false', () => {
      // Assert
      expect(apiClient.defaults.withCredentials).toBe(false);
    });
  });

  describe('Basic functionality', () => {
    it('should make a successful GET request', async () => {
      // Arrange
      const mockData = { data: 'test data' };
      mock.onGet('/test').reply(200, mockData);

      // Act
      const response = await apiClient.get('/test');

      // Assert
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockData);
    });

    it('should make a successful POST request', async () => {
      // Arrange
      const postData = { name: 'Test Name', value: 'Test Value' };
      const mockResponse = { id: 1, ...postData };
      mock.onPost('/test', postData).reply(201, mockResponse);

      // Act
      const response = await apiClient.post('/test', postData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle a 404 error', async () => {
      // Arrange
      const errorMessage = { message: 'Resource not found' };
      mock.onGet('/nonexistent').reply(404, errorMessage);

      // Act & Assert
      await expect(apiClient.get('/nonexistent')).rejects.toMatchObject({
        response: {
          status: 404,
          data: errorMessage,
        },
      });
    });

    it('should handle a network error', async () => {
      // Arrange
      mock.onGet('/test').networkError();

      // Act & Assert
      await expect(apiClient.get('/test')).rejects.toMatchObject({
        message: 'Network Error',
      });
    });
  });
});
