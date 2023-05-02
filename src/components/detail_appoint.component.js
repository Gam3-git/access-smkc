import React, { useState, useEffect } from 'react'
import Service from "../services/caseaccess.service";
import { ArrowClockwise } from 'react-bootstrap-icons';
import {convertDate, convertTimeAppoint} from "../services/convert_text.service";

const CreateEl = (props) => {
  const data = props.data;
  // const text = props.text;
  let listItems ;

  if(data){
    if(data.message){ return listItems = <li> {data.message} </li> ; }
      listItems = data.map((data, index) => 
      <li key={index}>
      วันที่ : {convertDate(data.dateappoint).date} ( เวลา: {convertTimeAppoint(data.timeappoint)}) หมายเหตุ : {data.remark}
      <br /><span className='text-success'> บัลลังก์ : {data.room ? data.room : '-' } || ประเภทนัด 
      : {data.appoint} </span> <hr />
        </li>);
   } else { listItems = 
    <li>-- <ArrowClockwise 
    style={{ animation: 'example 1s infinite'}} className='text-danger' 
    /> Loading--</li> 
  }

  
  return (
    <ul> 
      { listItems }
    </ul>
  );
}


const DetailAppoint = (props) =>  {

  const [caseresult, setCaseresult] = useState([]);
  const casedata = props.data;

  useEffect(()=>{
    if(casedata){
      Service.getAppointCase( casedata )
      .then(data =>{
        setCaseresult(data);
      }).catch(err => {
        console.log(err);
        setCaseresult(err.response);
      })
    }
  },[casedata]);
  

  

  return (
    <> 
        <div className="col-12"> 
        <div className="card my-2"> 


        <div className="card-header"> <p className="text-muted"> 
        ข้อมูลวันนัดพิจารณา : { casedata && <>{ casedata }</> }
        </p> </div>

        <div className="card-body">
          {caseresult &&
            <>
              < CreateEl data={caseresult.data} />
            </>
          }
        </div>


        </div>
        </div>
        
    </>
    
  );

};

export default DetailAppoint;