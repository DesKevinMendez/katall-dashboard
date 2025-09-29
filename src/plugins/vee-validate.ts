import { configure, defineRule } from 'vee-validate'
import { required, min, max, url } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'

// Define global rules
defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('url', url)

// Configure localization
configure({
  generateMessage: localize({
    en: {
      ...en,
      names: {
        legalName: 'Legal Name',
        commercialName: 'Commercial Name',
        companyDescription: 'Company Description',
        website: 'Website',
      },
    },
  }),
})
