import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container} from 'react-bootstrap';
import './App.css';

import Home from "./components/home.component";
import CaseSearch from './components/casesearch.component';
import CaseDetail from './components/casedetail.component';
import NoPage from './components/NoPage.component';


function App() {
  return (
    <>
    <BrowserRouter basename="/access-smkc">
    <Container fluid>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/casesearch" element={<CaseSearch />} />
        <Route path="/casedetail" element={<CaseDetail />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </Container>
  </BrowserRouter>
  </>
  );
}

export default App;
