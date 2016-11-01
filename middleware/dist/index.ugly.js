!function(){var e=require("express"),s=require("compression"),n=e();n.use(s()),n.use(e["static"]("public")),n.get("/",function(e,s){s.send("hello")}),n.listen(8888,function(){console.log("server started at 8888")})}();
//# sourceMappingURL=maps/index.ugly.js.map
