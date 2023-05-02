import {convertDate_s} from "../services/convert_text.service";
const CreateEl = (props) => {
  const data = props.data;
  let listItems ;
    if(data){
      listItems = data.map((data, index) => 
      <li key={index}>
        ครั้งที่: {data.no_order} <span className="text-danger">|| อนุญาต: {data.setday} วัน || </span> 
        นับแต่วันที่: {convertDate_s(data.start_day).date} ถึง : {convertDate_s(data.end_day).date}
        <hr />
      </li>);
  } else { listItems = <li>--Loading--</li> }
  return (
    <ul> 
      { listItems }
    </ul>
  );
}


const DetailAccused = (props) =>  {
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
              วันผัดฟ้อง/ฝากขังแรก : {convertDate_s(casedata[0].date_receive).date} <br />
              ข้อหา : {casedata[0].plaint} <br />
              ผู้พิพากษาเวรชี้ : {casedata[0].jud_receive}<br />
              ผู้ร้อง : {casedata[0].plaintiff} ||
              ผู้ต้องหา : {casedata[0].defendant}
              <hr />
              < CreateEl data={casedata}  />
            </>
          }
        </div>


        </div>
        </div>
        
    </>
    
  );

};

export default DetailAccused;