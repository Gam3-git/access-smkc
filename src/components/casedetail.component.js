import React, { useState, useEffect } from 'react'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/th';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ArrowClockwise } from 'react-bootstrap-icons';

import Service from "../services/caseaccess.service";
import ViewPlaintiff from "./view_plaintiff.component";
import ViewDefendant from "./view_defendant.component";
import ViewPersonID from "./view_personid.component";
import ViewAppoint from "./view_appoint.component";
import ViewPlaint from "./view_plaint.component";

const MySwal = withReactContent(Swal);

const CaseSearch = () =>  {

  const [successful, setSuccessful] = useState(false);
  const [typecase, setTypecase] = useState(0);
  const [caseresult, setCaseresult] = useState([]);
  const [appointday, setAppointday] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(()=>{ setTimeout(() => window.open("/access-smkc", "_self"), 900000) },[]);

  const type_text = (num) => {
    switch (num) {
      case 1 : return 'ชื่อ-สกุล โจทก์ '; case 2 : return 'ชื่อ-สกุล จำเลยหรือคู่ความ '; case 3 : return 'ข้อหา ';
      case 5 : return 'เลขบัตรประชาชน '; case 4 : return 'วันนัดพิจารณา ';
      default : return ' ';
    }
  }
  const handleKeyDown = (event) => { if (event.key === 'Enter') { search_case(); } }
  const typeselect = (num) => {
    setSuccessful(false); 
    let dd = document.getElementById('CaseId') ;
    if(dd !== null){ dd.value = ""; }
    setTypecase(num);
  }

  const search_case = async (num) => {
    setSuccessful(false);
    let option = num ? num : 1 ;
    MySwal.fire({ html : <div> 
      <ArrowClockwise style={{ animation: 'example 1s infinite'}} size={50} className='text-danger' />
      <h3> Loading... </h3> </div>, showConfirmButton: false, allowOutsideClick: false, timer: 30000 });

    const search_el = document.getElementById('CaseId').value;
    if( search_el.length > 0 ){
      let Service_call ;
       switch(typecase){
        case 1 : Service_call = Service.getPlaintiffDetail(search_el); break;
        case 2 : Service_call = Service.getDefendantDetail(search_el); break;
        case 5 : Service_call = Service.getPersonIDDetail(search_el,option); break;
        case 4 : 
          if(appointday){
            Service_call = Service.getAppointDetail(appointday.format('YYYY-MM-DD')); 
          } else { return; }
          break;
        case 3 : Service_call = Service.getPlaintDetail(search_el); break;
        default : Service_call = Service.getPlaintiffDetail(search_el);
      }
    
      Service_call.then(res => { 
        // console.log(res.data);
        setCaseresult(res.data);
        setSuccessful(true);
        MySwal.close();
      }).catch(error => { 
        setCaseresult(error);
        setSuccessful(false);
          MySwal.fire({ title:'ไม่พบข้อมูลคดี',
            html : <div> <h6> {error.message} </h6> </div>,
            icon: 'error', timer: 3000  });
      });
    } else { 
      MySwal.fire({ title:'กรุณาระบุรายละเอียด', icon:'question', width:'30%', showConfirmButton: false, timer: 3000 });
      setSuccessful(false);
    }
  }


  const handlechangeDay = (newDate) => {
    setAppointday(newDate);
    let date = new Date(newDate.format('YYYY-MM-DD'));
    let options = { year: 'numeric', month: 'long', day: 'numeric'};
    let formattedDate = date.toLocaleDateString('th-TH', options);
    document.getElementById('CaseId').value = formattedDate;
    setShowDatePicker(false);
  };

  return (
    <> 

    <div className='row'>

        <div className='col-md-12 bg-dark pt-3'>
            <h3 className="text-center text-light">
              ระบบบริการค้นหาด้วยรายละเอียดของคดี  </h3> 

        <div className="d-flex flex-row justify-content-center mt-3">
        <div className="p-10"> 
              <p className="text-center text-light">เลือกรูปแบบรายละเอียด :  
              <button className="btn btn-light mx-1" onClick={ ()=>{ typeselect(1) } }> ชื่อ-สกุล โจทก์ </button>
              <button className="btn btn-light mx-1" onClick={ ()=>{ typeselect(2) } }> ชื่อ-สกุล จำเลย,คู่ความ </button>
              <button className="btn btn-light mx-1" onClick={ ()=>{ typeselect(5) } }> เลขประจำตัวประชาชน </button>
              <button className="btn btn-light mx-1" onClick={ ()=>{ typeselect(4) } }> วันนัดพิจารณา </button>
              <button className="btn btn-light mx-1" onClick={ ()=>{ typeselect(3) } }> ข้อหา </button>
              <button className="btn btn-outline-light mx-1" onClick={() => howto() }> คู่มือ </button>
              <button className="btn btn-outline-light mx-1" onClick={() => window.history.back()}> กลับ </button>
              </p>
        </div>
        </div>

        </div>
        
        <div className="col-md-12 pt-1">
        <div className='row justify-content-center'>

        { typecase > 0 ? 
          <>
          <div className="col-4 pt-1"> 
            <p className="text-muted"> ระบุ { type_text(typecase) } : </p>
              <input type="text" className="form-control" style={{ textAlign: 'center' }}
              id="CaseId"  onKeyDown={ handleKeyDown } onClick={() => setShowDatePicker(!showDatePicker)} 
              autoComplete="off" />
               { typecase === 4 && <>
                { showDatePicker && ( 
                <Datetime
                  input={false}
                  locale="th"
                  format="YYYY-MM-DD"
                  timeFormat={false}
                  closeOnSelect={true}
                  defaultValue={new Date()}
                  onChange={(newDate) => handlechangeDay(newDate)}
                  closeOnClickOutside={true}
                /> )}

                </> }
          </div>

          <div className="col-3 pt-1"> 
            <p className="text-light">_____</p>
            { typecase < 5 &&
              <button className="btn btn-dark mx-1" onClick={ ()=>{ search_case() } }> ค้นหา </button> }
            { typecase === 5 && <>
              <button className="btn btn-dark mx-1" onClick={ ()=>{ search_case(1) } }> ค้นหาโจทก์ </button>
              <button className="btn btn-dark mx-1" onClick={ ()=>{ search_case(2) } }> ค้นหาจำเลย </button>
            </> }
          </div>
          </>
          : null }

          {successful && 
            <div className='col-12 pt-1'>
            { typecase === 1 && <ViewPlaintiff data={caseresult} /> }
            { typecase === 2 && <ViewDefendant data={caseresult} /> }
            { typecase === 5 && <ViewPersonID data={caseresult} /> }
            { typecase === 4 && <ViewAppoint data={caseresult} /> }
            { typecase === 3 && <ViewPlaint data={caseresult} /> }
            </div> }

       
        </div>
        </div>

    </div>
    
    </>
    
  );

};

