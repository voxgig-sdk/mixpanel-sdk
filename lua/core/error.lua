-- Mixpanel SDK error

local MixpanelError = {}
MixpanelError.__index = MixpanelError


function MixpanelError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelError)
  self.is_sdk_error = true
  self.sdk = "Mixpanel"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelError:error()
  return self.msg
end


function MixpanelError:__tostring()
  return self.msg
end


return MixpanelError
