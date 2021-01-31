import React, {useState} from 'react';
import '../css/app.css';

function Child(data) {

    const[childData, setChildData] = useState(data);


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
            </div>
            <div className="btn-container">
                <button className="btn">Check in</button>
                <button className="btn" disabled>Check out</button>
            </div>
        </div>
    )

};
export default Child;