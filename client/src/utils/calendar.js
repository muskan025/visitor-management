
const TIMEOFFSET = '+05:30';

export const dateTimeForCalander = (dateIpt,time,customDate,parse=true) => {
    let date = new Date(dateIpt);
    let hours = ''
    let minutes = ''
      if(parse && !customDate){
          hours = Number(time.split(':')[0])
          minutes = Number(time.split(':')[1].split(' ')[0])
          if(hours < 10){ // for afternoon meeting times
            hours = hours + 12
        }
            date.setHours(hours)
        date.setMinutes(minutes)
      }

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }
 
    let newDateTime = ''
    if(!parse){ 
        newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00${TIMEOFFSET}`;
        return newDateTime
    }

    if(customDate === 'yday'){
         newDateTime = `${year}-${month}-${day-1}T${hour}:${minute}:00.000${TIMEOFFSET}`;
    }
    else if(customDate === 'today'){
        newDateTime = `${year}-${month}-${day}T00:00:00.000${TIMEOFFSET}`;
    }
    else if(customDate === 'admin'){
        newDateTime = `${year}-${month}-01T00:00:00.000${TIMEOFFSET}`;
    }
    else{
        newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
    }

   
    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    let endDate = ''

   if(customDate === 'today'){ // events for receptionist dashboard
    endDate = new Date(new Date(startDate).setHours(23, 59, 59, 999))
     }
    
   else if(customDate === 'admin'){ // events for admin dashboard
     endDate = new Date(
        startDate.getFullYear(), 
        startDate.getMonth() + 1, 
        0, 
        23, 59, 59, 999
      );  
   }
   else{
    endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1))
   }
 
    return {
        'start': startDate,
        'end': endDate
    }
};

 
export const meetingEvent = (summary,description,date,start) => {
 
    let dateTime = dateTimeForCalander(date,start);

    let event = {
        'summary': summary,
        'description': description,
        'start': {
            'dateTime': dateTime['start'],
            'timeZone': 'Asia/Kolkata'
        },
        'end': {
            'dateTime': dateTime['end'],
            'timeZone': 'Asia/Kolkata'
        }
    };

    return event
}
