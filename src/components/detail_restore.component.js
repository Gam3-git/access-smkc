import {convertDate_s} from "../services/convert_text.service";
const DetailRestore = (props) =>  {
  const casedata = props.data;
  return (
    <> 
        <div className="col-12"> 
        <div className="card my-2"> 


        <div className="card-header"> <p className="text-muted"> 
        ข้อมูล คดีผัดฟ้อง/ฝากขัง : { casedata && <>{ casedata[0].blackcase }</> }
        </p> </div>

        <div className="card-body">
          { casedata &&
            <>
              ประเภทคดี : {casedata[0].type_case} || 
              วันที่รับฟื้นฟู : {convertDate_s(casedata[0].date_receive).date} <br />
              ข้อหา : {casedata[0].plaint} <br />
              คำสั่งศาล : {casedata[0].court_order}<br />
              ผู้ร้อง : {casedata[0].plaintiff} ||
              ผู้ต้องหา : {casedata[0].defendant} <br />
              ผลคำวินิจฉัย : {casedata[0].diagnose} <br />
              ผลฟื้นฟู : {casedata[0].result} 
              <hr />
            </>
          }
        </div>


        </div>
        </div>
        
    </>
    
  );

};

export default DetailRestore;