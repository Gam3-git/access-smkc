import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ArrowClockwise } from 'react-bootstrap-icons';

import Service from "../services/caseaccess.service";
import Detailcase from "./detail_case.component";
import DetailSentence from "./detail_sentence.component";
import DetailAppoint from "./detail_appoint.component";
import DetailPrecept from "./detail_precept.component";
import DetailFollow from "./detail_follow.component";
import DetailCourtOrder from "./detail_courtorder.component";
import DetailAppeal from "./detail_appeal.component";
import DetailSupreme from "./detail_supreme.component";
import DetailAccused from "./detail_accused.component";
import DetailRestore from "./detail_restore.component";
import DetailMediate from "./detail_mediate.component";

const MySwal = withReactContent(Swal);

const CaseSearch = () =>  {

  const [successful, setSuccessful] = useState(false);
  const [detailcase, setDetailcase] = useState(false);
  const [detailsentence, setDetailsentence] = useState(false);
  const [detailappoint, setDetailappoint] = useState(false);
  const [detailPrecept, setDetailPrecept] = useState(false);
  const [detailFollow, setDetailFollow] = useState(false);
  const [detailCourtOrder, setDetailCourtOrder] = useState(false);
  const [detailAppeal, setDetailAppeal] = useState(false);
  const [detailSupreme, setDetailSupreme] = useState(false);
  const [detailAccused, setDetailAccused] = useState(false);
  const [detailRestore, setDetailRestore] = useState(false);
  const [detailMediate, setDetailMediate] = useState(false);

  const [typecase, setTypecase] = useState(0);
  const [casesearch, setCasesearch] = useState("");
  const [caseresult, setCaseresult] = useState([]);
  const location  = useLocation();

  useEffect(()=>{ setTimeout(() => window.open("/access-smkc", "_self"), 900000) },[]);

  useEffect( () => {
    const params = new URLSearchParams(location.search);
    if( params.get("blackcase") != null ){
      search_case( params.get("blackcase"), params.get("ty_select") );
      setTypecase( params.get("ty_select") );
    }
    // eslint-disable-next-line 
  },[ location ]);

  const type_text = (num) => {
    switch (num) {
      case 1 : return 'ดำ '; case 2 : return 'แดง ';
      case 3 : return 'ผัดฟ้อง/ฝากขัง '; case 4 : return 'ฟื้นฟู ';
      case 5 : return 'ไกล่เกลี่ย ';
      default : return 'ดำ ';
    }
  }

  const setButtontoFalse = (num) => {
    switch (num) {
      case 1 : 
      [setDetailcase, setDetailsentence, setDetailPrecept,
        setDetailFollow, setDetailCourtOrder, setDetailAppeal,
        setDetailSupreme, setDetailAccused, setDetailRestore, setDetailMediate]
      .forEach(setter => setter(false));
      setDetailappoint(!detailappoint); 
      break;
      case 2 : 
      [setDetailcase, setDetailsentence, setDetailappoint,
        setDetailFollow, setDetailCourtOrder, setDetailAppeal,
        setDetailSupreme, setDetailAccused, setDetailRestore, setDetailMediate]
      .forEach(setter => setter(false));
      setDetailPrecept(!detailPrecept); 
      break;
      case 3 : 
      [setDetailcase, setDetailsentence, setDetailappoint,
        setDetailPrecept, setDetailCourtOrder, setDetailAppeal,
        setDetailSupreme, setDetailAccused, setDetailRestore, setDetailMediate]
      .forEach(setter => setter(false));
      setDetailFollow(!detailFollow); 
      break;
      case 4 : 
      [setDetailcase, setDetailsentence, setDetailappoint,
        setDetailPrecept, setDetailFollow, setDetailAppeal,
        setDetailSupreme, setDetailAccused, setDetailRestore, setDetailMediate]
      .forEach(setter => setter(false));
      setDetailCourtOrder(!detailCourtOrder); 
      break;
      case 5 : 
      [setDetailcase, setDetailsentence, setDetailappoint,
        setDetailPrecept, setDetailFollow, setDetailCourtOrder,
        setDetailSupreme, setDetailAccused, setDetailRestore, setDetailMediate ]
      .forEach(setter => setter(false));
      setDetailAppeal(!detailAppeal); 
      break;
      case 6 : 
      [setDetailcase, setDetailsentence, setDetailappoint,
        setDetailPrecept, setDetailFollow, setDetailAppeal,
        setDetailCourtOrder, setDetailAccused, setDetailRestore, setDetailMediate ]
      .forEach(setter => setter(false));
      setDetailSupreme(!detailSupreme); 
      break;
      default : [setDetailcase, setDetailsentence, setDetailappoint, 
        setDetailPrecept, setDetailFollow, setDetailCourtOrder,
        setDetailAppeal, setDetailSupreme, setDetailAccused, setDetailRestore, setDetailMediate ]
      .forEach(setter => setter(false));
    }
    
  }

  const handleKeyDown = (event) => { if (event.key === 'Enter') { search_case(); } }

  const typeselect = (num) => {

    setSuccessful(false);
    setCasesearch("");
    setButtontoFalse(); //setstate to false

    let dd = document.getElementById('CaseId') ;
    if(dd !== null){ dd.value = ""; }
    
    setTypecase(num);
  }

  const search_case = async (case_text, ty_se) => {

    setSuccessful(false);
    setButtontoFalse(); //setstate to false

    MySwal.fire({ 
      html : 
        <div>
        <ArrowClockwise style={{ animation: 'example 1s infinite'}} size={50} className='text-danger' />
        <h3> Loading... </h3>
        </div>,
      showConfirmButton: false, allowOutsideClick: false,
      timer: 30000 
  });

    const search_el = case_text ? case_text : document.getElementById('CaseId').value;
    const search_type = ty_se ? parseInt(ty_se) : typecase;

    if( search_el.length > 0 ){
      setCasesearch( search_el );
      let Service_call ;
       switch(search_type){
        case 1 : Service_call = Service.getSearchCase(search_el); break;
        case 2 : 
          let caseChk = search_el;
          let caseTopic = caseChk.split(/[0-9]/)[0] ;
          let caseNum = caseChk.split(/[ก-๙a-zA-Z.]/); // remove text and sign keep number
          caseNum = caseNum.filter(el => el !== '');    // remove null value from array
          if(caseNum.length > 0){
            caseNum = caseNum[0].split('/');             // remove '/' keep number
            caseNum.unshift(caseTopic);                  // add text to first array (index[0])
          } else {
            MySwal.fire({ title:'ไม่พบข้อมูลคดี', icon: 'error', timer: 3000 }); return;
          }

          try {
            let blackcase = await Service.getSearchCaseRed(caseNum);   
            if(!blackcase.error) {
              blackcase = blackcase.data[0].blackcase;
              setCasesearch(blackcase);
              Service_call = Service.getSearchCase(blackcase); 
            }
          } catch (error) {
              MySwal.fire({title:'ไม่พบข้อมูลคดี',html: <div><h6>{error.message}</h6></div>,icon: 'error', timer: 3000});
            return;
          } break;
        case 3 : 
          Service_call = Service.getAccusedCase(search_el); 
          Service_call.then(res => { 
            MySwal.close();
            setCaseresult(res.data);
            setDetailAccused(true);
           }).catch(error => { 
            setCaseresult(error);
            setCasesearch("");
            setDetailAccused(false);
            MySwal.fire({title:'ไม่พบข้อมูลคดี',html: <div><h6>{error.message}</h6></div>,icon: 'error', timer: 3000});
          });
        return;
        case 4 : 
          Service_call = Service.getRestoreCase(search_el); 
          Service_call.then(res => { 
            MySwal.close();
            setCaseresult(res.data);
            setDetailRestore(true);
           }).catch(error => { 
            setCaseresult(error);
            setCasesearch("");
            setDetailRestore(false);
            MySwal.fire({title:'ไม่พบข้อมูลคดี',html: <div><h6>{error.message}</h6></div>,icon: 'error', timer: 3000});
          });
        return;
        case 5 : 
          Service_call = Service.getMediateCase(search_el); 
          Service_call.then(res => { 
            MySwal.close();
            setCaseresult(res.data);
            setDetailMediate(true);
           }).catch(error => { 
            setCaseresult(error);
            setCasesearch("");
            setDetailMediate(false);
            MySwal.fire({title:'ไม่พบข้อมูลคดี',html: <div><h6>{error.message}</h6></div>,icon: 'error', timer: 3000});
          });
        return;
        default : Service_call = Service.getSearchCase(search_el); 
      }


      Service_call.then(res => { 
        MySwal.close();
        // console.log(res.data);
        setCaseresult(res.data);
        setSuccessful(true);
        setDetailcase(true);
        setDetailsentence(true);
       }).catch(error => { 
        setCaseresult(error);
        setCasesearch("");
        setSuccessful(false);
        setButtontoFalse(); //setstate to false
        
        MySwal.fire({ 
          title:'ไม่พบข้อมูลคดี',
          html : <div>
            <h6> {error.message} </h6>
            </div>,
          icon: 'error',
          timer: 3000 
      });

      });

    } else { 
      MySwal.fire({ title:'กรุณาระบุเลขคดี', icon:'question', width:'20%', showConfirmButton: false, timer: 3000 });
      setCasesearch(""); setSuccessful(false);
      setButtontoFalse(); //setstate to false
    }
  }

  return (
    <> 

    <div className='row'>

        <div className='col-md-12 bg-dark pt-3'>
            <h3 className="text-center text-light">
              ระบบบริการค้นหาข้อมูลคดี  </h3> 

        <div className="d-flex flex-row justify-content-center mt-3">
        <div className="p-10"> 
              <p className="text-center text-light">เลือกรูปแบบค้นหา :  
              <button className="btn btn-light mx-1" onClick={ ()=>{ typeselect(1) } }> ค้นหาเลขคดีดำ </button>
              <button className="btn btn-danger mx-1" onClick={ ()=>{ typeselect(2) } }> ค้นหาเลขคดีแดง </button>
              <button className="btn btn-warning mx-1" onClick={ ()=>{ typeselect(3) } }> ค้นหาเลขคดีผัดฟ้อง/ฝากขัง </button>
              <button className="btn btn-info mx-1" onClick={ ()=>{ typeselect(5) } }> ค้นหาเลขคดีไกล่เกลี่ย </button>
              <button className="btn btn-light mx-1" onClick={ ()=>{ typeselect(4) } }> ค้นหาเลขคดีฟื้นฟู </button>
              <button className="btn btn-outline-light mx-1" onClick={() => howto() }> คู่มือ </button>
              <button className="btn btn-outline-light mx-1" onClick={() => window.history.back()}> กลับ </button>
              </p>
        </div>
        </div>

        </div>
        
        <div className="col-md-12 pt-1">
        <div className='row justify-content-center'>

        { typecase > 0 ? 
        <div className='col-3 pt-1'>
          <div className="row">

          <div className="col-8"> 
            <p className="text-muted"> ระบุเลขคดี { type_text(typecase) } : </p>
              <input type="text" className="form-control"  style={{ textAlign: 'center' }}
              id="CaseId"  onKeyDown={ handleKeyDown } autoComplete="off" />
          </div>

          <div className="col-4"> 
            <p className="text-light">_____</p>
            <button className="btn btn-primary mx-1" onClick={ ()=>{ search_case() } }> ค้นหา </button>
          </div>

            { successful && 
            <div className="d-flex flex-column py-3"> 

              <button className = { detailcase ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" } 
                onClick={ ()=>{ setDetailcase(!detailcase) } }
              >ข้อมูลคดี</button>
              <button className = { detailsentence ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" } 
                onClick={ ()=>{ setDetailsentence(!detailsentence) } }
              >สารบบ</button>
              <button className={ detailappoint ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" } 
                onClick={ ()=>{ setButtontoFalse(1)  } }
              >วันนัดพิจารณา</button>
              <button className={ detailPrecept ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" } 
                onClick={ ()=>{ setButtontoFalse(2)  } }
              >ผลการส่งหมาย  </button>
              <button className={ detailFollow ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" }
              onClick={ ()=>{ setButtontoFalse(3)  } }
              >ระบบติดตามสำนวน</button>
              <button className={ detailCourtOrder ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" } 
              onClick={ ()=>{ setButtontoFalse(4)  } }
              >คำสั่งศาล</button>
              <button className={ detailAppeal ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" }
                onClick={ ()=>{ setButtontoFalse(5)  } } 
              >ข้อมูลอุทธรณ์</button>
              <button className={ detailSupreme ? "p-1 btn btn-primary my-1" : "p-1 btn btn-dark my-1" }
                onClick={ ()=>{ setButtontoFalse(6)  } } 
              >ข้อมูลฎีกา</button>
            </div>
            }  

            </div> 
          </div> : null }
          {successful && 
            <div className='col-9 pt-1'>
            <div className="row">
            
            { detailcase && <Detailcase data={caseresult} /> }
            { detailsentence && <DetailSentence data={caseresult} /> }
            { detailappoint && <DetailAppoint data={casesearch} /> }
            { detailPrecept && <DetailPrecept data={casesearch} /> }
            { detailFollow && <DetailFollow data={casesearch} /> }
            { detailCourtOrder && <DetailCourtOrder data={casesearch} /> }
            { detailAppeal && <DetailAppeal data={casesearch} /> }
            { detailSupreme && <DetailSupreme data={casesearch} /> }

            </div>
            </div> }

            { detailAccused && <div className='col-9 pt-1'> <div className="row">
              <DetailAccused data={caseresult} /> 
              </div> </div> }
            { detailRestore &&  <div className='col-9 pt-1'> <div className="row">
              <DetailRestore data={caseresult} /> 
              </div> </div> }
            { detailMediate &&  <div className='col-9 pt-1'> <div className="row">
              <DetailMediate data={caseresult} /> 
              </div> </div> }

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
    <p>เลือกรูปแบบค้นหา และค้นหาตามรูปแบบเลขคดี</p><hr />
    <b>รูปแบบเลขคดีหลัก<br />---------</b>
    <p>ก่อนปี 62 : ต้องมีจุดหลังอักษรย่อ เช่น พ . 1 / 61 </p>
    <p>ตั้งแต่ปี 62 : ไม่ต้องมีจุดหลังอักษรย่อ เช่น ผบ 1 / 62</p>
    
    <p>เลขคดีแดง E-filing :
    มีรูปแบบปีจำนวน 2 หลัก เช่น ผบE 99 / 64</p>
    <p>เลขคดีดำ E-filing เท่านั้น :
    มีรูปแบบปีจำนวน 4 หลัก เช่น ผบE 10 / 2564</p>
    <hr />
    <p>อักษรย่อของ คดีฟื้นฟู มีดังนี้ | ยฟ | ฟ. |</p>
    <p>อักษรย่อของ คดีผัดฟ้อง/ฝากขัง มีดังนี้
     | ผ. | ฝ. | ผ | ฝ | ยฝ |</p>
    <p>อักษรย่อของ คดีไกล่เกลี่ย มีตัวอย่างดังนี้
     | ผบ กก | พ กก | อ กก | กผ. | กพ. | กอ. |</p>
    
  </div>,
  width:'60%', 
  showConfirmButton: false, timer: 30000 });
}
