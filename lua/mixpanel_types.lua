-- Typed models for the Mixpanel SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Engage
---@field distinct_id? string
---@field id? string
---@field set table
---@field status? number
---@field token string

---@class EngageCreateData
---@field distinct_id? string
---@field id? string
---@field set table
---@field status? number
---@field token string

local M = {}

return M
