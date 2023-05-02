
export function convertDate(dateString) {

    if(dateString === '1970-01-01T00:00:00Z'){
      return {
        date: null,
        time: null
      };
    }
  
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    const formattedDate = date.toLocaleDateString('th-TH', options);
  
    const options2 = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
  
    const formattedTime = date.toLocaleTimeString('th-TH', options2);
  
    return {
      date: formattedDate,
      time: formattedTime
    };
}

export function convertDate_s(dateString) {

  if(dateString === '1970-01-01T00:00:00Z'){
    return {
      date: null,
      time: null
    };
  }

  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const formattedDate = date.toLocaleDateString('th-TH', options);

  const options2 = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const formattedTime = date.toLocaleTimeString('th-TH', options2);

  return {
    date: formattedDate,
    time: formattedTime
  };
}

export function convertTimeAppoint(timeString) {

    if(timeString == null){
          return timeString;
    }
  
      if( timeString.toString().includes(".") ){
        let myTime = timeString.toString().split(".");
          if(myTime[0].length <= 1){
              myTime[0] = '0'+myTime[0] ;
          }
          if(myTime[1].length <= 1){
              myTime[1] = myTime[1]+'0' ;
          }
          return myTime[0]+'.'+myTime[1]+' น. ';
        } else {
          let myTime = timeString.toString();
          if(myTime.length <= 1){
              myTime = '0'+myTime ;
          }
          return myTime+'.00 น. ';
      }
  
}

export function convertMoney(x) {
  if(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
   else{ return x;}
}