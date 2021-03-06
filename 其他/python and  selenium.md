###### python之参数问题
位置参数、默认参数、可变参数、关键字参数、命名关键字参数
- 默认参数传入的是不可变对象
- 可变参数 *arg 传入的内容自动组装成元组。接受的参数是一个列表或者元组,不确定有多少个参数传入时使用
- 关键字参数 **kw， 传入的内容自动组装成一个字典。接受的参数是一个字典。
- 命名关键字参数，*,x1,x2.传入的的是一个键值是x1和x2的字典

 ##### 装饰器
 装饰器本身是一个函数，它可以让其他函数在不做任何改变的情况下增加额外的功能，装饰器的返回值是一个函数对象
 ##### 闭包
 嵌套定义在函数内部的函数，使用了外部函数中的参数。最常见的时带参数的装饰器
 ##### 垃圾回收机制：引用计数、清除标记、分代回收
 - 引用计数：python中每个对象维护一个ob-ref字段。当该字段值为0时，该对象被回收，内存被释放
 - 分代回收：python将内存分为3代，年轻代（0代）、中年代（1代）、老年代（2代），对应3个链表。新创建的对象被放到年轻代中，当年轻代链表总数达到上限时
   会触发垃圾回收，把那些可回收的对象回收，不可回收的的对象移到中年代，依次类推。
 - 清除标记：针对循环引用的问题,对每一个容器对象，找到其引用的每个容器对象，并将该容器对象ob_ref减1，如果此时ob_ref为0，那么其为不可达对象，将其回收
 - 触发垃圾回收的3种情况：1.调用gc.collect(),2.gc模块的计数器达到阈值时gc.get_threshold()，3.程序退出时。默认自动开启
 
 ##### 面向对象特性 对象是属性(实例属性和类属性)加方法。类属性是实例对象共享的
 - 多态：同一个方法在不同的对象中执行对应有不同的结果，一种情况是继承和重写，另一种情况是定义的不同类中有相同的方法
 - 继承：子类可继承父类所有的公有属性和公有方法，子类可以继承多个父类  super() 代表父类对象而不是父类实例
   多重继承时寻找继承的方法有两种
 - 封装：外部不用关注方法的实现细节

##### super()的使用：调用父类的方法，super()可传入两个参数，class,self。
1. 当类是经典类时，按照深度优先搜索的方式寻找。
2. 当类是新式类时（继承了object类），使用广度优先和从左到右的原则去寻找（c3算法）。 python3中默认是使用新式类。
3. super()中的self此时指的是子类实例，不是父类实例。它的作用是获取子类实例（self）的mro中class的下一个类
4. MRO 类的方法解析顺序表，
##### 浅拷贝vs 深拷贝 copy.copy()  copy.deepcopy()
#### numpy
1. np.array()  定义一个numpy数组（array），数组中的的数据必须是同一类型,有bool型，int型，float型，complex 型
2. np.zeros(,dtype=)   np.eyes(), np.ones(),np.arange(),np.random.  np.linspace(0,1,5)指0到1之间均匀分配的5个数

3. 数组索引，切片
4. 数组的变形 reshape()
5. 数组的拼接(一维，二维)  np.concatenate(,axis=0/1) 0指第一个维度（增加的是行数）1指第二个维度（增加的是列数） 
   np.vastack(垂直栈)，np.hastack(水平栈)
6.数组的分裂
7. 通用函数，对数组中每个数据执行操作，加减乘除等。 np.divide()除法，np.multiply()乘法 np.add()  np.subtract()减法
   三角函数 np.sin()  np.cos()  指数函数 np.power(data,幂次)  
8. 聚合函数 np.sum()  / 对于numpy数组x  ，可使用x.max(axis=0)每一列的最小值 axis=1 每一行的最小值

##### random
1.random.random() 在0到1之间随机生成一个浮点数
2.random.uniform(a,b)a,b之间随机生成一个浮点数
3.random.randint(a,b)在a,b之间生成一个整数
4.random.randrange(start,stop,step) 在序列里选择一个数
5.random.choice(list)
6.random.shuffle(list)

