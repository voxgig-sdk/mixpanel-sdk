package voxgigmixpanelsdk

import (
	"github.com/voxgig-sdk/mixpanel-sdk/go/core"
	"github.com/voxgig-sdk/mixpanel-sdk/go/entity"
	"github.com/voxgig-sdk/mixpanel-sdk/go/feature"
	_ "github.com/voxgig-sdk/mixpanel-sdk/go/utility"
)

// Type aliases preserve external API.
type MixpanelSDK = core.MixpanelSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MixpanelEntity = core.MixpanelEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MixpanelError = core.MixpanelError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEngageEntityFunc = func(client *core.MixpanelSDK, entopts map[string]any) core.MixpanelEntity {
		return entity.NewEngageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMixpanelSDK = core.NewMixpanelSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMixpanelSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *MixpanelSDK  { return NewMixpanelSDK(nil) }
func Test() *MixpanelSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
