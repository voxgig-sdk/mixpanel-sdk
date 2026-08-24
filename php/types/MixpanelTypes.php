<?php
declare(strict_types=1);

// Typed models for the Mixpanel SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Engage entity data model. */
class Engage
{
    public ?string $distinct_id = null;
    public ?string $id = null;
    public array $set;
    public ?int $status = null;
    public string $token;
}

/** Request payload for Engage#create. */
class EngageCreateData
{
    public ?string $distinct_id = null;
    public ?string $id = null;
    public array $set;
    public ?int $status = null;
    public string $token;
}

