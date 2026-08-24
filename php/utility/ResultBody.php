<?php
declare(strict_types=1);

// Mixpanel SDK utility: result_body

class MixpanelResultBody
{
    public static function call(MixpanelContext $ctx): ?MixpanelResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
