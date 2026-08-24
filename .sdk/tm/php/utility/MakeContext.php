<?php
declare(strict_types=1);

// Mixpanel SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelMakeContext
{
    public static function call(array $ctxmap, ?MixpanelContext $basectx): MixpanelContext
    {
        return new MixpanelContext($ctxmap, $basectx);
    }
}
