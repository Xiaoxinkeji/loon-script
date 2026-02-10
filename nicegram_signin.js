/*
 * Nicegram Auto Sign-in & Gems Collection
 * Loon cron script - reads tokens saved by nicegram.js
 * Updated: 2026.02.10
 */

var token = $persistentStore.read("nicegram_token");
var telegram = $persistentStore.read("nicegram_telegram");
var identifier = $persistentStore.read("nicegram_identifier") || "";

if (!token || !telegram) {
    $notification.post("Nicegram \u7b7e\u5230", "\u274c \u5931\u8d25", "\u672a\u627e\u5230\u8ba4\u8bc1\u4fe1\u606f\uff0c\u8bf7\u5148\u6253\u5f00 Nicegram");
    $done({});
} else {
    var baseUrl = "https://nicegram.cloud/api/v7";
    var headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-telegram": telegram,
        "x-token": token,
        "x-language": "zh-hans",
        "x-ios-build": "621",
        "x-ios-version": "2.4.0",
        "x-agent": "iPhone",
        "x-identifier": identifier,
        "User-Agent": "Nicegram/621 CFNetwork/3860.300.31 Darwin/25.2.0"
    };

    // Step 1: Get user info
    $httpClient.get({ url: baseUrl + "/user/info", headers: headers }, function (err, resp, data) {
        if (err) {
            $notification.post("Nicegram \u7b7e\u5230", "\u274c \u7f51\u7edc\u9519\u8bef", err);
            $done({});
            return;
        }
        try {
            var info = JSON.parse(data);
            var user = info.data.user;
            var gems = user.gems_balance;
            var msg = "\ud83d\udc8e \u5b9d\u77f3: " + gems;

            // Step 2: Try claim daily reward
            $httpClient.post({ url: baseUrl + "/user/daily-reward", headers: headers, body: "{}" }, function (e2, r2, d2) {
                var st = (r2 && r2.status) || 0;
                console.log("[Nicegram] daily-reward POST status: " + st + " body: " + (d2 || ""));

                if (st >= 200 && st < 400 && d2) {
                    try {
                        var res = JSON.parse(d2);
                        if (res.data && res.data.user) {
                            gems = res.data.user.gems_balance || gems;
                        }
                        msg = "\ud83d\udc8e \u5b9d\u77f3: " + gems + "\n\u2705 \u7b7e\u5230\u5956\u52b1\u5df2\u9886\u53d6!";
                    } catch (ex) {
                        msg += "\n\u2705 \u5df2\u7b7e\u5230";
                    }
                    $notification.post("Nicegram \u7b7e\u5230", "\u2705 \u6210\u529f", msg);
                    $done({});
                } else {
                    // Try GET method
                    $httpClient.get({ url: baseUrl + "/user/daily-reward", headers: headers }, function (e3, r3, d3) {
                        var st3 = (r3 && r3.status) || 0;
                        console.log("[Nicegram] daily-reward GET status: " + st3 + " body: " + (d3 || ""));
                        if (st3 >= 200 && st3 < 400 && d3 && d3.indexOf("error") === -1) {
                            msg += "\n\u2705 \u5df2\u7b7e\u5230";
                            $notification.post("Nicegram \u7b7e\u5230", "\u2705 \u6210\u529f", msg);
                        } else {
                            msg += "\n\u2139\ufe0f \u4eca\u65e5\u5df2\u7b7e\u5230\u6216\u672a\u5230\u7b7e\u5230\u65f6\u95f4";
                            $notification.post("Nicegram \u7b7e\u5230", "\u2139\ufe0f \u67e5\u8be2\u5b8c\u6210", msg);
                        }
                        $done({});
                    });
                }
            });
        } catch (e) {
            $notification.post("Nicegram \u7b7e\u5230", "\u274c \u89e3\u6790\u5931\u8d25", e.toString());
            $done({});
        }
    });
}
