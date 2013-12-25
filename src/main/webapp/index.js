$(document).ready(function() {
	
	var triggerColumns = [[
	                       {field:'name', title:'name',align:'center',hidden:true,sortable:true,resizable:true,fixed:true,width:100,checkbox:false},
	                       {field:'group', title:'group',align:'center',hidden:true,sortable:true,resizable:true,fixed:true,width:100},
	                       {field:'fullName', title:'fullName',align:'center',hidden:false,sortable:true,resizable:true,fixed:true,width:200},
	                       {field:'jobName', title:'jobName',align:'center',hidden:true,sortable:true,resizable:true,fixed:true,width:100},
	                       {field:'jobGroup', title:'jobGroup',align:'center',hidden:true,sortable:true,resizable:true,fixed:true,width:100},
	                       {field:'fullJobName', title:'fullJobName',align:'center',hidden:false,sortable:true,resizable:true,fixed:true,width:200},
	                       {field:'startTime', title:'startTime',align:'center',hidden:false,sortable:true,resizable:true,fixed:true,width:200, 
	                    	   formatter : function(value,row,index) {
	                    		   var date = new Date();
	                    		   date.setTime(value);
	                    		   date = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+ date.getDate() + ' ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	                    		   return date;
	                    	   }
	                       },
	                       {field:'nextFireTime', title:'nextFireTime',align:'center',hidden:false,sortable:true,resizable:true,fixed:true,width:200,
	                    	   formatter : function(value, row, index) {
	                    		   var date = new Date();
	                    		   date.setTime(value);
	                    		   date = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+ date.getDate() + ' ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	                    		   return date;
	                    	   }
	                       },
	                       {field:'cronExpression',title:'cronExpression',align:'center',hidden:true,sortable:true,resizable:true,fixed:true,width:100}
	        	    ]];
	$('#trigger').datagrid({
		url          : './quartz?m=index',
		columns      : triggerColumns,
		fitColumns   : true,
	    singleSelect : true,
	    showFooter   : true,
	   	method       : 'get',
	   	rownumbers   : true,
	   	pagination   : true,
	   	idField      : 'fullName',
	    pagePosition : 'bottom',
	    toolbar      : '#triggerToolbar',
	    loadMsg      : '努力加载中。。。'
	});
	
	$('#triggerAddBtn').bind('click', function() {
		$('#dlg').dialog('open');
	});
	
	$('#triggerEditBtn').bind('click', function() {
		console.log('trigger edit');
	});
	
	$('#triggerRemoveBtn').bind('click', function() {
		console.log('trigger remove');
	});
	
	var tree = $('#tt2').tree({
		url : './jdmenu',
		onBeforeExpand : function(node) {
			console.log('onBeforeExpand', node);
			$('#tt2').tree('append', {
		        parent : node.target,
		        url    : './jdmenu?id='+node.id
		    });
		},
		onBeforeSelect : function(node) {
			console.log('beforeSelect: ', node.attributes.url);
			
			$('#tt').tabs('add', {
				//id : node.attrubutes.url,
				title : node.text,
				selected : true,
				closable : true,
				content : node.text
			});
		}
	});
	
	$('#dg').datagrid({
	    url:'./sanguozhi',
	    columns:[[
	        {field:'column0', title:'序号',align:'center',sortable:true,fixed:true,width:100,checkbox:true},
	        {field:'column1', title:'姓名',align:'center',sortable:true,fixed:true,width:100},
	        {field:'column13',title:'性别',align:'center',sortable:true,fixed:true,width:100},
	        {field:'column15',title:'生年',align:'center',sortable:true,fixed:true,width:100},
	        {field:'column16',title:'登场',align:'center',sortable:true,fixed:true,width:100},
	        {field:'column19',title:'统率',align:'center',sortable:true,fixed:true,width:100},
	        {field:'column20',title:'武力',align:'center',sortable:true,fixed:true,width:100},
	        {field:'column21',title:'知力',align:'center',sortable:true,fixed:true,width:100},
	        {field:'column22',title:'政治',align:'center',sortable:true,fixed:true,width:100}
	    ]],
	    fitColumns      : true,
	    singleSelect    : true,
	    showFooter      : true,
	   	method          : 'get',
	   	rownumbers      : true,
	   	pagination      : true,
	   	idField         : 'column0',
	    pagePosition    : 'bottom',
	    loadMsg         : '努力加载中。。。',
	    toolbar         : '#toolbar',
	    view            : detailview,
	    detailFormatter : function(rowIndex, rowData){
	    	var table = '<table align="center">';
	    	
    		var td  = '<tr align="center"><td width="100">序号</td><td>'+rowData.column0+'</td><td width="100">姓名</td><td>'+rowData.column1+'</td><td width="100">身分</td><td>'+rowData.column2+'</td><td width="100">軍団</td><td>'+rowData.column3+'</td><td width="100">所在</td><td>'+rowData.column4+'</td></tr>';
    		    td += '<tr align="center"><td>施設</td><td>'+rowData.column5+'</td><td>官爵</td><td>'+rowData.column6+'</td><td>忠誠</td><td>'+rowData.column7+'</td><td>俸禄</td><td>'+rowData.column8+'</td><td>仕官</td><td>'+rowData.column9+'</td></tr>';
    		    td += '<tr align="center"><td>行動済</td><td>'+rowData.column10+'</td><td>仕官拒否勢力</td><td>'+rowData.column11+'</td><td>傷病</td><td>'+rowData.column12+'</td><td>性別</td><td>'+rowData.column13+'</td><td>顔</td><td>'+rowData.column14+'</td></tr>';
    		    td += '<tr align="center"><td>生年</td><td>'+rowData.column15+'</td><td>登場年</td><td>'+rowData.column16+'</td><td>没年</td><td>'+rowData.column17+'</td><td>死因</td><td>'+rowData.column18+'</td><td>統率</td><td>'+rowData.column18+'</td></tr>';
    		    td += '<tr align="center"><td>武力</td><td>'+rowData.column19+'</td><td>知力</td><td>'+rowData.column20+'</td><td>政治</td><td>'+rowData.column21+'</td><td>統率成长</td><td>'+rowData.column22+'</td><td>武力成长</td><td>'+rowData.column23+'</td></tr>';
    		    td += '<tr align="center"><td>知力成长</td><td>'+rowData.column24+'</td><td>政治成长</td><td>'+rowData.column25+'</td><td>兵科</td><td>'+rowData.column26+'</td><td>戦法</td><td>'+rowData.column27+'</td><td>商才</td><td>'+rowData.column28+'</td></tr>';
    		    td += '<tr align="center"><td>耕作</td><td>'+rowData.column29+'</td><td>名士</td><td>'+rowData.column30+'</td><td>兵心</td><td>'+rowData.column31+'</td><td>練兵</td><td>'+rowData.column32+'</td><td>収集</td><td>'+rowData.column33+'</td></tr>';
    		    td += '<tr align="center"><td>人脈</td><td>'+rowData.column34+'</td><td>監視</td><td>'+rowData.column35+'</td><td>補修</td><td>'+rowData.column36+'</td><td>弁舌</td><td>'+rowData.column37+'</td><td>豪傑</td><td>'+rowData.column38+'</td></tr>';
    		    td += '<tr align="center"><td>一騎</td><td>'+rowData.column39+'</td><td>神速</td><td>'+rowData.column40+'</td><td>水練</td><td>'+rowData.column41+'</td><td>遠射</td><td>'+rowData.column42+'</td><td>攻城</td><td>'+rowData.column43+'</td></tr>';
    		    td += '<tr align="center"><td>兵器</td><td>'+rowData.column44+'</td><td>冷静</td><td>'+rowData.column45+'</td><td>軍師</td><td>'+rowData.column46+'</td><td>鬼謀</td><td>'+rowData.column47+'</td><td>相性</td><td>'+rowData.column48+'</td></tr>';
    		    td += '<tr align="center"><td>勇猛</td><td>'+rowData.column49+'</td><td>義理</td><td>'+rowData.column50+'</td><td>音声</td><td>'+rowData.column51+'</td><td>格付</td><td>'+rowData.column52+'</td><td>血縁</td><td>'+rowData.column53+'</td></tr>';
    		    td += '<tr align="center"><td>父親</td><td>'+rowData.column54+'</td><td>母親</td><td>'+rowData.column55+'</td><td>配偶者</td><td>'+rowData.column56+'</td><td>配偶者</td><td>'+rowData.column57+'</td><td>配偶者</td><td>'+rowData.column58+'</td></tr>';
    		    td += '<tr align="center"><td>義兄</td><td>'+rowData.column59+'</td><td>親愛武将</td><td>'+rowData.column60+'</td><td>親愛武将</td><td>'+rowData.column61+'</td><td>親愛武将</td><td>'+rowData.column62+'</td><td>親愛武将</td><td>'+rowData.column63+'</td></tr>';
    		    td += '<tr align="center"><td>親愛武将</td><td>'+rowData.column64+'</td><td>嫌悪武将</td><td>'+rowData.column65+'</td><td>嫌悪武将</td><td>'+rowData.column66+'</td><td>嫌悪武将</td><td>'+rowData.column67+'</td><td>嫌悪武将</td><td>'+rowData.column68+'</td></tr>';
    		    td += '<tr align="center"><td>嫌悪武将</td><td>'+rowData.column69+'</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
	    	
	    	table += td + '</table>';
	    	return table;
	    }
	});
	
	$('#searchBtn').bind('click', function() {
		var text = $('#searchText').val();
		var field = $('#cc').combobox('getValue');
		
		if(text.length == 0) {
			$.messager.alert('温馨提示','查询条件不能为空哦，亲！','warning');
		} else {
			console.log('field: ', field);
			$('#dg').datagrid('reload', {searchValue : text, searchField : field});
		}
	});
	
	$('#editBtn').bind('click', function() {
		var rowData = $('#dg').datagrid('getSelected');
		if(rowData == null) {
			$.messager.alert('温馨提示','请选择一条记录哦，亲！','warning');
			return;
		}
		console.log(rowData);
		var table = '<table align="center">';
    	
		var td  = '<tr align="center"><td width="100">序号</td><td>'+rowData.column0+'</td><td width="100">姓名</td><td>'+rowData.column1+'</td><td width="100">身分</td><td>'+rowData.column2+'</td><td width="100">軍団</td><td>'+rowData.column3+'</td><td width="100">所在</td><td>'+rowData.column4+'</td></tr>';
		    td += '<tr align="center"><td>施設</td><td>'+rowData.column5+'</td><td>官爵</td><td>'+rowData.column6+'</td><td>忠誠</td><td>'+rowData.column7+'</td><td>俸禄</td><td>'+rowData.column8+'</td><td>仕官</td><td>'+rowData.column9+'</td></tr>';
		    td += '<tr align="center"><td>行動済</td><td>'+rowData.column10+'</td><td>仕官拒否勢力</td><td>'+rowData.column11+'</td><td>傷病</td><td>'+rowData.column12+'</td><td>性別</td><td>'+rowData.column13+'</td><td>顔</td><td>'+rowData.column14+'</td></tr>';
		    td += '<tr align="center"><td>生年</td><td>'+rowData.column15+'</td><td>登場年</td><td>'+rowData.column16+'</td><td>没年</td><td>'+rowData.column17+'</td><td>死因</td><td>'+rowData.column18+'</td><td>統率</td><td>'+rowData.column18+'</td></tr>';
		    td += '<tr align="center"><td>武力</td><td>'+rowData.column19+'</td><td>知力</td><td>'+rowData.column20+'</td><td>政治</td><td>'+rowData.column21+'</td><td>統率成长</td><td>'+rowData.column22+'</td><td>武力成长</td><td>'+rowData.column23+'</td></tr>';
		    td += '<tr align="center"><td>知力成长</td><td>'+rowData.column24+'</td><td>政治成长</td><td>'+rowData.column25+'</td><td>兵科</td><td>'+rowData.column26+'</td><td>戦法</td><td>'+rowData.column27+'</td><td>商才</td><td>'+rowData.column28+'</td></tr>';
		    td += '<tr align="center"><td>耕作</td><td>'+rowData.column29+'</td><td>名士</td><td>'+rowData.column30+'</td><td>兵心</td><td>'+rowData.column31+'</td><td>練兵</td><td>'+rowData.column32+'</td><td>収集</td><td>'+rowData.column33+'</td></tr>';
		    td += '<tr align="center"><td>人脈</td><td>'+rowData.column34+'</td><td>監視</td><td>'+rowData.column35+'</td><td>補修</td><td>'+rowData.column36+'</td><td>弁舌</td><td>'+rowData.column37+'</td><td>豪傑</td><td>'+rowData.column38+'</td></tr>';
		    td += '<tr align="center"><td>一騎</td><td>'+rowData.column39+'</td><td>神速</td><td>'+rowData.column40+'</td><td>水練</td><td>'+rowData.column41+'</td><td>遠射</td><td>'+rowData.column42+'</td><td>攻城</td><td>'+rowData.column43+'</td></tr>';
		    td += '<tr align="center"><td>兵器</td><td>'+rowData.column44+'</td><td>冷静</td><td>'+rowData.column45+'</td><td>軍師</td><td>'+rowData.column46+'</td><td>鬼謀</td><td>'+rowData.column47+'</td><td>相性</td><td>'+rowData.column48+'</td></tr>';
		    td += '<tr align="center"><td>勇猛</td><td>'+rowData.column49+'</td><td>義理</td><td>'+rowData.column50+'</td><td>音声</td><td>'+rowData.column51+'</td><td>格付</td><td>'+rowData.column52+'</td><td>血縁</td><td>'+rowData.column53+'</td></tr>';
		    td += '<tr align="center"><td>父親</td><td>'+rowData.column54+'</td><td>母親</td><td>'+rowData.column55+'</td><td>配偶者</td><td>'+rowData.column56+'</td><td>配偶者</td><td>'+rowData.column57+'</td><td>配偶者</td><td>'+rowData.column58+'</td></tr>';
		    td += '<tr align="center"><td>義兄</td><td>'+rowData.column59+'</td><td>親愛武将</td><td>'+rowData.column60+'</td><td>親愛武将</td><td>'+rowData.column61+'</td><td>親愛武将</td><td>'+rowData.column62+'</td><td>親愛武将</td><td>'+rowData.column63+'</td></tr>';
		    td += '<tr align="center"><td>親愛武将</td><td>'+rowData.column64+'</td><td>嫌悪武将</td><td>'+rowData.column65+'</td><td>嫌悪武将</td><td>'+rowData.column66+'</td><td>嫌悪武将</td><td>'+rowData.column67+'</td><td>嫌悪武将</td><td>'+rowData.column68+'</td></tr>';
		    td += '<tr align="center"><td>嫌悪武将</td><td>'+rowData.column69+'</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
    	
    	table += td + '</table>';
		var win = $('<div id="win" title="详情">'+table+'</div>');
		$.parser.parse($(win));
		$(win).window({
			width  : 800,
		    height : 300,
		    modal  : true
		});
	});
	
	$('#helpBtn').bind('click', function() {
		
	});
	
	var pager = $('#dg').datagrid('getPager');
	$(pager).pagination({
		loading: true,
		pageSize: 10,
		pageList: [10,20,30,40,50],
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',
		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
		
	});
	
});