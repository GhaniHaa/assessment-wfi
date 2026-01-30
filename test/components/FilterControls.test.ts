import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterControls from '../../app/components/FilterControls.vue'

describe('FilterControls Component', () => {
  const defaultProps = {
    roles: [],
    genders: []
  }

  it('renders all role and gender options', () => {
    const wrapper = mount(FilterControls, {
      props: defaultProps
    })

    const roles = ['ADMIN', 'MODERATOR', 'USER']
    const genders = ['male', 'female']

    roles.forEach(role => {
      expect(wrapper.text()).toContain(role)
    })
    genders.forEach(gender => {
      expect(wrapper.text()).toContain(gender)
    })
  })

  it('highlights selected roles', () => {
    const wrapper = mount(FilterControls, {
      props: {
        roles: ['admin'],
        genders: []
      }
    })

    const adminBtn = wrapper.findAll('button').find(b => b.text().includes('ADMIN'))
    expect(adminBtn?.classes()).toContain('badge-admin')
  })

  it('emits update:roles when clicking a role', async () => {
    const wrapper = mount(FilterControls, {
      props: defaultProps
    })

    const adminBtn = wrapper.findAll('button').find(b => b.text().includes('ADMIN'))
    await adminBtn?.trigger('click')

    expect(wrapper.emitted('update:roles')?.[0]).toEqual([['admin']])
  })

  it('removes role when clicking selected role', async () => {
    const wrapper = mount(FilterControls, {
      props: {
        roles: ['admin'],
        genders: []
      }
    })

    const adminBtn = wrapper.findAll('button').find(b => b.text().includes('ADMIN'))
    await adminBtn?.trigger('click')

    expect(wrapper.emitted('update:roles')?.[0]).toEqual([[]])
  })

  it('emits update:genders when clicking a gender', async () => {
    const wrapper = mount(FilterControls, {
      props: defaultProps
    })

    const maleBtn = wrapper.findAll('button').find(b => b.text().includes('male'))
    await maleBtn?.trigger('click')

    expect(wrapper.emitted('update:genders')?.[0]).toEqual([['male']])
  })
})
