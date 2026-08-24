<?php
declare(strict_types=1);

// Mixpanel SDK base feature

class MixpanelBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MixpanelContext $ctx, array $options): void {}
    public function PostConstruct(MixpanelContext $ctx): void {}
    public function PostConstructEntity(MixpanelContext $ctx): void {}
    public function SetData(MixpanelContext $ctx): void {}
    public function GetData(MixpanelContext $ctx): void {}
    public function GetMatch(MixpanelContext $ctx): void {}
    public function SetMatch(MixpanelContext $ctx): void {}
    public function PrePoint(MixpanelContext $ctx): void {}
    public function PreSpec(MixpanelContext $ctx): void {}
    public function PreRequest(MixpanelContext $ctx): void {}
    public function PreResponse(MixpanelContext $ctx): void {}
    public function PreResult(MixpanelContext $ctx): void {}
    public function PreDone(MixpanelContext $ctx): void {}
    public function PreUnexpected(MixpanelContext $ctx): void {}
}
