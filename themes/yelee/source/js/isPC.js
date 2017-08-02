var IsPC =  function() {  
    var userAgentInfo = navigator.userAgent;  
    var Agents = ['Android', 'iPhone', 'Windows Phone', 'iPad'];  
    var flag = true;  
    for (var i = 0; i < Agents.length; i++) {  
        if (userAgentInfo.indexOf(Agents[i]) != -1) {  
            flag = false;  
            break;  
        }  
    }  
    return flag;  
}  