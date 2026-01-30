import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../../app/components/SearchBar.vue'

describe('SearchBar Component', () => {
  it('renders correctly with modelValue', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'test search'
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('test search')
  })

  it('emits update:modelValue with debounce', async () => {
    vi.useFakeTimers()
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('new search')

    // Should not emit immediately
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    // Fast forward time
    vi.advanceTimersByTime(300)

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new search'])
    vi.useRealTimers()
  })

  it('clears search when clear button is clicked', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'something'
      }
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('does not show clear button when input is empty', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: ''
      }
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })
})
