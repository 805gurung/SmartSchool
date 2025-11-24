const Assignment = require('../models/AssignmentModel')

exports.addAssignment = async (req,res) =>{
    let assignment = await Assignment.create({
        subject: req.body.subject,
        date: req.body.date,
        details: req.body.details,
        grade:req.body.grade
    })

    if(!assignment){
        return res.status(400).json({error:"Something went wrong"})
    }
    return res.send(assignment)
}

exports.getAssignment = async (req,res) =>{
    let {grade} = req.params

    let assignments = await Assignment.find({grade})
    if(!assignments){
        return res.status(400).json({error:"assignments not found"})
    }
    res.send(assignments)
}