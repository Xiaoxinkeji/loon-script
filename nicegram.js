/*
 * Nicegram Premium Unlock Script
 * Compatible: Loon / Surge / QuantumultX / Shadowrocket / Stash
 * Covers: restore-access.indream.app + nicegram.cloud
 * Updated: 2026.02.10
 */

var url = $request.url;
var isLoonSurge = typeof $httpClient !== 'undefined';
var isQX = typeof $task !== 'undefined';

// For nicegram.cloud http-response (requires-body mode)
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
// Fallback for any other matched URL
else {
    var body2 = {};
    if (typeof $response !== 'undefined' && $response.body) {
        try {
            body2 = JSON.parse($response.body);
        } catch(e) {
            body2 = {};
        }
    }
    if (!body2.data) body2.data = {};
    body2.data.premiumAccess = true;
    body2.data.subscription = true;
    body2.data.store_subscription = true;
    body2.data.lifetime_subscription = true;
    body2.data.isPremium = true;
    $done({body: JSON.stringify(body2)});
}
