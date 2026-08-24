
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { MixpanelSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EngageEntity', async () => {

  test('instance', async () => {
    const testsdk = MixpanelSDK.test()
    const ent = testsdk.Engage()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const engage_ref01_ent = client.Engage()
    let engage_ref01_data = setup.data.new.engage['engage_ref01']

    engage_ref01_data = (await engage_ref01_ent.create(engage_ref01_data)).data()
    assert(null != engage_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/engage/EngageTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MixpanelSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['engage01','engage02','engage03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MIXPANEL_TEST_ENGAGE_ENTID': idmap,
    'MIXPANEL_TEST_LIVE': 'FALSE',
    'MIXPANEL_TEST_EXPLAIN': 'FALSE',
    'MIXPANEL_APIKEY': 'NONE',
  })

  idmap = env['MIXPANEL_TEST_ENGAGE_ENTID']

  if ('TRUE' === env.MIXPANEL_TEST_LIVE) {
    client = new MixpanelSDK(merge([
      {
        apikey: env.MIXPANEL_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MIXPANEL_TEST_EXPLAIN,
    now: Date.now(),
  }

  return setup
}
  
