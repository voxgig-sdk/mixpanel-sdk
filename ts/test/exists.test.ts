
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MixpanelSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MixpanelSDK.test()
    equal(null !== testsdk, true)
  })

})
