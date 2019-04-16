前提准备
   1. 版本控制：git
   2. 开发工具：idea安装
   3. 数据库： oracle
   4. jdk： 版本  1.7
   5. 容器：tomcat 版本 8.5  2个tomcat容器  支持单独存储文件
   6. 框架选型： layui+jquery+servlet+druid+IE8浏览器
   7. 建议人员： 陈磊明（统筹安排设计） 
              周隆钦（后端基础搭建开发）
              郑孝圳（前端设计和优化和开发）
              谢添峰（后端业务开发）
              建立微信 or QQ群  积极开发并记录开发时间
   8. github地址: https://github.com/zhoulq0711/HistoryProject 
   9. 注意事项：
      01. 数据库所有脚本都要保存 并上传git 大家及时注意脚本变更并重新导入数据
      02. 注意数据库用户名称
      03. 使用git注意更新后再提交防止冲突
      04. 注意编码风格 前端 所有jsp页面都放在/vm文件夹下
                     后端 走controller+dao流程  
                     其中controller层为Servlet（注意使用注解即可 可以减少web.xml变动）
                     dao层为数据库操作层  全部通过druid连接池通过基本的jdbc进行操作
                     注意捕捉和抛出异常
                     throw new DaoException(e.getClass(), e.getMessage());
                     日志通过sfl4j+log4j实现日志本地存储
                     通过fastjson实现json的解析  具体看操作
                     
      05. 默认使用utf-8格式