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
            var hours = today.getHours()
            var minutes = today.getMinutes();
            if(hours < 10)
            {
                hours = "0" + hours;
            }
            if(minutes < 10)
            {
                minutes = "0" + minutes;
            }
            var time = hours + ":" + minutes;
            console.log(time)
            setRequestLoading(true);
            console.log("access tokem " + ACCESS_TOKEN);
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
            <div className="avatar-container"><img className={`avatar ${!checkedIn && "avatar-grayed"}`} src={childData.childData.image.small} alt="child-avatar"></img></div> 
            <div className="child-info">
                <div>
                    {childData.childData.name.firstName}
                </div>
                <div>
                    {childData.childData.name.lastName}
                </div>
            </div>
            <div className= {`checkinout-msg ${requestLoading ? "loading-msg" : (checkedIn ? "checkedin-msg" : "checkedout-msg")}`}>
                    {
                        requestLoading ? "Loading " : (checkedIn ? "Checked in" : "Checked out")
                    }
            </div>
            <div className="btn-container">
                <label className="switch" >
                    <input type="checkbox" checked={checkedIn} onChange={() => setCheckedIn(checkedIn)} onClick={() => checkInOut(!checkedIn)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )

};
export default Child;