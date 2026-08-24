<?php
declare(strict_types=1);

// Engage entity test

require_once __DIR__ . '/../mixpanel_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EngageEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MixpanelSDK::test(null, null);
        $ent = $testsdk->Engage(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = engage_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "engage." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MIXPANEL_TEST_ENGAGE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $engage_ref01_ent = $client->Engage(null);
        $engage_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.engage"), "engage_ref01"));

        $engage_ref01_data_result = $engage_ref01_ent->create($engage_ref01_data, null);
        $engage_ref01_data = Helpers::to_map(is_object($engage_ref01_data_result) && method_exists($engage_ref01_data_result, 'data_get') ? $engage_ref01_data_result->data_get() : $engage_ref01_data_result);
        $this->assertNotNull($engage_ref01_data);
        $this->assertNotNull($engage_ref01_data["id"]);

    }
}

function engage_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/engage/EngageTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MixpanelSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["engage01", "engage02", "engage03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MIXPANEL_TEST_ENGAGE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MIXPANEL_TEST_ENGAGE_ENTID" => $idmap,
        "MIXPANEL_TEST_LIVE" => "FALSE",
        "MIXPANEL_TEST_EXPLAIN" => "FALSE",
        "MIXPANEL_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MIXPANEL_TEST_ENGAGE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MIXPANEL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["MIXPANEL_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new MixpanelSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["MIXPANEL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MIXPANEL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
