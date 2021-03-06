### tcp和udp的区别以及使用场景
（有无连接/可不可靠/单位/连接数量/首部开销/拥塞控制）
 1. tcp是面向连接的；udp是无连接的，发送数据之前不需要建立连接，减少了开销。
 2. tcp提供可靠交付的服务，传送的数据无差错、不丢失、不重复、并且按序到达。udp使用尽最大努力交付，即不保证可靠交付。
 3. tcp是面向字节流的。一次发送一个数据块，tcp把应用程序交下来的数据看成一连串的无结构的字节流。udp是面向报文的，对于报文即不合并，也不拆分，而是保留这些报文的边界，给多少就发多少，一次发送一个报文。
 4. tcp连接只能是点到点的。udp支持一对一，一对多，多对一和多对多的交互通信。
 5. tcp首部开销20字节。udp首部开销8个字节。
 6. tcp有拥塞控制。udp没有拥塞控制，网络拥塞不会使源主机的发送速率降低。很多实时应用（如ip电话、实时视频等）要求源主机以恒定速率发送数据，并且允许网路拥塞时丢失一些数据，但不允许数据有太大的时延，udp刚好适合。
 7. tcp用于对数据准确性要求高、速度相对较慢的场景，如文件传输、软件客户端和服务端间的通信、邮件服务等。
 8. udp用于对实时性要求较高，对准确性要求相对较低的应用，如qq语音、视频等。

### TCP三次握手、四次挥手过程详解
- 握手：
  1. 服务端处于listen（监听状态）
  2. 客户端向服务端发起主动连接请求，请求报文中不携带数据，首部中SYN=1，序列号seq=x，此时客户端处于syn—sent（同步发送）状态
  3. 服务端发送响应报文，报文中不携带数据，首部中SYN=1 ACK=1，ack=x+1，序列号=y，此时服务端处于syn—rcvd（同步收到）
  4. 客服端向服务端发送二次请求，请求报文可携带/不携带数据，首部中ACK=1，ack=y+1，seq=x+1（如果不发送数据，则不消耗序列号），此时客户端处于established(已建立连接)状态，服务端在接受到确认请求后也将进入established状态
- 挥手：
  1. 客户端发出连接释放报文，报文中可携带/不携带数据，都需要消耗一个序列号 seq=u，FIN=1，此时客户端进入FIN-WAIT-1(终止等待1)状态此后不再发送数据
  2. 服务端发出确认报文，确认号是ack=u+1，seq=v，此时服务端进入wait-closed状态
  3. 此时客户端到服务端的连接已经释放，客服端处于fin-wait-2（终止等待2），tcp连接处于半关闭状态，客户端不能向服务端发送数据，但是服务端仍可向客户端发送数据
  4. 服务端发送连接释放报文，FIN=1，seq=w，ack=u+1，此时服务端进入last-ack状态
  5. 客户端收到报文后，再次发送确认报文，ACK=1，ack=w+1，seq=u+1.此时客户端进图time-wait状态，再经过2MSL后进入closed状态
  6. 服务端在接收到确认报文后进入clsoed状态

### TCP握手，挥手，为什么握手三次，挥手四次
- 握手：请求握手，确认，握手结束
  - 三次握手是为了防止已失效的请求连接报文忽然又传送到了，从而产生错误。
- 挥手：请求挥手FIN，被动方确认ACK，被动方请求关闭连接FIN，确认ACK
  - ACK和FIN不可以合并，因为被动方可能还有数据没有传输完
  - 最后的ACK不可以省略，不然FIN如果丢失那就会主动方不会关闭连接
  - tcp连接是全双工工作模式，当客户端发送FIN请求后只能释放客户端到服务端的连接，客户端不能再发送数据，但此时服务端仍然可发送数据，只有服务端也FIN后，tcp连接才会被释放
  - 2msl（最长报文段寿命）：客户端在第二次发送ack后不会立马进入closed状态，还会经过一个time-wait的状态。这是为了保证服务端能正常收到客户端的ACK报文。如果服务端未收到ACK，那么会超时重传FIN报文，此时在2msl时间段内，客户端还未关闭连接，可重新发送ACK报文。如果没有2msl，那么服务端重发的FIN报文客户端不能收到，此时服务端不能正常释放连接

### TCP如何保证可靠传输
1. 数据包校验：目的是检测数据在传输过程中的任何变化，若校验出包有错，则丢弃报文段并且不给出响应，这时TCP发送数据端超时后会重发数据；
2. 对失序数据包重排序：既然TCP报文段作为IP数据报来传输，而IP数据报的到达可能会失序，因此TCP报文段的到达也可能会失序。TCP将对失序数据进行重新排序，然后才交给应用层；
3. 丢弃重复数据：对于重复数据，能够丢弃重复数据；
4. 应答机制：当TCP收到发自TCP连接另一端的数据，它将发送一个确认。这个确认不是立即发送，通常将推迟几分之一秒；
5. 超时重发：当TCP发出一个段后，它启动一个定时器，等待目的端确认收到这个报文段。如果不能及时收到一个确认，将重发这个报文段；
6. 流量控制：TCP连接的每一方都有固定大小的缓冲空间。TCP的接收端只允许另一端发送接收端缓冲区所能接纳的数据，这可以防止较快主机致使较慢主机的缓冲区溢出，这就是流量控制。TCP使用的流量控制协议是可变大小的滑动窗口协议。

### 拥塞窗口是什么？RTT是什么
- 拥塞：在某段时间，若对网络中某一资源的需求超过了该资源所能提供的可用部分，网络的性能就会变坏，这种情况就叫做拥塞。
- 拥塞控制：即防止过多的数据注入网络中，这样可以使网络中的路由器或链路不致过载。主要有以下四种方法：
  1. 慢启动：不要一开始就发送大量的数据，先探测一下网络的拥塞程度，即由小到大逐渐增加拥塞窗口的大小;
  2. 拥塞避免：拥塞避免算法让拥塞窗口缓慢增长，即每经过一个往返时间RTT就把发送方的拥塞窗口cwnd加1，而不是加倍，这样拥塞窗口按线性规律缓慢增长。
  3. 快重传：快重传要求接收方在收到一个失序的报文段后就立即发出重复确认（为的是使发送方及早知道有报文段没有到达对方），而不要等到自己发送数据时捎带确认。快重传算法规定，发送方只要一连收到三个重复确认就应当立即重传对方尚未收到的报文段，而不必继续等待设置的重传计时器时间到期。
  4. 快恢复：快重传配合使用的还有快恢复算法，当发送方连续收到三个重复确认时，就执行乘法减小算法，把ssthresh门限减半，但是接下去并不执行慢开始算法：因为如果网络出现拥塞的话就不会收到好几个重复的确认，所以发送方现在认为网络可能没有出现拥塞。所以此时将cwnd设置为ssthresh的大小，然后执行拥塞避免算法。
- rtt：往返时间