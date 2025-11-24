let Result = require('../models/ResultModel')
const Student = require('../models/StudentModel');

exports.getAllResults = async(req,res)=>{
    try{
        let{grade}=req.params
        let results= await Result.find({grade})
        if(!results){
            return res.status(400).json({ error: 'Results not found.' });
        }
        res.status(200).json(results)

    }catch(error){
     res.status(500).json({error:'Server Error'})
    }
}

exports.addResult = async(req,res)=>{
    try{
        let{studentID,subjects,totalMarks,GPA,grade}=req.body

        const studentExists = await Student.findById(studentID);
        if (!studentExists) {
            return res.status(404).json({ error: "Student not found!" });
        }
        
        let result = await Result.create({
           studentID,subjects,totalMarks,GPA,grade
        })
        if(!result){
            return res.status(400).json({error:'Error creating result.'})
        }
        res.status(200).json({ message: 'Result added successfully!', result })
    }catch(error){
       res.status(500).json({error:'Server Error'}) 
    }
}

exports.deleteResult= async(req,res)=>{
    try{
        Result.findByIdAndDelete(req.params.id)
        .then((deleted) => {
            if (!deleted) {
                res.status(400).json({ error: 'Notice not found.' })
            }
            res.status(200).json({ message: 'Notice deleted sucessfully!' })
        })
    }catch(error){
        res.status(500).json({error:'Server Error'})
    }
}

exports.deleteAllResults=async(req,res)=>{
    try{
        const result = await Result.deleteMany({});
        res.status(200).json({ message: 'All results deleted successfully!', result });
    }catch(error){
        res.status(500).json({error:'Server Error'}) 
    }
}

exports.studentResult=async(req,res)=>{
    try{
        let{studentid}=req.params
        let student = await Result.findOne({studentID:studentid})
        if(!student){
            return res.status(400).json({error:'No result found.'})
        }
        res.status(200).json({ message: 'Results fetched successfully!', student });
    }catch(error){
        console.error('Error fetching student result:', error);
        res.status(500).json({error:'Server Error'})  
    }

}

    
    