import React, { useState, useEffect } from 'react'
import Service from "../services/caseaccess.service";
import { ArrowClockwise } from 'react-bootstrap-icons';
import {convertDate_s} from "../services/convert_text.service";

const CreateEl = (props) => {
  const data = props.data;
  let listItems ;
    if(data){
      if(data.message){ return listItems = <li> {data.message} </li> ; }

      listItems = data.map((data, index) => 
      <li key={index}>
      ลำดับ: {data.no_order}). วันที่ยื่น: {convertDate_s(data.date_order).date} ||
      ชนิดเอกสาร: {data.type_order} ||
      <span className='text-success'> วันที่ศาลมีคำสั่ง: {convertDate_s(data.remark).date} <br />
        คำสั่งศาล: {data.court_order} </span> <hr />
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


const DetailCourtOrder = (props) =>  {

  const [caseresult, setCaseresult] = useState([]);
  const casedata = props.data;

  useEffect(()=>{
    if(casedata){
      Service.getCourtOrderCase( casedata )
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
        ข้อมูลคำสั่งศาล : { casedata && <>{ casedata }</> }
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

export default DetailCourtOrder;