const express=require('express')

var router=express.Router()

const mongoose=require('mongoose')
const Employee=mongoose.model('Employee')

router.get('/',(req,res)=>{
    //res.json('sample text')
    res.render('employee/addOrEdit',{
        viewTitle: 'Insert Employee'
    })
})
router.post('/',(req,res)=>{
    if(req.body._id=="")
        insertRecord(req,res)
    else
        updateRecord(req,res)
})

function insertRecord(req,res){
    var employee=new Employee();
    employee.email=req.body.email;
    employee.password=req.body.password;
    employee.save((err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name=='ValidationError'){
                handleValidtionError(err,req.body);
                res.render('employee/addOrEdit',{
                    viewTitle: 'Insert Employee',
                    employee:req.body
                })
            }
            else{
                console.log('Error during record insertion : ' + err);
            }
        }
    })
}
function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err) {res.redirect("employee/list")}
        else {
            if(err.name=='ValidationError'){
                handleValidtionError(err,req.body)
                res.render("employee/addOrEdit",{
                    viewTitle: "Update/addOrEdit",
                    employee: req.body
                })
            }
            else
                console.log('Error during record update : ' + err)
        }
    })
}
router.get('/list',(req,res)=>{
    //res.json('from list')
    Employee.find((err,docs)=>{
        if(!err){
            res.render('employee/list',{
                list: docs
            })
        }
        else{
            console.log('Error in retireving employee list : ' + err);
        }
        
    })
})

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('/employee/list')
        }
        else{ console.log('Error in employee delete : ' +err) }
    })
})

function handleValidtionError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'email':
                body['emailError']=err.errors[field].message;
                break;
            case 'password':
                body['passwordError']=err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id, (err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle: "Update Employee",
                employee: doc
            })
        }
    })
})
module.exports=router