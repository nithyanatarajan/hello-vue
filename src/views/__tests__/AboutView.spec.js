import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutView from '@/views/AboutView.vue';

describe('AboutView', () => {
  it('renders the component', () => {
    const wrapper = mount(AboutView);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct heading', () => {
    const wrapper = mount(AboutView);
    expect(wrapper.find('h1').text()).toBe('A site for events to better the world.');
  });

  it('has the correct CSS class', () => {
    const wrapper = mount(AboutView);
    expect(wrapper.find('div').classes()).toContain('about');
  });
});
