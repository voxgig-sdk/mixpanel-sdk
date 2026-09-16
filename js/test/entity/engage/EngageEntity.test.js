
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { MixpanelSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('EngageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MIXPANEL_TEST_LIVE=TRUE.
  afterEach(liveDelay('MIXPANEL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MixpanelSDK.test()
    const ent = testsdk.Engage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"distinct_id","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"set","req":true,"type":"`$OBJECT`","index$":2},{"active":true,"name":"status","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"token","req":true,"type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"engage","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /engage","json":"{\"operationId\":\"createProfile\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$distinct_id\":{\"type\":\"string\"},\"$set\":{\"properties\":{\"$email\":{\"type\":\"string\"},\"$name\":{\"type\":\"string\"},\"plan\":{\"type\":\"string\"}},\"type\":\"object\"},\"$token\":{\"type\":\"string\"}},\"required\":[\"$token\",\"$distinct_id\",\"$set\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"$distinct_id\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"status\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Accepted\"}},\"security\":[{\"apiSecretAuth\":[]}],\"securitySchemes\":{\"apiSecretAuth\":{\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/engage","segments":[{"lit":"engage"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"engage","name__orig":"engage","Name":"Engage","name_":"engage","name-":"engage","NAME":"ENGAGE","index$":0}, {"active":true,"entity":"engage","key$":"BasicEngageFlow","kind":"basic","name":"BasicEngageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"engage_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Engage')
    }
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
    'MIXPANEL_APIKEY': '',
  })

  idmap = env['MIXPANEL_TEST_ENGAGE_ENTID']

  const live = 'TRUE' === env.MIXPANEL_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MIXPANEL_TEST_ENGAGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MixpanelSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MIXPANEL_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
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
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
