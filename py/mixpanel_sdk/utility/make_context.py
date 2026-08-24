# Mixpanel SDK utility: make_context

from mixpanel_sdk.core.context import MixpanelContext


def make_context_util(ctxmap, basectx):
    return MixpanelContext(ctxmap, basectx)
