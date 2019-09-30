### http协议（超文本传输协议）的主要特点
无连接、无状态

### http报文组成部分
- 请求报文：请求行 请求头 空行 请求体
  - 请求行：请求方法 请求地址 协议 版本号
  - 空行：隔开请求头和请求体
- 响应报文：状态行 响应头 空行 响应体
  - 状态行：协议 版本号 状态码 原因描述，如：HTTP/1.1 200 OK

#### 你了解的状态码
- 200：请求成功
- 201：已创建
- 202：已接受
- 204：请求成功，无返回内容
- 206：客户端发送一个带有range头的get请求，获取某范围的数据
- 301：永久重定向（搬家）
- 302：临时重定向（去别人家玩）
- 303：临时重定向，必须使用get方式请求。
- 304：所请求的资源未修改，协商缓存生效
- 400：请求有语法错误/域名不存在
- 401：请求未授权，协议格式出错
- 403：禁止，服务器拒绝请求（forbidden）
- 404：找不到系统资源（not found）
- 405：请求方式不对（如get请求变成post请求等）
- 500：服务器读取信息错误
- 503：由于超载或系统维护，服务器暂时无法处理客户端的请求

### http的请求头字段
general
- Request URL
- Request Method
- Status Code
- Remote Address：服务器的IP地址

request header
- Referer：请求资源的页面的URL
- Accept：用户代理能够处理的媒体类型及媒体类型的相对优先级。
- Accept-Charset：用户代理支持的字符集及字符集的相对优先顺序。
- Accept-Encoding：用户代理支持的内容编码及内容编码的优先级顺序。
- Accept-Language：用户代理能够处理的自然语言集
- user-agent :用户代理名称
- Authorization：用户代理的认证信息
- Expires, cache-control, Etag, last-modified
- set-cookie

response header
- Access-Control-Allow-Origin：标识允许哪个域的请求
- Access-Control-Allow-Credentials：是否允许跨域请求携带Cookie
- Date：创建请求的日期
- Content-Type：服务器接收的媒体类型
- Content-Encoding，Content-Language，Content-Length
- if-none-match, if-modified-since
- connection： keep-alive/closed

### http持久连接
  http协议采用“请求-应答”模式，当使用普通模式，每个请求-应答都要客户端和服务端新建一个连接，完成之后立即断开连接。  
  当使用Keep-Alive模式时，Keep-Alive功能使客户端到服务端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接。

### http管线化
将多个请求打包，一起发送到服务器，服务器也将多个响应打包在一起，发送回客户端。特点：
- 管线化机制通过持久连接完成，仅HTTP1.1支持此技术
- 只有get和head请求可以进行管线化，而post则有所限制
- 除此创建连接不应该使用管线化，应该服务器不一定支持HTTP1.1版本的协议
- 管线化不会影响响应到来的顺序
