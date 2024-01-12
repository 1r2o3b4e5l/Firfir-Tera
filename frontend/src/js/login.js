"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const login_btn = document.getElementById('login-btn');
    form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const formData = new FormData(form);
        let jsonData = {};
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
            jsonData[key] = value.toString();
        });
        const jsonDataString = JSON.stringify(jsonData);
        console.log(formData.get('password'));
        try {
            const response = yield fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonDataString
            });
            if (response.ok) {
                console.log('Form submitted successfully');
                const data = yield response.json();
                console.log(data);
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('role', data.role[0]);
                sessionStorage.setItem('id', data.id);
                console.log(sessionStorage.getItem('id'));
                window.location.href = 'home.html';
            }
            else {
                alert("incorrect password or email");
                console.error('Form submission failed');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }));
});
