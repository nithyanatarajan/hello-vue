import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import EventListView from '@/views/EventListView.vue';
import EventService from '@/services/EventService.js';
import EventCard from '@/components/EventCard.vue';

// Mock the EventService
vi.mock('@/services/EventService', () => ({
  default: {
    getEvents: vi.fn(),
  },
}));

// Mock the EventCard component
vi.mock('@/components/EventCard.vue', () => ({
  default: {
    name: 'EventCard',
    props: ['event'],
    template: '<div class="event-card-stub">{{ event.title }}</div>',
  },
}));

describe('EventListView', () => {
  const mockEvents = [
    { id: 1, title: 'Event 1', description: 'Description 1' },
    { id: 2, title: 'Event 2', description: 'Description 2' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Set up the mock to return a successful response
    EventService.getEvents.mockResolvedValue({
      data: mockEvents,
    });
  });

  it('calls EventService.getEvents when mounted', async () => {
    mount(EventListView);

    // Assert that EventService.getEvents was called
    expect(EventService.getEvents).toHaveBeenCalledTimes(1);
  });

  it('displays events returned by EventService.getEvents', async () => {
    const wrapper = mount(EventListView);

    // Wait for promises to resolve
    await flushPromises();

    // Assert that the component displays the correct number of events
    const eventCards = wrapper.findAllComponents(EventCard);
    expect(eventCards.length).toBe(mockEvents.length);

    // Assert that each event card receives the correct event prop
    mockEvents.forEach((event, index) => {
      expect(eventCards[index].props('event')).toEqual(event);
    });
  });

  it('displays the correct heading', () => {
    const wrapper = mount(EventListView);

    // Assert that the component displays the correct heading
    expect(wrapper.find('h1').text()).toBe('Events For Good');
  });

  it('handles API error gracefully', async () => {
    // Set up the mock to return an error
    const error = new Error('API Error');
    EventService.getEvents.mockRejectedValue(error);

    // Spy on console.error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(EventListView);

    // Wait for promises to resolve
    await flushPromises();

    // Assert that console.error was called with the correct message
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching events:', error);

    // Assert that no event cards are displayed
    const eventCards = wrapper.findAllComponents(EventCard);
    expect(eventCards.length).toBe(0);

    // Restore console.error
    consoleSpy.mockRestore();
  });
});
