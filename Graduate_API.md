# Graduate API Doc

## 发布留言

请求（content：内容，sign：署名）：

```
POST /msg
Body:
{
	"content": "王星锦测试-test2",
	"sign": "王星锦测试3"
}
```

返回：

```json
{
    "code": 0,
    "msg": "success",
    "data": 4
}
```

说明

```
返回的data字段是该msg的id，也可以作为第几条留言使用。
```

## 查看留言列表

请求

```
GET /msg
参数：
page int 第几页，下标从0开始，默认0
size int 每页条数，默认10
sortKey string 倒序排列的依据字段，可选择msgId和likeCount，分别是按最新排列和按点赞数从大到小排列默认是msgId
```

返回：

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "content": [
            {
                "msgId": 3,
                "content": "王星锦测试-test2",
                "sign": "王星锦测试3",
                "likeCount": 6,
                "status": 0,
                "createTime": "2019-05-12T16:38:02",
                "updateTime": "2019-05-12T16:38:02"
            },
            {
                "msgId": 4,
                "content": "王星锦测试-testaaaaaaaa",
                "sign": "王星锦测试3aaaaaaaaa",
                "likeCount": 0,
                "status": 0,
                "createTime": "2019-05-12T17:35:41",
                "updateTime": "2019-05-12T17:35:41"
            }
        ],
        "pageable": {
            "sort": {
                "sorted": true,
                "unsorted": false,
                "empty": false
            },
            "offset": 0,
            "pageSize": 10,
            "pageNumber": 0,
            "paged": true,
            "unpaged": false
        },
        "totalPages": 1,
        "totalElements": 2,
        "last": true,
        "size": 10,
        "number": 0,
        "numberOfElements": 2,
        "first": true,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "empty": false
    }
}
```

## 查看单个留言

请求：

```json
GET /msg/{msgId}
```

返回：

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "msgId": 3,
        "content": "王星锦测试-test2",
        "sign": "王星锦测试3",
        "likeCount": 6,
        "status": 0,
        "createTime": "2019-05-12T16:38:02",
        "updateTime": "2019-05-12T16:38:02"
    }
}
```

## 点赞

请求：

```
GET /msg/{msgId}/like
参数：
count int 点赞次数，默认是1
```

返回：

```json
{
    "code": 0,
    "msg": "success",
    "data": null
}
```

## 获取留言总数

请求：

```
GET /msgCount
```

返回：

```json
{
    "code": 0,
    "msg": "success",
    "data": 2
}
```

## 隐藏留言（软删除）后不会在列表页显示

请求：

```
GET /hideMsg/{msgId}
```

返回：

```json
{
    "code": 0,
    "msg": "success",
    "data": null
}
```















