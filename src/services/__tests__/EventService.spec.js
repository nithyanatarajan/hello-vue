import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import EventService from '@/services/EventService.js';

// Mock the axios module
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
    })),
  },
}));

describe('EventService', () => {
  const mockResponse = {
    data: [
      { id: 1, title: 'Event 1' },
      { id: 2, title: 'Event 2' },
    ],
  };

  const mockAxiosClient = {
    get: vi.fn(),
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup axios.create to return mockAxiosClient
    axios.create.mockReturnValue(mockAxiosClient);

    // Setup get to the mock response
    mockAxiosClient.get.mockResolvedValue(mockResponse);
  });

  describe('getEvents', () => {
    it('calls axios with the correct endpoint', async () => {
      // Call the method
      await EventService.getEvents();

      // Assert that axios.create was called
      expect(axios.create).toHaveBeenCalledTimes(1);

      // Assert that the get method was called with the correct endpoint
      expect(mockAxiosClient.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosClient.get).toHaveBeenCalledWith('/events');
    });

    it('returns the data from the API call', async () => {
      // Call the method
      const result = await EventService.getEvents();

      // Assert that the method returns the data from the API call
      expect(result).toEqual(mockResponse);
    });
  });
});
