import { Link } from "react-router-dom";

const NoPage = () => {  

    return (
    <div className="App-header">
    <p> 404 PAGE NOT FOUND </p>
      <Link to="/">
        <button className="btn btn-secondary btn-lg" > Home </button>
      </Link>
    </div>
  );
}

export default NoPage;