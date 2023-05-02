import React, { useState, useEffect } from 'react'
import { ArrowClockwise } from 'react-bootstrap-icons';
import Service from "../services/caseaccess.service";
import {convertDate_s} from "../services/convert_text.service";

const CreateEl = (props) => {
  const data = props.data;
  let listItems ;
    if(data){
      if(data.message){ return listItems = <li> {data.message} </li> ; }

      listItems = data.map((data, index) => 
      <li key={index}>
      วันที่จ่ายหมาย: {convertDate_s(data.Datejay).date} || จ่ายหมายให้: {data.vansong}.
      (ราคา {data.Postprice} บาท) <br />
      ส่งถึง: {data.sentto} ||
      <span className='text-success'> ประเภท: {data.Namemay} || วันที่ส่ง: {convertDate_s(data.Datesong).date} <br />
      ผลการส่ง: {data.Poonmay ? data.Poonmay : 'รอผลหมาย'} <br /> </span>
      ผู้ส่ง: {data.Namesong} || การดำเนินการ: {data.DumnernTo} 
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


const DetailPrecept = (props) =>  {

  const [caseresult, setCaseresult] = useState([]);
  const casedata = props.data;

  useEffect(()=>{
    if(casedata){
      Service.getPreceptCase( casedata )
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
        ข้อมูลผลการส่งหมาย : { casedata && <>{ casedata }</> }
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

export default DetailPrecept;