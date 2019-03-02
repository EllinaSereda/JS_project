function PageController(m,v){
	var model=null;
    var view=null;
    function init(){
        model=new PageModel();
        view=new PageView(model);
        view.initPage();
        window.onhashchange=changed;
        changed();
    }
    init();
    function changed(){
        var h = location.hash;
        var state=h.substr(1);
        state=decodeURIComponent(state);
        console.log(state);
        if (state!=''){
            state=JSON.parse(state);
        } 
        else{ 
            state={pagename:'day'}; 
                       
        }
         model.setState(state);
         view.update();
    }

	this.changePeriod=function(){
    	var value=$('[name=MoneyCateg]');
    	var timeType=$('[name=N]');
        var check;
        var period;
         $('.rd').change(func);
       	$(".per").change(func);
       	function func(){
        	for (var ii=0; ii<value.length; ii++){
            	if (value[ii].checked){
                	check=ii;
                	view.setRD(check);
            	}
            }
            
        	for (var i=0; i<timeType.length; i++){
            	if (timeType[i].checked){
                	period=i;
                	localStorage['case']=period;
                }
            
            	switch (period){
                	case 0:
                    	state={pagename:'day'};
                    	break;
                	case 1:
                    	state={pagename:'week'};
                    	break;
                	case 2:
                    	state={pagename:'month'};
                    	break;
                	case 3:
                    	state={pagename:'year'};
                    	break;
            	}
            	
        	}
       		model.setState(state);
       		view.update();
      	 }   
	}

        
        this.lr=function(){
    		var back=$('#back');
    		back.click(prev);
    		
    		var next=$('#next');
    		next.click(nex);
    		
    		function prev(){
    			var Mycase=localStorage['case'];
        		var ish=view.getD();
        		if (ish==undefined){
            		ish=new Date();
        		}
        		var day=ish.getDate();
       	 		var month=ish.getMonth();
        		var year=ish.getFullYear();
        		switch(parseInt(Mycase)){
        			case 0:
        				if (day==1){
            				if (month==0||month==2||month==4||month==6||month==7||month==9||month==11){
               					day=30;
               					month--;
            				}
            				else {
            					day=31;  
            				}
            				if (month==0){
                				month=11;
                				year--;
            				}
            				else	{
                 				month--;
            				} 
        				}
        				else{
            				day--;
        				}
        				var t=new Date(year,month,day);
        				break;
        			case 1:
        				var x=ish.getTime()-7*86400000;
        				var t=new Date(x);
        				break;
        			case 2:
        				if (month==0){
        					month=11;
        					year--;	
        				}
        				else{
        					month--;
        				}
        				var t=new Date(year,month,day);
        				break;
        			case 3:
        				year--;	
        				var t=new Date(year,month,day);
        				 break;
        		}
        		
        					view.setDay(t); 
        					view.update();
        				
    					}
    					
    	function nex(){
    		var Mycase=localStorage['case'];
        	var ish=view.getD();
        	if (ish==undefined){
            	ish=new Date();
        	}
        	var mil=ish.getTime();
        	var day=ish.getDate();
        	var month=ish.getMonth();
        	var year=ish.getFullYear();
       		switch(parseInt(Mycase)){
        			case 0:
        				if (month==0||month==2||month==4||month==6||month==7||month==9){
               				if ( day==31){
                				day=1;
                				month++;
               				}
            			}
        				if (month==3||month==5||month==8||month==10) {
                			if (day==30){
                   				day=1;
                    			month++;
                			}
        				}
        				if (month==2) {
                			if (day==28){
                    			day=1;
                    			month++;
                			}
        				}
        				if (month==11) {
                			if (day==31){
                    			day=1;
                    			month=1;
                    			year++;
                			}
        				}
        				else{
            				day++;
        				}
        				var t=new Date(year,month,day);
        				break;
        			case 1:
        				var x=ish.getTime()+7*86400000;
        				var t=new Date(x);
        				
        				break;
        			case 2:
        				if (month==11){
        					month=0;
        					year++;	
        				}
        				else{
        					month++;
        				}
        				var t=new Date(year,month,day);
        				break;
        			case 3:
        				year++;
        				var t=new Date(year,month,day);
        				break;
				}
        				
        	view.setDay(t); 
        	view.update();  

        				
        	}
       }  
       this.setDateFunc=function(){
       	console.log($('#choserButton'));
       	$('#choserButton').click(setThisDate);
           function setThisDate(){
           	var z=$('#choser').datepicker('getDate');
           	if (z!=null){
           		view.setDay(z); 
        	view.update();  
           	}
           	
           	//console.log(dataChose.datepicker('getDate'));
           }
       	
       }   
     
}

