import * as Icon from 'react-bootstrap-icons';
import logo from '../img/logocoj.png';
import { Link } from "react-router-dom";

const Home = () =>  {
  return (
    <> 
    
      <div className="col-12 text-center py-3">

        <img src={logo} width={150} alt="Logo"></img>
        <h3 className="text-muted text-center">ศาลจังหวัดสมุทรสงคราม</h3>
        <h1 className="text-primary text-center">ระบบบริการค้นหาข้อมูลคดี </h1>

        <div className="row mt-5">

        <div className="col-2"></div>

        <div className="col-4">
        <div className="card bg-light">
          <div className="card-body">
          <h5 className='text-muted py-1'>ค้นหาด้วยหมายเลขคดีดำ หมายเลขคดีแดง <br />
          <span className='text-light'>.</span></h5>
            <Link to="/casesearch"><button className="form-control btn btn-primary" > 
            <Icon.Search size={50} /><br /><br /><h3>ค้นหาด้วยเลขคดี</h3></button></Link>
          </div>
        </div>
        </div>
        <div className="col-4 ">
        <div className="card bg-light">
          <div className="card-body">
          <h5 className='text-muted py-1'>ค้นหาด้วยข้อมูลในคดีเช่น ชื่อ-สกุล<br />เลขบัตรประชาชน ข้อหา วันนัดพิจารณา</h5>
              <Link to="/casedetail"><button className="form-control btn btn-info" > 
              <Icon.ArchiveFill size={50} /><br /><br /><h3>ค้นหาด้วยข้อมูลคดี</h3></button></Link>
          </div>
        </div>
        </div>
        <p><br />ระบบบริการข้อมูลประชาชนใช้บริการแสดงข้อมูลเบื้องต้น โดยแสดงข้อมูลเดิมก่อน วันที่ 21 ก.ค. 66 เท่านั้น.</p>
        <p className='text-danger'>ระบบ Access สิ้นสุดบริการไม่ปรับปรุงฐานข้อมูล ณ วันที่ 21 กค. 2566.</p>
        </div>

      </div>
      

    </>
    
  );

};

export default Home;