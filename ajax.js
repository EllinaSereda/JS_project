
function AjaxStorage(information, AfterAjax) {
                var storage = {};
                storage.rash=[];
		        storage.doh=[];
		        var spisok=0;
		        var ost=0;
	            var url = "https://fe.it-academy.by/AjaxStringStorage2.php";
	            var handle = "EllinaFinal";
                var handleErrors=function(e){
	                if (e){
		            alert(e);return false;
	                }
	                return true;
                }
                var handleSuccess=function(data){
	                handleErrors(data.errors);
	                console.log(data.result);
                }
                var updateStorage = function(pswd) {
		            $.ajax({
			        url: url, type : 'POST', dataType:'json', cache : false, data: { f : 'UPDATE', n : handle, v : JSON.stringify(storage), p : pswd }, success: handleSuccess 
		            });
	            }
                this.initStorage = function() {
		            storage = {};
		            storage.rash=[];
		        storage.doh=[];
		            $.ajax({
			            url: url, type : 'POST', dataType:'json', cache : false, data: { f : 'READ', n : handle }, 
			            success: function (data) {
				            if ( handleErrors(data.error) ) {
					        if ("" == data.result) {
						        $.ajax({
							    url: url, type : 'POST', dataType:'json', cache : false,
							    data: { f : 'INSERT', n : handle, v : JSON.stringify(storage) }, sucess: handleSuccess
						         });
					        } else {
						        storage = JSON.parse(data.result);
						        var minus=storage.rash;
						       var plus= storage.doh;
						        for (var i=0;i<minus.length;i++){
						        ost=ost	-minus[i].sum;
						        }
						        for (var j=0;j<plus.length;j++){
						        ost=ost	+plus[j].sum;
						        }
						       var cont=$('.ostatok');
                				cont[0].textContent=(Math.round(ost/0.01)) /100;
                				console.log(storage);
                				
                				information=storage;
                				
                				
                						        
						        }
				            }
				            AfterAjax(information);
				            
			            }
			            
		            });
		            
	            }
	
	this.AddValue = function(t,key,value,prim,nam) {
		 var pswd=Math.random();       
		 $.ajax( {
                url : url,
                type : 'POST', dataType:'json',
                data : { f : 'LOCKGET', n : handle, p : pswd },
                cache : false,
                success : function(data){
                	if (handleErrors(data.error)){
                		storage = JSON.parse(data.result);
                		if (storage=={}){
                			storage.rash=[];
                		storage.doh=[];

                		}
                		x=storage.rash;
                		y=storage.doh;
                		 var type=0;
                		 var date=new Date();
                		 var month=date.getMonth();
                		 month++;
                		 var datestr=str(date.getDate(),2)+"."+str((month),2)+"."+date.getFullYear();
                		 
                		 function str(val,len) {
        					var strVal=val.toString();
        					while ( strVal.length < len )
            				strVal='0'+strVal;
        					return strVal;
    					 }

                		var month=date.getMonth();
                		 month++;
                	    var numberOper=0;
                		if (t==1){
                		     type=x;
                		    type.push({categ:key,day:date.getDate(), month:month,year:date.getFullYear(),sum:Number(value),dataFull:datestr,commenta:prim, nameCat:nam});
                		}
                		else {
                		    type=y;
                		    type.push({categ:key,day:date.getDate(), month:month,year:date.getFullYear(),sum:Number(value),dataFull:datestr,commenta:prim,nameCat:nam});
                		  }
                		switch (type){
                		    case x:
                		      ost=ost-Number(value);
                		    break;
                		    case y:
                		        ost=ost+Number(value);
                		      break;
                		}
                	    var cont=$('.ostatok');
                		cont[0].textContent=Math.round(ost/0.01) /100;
                    }
      		  		console.log(storage);
      		  		information=storage;
      		  		AfterAjax(information);
      		  		
      		  		/*var okno=$('<div id=DDD title="Моё окно"></div>');
      		  		$('body').append(okno);
      		  		 $('#DDD').dialog({position: { my: 'right-top',at: 'right-top', of: window}});
      		  		 setTimeout(function(){ $('#DDD').dialog('close')},4000)*/
      		  		 if (ost<0){
      		  			var okno=$('<div id=DDD title="Моё окно"></div>');
      		  		$('body').append(okno);
      		  		 $('#DDD').dialog({title:'Вы ушли в минус!',height:'auto',minHeight:'10px',position: { my: 'right top',at: 'right top', of: window}});
      		  		 /*setTimeout(function(){ $('#DDD').dialog('close')},4000)
                	updateStorage(pswd);*/
      		  		}
                	updateStorage(pswd);
                }
            });
        }
    this.GetValue = function() {
	    $.ajax( {
                url : url,
                type : 'POST', dataType:'json',
                data : { f : 'READ', n : handle},
                cache : false,
                success : function(data){
                	if (handleErrors(data.error)){
                		storage = JSON.parse(data.result);
                	}
                	AfterAjax(information);
                }
            });
	}
}

