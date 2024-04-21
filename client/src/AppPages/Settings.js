import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const Settings = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sms, setSms] = useState("");

    const collectData = async () => {
        console.log('sadas')
        console.warn(name, email, password, sms);
        let result = await fetch("http://localhost:8000/settings", {
          method: "post",
          body: JSON.stringify({name, email, password, sms}),
          headers: {
            'Content-type':'application/json'
          }
        });
        result = await result.json();
        console.warn(result);
    }

    return(
      <div className="container">
      <form onSubmit={collectData} className="mt-5">
        <div className="form-group">
        <label>Name: {name}</label>
        </div>

        <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
        </div>

        <div className="form-group">
        <label>SMS:</label>
        <input type="text" value={sms} onChange={e => setSms(e.target.value)} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    );
}

export default Settings; 