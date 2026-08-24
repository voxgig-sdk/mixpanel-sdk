<?php
declare(strict_types=1);

// Mixpanel SDK utility: result_headers

class MixpanelResultHeaders
{
    public static function call(MixpanelContext $ctx): ?MixpanelResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
