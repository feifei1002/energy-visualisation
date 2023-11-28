import React from 'react';
import '../css/ContactUsForm.css';
import { toast } from 'react-toastify';
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

// Contact us form for getting user feedback on submission
export default function ContactUsForm() {

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
                <form>
                    <div class="row g-3">
                    <div class="col-md-6">
                        <label for="your-name" class="form-label">Your Name</label>
                        <input type="text" class="form-control" id="your-name" name="your-name" required/>
                    </div>
                    <div class="col-md-6">
                        <label for="your-surname" class="form-label">Your Surname</label>
                        <input type="text" class="form-control" id="your-surname" name="your-surname" required/>
                    </div>
                    <div class="col-md-6">
                        <label for="your-email" class="form-label">Your Email</label>
                        <input type="email" class="form-control" id="your-email" name="your-email" required/>
                    </div>
                    <div class="col-md-6">
                        <label for="your-subject" class="form-label">Your Subject</label>
                        <input type="text" class="form-control" id="your-subject" name="your-subject"/>
                    </div>
                    <div class="col-12">
                        <label for="your-message" class="form-label">Your Message</label>
                        <textarea class="form-control" id="your-message" name="your-message" rows="5" required></textarea>
                    </div>
                    <div class="col-12">
                        <div class="row">
                        <div class="col-md-6 buttonDiv">
                            <button data-res="<?php echo $sum; ?>" type="submit" class="btn btn-dark w-100 fw-bold" >Send</button>
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
