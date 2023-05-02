const DetailSentence = (props) =>  {

  const casedata = props.data;

  return (
    <> 
        <div className="col-12"> 
        <div className="card my-2"> 


        <div className="card-header"> <p className="text-muted"> 
        ข้อมูลสารบบ : { casedata && <>{ casedata.casedetail[0].blackcase }</> }
        </p> </div>

        <div className="card-body">
          { casedata.sentence.length > 0 ? <>
            <h5 className="card-title  text-danger">สารบบคำพิพากษา</h5>
            <p className="card-text text-danger">{ casedata.sentence[0].sentence_red }</p> 
          </> : null }

          { casedata.sentence.length > 0 ?  <>
            <h5 className="card-title">สารบบความ</h5>
          <p className="card-text">{ casedata.sentence[0].sentence_black }</p>
          </> : null }
        </div>


        </div>
        </div>
        
    </>
    
  );

};

export default DetailSentence;