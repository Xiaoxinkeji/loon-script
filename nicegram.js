var body = $response.body;
body = body.replace(/"store_subscription"\s*:\s*false/g, '"store_subscription":true');
body = body.replace(/"lifetime_subscription"\s*:\s*false/g, '"lifetime_subscription":true');
body = body.replace(/"subscription"\s*:\s*false/g, '"subscription":true');
$done({ body });
