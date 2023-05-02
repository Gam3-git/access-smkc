import {convertDate, convertMoney, convertTimeAppoint } from "../services/convert_text.service";
const DetailCase = (props) =>  {

    const casedata = props.data;

  return (
    <> 
        <div className="col-12"> 
        <div className="card"> 
        <div className="card-header"> <h5 className="card-title text-muted"> 
          ข้อมูลคดีสาขา : { casedata && <>  คดีไกล่เกลี่ย : { casedata[0].blackcase }</> }
          </h5> </div>
        <div className="card-body">

          <div className="row">
          { casedata && 
              
            <> <div className="col-6"> 
                <ul>หมายเลขคดีหลัก 
                  <li>เลขคดีดำ : { casedata[0].rubfongmainkey } </li>
                  <li>เลขคดีแดง : { casedata[0].rednum }/{ casedata[0].redyear } </li>
                </ul>
                  <p className="card-text">วันรับฟ้อง : { convertDate(casedata[0].date_receive).date } </p>
                  <p className="card-text">ประเภทคดี : { casedata[0].type_case } </p>
                  <p className="card-text">ข้อหา : { casedata[0].plaint } </p>
                  <p className="card-text">ทุนทรัพย์ : { convertMoney(casedata[0].capital) } บาท</p>
                  <p className="card-text">โจทก์ : { casedata[0].plaintiff } </p>
                  <p className="card-text">จำเลย : { casedata[0].defendant } </p>
              </div>
              <div className="col-6"> 
                    <h5 className="card-title text-danger">
                      หมายเลขคดีแดง : { casedata[0].redcase ? <>
                        { casedata[0].redcase }/{ casedata[0].redcaseyear }
                     </> : null}
                    </h5>
                    <p className="card-text text-danger">วันตัดสิน : { convertDate(casedata[0].jud_decide).date } </p>
                    <p className="card-text">เสร็จเพราะ : { casedata[0].success_detail } || 
                    เวลาเสร็จ : { casedata[0].remark } </p>
                    <p className="card-text">วันนัดถัดไป : { convertDate(casedata[0].date_appoint).date } || 
                     เวลา : { convertTimeAppoint(casedata[0].time_appoint) } </p>
                    <p className="card-text">ผู้พิพากษารับฟ้อง : { casedata[0].jud_rec } </p>
                    <p className="card-text">ผู้ประนีประนอม : { casedata[0].jud_succ } </p>
                    <p className="card-text">เจ้าหน้าที่ : { casedata[0].office } </p>
              </div>
            </> } 

        </div> 
        </div>
        </div>
        
        </div>


    </>
    
  );

};

export default DetailCase;