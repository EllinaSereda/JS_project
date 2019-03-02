function PageView(_model){
	var model=_model;
	var information;
	var field;
	var Case;
	var typeRD;
	var Storage;
	var Myday;
	var ost=0;
	if (localStorage['typ']==undefined){
		console.log(localStorage['typ']==undefined);
		localStorage['typ']=0;
	}
	
	//УСТАНАВЛИВАЮ РАСХОД ИЛИ ДОХОД
	this.setRD=function(x){
        typeRD=x;
        localStorage['typ']=typeRD;
    }
    this.setDay=function(y){
    	console.log(y);
        Myday=y;
    }
    this.getD=function(){
        return Myday;
    }
    var update=this.update;
    //ПОДГРУЖАЮ АЯКС, ЗАПУСКАЮ в нем AfterAjax
	this.update=function(){
		var currentState=model.getState();
			switch(currentState.pagename){
				case "day":
					$('#day')[0].checked="checked";
					break;
				case "week":
					$('#day')[0].checked="checked";
					break;
				case "month":
					$('#day')[0].checked="checked";
					break;
				case "year":
					$('#day')[0].checked="checked";
					break;
			}
			var typeRD=localStorage['typ'];
			if (typeRD==0){
				$('#rashod').checked="checked";
				$('#rLab').addClass("ui-state-active");
			}
			else{
				$('#dahod').checked="checked";
				$('#dLab').addClass("ui-state-active");
			}
		Storage.GetValue();
	}
	
	//ИЗМЕНЕНИЕ СТРАНИЦЫ В ЗАВИСИМОСТИ ОТ ВЫБРАННЫХ КАТЕГОРИЙ
	this.AfterAjax=function(information){
			var typeRD=localStorage['typ'];
			var currentState=model.getState();
			switch(currentState.pagename){
						case "day":
			
				
				var chosen=$('#day');
				$('#day')[0].checked="checked";
				$('#Lday').addClass("ui-state-active");
				if (typeRD==1){
               		var totalDoh=0;
        			var zarp=0;
     				var present=0;
     				var prem=0;
     				var pr=0;
     				var today=new Date();
      				if (Myday!=undefined)
      					today=Myday;
      				
      				
      				var thisMonth=today.getMonth();
     				thisMonth++;
     				$('#display').empty();
                	var day=today.getDay();
                	var thisDay;
                	switch (day){
                		case 0:
                			thisDay="Воскресенье";
                			break;
                		case 1:
                			thisDay="Понедельник";
                			break;
                		case 2:
                			thisDay="Вторник";
                			break;
                		case 3:
                			thisDay="Среда";
                			break;
                		case 4:
                			thisDay="Четверг";
                			break;
                		case 5:
                			thisDay="Пятница";
                			break;
                		case 6:
                			thisDay="Суббота";
                			break;
                	}
                	var datestr=str(today.getDate(),2)+"."+str((thisMonth),2)+"."+today.getFullYear()+", " +thisDay;
                		 
                	function str(val,len) {
        					var strVal=val.toString();
        					while ( strVal.length < len )
            				strVal='0'+strVal;
        					return strVal;
    					 }

      				var p=$('<p>'+datestr+'</p>');
      				$('#display').append(p);
     				var masDataDoh=[];
       	   		  	var summDoh=information.doh;
       	   		  	$("#categories").empty();
       	   		  	 $('#allSh').empty();
       	   		  	var masP=0;
         	       for (var ii=0; ii<summDoh.length;ii++ ){
         	       	
           	        if (thisMonth==summDoh[ii].month && today.getFullYear()==summDoh[ii].year && summDoh[ii].day==today.getDate()){
                    	var p=$('<p>'+summDoh[ii].dataFull+' '+summDoh[ii].categ+' - '+summDoh[ii].sum+' руб.'+'<br>'+'('+summDoh[ii].commenta+')'+'</p>');
                    		masP++;
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summDoh.length;j++ ){   
                    				if (thisMonth==summDoh[j].month && today.getFullYear()==summDoh[j].year && summDoh[j].day==today.getDate()){
                   					var p=$('<p>'+summDoh[j].dataFull+' '+summDoh[j].categ+' - '+summDoh[j].sum+' руб.'+'<br>'+'('+summDoh[j].commenta+')'+'</p>');
                    				mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}
                   		
                			totalDoh=totalDoh+summDoh[ii].sum;
                	 	  	switch (summDoh[ii].categ){
                				case "Зарплата":
                					zarp=zarp+summDoh[ii].sum;      
                					break;
                				case "Подарки":
                					present=present+summDoh[ii].sum;      
                					break;
                				case "Премия":
                					prem=prem+summDoh[ii].sum;      
                					break;
                				case "Прочее":
                					pr=pr+summDoh[ii].sum;      
                					break;
                			}
                		}
           		   	  }   
           		   	  if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }   
              		  if (zarp!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(zarp/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (present!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(present/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }
               		 if (prem!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(prem/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (pr!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(pr/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }

              		var INlabel="{y} %";
                	var legend=true;
                	if (masDataDoh.length==0){
                   	 	masDataDoh.push({ label: " ",   y:100, legendText: " " });
                    	INlabel="0 %";
                    	legend=false;
                	}

               	 	var canvasDiv=$('#canvas');
     				canvasDiv.empty();
                	var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
        			canvasDiv.append(canvas);
        			$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Доходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
						{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 
							indexLabel: INlabel, 
							dataPoints: masDataDoh		
					   	} 
						] 
					});       
				}
				if (typeRD==0){
     				var totalSum=0;
      				var food=0;
      				var clothes=0;
      				var cab=0;
     				var health=0;
      				var home=0;
      				var health=0;
      				var cafe=0;
      				var cosmetics=0;
      				var car=0;
      				var pet=0;
      				var presents=0;
      				var joy=0;
      				var stationery=0;
      				var phone=0;
      				var sport=0;
      				var bills=0;
      				var cab=0;
      				var transport=0;
      				var summ=information.rash;
      				var today=new Date();
      				if (Myday!=undefined)
      					today=Myday;
      				
    				var thisMonth=today.getMonth();
     				thisMonth++;
     				$('#display').empty();
     				var day=today.getDay();
                	var thisDay;
                	switch (day){
                		case 0:
                			thisDay="Воскресенье";
                			break;
                		case 1:
                			thisDay="Понедельник";
                			break;
                		case 2:
                			thisDay="Вторник";
                			break;
                		case 3:
                			thisDay="Среда";
                			break;
                		case 4:
                			thisDay="Четверг";
                			break;
                		case 5:
                			thisDay="Пятница";
                			break;
                		case 6:
                			thisDay="Суббота";
                			break;
                	}
                	var datestr=str(today.getDate(),2)+"."+str((thisMonth),2)+"."+today.getFullYear()+", " +thisDay;
                		 
                	function str(val,len) {
        					var strVal=val.toString();
        					while ( strVal.length < len )
            				strVal='0'+strVal;
        					return strVal;
    					 }

      				var p=$('<p>'+datestr+'</p>');
      				$('#display').append(p);
     				var masData=[];
     				$('#categories').empty();
     				$('#allSh').empty();
					var masP=0;
              		for (var ii=0; ii<summ.length;ii++ ){   
                    	if (thisMonth==summ[ii].month && today.getFullYear()==summ[ii].year && summ[ii].day==today.getDate()){
                    	var p=$('<p>'+summ[ii].dataFull+' '+summ[ii].categ+' - '+summ[ii].sum+' руб.'+'<br>'+'('+summ[ii].commenta+')'+'</p>');
                    		masP++;
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summ.length;j++ ){   
                    				if (thisMonth==summ[j].month && today.getFullYear()==summ[j].year && summ[j].day==today.getDate()){
                   					var p=$('<p>'+summ[j].dataFull+' '+summ[j].categ+' - '+summ[j].sum+' руб.'+'<br>'+'('+summ[j].commenta+')'+'</p>');
                    				mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}
                        totalSum=totalSum+summ[ii].sum;
                        console.log("advagfsds");
                			switch (summ[ii].categ){
                		      	                		 	case "Еда":
                				food=food+summ[ii].sum;    
                				break;
                			case "Одежда":
                				clothes=clothes+summ[ii].sum;       
                				break;	
                			case "Здоровье":
                				health=health+summ[ii].sum;         
                				break;	
                			case "Такси":
                				cab=cab+summ[ii].sum;    
                				break;
                			case "Жильё":
                				home=home+summ[ii].sum;      
                				break;	
                			case "Кафе":
                				cafe=cafe+summ[ii].sum;       
                				break;
                			case "Косметика":
                				cosmetics=cosmetics+summ[ii].sum;  
                				break;
                			case "Машина":
                				car=car+summ[ii].sum;      
                				break;
                			case "Подарки":
                				presents=presents+summ[ii].sum;      
                				break;
                			case "Питомцы":
                				pet=pet+summ[ii].sum;     
                				break;
                			case "Развлечения":
                				joy=joy+summ[ii].sum;   
                				break;
                			case "Канцтовары":
                				stationery=stationery+summ[ii].sum;  
                				break;
                			case "Связь":
                				phone=phone+summ[ii].sum;   
                				break;
                			case "Спорт":
                				sport=sport+summ[ii].sum;   
                				break;
                			case "Счета":
                				bills=bills+summ[ii].sum;    
                				break;
                			case "Транспорт":
                				transport=transport+summ[ii].sum;    
                				break;	                	    	
                				}
                		}
                	}
                	if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }   
                	   	if (food!=0){
                			if (Math.round(food/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Еда",  y: Math.round(food/totalSum*10000)/ 100, legendText: "Еда"});
                		``}

                		}
                		if (clothes!=0){
                			if (Math.round(clothes/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Одежда",    y: Math.round(clothes/totalSum*10000)/ 100,
                			    legendText: "Одежда"  });
                			}   
                		}
                	   	if (health!=0) {
                	   		if (Math.round(health/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Здоровье",   y: Math.round(health/totalSum*10000)/ 100,  legendText: "Здоровье" });
                			}
                	   	} 
                		if (cab!=0){
                			if (Math.round(cab/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Такси",   y: Math.round(cab/totalSum*10000)/ 100, 
                			    legendText: "Такси" });
                			} 
                		}
                		if (home!=0){
                			if (Math.round(home/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Дом",   y: Math.round(home/totalSum*10000)/ 100, 
                			    legendText: "Дом" });
                			}  
                		}   
                		if (cafe!=0){
                			if (Math.round(cafe/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Кафе",   y: Math.round(cafe/totalSum*10000)/ 100, 
                			    legendText: "Кафе" });
                			}   
                		}
                		if (cosmetics!=0){
                			if (Math.round(cosmetics/totalSum*10000)/ 100 !=0){
                			     masData.push({ label: "Косметика",   y: Math.round(cosmetics/totalSum*10000)/ 100, 
                			    legendText: "Косметика" });
                			}   
                		}       
                		if (car!=0){
                			if (Math.round(car/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Машина",   y: Math.round(car/totalSum*10000)/ 100, 
                			    legendText: "Машина" });
                			}  
                		}	  
                		if (presents!=0){
                			if (Math.round(presents/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Подарки",   y: Math.round(presents/totalSum*10000)/ 100, 
                			    legendText: "Подарки" });
                			}
                		}	 
                		if (pet!=0){
                			if (Math.round(pet/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Питомцы",   y: Math.round(pet/totalSum*10000)/ 100, 
                			    legendText: "Питомцы" });
                			}
                		}
                		if (joy!=0){
                			if (Math.round(joy/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Развлечения",    y: Math.round(joy/totalSum*10000)/ 100,
                			    legendText: "Развлечения"  });
                			}   
                		}
                		if (stationery!=0){
                			if (Math.round(stationery/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Канцтовары",   y: Math.round(stationery/totalSum*10000)/ 100,
                			    legendText: "Канцтовары" });
                			} 
                		}    
                		if (phone!=0){
                			if (Math.round(phone/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Телефон",   y: Math.round(phone/totalSum*10000)/ 100, 
                			    legendText: "Телефон" });
                			}     
                		}
                		
                		if (sport!=0){
                			if (Math.round(sport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Спорт",   y: Math.round(sport/totalSum*10000)/ 100, 
                			    legendText: "Спорт" });
                			}
                		}  
                		if (bills!=0){
                			if (Math.round(bills/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Cчета",   y: Math.round(bills/totalSum*10000)/ 100, 
                			    legendText: "Cчета" });
                			}
                		}       
                		if (transport!=0){
                			if (Math.round(transport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Транспорт",   y: Math.round(transport/totalSum*10000)/ 100, 
                			    legendText: "Транспорт" });
                			}
                		}       
 					var INlabel="{y} %";
                	var legend=true;
                	if (masData.length==0){
                    	masData.push({ label: " ",   y:100, legendText: " " });
                    	INlabel="0 %";
                    	legend=false;
                	}

               	 	var canvasDiv=$('#canvas');
     				canvasDiv.empty();
                	var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
        			canvasDiv.append(canvas);
        			$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Доходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
						{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 
							indexLabel: INlabel, 
							dataPoints: masData		
					   	} 
						] 
					}); 
				}
           

						break;
			case "week":
				$('#week')[0].checked="checked";
				$('#Lweek').addClass("ui-state-active");
				if (typeRD==1){
                	var totalDoh=0;
        			var zarp=0;
     				var present=0;
     				 var prem=0;
     				var pr=0;
     				var masDataDoh=[];
     				var today=new Date();
      				if (Myday!=undefined)
      					today=Myday;
      				today.setHours(0, 0, 0, 0);
      					var thisMonth=today.getMonth();
     					thisMonth++;
     					var todayMil=today.getTime();
     					var weekDay=today.getDay();
     					var weekStart=todayMil-(weekDay-1)*86400000;
     					var weekEnd=todayMil-(weekDay-7)*86400000;	
      					var Sweek=new Date(weekStart);
      					var Endweek=new Date(weekEnd);
      					monthSt=Sweek.getMonth();
      					monthSt++;
      					monthEnd=Endweek.getMonth();
      					monthEnd++;

      					

      					    					
    					$('#display').empty();
     				    var datestr=str(Sweek.getDate(),2)+"."+str((monthSt),2)+"."+Sweek.getFullYear()+" - " +str(Endweek.getDate(),2)+"."+str((monthEnd),2)+"."+Endweek.getFullYear();
                		 
                	function str(val,len) {
        					var strVal=val.toString();
        					while ( strVal.length < len )
            				strVal='0'+strVal;
        					return strVal;
    					 }

      				var p=$('<p>'+datestr+'</p>');
      				$('#display').append(p);
    					$("#categories").empty();
       	   		  	 $('#allSh').empty();
       	   		  	var masP=0;
            			var summDoh=information.doh;
            			
                		for (var ii=0; ii<summDoh.length;ii++ ){
                			var monthD=summDoh[ii].month-1;
                			var dateInf=new Date(summDoh[ii].year,monthD,summDoh[ii].day);
                			var InfMil=dateInf.getTime();
                			
                			if (weekStart<=InfMil && InfMil <= weekEnd){
                			var p=$('<p>'+summDoh[ii].dataFull+' '+summDoh[ii].categ+' - '+summDoh[ii].sum+' руб.'+'<br>'+'('+summDoh[ii].commenta+')'+'</p>');                masP++;
                    		
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summ.length;j++ ){   
									var dateInfa=new Date(summDoh[j].year,monthD,summDoh[j].day);
                					var InfMill=dateInfa.getTime();
                    				if (weekStart<=InfMill && InfMill <= weekEnd){
                   					var p=$('<p>'+summDoh[j].dataFull+' '+summDoh[j].categ+' - '+summDoh[j].sum+' руб.'+'<br>'+'('+summDoh[j].commenta+')'+'</p>');
                   					mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}
                			totalDoh=totalDoh+summDoh[ii].sum;
                	 	  	switch (summDoh[ii].categ){
                				 case "Зарплата":
                					zarp=zarp+summDoh[ii].sum;      
                					break;
                				case "Подарки":
                					present=present+summDoh[ii].sum;      
                					break;
                				case "Премия":
                					prem=prem+summDoh[ii].sum;      
                					break;
                				case "Прочее":
                					pr=pr+summDoh[ii].sum;      
                					break;
                			}
                		}
           		   	  }  
           		   	  console.log(masP);
           		   	  if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }       
              		  if (zarp!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(zarp/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (present!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(present/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }
               		 if (prem!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(prem/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (pr!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(pr/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }              		
               		 var INlabel="{y} %";
                	var legend=true;
                	if (masDataDoh.length==0){
                    	masDataDoh.push({ label: " ",   y:100, legendText: " " });
                    	INlabel="0 %";
                    	legend=false;
                	}

               	 	var canvasDiv=$('#canvas');
     				canvasDiv.empty();
                	var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
        			canvasDiv.append(canvas);
        			$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Доходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
						{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 
							indexLabel: INlabel, 
							dataPoints: masDataDoh		
					   	} 
						] 
					});       
				}
				if (typeRD==0){
     				var totalSum=0;
      				var food=0;
      				var clothes=0;
      				var cab=0;
     				var health=0;
      				var home=0;
      				var health=0;
      				var cafe=0;
      				var cosmetics=0;
      				var car=0;
      				var pet=0;
      				var presents=0;
      				var joy=0;
      				var stationery=0;
      				var phone=0;
      				var sport=0;
      				var bills=0;
      				var cab=0;
      				var transport=0;
      				var summ=information.rash;
      				var today=new Date();
      				
      				if (Myday!=undefined)
      					today=Myday;
      				today.setHours(0, 0, 0, 0);
      					var weekDay=today.getDay();
     					if (weekDay==0){
      						var weekStart=today.getDate(weekDay)-6;
      						var weekEnd=today.getDate();
      					}
      					else{
      						var weekStart=today.getDate(weekDay)-weekDay+1;
      						var weekEnd=today.getDate()-weekDay+7;
      					}
     					var thisMonth=today.getMonth();
    					thisMonth++;
      				
    				var thisMonth=today.getMonth();
     				thisMonth++;
     				var thisMonth=today.getMonth();
     					thisMonth++;
     					var todayMil=today.getTime();
     					var weekDay=today.getDay();
     					var weekStart=todayMil-(weekDay-1)*86400000;
     					var weekEnd=todayMil-(weekDay-7)*86400000;	
      					var Sweek=new Date(weekStart);
      					var Endweek=new Date(weekEnd);
      					monthSt=Sweek.getMonth();
      					monthSt++;
      					monthEnd=Endweek.getMonth();
      					monthEnd++;
	    					
    					$('#display').empty();
     				    var datestr=str(Sweek.getDate(),2)+"."+str((monthSt),2)+"."+Sweek.getFullYear()+" - " +str(Endweek.getDate(),2)+"."+str((monthEnd),2)+"."+Endweek.getFullYear();
              	function str(val,len) {
        					var strVal=val.toString();
        					while ( strVal.length < len )
            				strVal='0'+strVal;
        					return strVal;
    					 }

      				var p=$('<p>'+datestr+'</p>');
      				$('#display').append(p);
     				var masData=[];
     				$('#categories').empty();
     				var masP=0;
	
              		for (var ii=0; ii<summ.length;ii++ ){   
                    	var monthD=summ[ii].month-1;
                			var dateInf=new Date(summ[ii].year,monthD,summ[ii].day);
                			var InfMil=dateInf.getTime();
                			$('#allSh').empty();
                			if (weekStart<=InfMil && InfMil <= weekEnd){
                    		var p=$('<p>'+summ[ii].dataFull+' '+summ[ii].categ+' - '+summ[ii].sum+' руб.'+'<br>'+'('+summ[ii].commenta+')'+'</p>');
                    		masP++;
                    		
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summ.length;j++ ){   
									var dateInfa=new Date(summ[j].year,monthD,summ[j].day);
                					var InfMill=dateInfa.getTime();
                    				if (weekStart<=InfMill && InfMill <= weekEnd){
                   						var p=$('<p>'+summ[j].dataFull+' '+summ[j].categ+' - '+summ[j].sum+' руб.'+'<br>'+'('+summ[j].commenta+')'+'</p>');                    mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}

                        totalSum=totalSum+summ[ii].sum;
                        switch (summ[ii].categ){
                		      	                		 	case "Еда":
                				food=food+summ[ii].sum;    
                				break;
                			case "Одежда":
                				clothes=clothes+summ[ii].sum;       
                				break;	
                			case "Здоровье":
                				health=health+summ[ii].sum;         
                				break;	
                			case "Такси":
                				cab=cab+summ[ii].sum;    
                				break;
                			case "Жильё":
                				home=home+summ[ii].sum;      
                				break;	
                			case "Кафе":
                				cafe=cafe+summ[ii].sum;       
                				break;
                			case "Косметика":
                				cosmetics=cosmetics+summ[ii].sum;  
                				break;
                			case "Машина":
                				car=car+summ[ii].sum;      
                				break;
                			case "Подарки":
                				presents=presents+summ[ii].sum;      
                				break;
                			case "Питомцы":
                				pet=pet+summ[ii].sum;     
                				break;
                			case "Развлечения":
                				joy=joy+summ[ii].sum;   
                				break;
                			case "Канцтовары":
                				stationery=stationery+summ[ii].sum;  
                				break;
                			case "Связь":
                				phone=phone+summ[ii].sum;   
                				break;
                			case "Спорт":
                				sport=sport+summ[ii].sum;   
                				break;
                			case "Счета":
                				bills=bills+summ[ii].sum;    
                				break;
                			case "Транспорт":
                				transport=transport+summ[ii].sum;    
                				break;	
                			}
                		}
                	}
                	
                	if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }   
                		if (food!=0){
                			if (Math.round(food/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Еда",  y: Math.round(food/totalSum*10000)/ 100, legendText: "Еда"});
                		``}

                		}
                		if (clothes!=0){
                			if (Math.round(clothes/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Одежда",    y: Math.round(clothes/totalSum*10000)/ 100,
                			    legendText: "Одежда"  });
                			}   
                		}
                	   	if (health!=0) {
                	   		if (Math.round(health/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Здоровье",   y: Math.round(health/totalSum*10000)/ 100,  legendText: "Здоровье" });
                			}
                	   	} 
                		if (cab!=0){
                			if (Math.round(cab/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Такси",   y: Math.round(cab/totalSum*10000)/ 100, 
                			    legendText: "Такси" });
                			} 
                		}
                		if (home!=0){
                			if (Math.round(home/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Дом",   y: Math.round(home/totalSum*10000)/ 100, 
                			    legendText: "Дом" });
                			}  
                		}   
                		if (cafe!=0){
                			if (Math.round(cafe/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Кафе",   y: Math.round(cafe/totalSum*10000)/ 100, 
                			    legendText: "Кафе" });
                			}   
                		}
                		if (cosmetics!=0){
                			if (Math.round(cosmetics/totalSum*10000)/ 100 !=0){
                			     masData.push({ label: "Косметика",   y: Math.round(cosmetics/totalSum*10000)/ 100, 
                			    legendText: "Косметика" });
                			}   
                		}       
                		if (car!=0){
                			if (Math.round(car/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Машина",   y: Math.round(car/totalSum*10000)/ 100, 
                			    legendText: "Машина" });
                			}  
                		}	  
                		if (presents!=0){
                			if (Math.round(presents/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Подарки",   y: Math.round(presents/totalSum*10000)/ 100, 
                			    legendText: "Подарки" });
                			}
                		}	 
                		if (pet!=0){
                			if (Math.round(pet/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Питомцы",   y: Math.round(pet/totalSum*10000)/ 100, 
                			    legendText: "Питомцы" });
                			}
                		}
                		if (joy!=0){
                			if (Math.round(joy/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Развлечения",    y: Math.round(joy/totalSum*10000)/ 100,
                			    legendText: "Развлечения"  });
                			}   
                		}
                		if (stationery!=0){
                			if (Math.round(stationery/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Канцтовары",   y: Math.round(stationery/totalSum*10000)/ 100,
                			    legendText: "Канцтовары" });
                			} 
                		}    
                		if (phone!=0){
                			if (Math.round(phone/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Телефон",   y: Math.round(phone/totalSum*10000)/ 100, 
                			    legendText: "Телефон" });
                			}     
                		}
                		
                		if (sport!=0){
                			if (Math.round(sport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Спорт",   y: Math.round(sport/totalSum*10000)/ 100, 
                			    legendText: "Спорт" });
                			}
                		}  
                		if (bills!=0){
                			if (Math.round(bills/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Cчета",   y: Math.round(bills/totalSum*10000)/ 100, 
                			    legendText: "Cчета" });
                			}
                		}       
                		if (transport!=0){
                			if (Math.round(transport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Транспорт",   y: Math.round(transport/totalSum*10000)/ 100, 
                			    legendText: "Транспорт" });
                			}
                		}       

    					var INlabel="{y} %";
   		 				var legend=true;
    					if (masData.length==0){
        					masData.push({ label: " ",   y:100, 
							legendText: " " });
							INlabel="0 %";	
							legend=false;
    					}
                      
   				var canvasDiv=$('#canvas');
     			canvasDiv.empty();
      			var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
       					$('#canvas').append(canvas);
        				$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Расходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
							{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 
							indexLabel: INlabel, 
							dataPoints: masData
		    				} 
						] 
					}); 
				}
                break;
						
