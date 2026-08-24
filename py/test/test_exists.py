# Mixpanel SDK exists test

import pytest
from mixpanel_sdk import MixpanelSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelSDK.test(None, None)
        assert testsdk is not None
