// Typed models for the Mixpanel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Engage {
  distinct_id?: string
  id?: string
  set: Record<string, any>
  status?: number
  token: string
}

export interface EngageCreateData {
  distinct_id?: string
  id?: string
  set: Record<string, any>
  status?: number
  token: string
}

