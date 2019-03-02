var pageC=new PageController();
pageC.changePeriod();
pageC.lr();
pageC.setDateFunc();
//МОДЕЛЬ
function PageModel(){
    var state={}; // {pagename:"name", }
   function init(){
        var hash=location.hash;
        state=decodeURIComponent(hash.substr(1));
    }
    init();
    this.setState=function(_state){
        if (_state !=" "){
        state=_state;
        location.hash=encodeURIComponent(JSON.stringify(state));
        }
    }
    this.getState=function(){
        return state;
    }
}
//ВЬЮ
//КОНТРОЛЛЕР


