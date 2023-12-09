import React from "react";
import my from '../images/my.jpg';
const ContactCard =(props)=>{
    const {id ,name,email}=props.contact;
    return   (
        
        <div className="item">
            <img className="ui avatar image" src={my} alt="user"/>
    <div className="content">
        <div className="header">{name}</div>
        <div>{email}</div>
    </div>
    <i className="trash outline" 
    style={{color:"red",marginTop:"7px"}}></i>
</div>
    );
};
export default ContactCard;