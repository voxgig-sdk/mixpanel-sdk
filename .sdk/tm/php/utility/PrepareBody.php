<?php
declare(strict_types=1);

// Mixpanel SDK utility: prepare_body

class MixpanelPrepareBody
{
    public static function call(MixpanelContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
