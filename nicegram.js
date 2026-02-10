/*
 * Nicegram Premium Unlock + Ad Removal Script
 * Compatible: Loon / Surge / QuantumultX / Shadowrocket / Stash
 * Covers all nicegram.cloud API endpoints
 * Updated: 2026.02.10
 */

var url = $request.url;
var isLoonSurge = typeof $httpClient !== 'undefined';
var isQX = typeof $task !== 'undefined';

// Helper: parse response body safely
function getBody() {
    if (typeof $response !== 'undefined' && $response.body) {
        try { return JSON.parse($response.body); } catch(e) {}
    }
    return {};
}

// 1) user/info or telegram/auth - unlock premium
if (url.indexOf("user/info") !== -1 || url.indexOf("telegram/auth") !== -1) {
    var body = getBody();
    if (!body.data) body.data = {};
    if (body.data.user) {
        body.data.user.subscription = true;
        body.data.user.store_subscription = true;
        body.data.user.lifetime_subscription = true;
        body.data.user.subscriptionPlus = true;
        body.data.user.showAds = false;
    }
    body.data.premiumAccess = true;
    $done({body: JSON.stringify(body)});
}
// 2) scroll-to-earn/user-info - disable ads system
else if (url.indexOf("scroll-to-earn/user-info") !== -1) {
    var body = getBody();
    if (!body.data) body.data = {};
    body.data.enabledAds = false;
    if (body.data.placementSettings) {
        for (var i = 0; i < body.data.placementSettings.length; i++) {
            body.data.placementSettings[i].enabled = false;
        }
    }
    $done({body: JSON.stringify(body)});
}
// 3) scroll-to-earn/ads-list - return empty ad list
else if (url.indexOf("scroll-to-earn/ads-list") !== -1 || url.indexOf("ads-list") !== -1) {
    var body = getBody();
    body.data = [];
    $done({body: JSON.stringify(body)});
}
// 4) unblock-feature/get-settings - set premium true
else if (url.indexOf("unblock-feature") !== -1) {
    var body = getBody();
    body.premium = true;
    $done({body: JSON.stringify(body)});
}
// 5) ai-assistant/purchase-list - unlock AI features
else if (url.indexOf("ai-assistant") !== -1 || url.indexOf("purchase-list") !== -1) {
    var body = getBody();
    if (!body.data) body.data = {};
    body.data.subscription = true;
    body.data.store_subscription = true;
    body.data.lifetime_subscription = true;
    $done({body: JSON.stringify(body)});
}
// 6) restore-access (old API) - fake response
else if (url.indexOf("restore-access") !== -1 || url.indexOf("indream.app") !== -1) {
    var fakeBody = JSON.stringify({"data": {"premiumAccess": true}});
    if (isLoonSurge) {
        $done({response: {status: 200, body: fakeBody}});
    } else if (isQX) {
        $done({status: "HTTP/1.1 200 OK", headers: {"Content-Type": "application/json"}, body: fakeBody});
    } else {
        $done({status: 200, body: fakeBody});
    }
}
// Fallback
else {
    $done({});
}