#### 生成器和迭代器
- 生成器
  1. 函数里有yield关键字，无return 或者有无值return  静态角度。
  2. 当调用迭代器函数时，不执行函数内部代码，而是返回一个迭代器对象；当返回的迭代器第一次调用next()方法时，生成器函数从头开始执行，遇到yield关键字时返回yield 后面的值
     下次调用next方法时，从yield后的语句开始执行。
- 迭代器：调用next方法返回容器的下一个元素
  可迭代对象通过调用iter()方法实现迭代器，


##### 文件读写操作
with open('a.txt','r'') as f:
    linelist=f.readlines()
for s in linelist:
    s.strip('\n')
    
#####   set集合
1. 无序不重复、元素为不可变对象。当使用set操作一个字典时返回的set元素是字典的键。创建空set时必须使用 a=set(),因为a={}表示创建的时空字典
2. set基本操作 删除 pop()和remove()方法  增加元素 add()方法
3. set转换，list()、str()、 tuple()

#####  from coleection import  Counter 统计字符串中字符出现的次数

#####  python 操作数据库 Mysql  安装 pymysql  import pymysql
1. 连接数据库  db=pymysql.connect(host='数据库地址',user='用户名',password='密码',database='数据库名',charset='utf8')
2. 创建可执行sql语句的光标对象  cursor=db.cursor()
3. 执行sql语句 cursor.execute(sql)  sql是要执行的语句
4. 提交操作 db.commit()
5. 回滚 db.rollback()
6. 关闭光标对象 cursor.close()
7. 关闭数据库连接  db.close()
8. 获取结果 cursor.fetchall()、cursor.fetchone()、cursor.fetchmany(n)获取结果的前n行 默认是元组方式返回
##### 捕获异常
try:
    可能发生异常的代码块放在此处
    raise 异常类名 主动抛出异常
except Exception as e: ////exxcept error :
    捕获到异常后执行的代码块。e是Exception的实例对象，如果需要使用e的某些属性，可使用as关键字
except 异常类：
    可用多个except语句捕获多个异常
else：
    try语句中若没有发生异常执行的代码块
finally：
    无论有没有发生异常都会执行的代码
所有的python内建异常类都是继承 Exception类，可继承该类来自定义异常 
 
###### sys.path  模块搜索路径列表：代码主目录、pythonpath目录(pathonpath环境变量设置的目录)、pathon标准库、.py文件
sys.path.append(BASE_DIR)
同一目录下的模块可使用import 导入，不在同一目录下的要手动添加该路径 sys.path.append
###### __new__ 和 __init__ 区别：
- __new__ 创建实例实例并返回实例对象，是静态方法，构造方法
- __init__ 初始化实例的一些属性，初始化方法
#### pageObject 思想
目的：将元素定位与元素操作分离，如果后期元素有变化，可降低维护成本，只需修改元素对象，不需修改测试用例
分3层：对象库层、逻辑层、业务层
- 对象库层存放单个页面中所有的元素对象
- 逻辑层存放的是封装好的功能模块
- 业务层存放的是测试用例

##### selenium webdriver原理
测试代码发送请求给浏览器驱动，浏览器驱动解析代码，解析后将相应的发送给浏览器，浏览器执行浏览器驱动发送到指令
webdriver使用json wire protocal 协议，该协议是基于http协议，对http协议请求和响应部分的进一步规范。
client（脚本代码）向http server（浏览器驱动）发送http请求，server根据请求来具体操控浏览器，浏览器执行测试指令并把结果返回给server，然后server将结果返回给脚本。

### 显示等待和隐士等待：
- WebDriverWait(driver,time).until(EC.visibilit_of_element_located((By.XPATH,定位方法))) 对一个元素，在指定timeout时间内，每隔一个时间间隔检测是否元素是否在，timeout时间后默认抛出 NoSuchElementException
- driver.implicitly_wait(time)  全局等待，对每个元素都会设定等待时间，在等待时间内不停刷新页面直到找到元素

  





