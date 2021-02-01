import React, {useState} from 'react';
import '../css/app.css';
import axios from 'axios';
import {ACCESS_TOKEN} from '../globalVariables';

function Child(data) {

    const[childData, setChildData] = useState(data);
    const[checkedIn, setCheckedIn] = useState(data.childData.checkedIn);
    const[requestLoading, setRequestLoading] = useState(false);

    const checkInOut = (value) => {
        if(value === true)
        {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes();
            console.log(time)
            setRequestLoading(true);
            axios.post('https://tryfamly.co/api/v2/children/' + data.childData.childId + '/checkins', {
                accessToken: ACCESS_TOKEN,
                pickupTime: time
            })
                .then(response => {
                    console.log('child ' + data.childData.name.fullName + ' checkedin')
                    setCheckedIn(value);
                    setRequestLoading(false);
                })
                .catch(error => console.error(`Error: ${error}`));
        }
        else
        {
            setRequestLoading(true);
            axios.post('https://tryfamly.co/api/v2/children/' + data.childData.childId + '/checkout', {
                accessToken: ACCESS_TOKEN,
            })
                .then(response => {
                    console.log('child ' + data.childData.name.fullName + ' checkedout')
                    setCheckedIn(value);
                    setRequestLoading(false);
                })
                .catch(error => console.error(`Error: ${error}`));
        }
    }

    return (
        <div className="child-card">
           <div className="avatar-container"><img className="avatar" src={childData.childData.image.small} alt="child-avatar"></img></div> 
            <div className="child-info">
                <div>
                    {childData.childData.name.firstName}
                </div>
                <div>
                    {childData.childData.name.lastName}
                </div>
                <div className= {`checkinout-msg ${requestLoading ? "loading-msg" : (checkedIn ? "checkedin-msg" : "checkedout-msg")}`}>
                    {
                        requestLoading ? "Loading " : (checkedIn ? "Checked in" : "Checked out")
                    }
                </div>
            </div>
            <div className="btn-container">
                <button onClick={() => checkInOut(true)} className="btn signin-btn" disabled={checkedIn}>Check in</button>
                <button onClick={() => checkInOut(false)}className="btn signout-btn" disabled={!checkedIn}>Check out</button>
            </div>
        </div>
    )

};
export default Child;