const path = require('path');
const nunjucks = require('nunjucks');
const MailService = require('./mail.service');
const UserService = require('./user.service');
const HireFormService = require('./hireForm.service');
const JoinUsService = require('./joinUs.service');
require('dotenv').config();

const TEMPLATE_PATH = path.resolve(__dirname, "../templates"); 
nunjucks.configure(TEMPLATE_PATH, { autoescape: true });

exports.contactFormTemplate = async(userMail) => {
    try {
        const userFormData = await UserService.getUserForm({ email: userMail });
        console.log(userFormData);
        console.log(`Sending Email to minazuddin23@gmail.com`);
        const emailOptions = {
            from: process.env.SENDER_MAIL,
            to: 'minazuddin23@gmail.com',
            subject: 'Test Email',
            html: TemplateForContactForm(userFormData)
        }
        const sendMail = await MailService.sendMail(emailOptions);
        if(sendMail) {
            console.log(`Email Sent Successfully to minazuddin23@gmail.com`);
        } 
    } catch(err) {
        console.log('Error', err);
    }
}

const TemplateForContactForm = (data) => {
    console.log('data', data);
    const profile_pic = `http://localhost:5000/uploads/${data.photo}`;
    const resumeLink = `http://localhost:5000/uploads/${data.resume}`;
    return nunjucks.render('contact_form_template.html', {
        form: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            contact_number: data.contact_number,
            dob: data.dob,
            interested_in: data.interested_in,
            qualification: data.qualification,
            company: data.company,
            designation: data.designation,
            from: data.from,
            to: data.to,
            last_month_sal: data.last_month_sal,
            expected_monthly_sal: data.expected_monthly_sal,
            possible_month_of_joining: data.possible_month_of_joining,
            additional_info: data.additional_info
        }
    });
}

exports.hireFormTemplate = async(userMail) => {
    try {
        const hireFormData = await HireFormService.getHireForm({ email: userMail });
        console.log(`Sending Email to minazuddin23@gmail.com`);
        const emailOptions = {
            from: process.env.SENDER_MAIL,
            to: 'minazuddin23@gmail.com',
            subject: 'Test Email',
            html: TemplateForHireForm(hireFormData)
        }
        const sendMail = await MailService.sendMail(emailOptions);
        if(sendMail) {
            console.log(`Email Sent Successfully to minazuddin23@gmail.com`);
        } 
    } catch(err) {
        console.log('Error', err);
    }
}

const TemplateForHireForm = (data) => {
    console.log('data', data);
    return nunjucks.render('hire_form_template.html', {
        form: {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        }
    });
}

exports.joinUsFormTemplate = async(userMail) => {
    try {
        const joinUsFormData = await JoinUsService.getJoinUsForm({ email: userMail });
        console.log(`Sending Email to minazuddin23@gmail.com`);
        const emailOptions = {
            from: process.env.SENDER_MAIL,
            to: 'minazuddin23@gmail.com',
            subject: 'Test Email',
            html: TemplateForJoinUsForm(joinUsFormData)
        }
        const sendMail = await MailService.sendMail(emailOptions);
        if(sendMail) {
            console.log(`Email Sent Successfully to minazuddin23@gmail.com`);
        } 
    } catch(err) {
        console.log('Error', err);
    }
}

const TemplateForJoinUsForm = (data) => {
    console.log('data', data);
    return nunjucks.render('join_form_template.html', {
        form: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            contact: data.contact,
            preferrable_location: data.preferrable_location,
            position: data.position
        }
    });
}
