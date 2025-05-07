import { describe, it, expect, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import EventCard from '../EventCard.vue';

describe('EventCard', () => {
  // Create a mock router
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/event/:id',
        name: 'event-details',
        component: { template: '<div>Event Details</div>' },
      },
    ],
  });

  // Mock event data
  const event = {
    id: 123,
    title: 'Beach Cleanup',
    time: '10:00',
    date: 'August 28, 2022',
  };

  // Create a wrapper function to mount the component with props
  const mountWithProps = (props = {}) => {
    return mount(EventCard, {
      props,
      global: {
        plugins: [router],
      },
    });
  };

  it('renders event title correctly', () => {
    const wrapper = mountWithProps({ event });
    expect(wrapper.find('h2').text()).toBe(event.title);
  });

  it('renders event time and date correctly', () => {
    const wrapper = mountWithProps({ event });
    const timeAndDateText = wrapper.find('span').text();
    expect(timeAndDateText).toContain(event.time);
    expect(timeAndDateText).toContain(event.date);
  });

  it('has the correct CSS class', () => {
    const wrapper = mountWithProps({ event });
    expect(wrapper.find('.event-card').exists()).toBe(true);
  });

  it('throws an error when event prop is missing', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      mountWithProps();
    }).toThrow();

    consoleErrorSpy.mockRestore();
  });
});
