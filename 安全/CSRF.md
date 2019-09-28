## CSRF是什么
跨站请求伪造（cross-site request forgery），是一种挟制用户在当前已登录的 Web 应用程序上执行非本意的操作的攻击方法。在用户登录A网站之后，访问B网站，B网站会引诱用户去访问A网站的接口，此时携带A网站的cookie可以冒充用户的身份。

## CSRF原理
- 接口存在漏洞
- 在网站A登陆过

## CSRF防御措施
- Token 验证（不能在cookie中存储）
- referer 验证
- 对 Cookie 设置 SameSite 属性。该属性设置 Cookie 不随着跨域请求发送。
