import { configure, defineRule } from 'vee-validate'
import { required, min, max } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

// Define global rules
defineRule('required', required)
defineRule('min', min)
defineRule('max', max)

// Configure localization
configure({
  generateMessage: localize('en', {
    messages: {
      required: 'The {field} field is required',
      min: 'The {field} field must be at least {length} characters',
      max: 'The {field} field must not exceed {length} characters',
    },
    names: {
      legalName: 'Legal Name',
      commercialName: 'Commercial Name',
    },
  }),
})
