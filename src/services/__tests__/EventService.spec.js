import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import EventService from '@/services/EventService.js';
import apiClient from '@/services/apiClient.js';

describe('EventService', () => {
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

  describe('getEvents', () => {
    it('should return events', async () => {
      // Arrange
      const mockData = [
        { id: 1, title: 'Event 1' },
        { id: 2, title: 'Event 2' },
      ];
      mock.onGet('/events').reply(200, mockData);

      // Act
      const result = await EventService.getEvents();

      // Assert
      expect(result.data).toEqual(mockData);
    });

    it('should handle 404 error when events endpoint is not found', async () => {
      // Arrange
      const errorMessage = { message: 'Events not found' };
      mock.onGet('/events').reply(404, errorMessage);

      // Act & Assert
      await expect(EventService.getEvents()).rejects.toMatchObject({
        response: {
          status: 404,
          data: errorMessage,
        },
      });
    });

    it('should handle 500 server error', async () => {
      // Arrange
      const errorMessage = { message: 'Internal server error' };
      mock.onGet('/events').reply(500, errorMessage);

      // Act & Assert
      await expect(EventService.getEvents()).rejects.toMatchObject({
        response: {
          status: 500,
          data: errorMessage,
        },
      });
    });

    it('should handle network error', async () => {
      // Arrange
      mock.onGet('/events').networkError();

      // Act & Assert
      await expect(EventService.getEvents()).rejects.toMatchObject({
        message: 'Network Error',
      });
    });
  });

  describe('getEventById', () => {
    it('should return event given id', async () => {
      // Arrange
      const eventId = 123;
      const mockData = { id: eventId, title: 'Event' };
      mock.onGet(`/events/${eventId}`).reply(200, mockData);

      // Act
      const result = await EventService.getEventById(eventId);

      // Assert
      expect(result.data).toEqual(mockData);
    });

    it('should return 404 when id does not exist', async () => {
      // Arrange
      const eventId = 999;
      const errorMessage = { message: 'Event not found' };
      mock.onGet(`/events/${eventId}`).reply(404, errorMessage);

      // Act & Assert
      await expect(EventService.getEventById(eventId)).rejects.toMatchObject({
        response: {
          status: 404,
          data: errorMessage,
        },
      });
    });

    it('should handle 500 server error', async () => {
      // Arrange
      const eventId = 123;
      const errorMessage = { message: 'Internal server error' };
      mock.onGet(`/events/${eventId}`).reply(500, errorMessage);

      // Act & Assert
      await expect(EventService.getEventById(eventId)).rejects.toMatchObject({
        response: {
          status: 500,
          data: errorMessage,
        },
      });
    });

    it('should handle network error', async () => {
      // Arrange
      const eventId = 123;
      mock.onGet(`/events/${eventId}`).networkError();

      // Act & Assert
      await expect(EventService.getEventById(eventId)).rejects.toMatchObject({
        message: 'Network Error',
      });
    });

    it('should handle invalid eventId input', async () => {
      // Test with undefined eventId
      // Arrange
      const undefinedEventId = undefined;

      // Act & Assert
      try {
        await EventService.getEventById(undefinedEventId);
        // If we reach this point, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
      }

      // Test with null eventId
      // Arrange
      const nullEventId = null;

      // Act & Assert
      try {
        await EventService.getEventById(nullEventId);
        // If we reach this point, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
