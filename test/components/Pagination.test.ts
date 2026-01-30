import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../../app/components/Pagination.vue'

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 12
  }

  it('renders current page and total pages', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    expect(wrapper.text()).toContain('Page 1 of 5')
    expect(wrapper.find('select').element.value).toBe('12')
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 5,
        totalPages: 5,
      },
    })

    const buttons = wrapper.findAll('button')
    const nextButton = buttons[buttons.length - 1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emits update:currentPage when clicking page number', async () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    // Click on page 2 button (skip prev button)
    const buttons = wrapper.findAll('button')
    // Button order: Prev, 1, 2, 3, 4, 5, Next
    // Index 2 should be page 2 (Prev is 0, 1 is 1, 2 is 2)
    // Wait, let's look at the component logic again from the view_file output.
    // If currentPage is 1, visiblePages are [1, 2, 3, 4, 5, ..., 10]
    // But here totalPages is 5. So [1, 2, 3, 4, 5].
    // Buttons: [Prev, 1, 2, 3, 4, 5, Next]
    // Index 0: Prev
    // Index 1: 1
    // Index 2: 2
    await buttons[2].trigger('click')

    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([2])
  })

  it('shows ellipsis for large page counts', () => {
    const wrapper = mount(Pagination, {
      props: {
        ...defaultProps,
        currentPage: 5,
        totalPages: 20,
      },
    })

    expect(wrapper.text()).toContain('...')
  })

  it('emits update:itemsPerPage and resets page when limit changes', async () => {
    const wrapper = mount(Pagination, {
      props: defaultProps,
    })

    const select = wrapper.find('select')
    await select.setValue('25')

    expect(wrapper.emitted('update:itemsPerPage')?.[0]).toEqual([25])
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([1])
  })
})
