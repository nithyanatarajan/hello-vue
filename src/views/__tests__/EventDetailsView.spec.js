import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import EventDetailsView from '@/views/EventDetailsView.vue';
import EventService from '@/services/EventService.js';

// Mock the EventService
vi.mock('@/services/EventService', () => ({
  default: {
    getEventById: vi.fn(),
  },
}));

describe('EventDetailsView', () => {
  const mockEvent = {
    id: 123,
    title: 'Beach Cleanup',
    time: '10:00',
    date: 'August 28, 2022',
    location: 'Daytona Beach',
    description: "Let's clean up the beach",
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Set up the mock to return a successful response
    EventService.getEventById.mockResolvedValue({
      data: mockEvent,
    });
  });

  it('calls EventService.getEventById with the correct ID when mounted', async () => {
    const id = '123';
    mount(EventDetailsView, {
      props: { id },
    });

    // Assert that EventService.getEventById was called with the correct ID
    expect(EventService.getEventById).toHaveBeenCalledTimes(1);
    expect(EventService.getEventById).toHaveBeenCalledWith(id);
  });

  it('displays event details returned by EventService.getEventById', async () => {
    const wrapper = mount(EventDetailsView, {
      props: { id: '123' },
    });

    // Wait for promises to resolve
    await flushPromises();

    // Assert that the component displays the correct event details
    expect(wrapper.find('h2').text()).toBe(mockEvent.title);
    expect(wrapper.find('p').text()).toContain(mockEvent.time);
    expect(wrapper.find('p').text()).toContain(mockEvent.date);
    expect(wrapper.find('p').text()).toContain(mockEvent.location);
    expect(wrapper.findAll('p')[1].text()).toBe(mockEvent.description);
  });

  it('handles API error gracefully', async () => {
    // Set up the mock to return an error
    const error = new Error('API Error');
    EventService.getEventById.mockRejectedValue(error);

    // Spy on console.error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    mount(EventDetailsView, {
      props: { id: '123' },
    });

    // Wait for promises to resolve
    await flushPromises();

    // Assert that console.error was called with the correct message
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching events:', error);

    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('warns when id prop is missing', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mount(EventDetailsView);

    // Assert that a warning was issued for the missing prop
    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(consoleWarnSpy.mock.calls[0][0]).toContain('Missing required prop: "id"');

    consoleWarnSpy.mockRestore();
  });
});
