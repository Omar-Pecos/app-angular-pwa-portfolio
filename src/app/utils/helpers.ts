export function setColor(type){
    var color = 'black';
    switch(type){
      case 'backend': 
        color = 'purple';
        break;
      case 'frontend': 
        color = 'green';
        break;
      case 'native': 
        color = 'brown';
        break;
      case 'desktop':
        color = 'orange';
        break;
      case 'hybrid':
        color = 'blue';
        break;
      case 'game':
        color = 'grey';
        break;
      case 'design': 
        color = 'darkslategray';
        break;
    }
    
    return color;
  }