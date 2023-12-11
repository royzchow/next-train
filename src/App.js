import React, {useEffect, useState} from "react";
import axios from "axios";

const baseURL = "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=LHP";

function App() {

  const [post, setPost] = useState(null);
  const [time, setTime] = useState(null);

  const getData = () => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      setTime(Date.parse(response.data.data["TKL-LHP"].DOWN[0].time) - new Date())
      // setPost(JSON.parse('{"status":1,"message":"successful","sys_time":"2023-12-11 0:44:56","curr_time":"2023-12-11 00:44:56","data":{"TKL-LHP":{"curr_time":"2023-12-11 00:44:56","sys_time":"2023-12-11 0:44:56","DOWN":[{"ttnt":"4","valid":"Y","plat":"2","time":"2023-12-11 00:48:00","source":"-","dest":"TIK","seq":"1"}]}},"isdelay":"N"}'))
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    time <= 0 && getData();
  }, [time])

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "scroll"
    };
  }, []);

  useEffect(() => {
    if(post){
      const interval = setInterval(() => {
        setTime(Date.parse(post.data["TKL-LHP"].DOWN[0].time) - new Date())
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [post]);

  return (
    <center>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, width: "100vw", backgroundImage: "linear-gradient(to bottom, #294666, #172339)"
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
