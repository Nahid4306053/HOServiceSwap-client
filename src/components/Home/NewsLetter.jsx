import React, { useState } from 'react';

export default function NewsletterSubscribe  () {
 const [email, setEmail] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
 };

 return (
   <></>
    
    )}