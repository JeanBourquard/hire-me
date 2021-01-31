import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Child from './Child';

const ACCESS_TOKEN = '234ffdb8-0889-4be3-b096-97ab1679752c';
const GROUP_ID = '11fc220c-ebba-4e55-9346-cd1eed714620';
const INSTITUTION_ID = 'fb6c8114-387e-4051-8cf7-4e388a77b673';

function ChildrenList() {
    const [children, setChildren] = useState([]);
    
    const fetchData = async () => {
        axios.get('https://tryfamly.co/api/daycare/tablet/group?accessToken=' + ACCESS_TOKEN + '&groupId=' + GROUP_ID + '&institutionId=' + INSTITUTION_ID)
            .then(response => {
                const allChildren = response.data.children;
                setChildren(allChildren);
            })
            .catch(error => console.error(`Error: ${error}`));
    };

    useEffect(() => {    
        fetchData();
    }, []);


    return (
        <div>
            {children.map(item => (
                <Child key={item.childId} childData={item}/>
             ))}
        </div>
    //     <ul>
    //     {children.map(item => (
    //       <li key={item.childId}>
    //           {item.name.fullName}
    //       </li>
    //     ))}
    //   </ul>
    )
}
export default ChildrenList;