      sql（结构化查询语句）分为两部分DDL（数据定义语言）和DML（数据操纵语言）
注意：sql对大小写不敏感，语句以分号结尾
DML：select 、 update、  insert into、   delete
select：查询表数据 
select  （distinct）列名  from 表名 where 条件   在列名前加distinc关键字客去除重复项
条件中可使用and  、or 、between关键字；
可使用order by 列名（desc） 对查询结果排序，默认是升序，可使用desc关键字进行逆序排序；
top 数字/百分数：select  top 5/50 percent  列名 from 表名 where条件  选取前5条/前50%记录；
like运算符和通配符/REGEXP和正则表达式（待整理）一起使用，常用在where 语句中过滤符合要求的记录


聚合函数 max（列名）、min（列名）、avg（列名）、len（列名）、first（列名）、last（列名）举例:select max(haha) from 表名   计算表中haha列的最大值
group by 列名  与聚合函数组合使用，对表中的记录按照列名进行分组
having 函数的出现： 聚合函数不能和where 关键字组合使用
多表查询
select  列名 from 表名  on 表名 join 条件
inner join   left join   right join

update：更新表项
update 表名 set 列名=新值 where 条件
delete：删除表中符合条件的记录
delete  from  表名 where 条件
insert into ：向表中插入记录
insert into 表名 （列名，列名，列名)  value（值，值，）（列名，列名，列名)这个字段可写可不写

DDL：create、drop、ater
create：
create  database 数据库名
create  表名{
列名  数据类型  not null
primary key（列名）/constraint pk_表名 primary key（列名，列名）
unique（列名）/constraint  uc_表名 unique (列名，列名)
check  （条件）/constraint chk_表名 check（多个条件组合） 
}

drop：
ALTER TABLE table_name DROP INDEX index_name
drop table 表名
drop  database 数据库名
truncate table 表名  仅删除表中数据，不删除表结构
alter：
alter  table table_name








