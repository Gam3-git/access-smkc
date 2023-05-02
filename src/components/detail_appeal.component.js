import React, { useState, useEffect } from 'react'
import Service from "../services/caseaccess.service";
import { ArrowClockwise } from 'react-bootstrap-icons';
import {convertDate} from "../services/convert_text.service";

const CreateEl = (props) => {
  const data = props.data;
  let listItems ;
    if(data){
      if(data.message){ return listItems = <li> {data.message} </li> ; }

      listItems = data.map((data, index) => 
      <li key={index}>
      วันที่ยื่น: {convertDate(data.Dateyernuton).date} || อุทธรณ์เรื่อง: {data.UD_detail} || วันที่ส่งศาลอุทธรณ์: {convertDate(data.Datesonguton).date}  <br /> 
      ผู้ยื่น: {data.Puyernuton} || วันที่อ่าน: {convertDate(data.Datepipaksa).date} || ผู้พิพากษาที่อ่าน: {data.justsonguton}
      <br /><br /> <span className='text-danger'> คำพิพากษา: {data.Kumpipaksa} </span> 
      <hr />
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


const DetailAppeal = (props) =>  {

  const [caseresult, setCaseresult] = useState([]);
  const casedata = props.data;

  useEffect(()=>{
    if(casedata){
      Service.getAppealCase( casedata )
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
        ข้อมูลอุทธรณ์ : { casedata && <>{ casedata }</> }
        </p> </div>

        <div className="card-body">
          {caseresult &&
            <>
              < CreateEl data={caseresult.data}  />
            </>
          }
        </div>


        </div>
        </div>
        
    </>
    
  );

};

export default DetailAppeal;