export default CaseSearch;

const howto = () => {
  MySwal.fire({ title:'วิธีใช้งาน', html: 
  <div>
    <p>เลือกรูปแบบค้นหา และค้นหาตามรูปแบบรายละเอียด</p><hr />
    <p>รูปแบบ ชื่อ-สกุล : ให้พิมพ์ชื่อเว้นวรรค2ครั้งนามสกุล โดยไม่ต้องใส่คำนำหน้าในการค้นหา</p>
    <p>รูปแบบ เลขบัตรประชาชน : ใช้เพียงตัวเลขอย่างเดียว โดยไม่มีเครื่องหมาย </p>
    <p>รูปแบบ วันนัดพิจารณา : เลือกช่องค้นหา เพื่อแสดงปฏิทิน และเลือกวันที่ </p>
    <p>รูปแบบ ข้อหา : ใช้ข้อหาปกสำนวนในการค้นหา (แสดงเฉพาะข้อมูลตั้งแต่ ปี 50 ขึ้นมา) </p>
    <hr />
    <p>หมายเหตุ</p>
    <p>หลังจากค้นหาแล้ว หากพบข้อมูลมากเกินไป สามารถพิมพ์ข้อความ</p>
    <p>ในช่อง กรองเพื่อกรองข้อมูลชื่อคู่ความ อีกครั้งได้</p>
  </div>,
  width:'60%', 
  showConfirmButton: false, timer: 30000 });
}