import {convertDate, convertMoney} from "../services/convert_text.service";
const DetailCase = (props) =>  {

const casedata = props.data;
const CreateEl = (props) => {
  const data = props.data;
  const text = props.text;
  let listItems ;

  if(data.length > 0){

    if( Object.keys(data[0]).length < 3 ){
      listItems = data.map((data, index) => <li key={index}>{data.name}</li>);
    } else {
      listItems = data.map((data, index) => <li key={index}>
        {data.name} : ( {data.type_person} )
        </li>);
    }

  } else { listItems = <li>---</li> }

  
  return (
    <ul> { text }
      { listItems }
    </ul>
  );
}

  return (
    <> 
        <div className="col-12"> 
        <div className="card"> 
        <div className="card-header"> <h5 className="card-title text-muted"> 
          ข้อมูล
          { casedata && <> 
            หมายเลขคดีดำ : { casedata.casedetail[0].blackcase }
          </> }
          </h5> </div>
        <div className="card-body">

          <div className="row">
          { casedata && 
            <> <div className="col-6"> 
                    {  < CreateEl data={casedata.plaintiff} text='โจทก์ / ผู้ร้อง :' /> }
                    {  < CreateEl data={casedata.defendant} text='คู่ความ :' /> }

                    <p className="card-text">ประเภทคดี : { casedata.casedetail[0].casesubtype } </p>
                    <p className="card-text">ข้อหา : { casedata.casedetail[0].plaint } </p>
                    <p className="card-text">ทุนทรัพย์ : { convertMoney(casedata.casedetail[0].capital) } บาท</p>
                    <p className="card-text">คดีผัดฟ้อง/ฝากขัง : { casedata.casedetail[0].subcasenum } </p>
                    <p className="card-text">หมายเหตุ : { casedata.casedetail[0].remark } </p>

              </div>
              <div className="col-6"> 
                    <h5 className="card-title text-danger">
                      หมายเลขคดีแดง : { casedata.casedetail[0].rednum ? <>
                        { casedata.casedetail[0].casetext } 
                        { casedata.casedetail[0].rednum }/{ casedata.casedetail[0].redyear }
                     </> : null}
                    </h5>
                    <p className="card-text">วันรับฟ้อง : { convertDate(casedata.casedetail[0].date_receive).date } </p>
                    <p className="card-text text-danger">วันตัดสิน : { convertDate(casedata.casedetail[0].date_decide).date } </p>
                    <p className="card-text">วันครบอุทธรณ์ : { convertDate(casedata.casedetail[0].date_appeal).date } </p>

                    <p className="card-text">ผู้พิพากษารับฟ้อง : { casedata.casedetail[0].jud_receive } </p>
                    <p className="card-text">เจ้าของสำนวน : { casedata.casedetail[0].jud } </p>
                    <p className="card-text">องค์คณะ : { casedata.casedetail[0].jud_group } </p>
                    <p className="card-text">ผู้พิพากษาตัดสิน : { casedata.casedetail[0].jud_decide } </p>

                    {/* <p className="card-text">ผู้ปฏิบัติงาน : { casedata.casedetail[0].namework }</p> */}
                    {/* <p className="card-text">วันที่ปฏิบัติงาน : { convertDate(casedata.casedetail[0].Timework).date }</p> */}
             
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