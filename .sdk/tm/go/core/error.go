package core

type MixpanelError struct {
	IsMixpanelError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMixpanelError(code string, msg string, ctx *Context) *MixpanelError {
	return &MixpanelError{
		IsMixpanelError: true,
		Sdk:              "Mixpanel",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MixpanelError) Error() string {
	return e.Msg
}
