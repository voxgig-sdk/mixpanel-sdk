
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { MixpanelSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelSDK.test()
    equal(null !== testsdk, true)
  })

})
