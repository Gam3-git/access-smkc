import { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";

const ViewPlaint = (props) =>  {

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const data = props.data;
  let casedata ;
  if(data.length > 0){ 
    casedata = data.map((item, index) => ({...item, index: index + 1}));
   }

  const handleSearch = (data) => {
    window.open(`/access-smkc/casesearch?blackcase=${data.target.id}&ty_select=${data.target.getAttribute('typesearch')}`, "_blank");
  };

  const columns = [
    { name: 'ลำดับ', cell: (row) => <>{ row.index }</>, grow: 0, center: true, sortable: true, },  
    { name: 'หมายเลขคดี', cell: (row) => 
      <div>{row.blackcase} <br />
        <span style={row.rednum ? { color: 'red' } : {} }>
        {row.casetext}{row.rednum}/{row.redyear} </span>
      </div>, grow: 1, 
    },
    { name: 'คู่ความ', cell: (row) => 
      <>
        โจทก์ : {row.plaintiff} <br /> คู่ความ : {row.defendant} 
      </>, grow: 2,
      },
    { name: 'ข้อหา', selector: row => row.plaint , grow: 2, },
    { name: '_', cell: (row) => 
      <>
        <button className="btn btn-primary btn-sm  mx-1" 
        onClick={handleSearch} id={ row.blackcase } 
        typesearch={ row.type_case.includes('ผัดฟ้อง') || row.type_case.includes('ฝากขัง')  ? 3 : 1 }
        > ดูข้อมูลคดี</button> 
       </>, grow: 1,
    },
    ];

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
    if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
    }
    };   
    return (
            <FilterComponent 
                onFilter={e => setFilterText(e.target.value)} 
                onClear={handleClear} 
                filterText={filterText} />
            );
  }, [filterText, resetPaginationToggle]);

  useEffect(() => {
    if(filterText.length < 0){ setFilteredItems(casedata); }
    let data_defendant = casedata.filter( item => item.defendant ? item.defendant.includes(filterText) : ""  );
    let data_plaintiff = casedata.filter( item => item.plaintiff ? item.plaintiff.includes(filterText) : ""  );
    let data_plaint = casedata.filter( item => item.plaint ? item.plaint.includes(filterText) : ""  );
    let data = [data_defendant,data_plaintiff, data_plaint]
    .reduce((acc, current) => { return acc.length > 0 ? acc : current; });
    setFilteredItems(data);
    // eslint-disable-next-line 
  },[filterText]);


  return (
    <> 
    <div className="col-12"> 
    <div className="card my-2"> 


    <div className="card-header bg-success"> 
      <p className="text-light text-center"> พบข้อมูล จำเลย/คู่ความ ทั้งหมด : { casedata && <>{ casedata.length } คดี</> } </p> 
    </div>

    <div className="card-body">
      {casedata &&
        <DataTable
          columns = {columns}
          data = {filteredItems}
          highlightOnHover 
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
      }
    </div>


    </div>
    </div>
    </>
    
  );

};

export default ViewPlaint;

const FilterComponent = ({ filterText, onFilter, onClear }) => (

  <div className="col-md-4">
  <div className="input-group">
  <span className="input-group-text" id="basic-addon1">กรอง :</span>
  <input
    className="form-control"
    name="search"
    type="text"
    value={filterText}
    onChange={onFilter}
  />
      <button className="btn btn-secondary" onClick={onClear}> Reset </button>
</div></div>
  
);