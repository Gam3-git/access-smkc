import axios from "axios";

const URL_Node = `${process.env.REACT_APP_NODE_API || 'localhost:8080'}`;
const API_URL = `http://${URL_Node}/api/access/`;

class CaseAccessService {

  //search case
  async getCountCase() {  return await axios.get(API_URL); }

  async getSearchCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/id/',data ); 
  }

  async getSearchCaseRed( casesearch ){
    let caseS = `'${casesearch[0]}'`;
    let data = { "casetext" : caseS, "casenum" : casesearch[1], "caseyear" : casesearch[2] };
    return await axios.post(API_URL+'/redid/',data ); 
  }

  async getAppointCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseAppoint/',data ); 
  }

  async getPreceptCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/casePrecept/',data ); 
  }

  async getFollowCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseFollow/',data ); 
  }

  async getCourtOrderCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseCourtOrder/',data ); 
  }
  
  async getAppealCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseAppeal/',data ); 
  }

  async getSupremeCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseSupreme/',data ); 
  }

  async getAccusedCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseAccused/',data ); 
  }

  async getRestoreCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseRestore/',data ); 
  }

  async getMediateCase( casesearch ){
    let caseS = `'${casesearch}'`;
    let data = { "casetext" : caseS };
    return await axios.post(API_URL+'/caseMediate/',data ); 
  }

    //search detail case
    async getPlaintiffDetail( casesearch ){
      let data = { "casetext" : casesearch };
      return await axios.post(API_URL+'/detailPlaintiff/',data ); 
    }

    async getDefendantDetail( casesearch ){
      let data = { "casetext" : casesearch };
      return await axios.post(API_URL+'/detailDefendant/',data ); 
    }

    async getPersonIDDetail( casesearch,option ){
      let data = { "casetext" : casesearch, "option" : option };
      return await axios.post(API_URL+'/detailPersonID/',data ); 
    }

    async getAppointDetail( casesearch ){
      let data = { "casetext" : casesearch };
      return await axios.post(API_URL+'/detailAppoint/',data ); 
    }

    async getPlaintDetail( casesearch ){
      let data = { "casetext" : casesearch };
      return await axios.post(API_URL+'/detailPlaint/',data ); 
    }
}

export default new CaseAccessService();