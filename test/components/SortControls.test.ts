import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SortControls from '../../app/components/SortControls.vue'

describe('SortControls Component', () => {
  const defaultProps = {
    field: 'firstName' as const,
    order: 'asc' as const
  }

  it('renders sort options', () => {
    const wrapper = mount(SortControls, {
      props: defaultProps
    })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Age')
    expect(wrapper.text()).toContain('Email')
  })

  it('highlights current sort field', () => {
    const wrapper = mount(SortControls, {
      props: defaultProps
    })

    // Find the button for Name (firstName)
    const nameBtn = wrapper.findAll('button').find(b => b.text().includes('Name'))
    expect(nameBtn?.classes()).toContain('bg-white')
    expect(nameBtn?.classes()).toContain('shadow-sm')
  })

  it('emits update:field and resets order when clicking new field', async () => {
    const wrapper = mount(SortControls, {
      props: defaultProps
    })

    // Click Age button
    const ageBtn = wrapper.findAll('button').find(b => b.text().includes('Age'))
    await ageBtn?.trigger('click')

    expect(wrapper.emitted('update:field')?.[0]).toEqual(['age'])
    expect(wrapper.emitted('update:order')?.[0]).toEqual(['asc'])
  })

  it('toggles order when clicking same field', async () => {
    const wrapper = mount(SortControls, {
      props: defaultProps
    })

    // Click Name button (currently selected)
    const nameBtn = wrapper.findAll('button').find(b => b.text().includes('Name'))
    await nameBtn?.trigger('click')

    expect(wrapper.emitted('update:order')?.[0]).toEqual(['desc'])
  })

  it('toggles order back to asc', async () => {
    const wrapper = mount(SortControls, {
      props: {
        field: 'firstName',
        order: 'desc'
      }
    })

    const nameBtn = wrapper.findAll('button').find(b => b.text().includes('Name'))
    await nameBtn?.trigger('click')

    expect(wrapper.emitted('update:order')?.[0]).toEqual(['asc'])
  })
})
