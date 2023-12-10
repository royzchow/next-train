import React from "react";
import logo from './logo.svg';
import axios from "axios";
import './App.css';

const baseURL = "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=LHP";

function App() {

  console.log("reached")
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      // setPost(JSON.parse('{"status":1,"message":"successful","sys_time":"2023-12-11 0:44:56","curr_time":"2023-12-11 00:44:56","data":{"TKL-LHP":{"curr_time":"2023-12-11 00:44:56","sys_time":"2023-12-11 0:44:56","DOWN":[{"ttnt":"4","valid":"Y","plat":"2","time":"2023-12-11 00:48:00","source":"-","dest":"TIK","seq":"1"}]}},"isdelay":"N"}'))
    });
  }, []);

  return (
    <div className="App">
       <div>
        {post && <p>Next Station: {post.data["TKL-LHP"].DOWN[0].time}</p>}
      </div>
    </div>
  );
}

export default App;
