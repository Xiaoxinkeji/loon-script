/*************************************
 * 脚本名称：Nicegram Premium 解锁
 * 使用说明：配合 Loon 插件使用，拦截 nicegram.cloud API 响应
 *           修改订阅状态以解锁 Premium 功能
 * 更新日期：2026.02.10
 * 使用声明：⚠️ 仅供学习与交流，请勿用于商业用途 ⚠️
 *************************************/

var body = $response.body;

// 替换订阅状态标志为 true
body = body.replace(/"store_subscription"\s*:\s*false/g, '"store_subscription":true');
body = body.replace(/"lifetime_subscription"\s*:\s*false/g, '"lifetime_subscription":true');
body = body.replace(/"subscription"\s*:\s*false/g, '"subscription":true');

$done({ body });
