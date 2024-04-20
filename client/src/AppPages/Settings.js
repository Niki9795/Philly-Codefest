import React, { useState } from 'react';

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
        <div>
            <form onSubmit={collectData}>
                <label>Name:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />

                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                <label>SMS:</label>
                <input type="text" value={sms} onChange={e => setSms(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Settings;