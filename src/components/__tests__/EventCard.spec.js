import { describe, it, expect, vi } from 'vitest';

import { mount } from '@vue/test-utils';
import EventCard from '../EventCard.vue';

describe('EventCard', () => {
  // Mock event data
  const event = {
    title: 'Beach Cleanup',
    time: '10:00',
    date: 'August 28, 2022',
  };

  it('renders event title correctly', () => {
    const wrapper = mount(EventCard, { props: { event } });
    expect(wrapper.find('h2').text()).toBe(event.title);
  });

  it('renders event time and date correctly', () => {
    const wrapper = mount(EventCard, { props: { event } });
    const timeAndDateText = wrapper.find('span').text();
    expect(timeAndDateText).toContain(event.time);
    expect(timeAndDateText).toContain(event.date);
  });

  it('has the correct CSS class', () => {
    const wrapper = mount(EventCard, { props: { event } });
    expect(wrapper.classes()).toContain('event-card');
  });

  it('throws an error when event prop is missing', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      mount(EventCard);
    }).toThrow();

    consoleErrorSpy.mockRestore();
  });
});
