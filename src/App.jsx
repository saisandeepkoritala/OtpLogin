import {useState} from 'react';
import OtpUi from './otpUi';
import './App.css';

const App = () => {

  const[email,Setemail]=useState("");
  const[showOtpUi,SetshowOtpUi]=useState(false);
  const handleSubmitForm=(e)=>{
    e.preventDefault();
    if(!email) return;
    // send email to backend to get otp
    // if request is success show otp ui
    // set showOtpUi to true
    console.log(email);
    SetshowOtpUi(true);

  }
    return (
      <div className="app">
        {!showOtpUi?<form className="form" onSubmit={handleSubmitForm}>
          <h2>Verify your email address</h2>
          <input 
            type="email"
            placeholder="Enter email address "
            value={email}
            onChange={(e)=>Setemail(e.target.value)}
          />
          <button>Submit</button>
        </form>:<OtpUi length={6} email={email}/>}
      </div>
    )
}

export default App;