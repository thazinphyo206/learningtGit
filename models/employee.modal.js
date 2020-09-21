const mongoose=require('mongoose')
var employeeSchema=new mongoose.Schema({
    email:{
        type: String,
        required: 'This Field is Required'  
    },
    password:{
        type: String,
        required: 'This Field is Required'
    }
})
employeeSchema.path('email').validate((val)=>{
    emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},'Invalid e-mail');
mongoose.model('Employee', employeeSchema)