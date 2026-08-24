package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEngageEntityFunc func(client *MixpanelSDK, entopts map[string]any) MixpanelEntity

