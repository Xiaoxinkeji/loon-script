/*
 * Nicegram Premium Unlock
 * Loon/Surge/QX compatible
 */

var url = $request.url;
var body = {};

if (url.indexOf("user/info") !== -1 || url.indexOf("telegram/auth") !== -1) {
    if (typeof $response !== 'undefined' && $response.body) {
        try {
            body = JSON.parse($response.body);
            if (body.data) {
                body.data.subscription = true;
                body.data.store_subscription = true;
                body.data.lifetime_subscription = true;
                body.data.premiumAccess = true;
            }
        } catch(e) {
            body = {"data": {"premiumAccess": true, "subscription": true, "store_subscription": true, "lifetime_subscription": true}};
        }
    } else {
        body = {"data": {"premiumAccess": true, "subscription": true, "store_subscription": true, "lifetime_subscription": true}};
    }
} else if (url.indexOf("ai-assistant/purchase-list") !== -1) {
    if (typeof $response !== 'undefined' && $response.body) {
        try {
            body = JSON.parse($response.body);
            if (body.data) {
                body.data.subscription = true;
                body.data.store_subscription = true;
                body.data.lifetime_subscription = true;
            }
        } catch(e) {
            body = {"data": {"subscription": true, "store_subscription": true, "lifetime_subscription": true}};
        }
    } else {
        body = {"data": {"subscription": true, "store_subscription": true, "lifetime_subscription": true}};
    }
} else {
    if (typeof $response !== 'undefined' && $response.body) {
        try {
            body = JSON.parse($response.body);
            if (body.data) {
                body.data.subscription = true;
                body.data.store_subscription = true;
                body.data.lifetime_subscription = true;
                body.data.premiumAccess = true;
            }
        } catch(e) {
            body = {"data": {"premiumAccess": true, "subscription": true, "store_subscription": true, "lifetime_subscription": true}};
        }
    } else {
        body = {"data": {"premiumAccess": true, "subscription": true, "store_subscription": true, "lifetime_subscription": true}};
    }
}

$done({body: JSON.stringify(body)});
