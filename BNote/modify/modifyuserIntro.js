define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};
	var uinfo;
	Model.prototype.userCustomRefresh = function(event){
		var userData = event.source;
        $.ajax({
            type: "POST",
            url: "http://www.mmddragon.com/bs/index.php?p=front&c=User&a=infouser",
            data: {"userId":uinfo},
            dataType: 'json',
            async: false,
            cache: false,
            success: function(data){
            	var json = "["+JSON.stringify(data["data"])+"]";
            	var userd = JSON.parse(json);
            	userData.loadData(userd);//将返回的数据加载到data组件
            	userData.first();
            	
            },
            error: function(){
              throw justep.Error.create("加载数据失败");
            }
        });
	};
	Model.prototype.modelParamsReceive = function(event){
		uinfo = event.params.id;
		this.comp("user").refreshData();
	};


	Model.prototype.button1Click = function(event){
		var text = this.comp("textarea1").val();
		if(text.length>50){
			text = text.substring(0,50);
			alert("由于您输入字数过多，只保存了部分内容！");
		}
		 $.ajax({
            type: "POST",
            url: "http://www.mmddragon.com/bs/index.php?p=front&c=User&a=modifyone",
            data: {"userId":uinfo,"userIntro": text},
            dataType: 'json',
            async: false,
            cache: false,
            success: function(data){
            	if(data.sign=="1"){
            		var params = {
            				id : uinfo
            		};
            	justep.Shell.showPage("personalmsg",params);
            	}
            	else{
            		alert("修改失败，错误码：00003");
            	}
            },
            error: function(){
              throw justep.Error.create("修改失败，错误码：00004");
            }
        });
	};
	Model.prototype.backbtnClick = function(event){
            		var params = {
            				id : uinfo
            		};
            	justep.Shell.showPage("personalmsg",params);
	};
	return Model;
});