//МЕСЯЦ					
			case "month":
				$('#month')[0].checked="checked";
				$('#Lmonth').addClass("ui-state-active");
				if (typeRD==1){
               		var totalDoh=0;
        			var zarp=0;
     				var present=0;
     				var prem=0;
     				var pr=0;
     				var today=new Date();
     				var masDataDoh=[];
      				if (Myday!=undefined)
      					today=Myday;
     				var thisMonth=today.getMonth();
     				thisMonth++;
     				
     				$('#display').empty();
     				var monthStr;
     				switch (thisMonth){
     					case 1:
     						monthStr="Январь";
     						break;
     					case 2:
     						monthStr="Февраль";
     						break;
     					case 3:
     						monthStr="Март";
     						break;
     					case 4:
     						monthStr="Апрель";
     						break;
     					case 5:
     						monthStr="Май";
     						break;
     					case 6:
     						monthStr="Июнь";
     						break;
     					case 7:
     						monthStr="Июль";
     						break;
     					case 8:
     						monthStr="Август";
     						break;
     					case 9:
     						monthStr="Сентябрь";
     						break;
     					case 10:
     						monthStr="Октябрь";
     						break;
     					case 11:
     						monthStr="Ноябрь";
     						break;
     					case 12:
     						monthStr="Декабрь";
     						break;
     				}
      				var p=$('<p>'+monthStr+'</p>');
      				$('#display').append(p);
      				$('#categories').empty();
      				$('#allSh').empty();
      				var masP=0;
            		var summDoh=information.doh;
                	for (var ii=0; ii<summDoh.length;ii++ ){
                		if (thisMonth==summDoh[ii].month && today.getFullYear()==summDoh[ii].year ){
                			var p=$('<p>'+summDoh[ii].dataFull+' '+summDoh[ii].categ+' - '+summDoh[ii].sum+' руб.'+'<br>'+'('+summDoh[ii].commenta+')'+'</p>');                    masP++;
                    		
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summ.length;j++ ){   
                    				if (thisMonth==summDoh[j].month && today.getFullYear()==summDoh[j].year ){
                   						var p=$('<p>'+summDoh[j].dataFull+' '+summDoh[j].categ+' - '+summDoh[j].sum+' руб.'+'<br>'+'('+summDoh[j].commenta+')'+'</p>');                         				mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}

                			totalDoh=totalDoh+summDoh[ii].sum;
                	 	  	switch (summDoh[ii].categ){
                				case "Зарплата":
                					zarp=zarp+summDoh[ii].sum;      
                					break;
                				case "Подарки":
                					present=present+summDoh[ii].sum;      
                					break;
                				case "Премия":
                					prem=prem+summDoh[ii].sum;      
                					break;
                				case "Прочее":
                					pr=pr+summDoh[ii].sum;      
                					break;
                			}
                		}
           		   	  }   
           		   	  if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }      
              		  if (zarp!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(zarp/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (present!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(present/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }
               		 if (prem!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(prem/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (pr!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(pr/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }
              		var INlabel="{y} %";
                	var legend=true;
                	if (masDataDoh.length==0){
                    	masDataDoh.push({ label: " ",   y:100, legendText: " " });
                    	INlabel="0 %";
                    	legend=false;
                	}

               	 	var canvasDiv=$('#canvas');
     				canvasDiv.empty();
                	var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
        			canvasDiv.append(canvas);
        			$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Доходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
						{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 						indexLabel: INlabel, 
							dataPoints: masDataDoh		
					   	} 
						] 
					});       
				}
				if (typeRD==0){
     				var totalSum=0;
      				var food=0;
      				var clothes=0;
      				var cab=0;
     				var health=0;
      				var home=0;
      				var health=0;
      				var cafe=0;
      				var cosmetics=0;
      				var car=0;
      				var pet=0;
      				var presents=0;
      				var joy=0;
      				var stationery=0;
      				var phone=0;
      				var sport=0;
      				var bills=0;
      				var cab=0;
      				var transport=0;
      				var summ=information.rash;
      				var today=new Date();
      				if (Myday!=undefined)
      					today=Myday;
      				
    				var thisMonth=today.getMonth();
     				thisMonth++;
     				     				$('#display').empty();
     				var monthStr;
     				switch (thisMonth){
     					case 1:
     						monthStr="Январь";
     						break;
     					case 2:
     						monthStr="Февраль";
     						break;
     					case 3:
     						monthStr="Март";
     						break;
     					case 4:
     						monthStr="Апрель";
     						break;
     					case 5:
     						monthStr="Май";
     						break;
     					case 6:
     						monthStr="Июнь";
     						break;
     					case 7:
     						monthStr="Июль";
     						break;
     					case 8:
     						monthStr="Август";
     						break;
     					case 9:
     						monthStr="Сентябрь";
     						break;
     					case 10:
     						monthStr="Октябрь";
     						break;
     					case 11:
     						monthStr="Ноябрь";
     						break;
     					case 12:
     						monthStr="Декабрь";
     						break;
     				}
      				var p=$('<p>'+monthStr+'</p>');
      				$('#display').append(p);
      				$('#allSh').empty();
     				var masData=[];
					$('#categories').empty();
					var masP=0;
	              for (var ii=0; ii<summ.length;ii++ ){   
                    	if (thisMonth==summ[ii].month && today.getFullYear()==summ[ii].year ){
                    		var p=$('<p>'+summ[ii].dataFull+' '+summ[ii].categ+' - '+summ[ii].sum+' руб.'+'<br>'+'('+summ[ii].commenta+')'+'</p>');                    masP++;
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summ.length;j++ ){   
                    				if (thisMonth==summ[j].month && today.getFullYear()==summ[j].year ){
                   					var p=$('<p>'+summ[j].dataFull+' '+summ[j].categ+' - '+summ[j].sum+' руб.'+'<br>'+'('+summ[j].commenta+')'+'</p>');                    mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}
                        totalSum=totalSum+summ[ii].sum;
                        switch (summ[ii].categ){
                		      	                		 	case "Еда":
                				food=food+summ[ii].sum;    
                				break;
                			case "Одежда":
                				clothes=clothes+summ[ii].sum;       
                				break;	
                			case "Здоровье":
                				health=health+summ[ii].sum;         
                				break;	
                			case "Такси":
                				cab=cab+summ[ii].sum;    
                				break;
                			case "Жильё":
                				home=home+summ[ii].sum;      
                				break;	
                			case "Кафе":
                				cafe=cafe+summ[ii].sum;       
                				break;
                			case "Косметика":
                				cosmetics=cosmetics+summ[ii].sum;  
                				break;
                			case "Машина":
                				car=car+summ[ii].sum;      
                				break;
                			case "Подарки":
                				presents=presents+summ[ii].sum;      
                				break;
                			case "Питомцы":
                				pet=pet+summ[ii].sum;     
                				break;
                			case "Развлечения":
                				joy=joy+summ[ii].sum;   
                				break;
                			case "Канцтовары":
                				stationery=stationery+summ[ii].sum;  
                				break;
                			case "Связь":
                				phone=phone+summ[ii].sum;   
                				break;
                			case "Спорт":
                				sport=sport+summ[ii].sum;   
                				break;
                			case "Счета":
                				bills=bills+summ[ii].sum;    
                				break;
                			case "Транспорт":
                				transport=transport+summ[ii].sum;    
                				break;	
                	    	}
                		}
                	}
                	if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }   
                	   	if (food!=0){
                			if (Math.round(food/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Еда",  y: Math.round(food/totalSum*10000)/ 100, legendText: "Еда"});
                		``}

                		}
                		if (clothes!=0){
                			if (Math.round(clothes/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Одежда",    y: Math.round(clothes/totalSum*10000)/ 100,
                			    legendText: "Одежда"  });
                			}   
                		}
                	   	if (health!=0) {
                	   		if (Math.round(health/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Здоровье",   y: Math.round(health/totalSum*10000)/ 100,  legendText: "Здоровье" });
                			}
                	   	} 
                		if (cab!=0){
                			if (Math.round(cab/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Такси",   y: Math.round(cab/totalSum*10000)/ 100, 
                			    legendText: "Такси" });
                			} 
                		}
                		if (home!=0){
                			if (Math.round(home/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Дом",   y: Math.round(home/totalSum*10000)/ 100, 
                			    legendText: "Дом" });
                			}  
                		}   
                		if (cafe!=0){
                			if (Math.round(cafe/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Кафе",   y: Math.round(cafe/totalSum*10000)/ 100, 
                			    legendText: "Кафе" });
                			}   
                		}
                		if (cosmetics!=0){
                			if (Math.round(cosmetics/totalSum*10000)/ 100 !=0){
                			     masData.push({ label: "Косметика",   y: Math.round(cosmetics/totalSum*10000)/ 100, 
                			    legendText: "Косметика" });
                			}   
                		}       
                		if (car!=0){
                			if (Math.round(car/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Машина",   y: Math.round(car/totalSum*10000)/ 100, 
                			    legendText: "Машина" });
                			}  
                		}	  
                		if (presents!=0){
                			if (Math.round(presents/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Подарки",   y: Math.round(presents/totalSum*10000)/ 100, 
                			    legendText: "Подарки" });
                			}
                		}	 
                		if (pet!=0){
                			if (Math.round(pet/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Питомцы",   y: Math.round(pet/totalSum*10000)/ 100, 
                			    legendText: "Питомцы" });
                			}
                		}
                		if (joy!=0){
                			if (Math.round(joy/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Развлечения",    y: Math.round(joy/totalSum*10000)/ 100,
                			    legendText: "Развлечения"  });
                			}   
                		}
                		if (stationery!=0){
                			if (Math.round(stationery/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Канцтовары",   y: Math.round(stationery/totalSum*10000)/ 100,
                			    legendText: "Канцтовары" });
                			} 
                		}    
                		if (phone!=0){
                			if (Math.round(phone/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Телефон",   y: Math.round(phone/totalSum*10000)/ 100, 
                			    legendText: "Телефон" });
                			}     
                		}
                		
                		if (sport!=0){
                			if (Math.round(sport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Спорт",   y: Math.round(sport/totalSum*10000)/ 100, 
                			    legendText: "Спорт" });
                			}
                		}  
                		if (bills!=0){
                			if (Math.round(bills/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Cчета",   y: Math.round(bills/totalSum*10000)/ 100, 
                			    legendText: "Cчета" });
                			}
                		}       
                		if (transport!=0){
                			if (Math.round(transport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Транспорт",   y: Math.round(transport/totalSum*10000)/ 100, 
                			    legendText: "Транспорт" });
                			}
                		}       

    					var INlabel="{y} %";
   		 				var legend=true;
    					if (masData.length==0){
        					masData.push({ label: " ",   y:100, 
							legendText: " " });
							INlabel="0 %";	
							legend=false;
    					}
                      
   				var canvasDiv=$('#canvas');
     			canvasDiv.empty();
      			var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
       					$('#canvas').append(canvas);
        				$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Расходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
							{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 
							indexLabel: INlabel, 
							dataPoints: masData
		    				} 
						] 
					}); 
				}
                break;
