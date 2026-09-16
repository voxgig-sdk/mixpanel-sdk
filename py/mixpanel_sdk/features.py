# Mixpanel SDK feature factory

from mixpanel_sdk.feature.base_feature import MixpanelBaseFeature
from mixpanel_sdk.feature.debug_feature import MixpanelDebugFeature
from mixpanel_sdk.feature.idempotency_feature import MixpanelIdempotencyFeature
from mixpanel_sdk.feature.metrics_feature import MixpanelMetricsFeature
from mixpanel_sdk.feature.paging_feature import MixpanelPagingFeature
from mixpanel_sdk.feature.ratelimit_feature import MixpanelRatelimitFeature
from mixpanel_sdk.feature.retry_feature import MixpanelRetryFeature
from mixpanel_sdk.feature.test_feature import MixpanelTestFeature
from mixpanel_sdk.feature.timeout_feature import MixpanelTimeoutFeature


_FEATURES = {
    "base": lambda: MixpanelBaseFeature(),
    "debug": lambda: MixpanelDebugFeature(),
    "idempotency": lambda: MixpanelIdempotencyFeature(),
    "metrics": lambda: MixpanelMetricsFeature(),
    "paging": lambda: MixpanelPagingFeature(),
    "ratelimit": lambda: MixpanelRatelimitFeature(),
    "retry": lambda: MixpanelRetryFeature(),
    "test": lambda: MixpanelTestFeature(),
    "timeout": lambda: MixpanelTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
