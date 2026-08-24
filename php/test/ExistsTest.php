<?php
declare(strict_types=1);

// Mixpanel SDK exists test

require_once __DIR__ . '/../mixpanel_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MixpanelSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
