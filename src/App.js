import React, {useEffect, useState} from "react";
import axios from "axios";

const baseURL = "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=LHP";

function App() {

  const [post, setPost] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      setTime(Date.parse(response.data.data["TKL-LHP"].DOWN[0].time) - new Date())
      // setPost(JSON.parse('{"status":1,"message":"successful","sys_time":"2023-12-11 0:44:56","curr_time":"2023-12-11 00:44:56","data":{"TKL-LHP":{"curr_time":"2023-12-11 00:44:56","sys_time":"2023-12-11 0:44:56","DOWN":[{"ttnt":"4","valid":"Y","plat":"2","time":"2023-12-11 00:48:00","source":"-","dest":"TIK","seq":"1"}]}},"isdelay":"N"}'))
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "scroll"
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t - 1000)
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <center>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: "100vh", width: "100vw", backgroundImage: "linear-gradient(to bottom, #294666, #172339)"
      }}>
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ alignItems: 'center', justifyContent: 'center', fontSize: 100 }}>
            {time && <span style={{color: "white"}}>{('0' + Math.floor(time/1000/60)).slice(-2)}</span>}
            <span style={{color: 'white'}}>:</span>
            {time && <span style={{color: "white"}}>{('0' + Math.floor(time/1000%60)).slice(-2)}</span>}
          </div>
          {post && <span style={{color: "white"}}>Next arrvial: {post.data["TKL-LHP"].DOWN[0].time}</span>}
        </div>
      </div>
    </center>
  );
}

export default App;
