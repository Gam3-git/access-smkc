import React, { useState, useEffect } from 'react'
import Service from "../services/caseaccess.service";
import { ArrowClockwise } from 'react-bootstrap-icons';
import {convertDate_s} from "../services/convert_text.service";

const CreateEl = (props) => {
  const data = props.data;
  let tableItems ;
    if(data){
      if(data.message){ return(<p>{data.message}</p>); }
      tableItems = data.map((data, index) => 
        <tr key={index}>
          <td> {convertDate_s(data.sendday).date} </td>
          <td> <span className='text-primary'>{data.dep_send}</span> <br /> {data.name_send} </td>
          <td> <span className='text-primary'>{data.dep_send_re}</span> <br /> {data.sendto} </td>
          <td> {data.todo}</td>
          <td> <span className='text-primary'>{data.dep_recive}</span> <br /> {data.name_recive} </td>
          <td> {data.Timeget} </td>
        </tr>
       );
  } else {
    tableItems = <tr><td colSpan="6">-- <ArrowClockwise 
      style={{ animation: 'example 1s infinite'}} className='text-danger' 
      /> Loading--</td></tr>;
  }
  

  return (
    <div className="table-responsive">
    <table className="table table-hover"><thead className='table-active'><tr>
      <th scope="col">วันที่ส่ง</th>
      <th scope="col">ผู้ส่ง</th>
      <th scope="col">ส่งถึง</th>
      <th scope="col" style={{ width: '15%' }}>ส่งเพื่อดำเนินการ</th>
      <th scope="col">ผู้รับ</th>
      <th scope="col">วันที่รับ</th>
    </tr></thead><tbody>
      {tableItems ? tableItems : <tr><td colSpan="6"></td></tr> }
    </tbody></table></div>
  );
}


const DetailFollow = (props) =>  {

  const [caseresult, setCaseresult] = useState([]);
  const casedata = props.data;

  useEffect(()=>{
    if(casedata){
      Service.getFollowCase( casedata )
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

export default DetailFollow;