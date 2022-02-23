import React,{useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import {useHistory} from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory(); 
    const [quote, setQuote] = useState('');
    const [tempQuote, setTempQuote] = useState('')
       
    const populateQuote = async ()=> {
        const req = await fetch('http://localhost:8700/api/quote',
        { 
            headers: {
                'x-access-token':localStorage.getItem('token'),
            },
        }) 
        const data = await req.json();
        if(data.status === 'ok'){
            setQuote(data.quote);
            // setQuote(tempQuote);
            // setTempQuote('');
        }else{
            alert(data.error);
        }
    }

    useEffect(()=>{ 
        const token = localStorage.getItem('token');
        if(token){
            const user= jwt_decode(token);
            if(!user){
                localStorage.removeItem('token');
                history.replace('/login',)
            }else{
                populateQuote()
            }
        }
    },[])


    const updateQuote = async (e)=>{
        e.preventDefault()
        const req = await fetch('http://localhost:8700/api/quote',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('token'),
            },
            body:JSON.stringify({
                quote:tempQuote,
            }),
        })
        const data = await req.json();
        if(data.status === 'ok'){
            setQuote(tempQuote);
            setTempQuote('');
        }else{
            alert(data.error);
        }
    }

  return (
    <div className="container" style={{marginTop:'5%'}}>
    <h1>Your Quote : {quote || 'No Quote Found'}</h1>
    <form onSubmit ={updateQuote}>
        <input 
        type ="text"
        placeholder ="Write your quote here...."
        vlaue = {tempQuote}
        onChange = {(e)=>setTempQuote(e.target.value)}
        />
     <input type="submit" value = "Update quote"/>
    </form>
   
    </div>
  )
}

export default Dashboard;