//ГОД						
			case "year":
				$('#year')[0].checked="checked";
				$('#Lyear').addClass("ui-state-active");
				if (typeRD==1){
               		var totalDoh=0;
        			var zarp=0;
     				var present=0;
     				var prem=0;
     				var pr=0;
     				var today=new Date();
     				var masDataDoh=[];
      				if (Myday!=undefined)
      					today=Myday;
      				$('#display').empty();

      				var p=$('<p>'+today.getFullYear()+'</p>');
      				$('#display').append(p);
      				
      				
            		var summDoh=information.doh;
            		$('#categories').empty();
            		$('#allSh').empty();
            		var masP=0;
                	for (var ii=0; ii<summDoh.length;ii++ ){
                		if (today.getFullYear()==summDoh[ii].year){
                			var p=$('<p>'+summDoh[ii].dataFull+' '+summDoh[ii].categ+' - '+summDoh[ii].sum+' руб.'+'<br>'+'('+summDoh[ii].commenta+')'+'</p>');                       masP++;
                    		
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summ.length;j++ ){   
                    				if (today.getFullYear()==summDoh[j].year ){
                   						var p=$('<p>'+summDoh[j].dataFull+' '+summDoh[j].categ+' - '+summDoh[j].sum+' руб.'+'<br>'+'('+summDoh[j].commenta+')'+'</p>');                       				mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}

                    		
                			totalDoh=totalDoh+summDoh[ii].sum;
                			
                	 	  	switch (summDoh[ii].categ){
                				case "Зарплата":
                					zarp=zarp+summDoh[ii].sum;      
                					break;
                				case "Подарки":
                					present=present+summDoh[ii].sum;      
                					break;
                				case "Премия":
                					prem=prem+summDoh[ii].sum;      
                					break;
                				case "Прочее":
                					pr=pr+summDoh[ii].sum;      
                					break;
                			}
                		}
           		   	  }     
           		   	  if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }    
              		  if (zarp!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(zarp/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (present!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(present/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }
               		 if (prem!=0){
                		 masDataDoh.push({ label: "Зарплата",  y: Math.round(prem/totalDoh*10000)/ 100, legendText: "Зарплата"});
               		 }
               		 if (pr!=0){
                		 masDataDoh.push({ label: "Подарки",    y: Math.round(pr/totalDoh*10000)/ 100,
                		 legendText: "Подарки"});
               		 }
              		var INlabel="{y} %";
                	var legend=true;
                	if (masDataDoh.length==0){
                    	masDataDoh.push({ label: " ",   y:100, legendText: " " });
                    	INlabel="0 %";
                    	legend=false;
                	}

               	 	var canvasDiv=$('#canvas');
     				canvasDiv.empty();
                	var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
        			canvasDiv.append(canvas);
        			$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Доходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
						{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 
							indexLabel: INlabel, 
							dataPoints: masDataDoh		
					   	} 
						] 
					});       
				}
				if (typeRD==0){
     				var totalSum=0;
      				var food=0;
      				var clothes=0;
      				var cab=0;
     				var health=0;
      				var home=0;
      				var health=0;
      				var cafe=0;
      				var cosmetics=0;
      				var car=0;
      				var pet=0;
      				var presents=0;
      				var joy=0;
      				var stationery=0;
      				var phone=0;
      				var sport=0;
      				var bills=0;
      				var cab=0;
      				var transport=0;
      				var summ=information.rash;
      				var today=new Date();
      				if (Myday!=undefined)
      					today=Myday;
      				$('#display').empty();

      				var p=$('<p>'+today.getFullYear()+'</p>');
      				$('#display').append(p);
				$('#categories').empty();
            		var masP=0;
            		$('#allSh').empty();
      				 var masData=[];

	              for (var ii=0; ii<summ.length;ii++ ){   
                    	if (today.getFullYear()==summ[ii].year){
                    		var p=$('<p>'+summ[ii].dataFull+' '+summ[ii].categ+' - '+summ[ii].sum+' руб.'+'<br>'+'('+summ[ii].commenta+')'+'</p>');

                    		masP++;
                   			 $("#categories").prepend(p);
                   			if (masP>5){
                   			var ShowAll=$('<input type="button" value="Показать все" id="all">');
                   			ShowAll.button();
                   			$('#allSh').empty();
                   			$('#allSh').append(ShowAll);
                   			$("#categories").children(':last-child').remove();
                   			ShowAll.click(show);
                   			function show(){
                   				$('#categories').empty();
                   				$('#all').detach();
                   				var mas=0;
                   				for (var j=0; j<summ.length;j++ ){   
                    				if ( today.getFullYear()==summ[j].year ){
                   					var p=$('<p>'+summ[j].dataFull+' '+summ[j].categ+' - '+summ[j].sum+' руб.'+'<br>'+'('+summ[j].commenta+')'+'</p>');                    mas++;
                   			 		$("#categories").prepend(p);
                   					}	
                   				}
                   			}
                   		}

                        totalSum=totalSum+summ[ii].sum;
                        switch (summ[ii].categ){
                		 	case "Еда":
                				food=food+summ[ii].sum;    
                				break;
                			case "Одежда":
                				clothes=clothes+summ[ii].sum;       
                				break;	
                			case "Здоровье":
                				health=health+summ[ii].sum;         
                				break;	
                			case "Такси":
                				cab=cab+summ[ii].sum;    
                				break;
                			case "Жильё":
                				home=home+summ[ii].sum;      
                				break;	
                			case "Кафе":
                				cafe=cafe+summ[ii].sum;       
                				break;
                			case "Косметика":
                				cosmetics=cosmetics+summ[ii].sum;  
                				break;
                			case "Машина":
                				car=car+summ[ii].sum;      
                				break;
                			case "Подарки":
                				presents=presents+summ[ii].sum;      
                				break;
                			case "Питомцы":
                				pet=pet+summ[ii].sum;     
                				break;
                			case "Развлечения":
                				joy=joy+summ[ii].sum;   
                				break;
                			case "Канцтовары":
                				stationery=stationery+summ[ii].sum;  
                				break;
                			case "Связь":
                				phone=phone+summ[ii].sum;   
                				break;
                			case "Спорт":
                				sport=sport+summ[ii].sum;   
                				break;
                			case "Счета":
                				bills=bills+summ[ii].sum;    
                				break;
                			case "Транспорт":
                				transport=transport+summ[ii].sum;    
                				break;	                	    	}
                		}
                	}
                	if (masP==0){
           		   	  	var p=$('<p class="No">Нет записей</p>');
						 $("#categories").prepend(p);
           		   	  }   
                	   	if (food!=0){
                			if (Math.round(food/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Еда",  y: Math.round(food/totalSum*10000)/ 100, legendText: "Еда"});
                		``}

                		}
                		if (clothes!=0){
                			if (Math.round(clothes/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Одежда",    y: Math.round(clothes/totalSum*10000)/ 100,
                			    legendText: "Одежда"  });
                			}   
                		}
                	   	if (health!=0) {
                	   		if (Math.round(health/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Здоровье",   y: Math.round(health/totalSum*10000)/ 100,  legendText: "Здоровье" });
                			}
                	   	} 
                		if (cab!=0){
                			if (Math.round(cab/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Такси",   y: Math.round(cab/totalSum*10000)/ 100, 
                			    legendText: "Такси" });
                			} 
                		}
                		if (home!=0){
                			if (Math.round(home/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Дом",   y: Math.round(home/totalSum*10000)/ 100, 
                			    legendText: "Дом" });
                			}  
                		}   
                		if (cafe!=0){
                			if (Math.round(cafe/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Кафе",   y: Math.round(cafe/totalSum*10000)/ 100, 
                			    legendText: "Кафе" });
                			}   
                		}
                		if (cosmetics!=0){
                			if (Math.round(cosmetics/totalSum*10000)/ 100 !=0){
                			     masData.push({ label: "Косметика",   y: Math.round(cosmetics/totalSum*10000)/ 100, 
                			    legendText: "Косметика" });
                			}   
                		}       
                		if (car!=0){
                			if (Math.round(car/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Машина",   y: Math.round(car/totalSum*10000)/ 100, 
                			    legendText: "Машина" });
                			}  
                		}	  
                		if (presents!=0){
                			if (Math.round(presents/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Подарки",   y: Math.round(presents/totalSum*10000)/ 100, 
                			    legendText: "Подарки" });
                			}
                		}	 
                		if (pet!=0){
                			if (Math.round(pet/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Питомцы",   y: Math.round(pet/totalSum*10000)/ 100, 
                			    legendText: "Питомцы" });
                			}
                		}
                		if (joy!=0){
                			if (Math.round(joy/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Развлечения",    y: Math.round(joy/totalSum*10000)/ 100,
                			    legendText: "Развлечения"  });
                			}   
                		}
                		if (stationery!=0){
                			if (Math.round(stationery/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Канцтовары",   y: Math.round(stationery/totalSum*10000)/ 100,
                			    legendText: "Канцтовары" });
                			} 
                		}    
                		if (phone!=0){
                			if (Math.round(phone/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Телефон",   y: Math.round(phone/totalSum*10000)/ 100, 
                			    legendText: "Телефон" });
                			}     
                		}
                		
                		if (sport!=0){
                			if (Math.round(sport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Спорт",   y: Math.round(sport/totalSum*10000)/ 100, 
                			    legendText: "Спорт" });
                			}
                		}  
                		if (bills!=0){
                			if (Math.round(bills/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Cчета",   y: Math.round(bills/totalSum*10000)/ 100, 
                			    legendText: "Cчета" });
                			}
                		}       
                		if (transport!=0){
                			if (Math.round(transport/totalSum*10000)/ 100 !=0){
                			    masData.push({ label: "Транспорт",   y: Math.round(transport/totalSum*10000)/ 100, 
                			    legendText: "Транспорт" });
                			}
                		}       
    					var INlabel="{y} %";
   		 				var legend=true;
    					if (masData.length==0){
        					masData.push({ label: " ",   y:100, 
							legendText: " " });
							INlabel="0 %";	
							legend=false;
    					}
                      
   				var canvasDiv=$('#canvas');
     			canvasDiv.empty();
      			var canvas = $('<div id="chartContainer" style="width: 800px; height: 350px"></div> ');
       					$('#canvas').append(canvas);
        				$("#chartContainer").CanvasJSChart({ 
						title: { 
							text: "",
							fontSize: 24
						}, 
						axisY: { 
							title: "Расходы в %" 
						}, 
						legend :{ 
							verticalAlign: "center", 
							horizontalAlign: "right" 
						}, 
						data: [ 
							{ 
							type: "pie", 
							showInLegend: legend, 
							toolTipContent: "{label}<br/> {y} %", 
							indexLabel: INlabel, 
							dataPoints: masData
		    				} 
						] 
					}); 
				}
                break;
			}
	}
	
	
	this.initPage=function() {
		var NameSite=$('<div class="SiteName">Кошелёcheck.by</div>');
        $('body').append(NameSite);
        var field=$('<div class="field"></div>');
         $('body').append(field);
        var ostatok=$('<div><p class="ostatok">'+ost+'</p> </div>');
        var addRashod=$('<button id="addR" type="button" >Добавить расход</button>');
        addRashod.button();
        var addDahod=$('<button id="addD" type="button">Добавить доход</button>');
        addRashod.click(function(){AddSpend(1);});
        addDahod.click(function(){AddSpend(0);});
        addDahod.button();
        field.append(ostatok);
        field.append(addRashod);
        field.append(addDahod);
        var today=new Date();
        //КНОПКИ ВЫБОРА ПЕРИОДА РАССЧЕТА
        var period=$('<div class="period"></div>');
        var day=$('<input type="radio" class="per" name="N" value="1" id="day">');
        var labelDay=$('<label for="day" id="Lday">День</label>');
        var week=$('<input type="radio" class="per" value="2" name="N" id="week">');
        var labelWeek=$('<label for="week" id="Lweek">Неделя</label>');
        var month=$('<input type="radio" class="per" value="3" name="N" id="month" >');
        var labelMonth=$('<label for="month" id="Lmonth">Месяц</label>');
        var year=$('<input type="radio"  class="per" value="4" name="N" id="year">');
        var labelYear=$('<label for="year" id="Lyear">Год</label>');
       $('body').append(period); 
        period.append(day);
        period.append(labelDay);
        period.append(week);
        period.append(labelWeek);
        period.append(month);
        period.append(labelMonth);
        period.append(year);
        period.append(labelYear);
        period.buttonset();
        function str(val,len) {
        	var strVal=val.toString();
        	while ( strVal.length < len )
            strVal='0'+strVal;
        	return strVal;
    	}
    	//КНОПКИ РАСХОД-ДОХОД
        var categories=$('<div id="categories"></div>');
        var rash_doh=$('<div class="r_d"></div>');
        var r=$('<input type="radio"  value="1"  name="MoneyCateg" id="rashod" class="rd" > ');
        var labelR=$('<label for="rashod" id="rLab">Расходы</label>');
        var d=$('<input type="radio" class="rd"  value="2" name="MoneyCateg" id="dahod">');
        var labelD=$('<label for="dahod" id="dLab">Доходы</label>');
      
        rash_doh.append(r);
        rash_doh.append(labelR);
        rash_doh.append(d);
        rash_doh.append(labelD);
        rash_doh.buttonset();
        var butDiv=$('<div id="allSh"></div>');
        var categDiv=$('<div id="catbut"></div>');
        var canvasDiv=$('<div id="canvas"></div>');
       
         $('body').append(categDiv);
         $(categDiv).append(categories);
         $(categDiv).append(butDiv);
         var knopki=$('<div id="knop"></div>');
         var left=$('<a id="back">');
         var right=$('<a id="next">');
         left.button();
         right.button();
          var dataDisplay=$('<div id="display"></div>');
          var dataChose=$('<input type="text" id="choser"></div>');
           var choseBut=$('<input type="button" value="Установить дату" id="choserButton">');
           choseBut.button();
			dataChose.datepicker({showAnim:'fade',duration:200, changeYear:true,changeMonth:true,closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
            'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник',
            'среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''});

		var dat=$('<div id="dat"></div>');
         knopki.append(left); 
        knopki.append(dataDisplay); 
        knopki.append(right); 
        knopki.append(dat);
        dat.append(dataChose);
        dat.append(choseBut);
         $('body').append(rash_doh); 
         $('body').append(knopki);    
        $('body').append(canvasDiv); 
        function rem(){
            $(this).remove();
        }
        function AddSpend(x){
            $('body').append('<div class="back">');
            var divBack=$('.back');    
            divBack.click(rem);
            var form=$('<form id="Myform"></form>');
            form.click(stop);
            function stop(event){
                event.stopPropagation();
            }   
            divBack.append(form);
            var categ=$('<select id="myselect" ></select>');  
            var labelCateg=$('<label for="myselect">Выберите категорию</label>');

            var categD=$('<div></div>');
            categD.append(labelCateg);
            categD.append(categ);
            
            var summa=$('<input type="text" name="summa" id="summa">');  
            console.log(summa);
            
            var labelSum=$('<label for="summa">Введите сумму</label>');
			var span=$('<span> руб.</span>');
            var summaD=$('<div></div>');
            summaD.append(labelSum);
            summaD.append(summa);
            $('#summa').spinner( );
             summaD.append(span);
            switch (x){
                case 1:
                	var h2=$('<h2>Добавление статьи расходов</h2>');
                    categ.empty();
                    var food=$('<option value="Еда">Еда</option>');   
                    var clothes=$('<option value="Одежда" data-name="Одежда">Одежда</option>');
                    var home=$('<option value="Жильё">Жильё</option>');
                     var health=$('<option value="Здоровье">Здоровье</option>');
                     var cafe=$('<option value="Кафе">Кафе</option>');
                     var cosmetics=$('<option value="Косметика">Косметика</option>');
                     var car=$('<option value="Машина">Машина</option>');
                     var pet=$('<option value="Питомцы">Питомцы</option>');
                     var presents=$('<option value="Подарки">Подарки</option>');
                     var joy=$('<option value="Развлечения">Развлечения</option>');
                     var stationery=$('<option value="Канцтовары">Канцтовары</option>');
                     var phone=$('<option value="Связь">Связь</option>');
                     var sport=$('<option value="Спорт">Спорт</option>');
                     var bills=$('<option value="Счета">Счета</option>');
                     var cab=$('<option value="Такси">Такси</option>');
					var transport=$('<option value="Транспорт">Транспорт</option>');
                    categ.append(food);
                    categ.append(clothes);
                    categ.append(home);
                    categ.append(health);
                    categ.append(cafe);
                    categ.append(cosmetics);
                    categ.append(car);
                    categ.append(pet);
                    categ.append(presents);
                    categ.append(joy);
                    categ.append(stationery);
                    categ.append(phone);
                    categ.append(sport);
                    categ.append(bills);
                    categ.append(cab);
                    categ.append(transport);
                    break;
                case 0:
                	var h2=$('<h2>Добавление статьи доходов</h2>');
                    categ.empty();
                    var zarp=$('<option value="Зарплата">Зарплата</option>');   
                    var present=$('<option value="Подарки">Подарки</option>');
                    var prem=$('<option value="Премия">Премия</option>');
                    var proch=$('<option value="Прочее">Прочее</option>');
                    categ.append(zarp);
                    categ.append(present);
                    categ.append(prem);
                    categ.append(proch);
                  break; 
            }
            var comment=$('<input type="text" name="comment" id="comment">');
            
            var labelComment=$('<label for="comment">Примечание</label>');
            var div=$('<div></div>');
             

            div.append(labelComment);
            div.append(comment);

            var button=$('<input type="button" value="Добавить">');
            button.click(function(){addAjax(x)});
            button.button();
            form.append(h2);
           form.append(categD);
            form.append(summaD);
            form.append(div);
            form.append(button);
            function addAjax(y){
                var cat=$("#myselect").val();
                var sum=$("#summa").val();
                var com=$("#comment").val();
                if (sum=='' ){
                	alert("Введите сумму");
                	return false;
                } 
                 if (sum<0.01 ){
                	alert("Сумма должна быть больше 0.01 руб.");
                	return false;
                } 
                if (com==''){
                	alert("Введите комментарий");
                	return false;
                }  
 
                $('.back').remove();
                Storage.AddValue(y,cat,sum,com,);
                
            } 
           }

        Storage=new AjaxStorage(information, this.AfterAjax);
        Storage.initStorage();
        console.log(information);
        
	}
		
}


