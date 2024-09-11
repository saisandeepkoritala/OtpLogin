import {useState,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import './otpUi.css';

const OtpUi = ({length,email}) => {

    const [otp,Setotp]=useState(new Array(length).fill(""));
    const [enteredOtp,SetenteredOtp]=useState(0);
    const inputRefs = useRef([]);

    useEffect(()=>{
        inputRefs.current[0].focus();
    },[])

    const handleChange=(i,e)=>{

        const value = e.target.value;
        if(isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[i]=value.substring(value.length-1);
        Setotp(newOtp)

        if(value && i<length-1 && inputRefs.current[i+1]){
            inputRefs.current[i+1].focus();
            SetenteredOtp(enteredOtp+1)
        }

        if(enteredOtp===length-1){
            //Submit OTP to backend
            console.log("total length is ",enteredOtp)
            console.log("submiting OTP")
        }
    }

    const handleClick=(i)=>{
        if(otp[i]===""){
            inputRefs.current[i].focus();
        }
        else{
        inputRefs.current[i].setSelectionRange(1,1);
        }
    }

    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace" && !otp[i] && i > 0 && inputRefs.current[i - 1]) {
            inputRefs.current[i - 1].focus();
            SetenteredOtp(enteredOtp-1)
        }
    
        if (e.key === "ArrowLeft" && i > 0 && inputRefs.current[i - 1]) {
            inputRefs.current[i - 1].focus();
        }
    
        if (e.key === "ArrowRight" && i < length - 1 && inputRefs.current[i + 1]) {   
            inputRefs.current[i + 1].focus();
        }
    };
    

    return (
        <div className='otpUi'>
            <form className='optForm'>
                <h3>OTP sent to {email}</h3>
                {otp.map((value,i)=>{
                    return <input 
                    key={i} 
                    className='otp-input'
                    type="text"
                    value={value}
                    ref={(input) => (inputRefs.current[i] = input)}
                    onChange={(e)=>{handleChange(i,e)}}
                    onClick={()=>{handleClick(i)}}
                    onKeyDown={(e)=>{handleKeyDown(i,e)}}
                    />
                })}
            </form>
        </div>
    )
}

OtpUi.propTypes = {
    length: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
}

export default OtpUi;