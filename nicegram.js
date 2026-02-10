/*
 * Nicegram Premium Unlock Script
 * Compatible: Loon / Surge / QuantumultX / Shadowrocket / Stash
 * Updated: 2026.02.10
 */

var url = $request.url;
var isLoonSurge = typeof $httpClient !== 'undefined';
var isQX = typeof $task !== 'undefined';

// For nicegram.cloud http-response
if (url.indexOf("nicegram.cloud") !== -1) {
    var body = {};
    if (typeof $response !== 'undefined' && $response.body) {
        try {
            body = JSON.parse($response.body);
        } catch(e) {
            body = {};
        }
    }
    if (!body.data) body.data = {};

    // user/info endpoint: fields are inside data.user
    if (body.data.user) {
        body.data.user.subscription = true;
        body.data.user.store_subscription = true;
        body.data.user.lifetime_subscription = true;
        body.data.user.subscriptionPlus = true;
        body.data.user.showAds = false;
    }

    // Also set at data level for other endpoints
    body.data.premiumAccess = true;
    body.data.subscription = true;
    body.data.store_subscription = true;
    body.data.lifetime_subscription = true;
    body.data.isPremium = true;

    $done({body: JSON.stringify(body)});
}
// For restore-access.indream.app http-request mode
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
else {
    $done({});
}
