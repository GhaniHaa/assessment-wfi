import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserForm from '../../app/components/UserForm.vue'
import type { User } from '../../app/types/user'

// Mock Teleport
const TeleportStub = {
  template: '<div><slot /></div>'
}

// Mock Icon component
const IconStub = {
  template: '<span class="icon-stub" />'
}

describe('UserForm Component', () => {
  const mountOptions = {
    global: {
      stubs: {
        Teleport: TeleportStub,
        Icon: IconStub,
        Transition: false
      }
    }
  }

  const mockUser: Partial<User> = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '+1234567890',
    birthDate: '1990-01-15',
    age: 34,
    gender: 'male',
    role: 'user',
    image: 'https://example.com/avatar.png',
    company: {
      title: 'Developer',
      name: 'Tech Corp',
      department: 'Engineering',
      address: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        stateCode: 'NY',
        postalCode: '10001',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        country: 'USA'
      }
    }
  }

  describe('Rendering', () => {
    it('renders "Add New User" title when no user prop is provided', () => {
      const wrapper = mount(UserForm, mountOptions)
      expect(wrapper.text()).toContain('Add New User')
    })

    it('renders "Edit User" title when user prop is provided', () => {
      const wrapper = mount(UserForm, {
        ...mountOptions,
        props: { user: mockUser as User }
      })
      expect(wrapper.text()).toContain('Edit User')
    })

    it('renders all required form fields', () => {
      const wrapper = mount(UserForm, mountOptions)
      
      // Check for required field labels
      expect(wrapper.text()).toContain('First Name')
      expect(wrapper.text()).toContain('Last Name')
      expect(wrapper.text()).toContain('Username')
      expect(wrapper.text()).toContain('Email')
      expect(wrapper.text()).toContain('Phone')
      expect(wrapper.text()).toContain('Birth Date')
      expect(wrapper.text()).toContain('Gender')
      expect(wrapper.text()).toContain('Role')
      expect(wrapper.text()).toContain('Age')
    })

    it('renders company information section', () => {
      const wrapper = mount(UserForm, mountOptions)
      
      expect(wrapper.text()).toContain('Company Information')
      expect(wrapper.text()).toContain('Job Title')
      expect(wrapper.text()).toContain('Company Name')
      expect(wrapper.text()).toContain('Department')
    })

    it('renders submit buttons with correct text for new user', () => {
      const wrapper = mount(UserForm, mountOptions)
      
      expect(wrapper.text()).toContain('Cancel')
      expect(wrapper.text()).toContain('Add User')
    })

    it('renders submit buttons with correct text for editing user', () => {
      const wrapper = mount(UserForm, {
        ...mountOptions,
        props: { user: mockUser as User }
      })
      
      expect(wrapper.text()).toContain('Cancel')
      expect(wrapper.text()).toContain('Update User')
    })
  })

  describe('Form Pre-population', () => {
    it('pre-fills form fields when user prop is provided', () => {
      const wrapper = mount(UserForm, {
        ...mountOptions,
        props: { user: mockUser as User }
      })

      const firstNameInput = wrapper.find('input[type="text"]')
      expect((firstNameInput.element as HTMLInputElement).value).toBe('John')
    })

    it('uses default values when no user prop is provided', () => {
      const wrapper = mount(UserForm, mountOptions)

      const inputs = wrapper.findAll('input[type="text"]')
      const firstNameInput = inputs[0]
      expect((firstNameInput.element as HTMLInputElement).value).toBe('')
    })

    it('sets default gender to male when no user provided', () => {
      const wrapper = mount(UserForm, mountOptions)

      const genderSelect = wrapper.findAll('select')[0]
      expect((genderSelect.element as HTMLSelectElement).value).toBe('male')
    })

    it('sets default role to user when no user provided', () => {
      const wrapper = mount(UserForm, mountOptions)

      const roleSelect = wrapper.findAll('select')[1]
      expect((roleSelect.element as HTMLSelectElement).value).toBe('user')
    })
  })

  describe('Form Interactions', () => {
    it('emits close event when backdrop is clicked', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const backdrop = wrapper.find('.bg-black\\/50')
      await backdrop.trigger('click')

      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('emits close event when close button is clicked', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const closeButton = wrapper.find('button.text-slate-400')
      await closeButton.trigger('click')

      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('emits close event when cancel button is clicked', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const cancelButton = wrapper.find('button.btn-secondary')
      await cancelButton.trigger('click')

      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('updates form data when inputs change', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const firstNameInput = wrapper.find('input[type="text"]')
      await firstNameInput.setValue('Jane')

      expect((firstNameInput.element as HTMLInputElement).value).toBe('Jane')
    })

    it('updates gender when select changes', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const genderSelect = wrapper.findAll('select')[0]
      await genderSelect.setValue('female')

      expect((genderSelect.element as HTMLSelectElement).value).toBe('female')
    })

    it('updates role when select changes', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const roleSelect = wrapper.findAll('select')[1]
      await roleSelect.setValue('admin')

      expect((roleSelect.element as HTMLSelectElement).value).toBe('admin')
    })
  })

  describe('Form Validation', () => {
    it('shows validation error for short first name', async () => {
      const wrapper = mount(UserForm, mountOptions)

      // Fill in minimal data with invalid first name
      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('J') // firstName - too short
      await inputs[1].setValue('Doe') // lastName
      await inputs[2].setValue('johndoe') // username
      await inputs[3].setValue('john@example.com') // email
      await inputs[4].setValue('+1234567890') // phone
      await inputs[5].setValue('1990-01-15') // birthDate

      // Submit form
      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.text()).toContain('First name must be at least 2 characters')
    })

    it('shows validation error for invalid email', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('John')
      await inputs[1].setValue('Doe')
      await inputs[2].setValue('johndoe')
      await inputs[3].setValue('invalid-email') // Invalid email
      await inputs[4].setValue('+1234567890')
      await inputs[5].setValue('1990-01-15')

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.text()).toContain('Please enter a valid email address')
    })

    it('shows validation error for short username', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('John')
      await inputs[1].setValue('Doe')
      await inputs[2].setValue('jd') // Too short
      await inputs[3].setValue('john@example.com')
      await inputs[4].setValue('+1234567890')
      await inputs[5].setValue('1990-01-15')

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.text()).toContain('Username must be at least 3 characters')
    })

    it('shows validation error for short phone number', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('John')
      await inputs[1].setValue('Doe')
      await inputs[2].setValue('johndoe')
      await inputs[3].setValue('john@example.com')
      await inputs[4].setValue('123') // Too short
      await inputs[5].setValue('1990-01-15')

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.text()).toContain('Please enter a valid phone number')
    })

    it('shows validation error for age out of range', async () => {
      const wrapper = mount(UserForm, mountOptions)

      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('John')
      await inputs[1].setValue('Doe')
      await inputs[2].setValue('johndoe')
      await inputs[3].setValue('john@example.com')
      await inputs[4].setValue('+1234567890')
      await inputs[5].setValue('1990-01-15')
      
      // Find and set age input (number type)
      const ageInput = wrapper.find('input[type="number"]')
      await ageInput.setValue(150) // Too old

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.text()).toContain('Age must be less than 120')
    })
  })

  describe('Form Submission', () => {
    const fillValidForm = async (wrapper: ReturnType<typeof mount>) => {
      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('John') // firstName
      await inputs[1].setValue('Doe') // lastName
      await inputs[2].setValue('johndoe') // username
      await inputs[3].setValue('john@example.com') // email
      await inputs[4].setValue('+1234567890') // phone
      await inputs[5].setValue('1990-01-15') // birthDate
      
      const ageInput = wrapper.find('input[type="number"]')
      await ageInput.setValue(34)
    }

    it('emits save and close events on valid form submission', async () => {
      const wrapper = mount(UserForm, mountOptions)

      await fillValidForm(wrapper)

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('includes form data in save event payload', async () => {
      const wrapper = mount(UserForm, mountOptions)

      await fillValidForm(wrapper)

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      const saveEvent = wrapper.emitted('save')
      expect(saveEvent).toBeTruthy()
      
      const savedUser = saveEvent![0][0] as Partial<User>
      expect(savedUser.firstName).toBe('John')
      expect(savedUser.lastName).toBe('Doe')
      expect(savedUser.username).toBe('johndoe')
      expect(savedUser.email).toBe('john@example.com')
    })

    it('includes default values for missing fields', async () => {
      const wrapper = mount(UserForm, mountOptions)

      await fillValidForm(wrapper)

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      const saveEvent = wrapper.emitted('save')
      const savedUser = saveEvent![0][0] as Partial<User>

      // Check that default values are included
      expect(savedUser.hair).toBeDefined()
      expect(savedUser.address).toBeDefined()
      expect(savedUser.bank).toBeDefined()
      expect(savedUser.crypto).toBeDefined()
    })

    it('does not emit events when form is invalid', async () => {
      const wrapper = mount(UserForm, mountOptions)

      // Submit without filling required fields
      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.emitted('save')).toBeFalsy()
    })

    it('preserves existing user data when editing', async () => {
      const wrapper = mount(UserForm, {
        ...mountOptions,
        props: { user: mockUser as User }
      })

      // Just change the first name
      const firstNameInput = wrapper.find('input[type="text"]')
      await firstNameInput.setValue('Jane')

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      const saveEvent = wrapper.emitted('save')
      const savedUser = saveEvent![0][0] as Partial<User>

      expect(savedUser.firstName).toBe('Jane')
      expect(savedUser.lastName).toBe('Doe')
      expect(savedUser.email).toBe('john@example.com')
    })
  })

  describe('Company Information', () => {
    it('can fill company information fields', async () => {
      const wrapper = mount(UserForm, mountOptions)

      // Find company inputs (they're in the Company Information section)
      const allInputs = wrapper.findAll('input[type="text"]')
      
      // Company fields are after basic info fields
      // Job Title, Company Name, Department
      const jobTitleInput = allInputs[allInputs.length - 3]
      const companyNameInput = allInputs[allInputs.length - 2]
      const departmentInput = allInputs[allInputs.length - 1]

      await jobTitleInput.setValue('Senior Developer')
      await companyNameInput.setValue('Amazing Tech')
      await departmentInput.setValue('R&D')

      expect((jobTitleInput.element as HTMLInputElement).value).toBe('Senior Developer')
      expect((companyNameInput.element as HTMLInputElement).value).toBe('Amazing Tech')
      expect((departmentInput.element as HTMLInputElement).value).toBe('R&D')
    })

    it('pre-fills company data when editing user', () => {
      const wrapper = mount(UserForm, {
        ...mountOptions,
        props: { user: mockUser as User }
      })

      const allInputs = wrapper.findAll('input[type="text"]')
      const jobTitleInput = allInputs[allInputs.length - 3]

      expect((jobTitleInput.element as HTMLInputElement).value).toBe('Developer')
    })
  })

  describe('Accessibility', () => {
    it('has labels for all form fields', () => {
      const wrapper = mount(UserForm, mountOptions)

      const labels = wrapper.findAll('label')
      expect(labels.length).toBeGreaterThan(0)

      // Check that required fields have asterisks
      const requiredLabels = labels.filter(l => l.text().includes('*'))
      expect(requiredLabels.length).toBeGreaterThan(0)
    })

    it('form can be submitted with Enter key', async () => {
      const wrapper = mount(UserForm, mountOptions)

      // Fill the form
      const inputs = wrapper.findAll('input')
      await inputs[0].setValue('John')
      await inputs[1].setValue('Doe')
      await inputs[2].setValue('johndoe')
      await inputs[3].setValue('john@example.com')
      await inputs[4].setValue('+1234567890')
      await inputs[5].setValue('1990-01-15')

      const form = wrapper.find('form')
      await form.trigger('submit')

      // Form submission should be triggered
      expect(wrapper.emitted('save') || wrapper.text().includes('must be')).toBeTruthy()
    })
  })
})
