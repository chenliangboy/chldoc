---
outline: deep
---

# MySQL

## 存储过程

### 循环执行
```sql
-- 定义分页数量
set @pageSize = 5000;
-- 定义变量 总数量
DECLARE rn int default 0; 
-- 赋值总数量
SELECT count(1) into rn FROM delete_standard_id;
-- 循环开始
WHILE (rn >=0) DO
-- 清除中间表
TRUNCATE TABLE delete_s_id;
-- 赋值中间表
INSERT INTO delete_s_id SELECT id FROM delete_standard_id LIMIT @pageSize;
-- 关联中间表执行删除逻辑
DELETE bbs FROM b_business_standard bbs
INNER JOIN delete_s_id d on d.id = bbs.id;
-- 清除主表
DELETE FROM delete_standard_id LIMIT @pageSize;
-- 递减数量 提交执行
SET rn=rn-@pageSize;
commit;
-- 循环结束
END WHILE;

```