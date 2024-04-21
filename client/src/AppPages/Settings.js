import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sms, setSms] = useState("");
  const [receiveSMS, setReceiveSMS] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:27017/philly-codefest.philly-codefest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          sms,
          receiveSMS,
          receiveEmail,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

    // The 'receive alerts for' section is not hooked up for possible functionality, currently uses email checkbox func for placeholder
    return (
      <div className="form-group">
        <div className="row">
          <div className="col">
            <h4 style={{marginBottom:'10px'}}>Receive notifications via:</h4>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="smsCheckbox" checked={receiveSMS}
                onChange={() => setReceiveSMS(!receiveSMS)} style={{ marginTop: '16px' }} />
              <label className="form-check-label" htmlFor="smsCheckbox">SMS</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="emailCheckbox" checked={receiveEmail}
                onChange={() => setReceiveEmail(!receiveEmail)} style={{ marginTop: '16px' }} />
              <label className="form-check-label" htmlFor="emailCheckbox">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4 style={{ marginBottom: '10px' }}>Receive alerts for:</h4> 
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="smsCheckbox" checked={receiveSMS}
                  onChange={() => setReceiveSMS(!receiveSMS)} style={{ marginTop: '16px' }} />
                <label className="form-check-label" htmlFor="smsCheckbox">Any human activity</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="emailCheckbox" checked={receiveEmail}
                  onChange={() => setReceiveEmail(!receiveEmail)} style={{ marginTop: '16px' }} />
                <label className="form-check-label" htmlFor="emailCheckbox">Logging</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="emailCheckbox" checked={receiveEmail}
                  onChange={() => setReceiveEmail(!receiveEmail)} style={{ marginTop: '16px' }} />
                <label className="form-check-label" htmlFor="emailCheckbox">Gunshots</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="emailCheckbox" checked={receiveEmail}
                  onChange={() => setReceiveEmail(!receiveEmail)} style={{ marginTop: '16px' }} />
                <label className="form-check-label" htmlFor="emailCheckbox">Motor vehicles</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="emailCheckbox" checked={receiveEmail}
                  onChange={() => setReceiveEmail(!receiveEmail)} style={{ marginTop: '16px' }} />
                <label className="form-check-label" htmlFor="emailCheckbox">Animal cries</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="emailCheckbox" checked={receiveEmail}
                  onChange={() => setReceiveEmail(!receiveEmail)} style={{ marginTop: '16px' }} />
                <label className="form-check-label" htmlFor="emailCheckbox">Fires</label>
              </div>
            </div>
          </div>
          <div className="col">
            <label>Change name: </label>
            <input type="name" value={name} onChange={e => setName(e.target.value)}  className="form-control" />

            <label>Change email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />

            <label>Change phone number:</label>
            <input type="text" value={sms} onChange={e => setSms(e.target.value)} className="form-control" />
            
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSave}>Submit</button>
      </div>
    );
}

export default Settings; 