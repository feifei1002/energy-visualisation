import React from 'react';
import '../css/ContactUsForm.css';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import ReactDOM from "react-dom/client";

// Contact us form for getting user feedback on submission
export default function ContactUsForm() {

    const [contactUsFormData, setContactUsFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactUsFormData({ ...contactUsFormData, [name]: value });
        // Clear the error message when the user starts typing in the input field
        setErrors({ ...errors, [name]: '' });
    };


    const handleContactSubmit = async (e) => {
        e.preventDefault();
        // Check for empty fields
        const newErrors = {};
        Object.keys(contactUsFormData).forEach((key) => {
            if (!contactUsFormData[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });

        // If there are errors, update the state and prevent registration
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await axios.post('/api/savecontactus', contactUsFormData);
            console.log('Axios Response:', response);

            setContactUsFormData({
                fullName: '',
                email: '',
                subject: '',
                message: '',
            });

            toast.success('Contact us form received!');
        } catch (error) {
            console.error('Axios Error:', error);
            toast.error('Error saving contact us form. Please try again.');
        }
        setErrors({});
    };



    const showToastRef = useRef(false);

    //On load send a notification reminding the user to scroll down to use the contact us form
    useEffect(() => {
        // Condition to prevent toast from being shown more than once.
        if (showToastRef.current) return;
        showToastRef.current = true;

        toast.info("Scroll down to contact us ↓",
         {autoClose: 10000,
          position: "bottom-right"
         }
        );
    }, []);



    // Render a contact us form 
    return (
        <div class="container my-5">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                <h1 class="mb-3 contactTitle">Contact Us</h1>
                <form onSubmit={handleContactSubmit}>
                    <div class="row g-3">
                    <div class="col-md-6">
                        <label for="fullName" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="fullName" name="fullName" required
                          value={contactUsFormData.fullName}
                          onChange={handleInputChange}  
                        />
                        {errors.fullName && <div className="error-subject">{errors.fullName}</div>}
                    </div>
                    <div class="col-md-6">
                        <label for="email" class="form-label">Your Email</label>
                        <input type="email" class="form-control" id="email" name="email" required
                            value={contactUsFormData.email}
                            onChange={handleInputChange}  
                        />
                        {errors.email && <div className="error-subject">{errors.email}</div>}
                    </div>
                    <div class="col-md-6">
                        <label for="subject" class="form-label">Subject:</label>
                        <input type="text" class="form-control" id="subject" name="subject"
                            value={contactUsFormData.subject}
                            onChange={handleInputChange}  
                        />
                        {errors.subject && <div className="error-subject">{errors.subject}</div>}
                    </div>
                    <div class="col-12">
                        <label for="message" class="form-label">Your Message</label>
                        <textarea class="form-control" id="message" name="message" rows="5" required
                            value={contactUsFormData.message}
                            onChange={handleInputChange}  
                        ></textarea>
                        {errors.message && <div className="error-message">{errors.message}</div>}
                    </div>
                    <div class="col-12">
                        <div class="row">
                        <div class="col-md-6 buttonDiv">
                            <button type="submit" class="btn btn-dark w-100 fw-bold">Send</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>  
    );
}
