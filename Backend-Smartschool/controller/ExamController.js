const Exam = require("../models/ExamModel");
const fs = require("fs");

exports.addExam = async (req, res) => {
  // if(!req.file){
  //     return res.status(400).json({error:"File is required"})
  // }

  let exam = await Exam.create({
    classroom: req.body.classroom,
    date: req.body.date,
    routine: req.file?.path,
  });

  if (!exam) {
    return res.stauts(400).json({ error: "Something went wrong" });
  }
  return res.send(exam);
};

exports.getexams = async (req, res) => {
  let exam = await Exam.find();
  if (!exam) {
    return res.status(400).json({ error: "no exams found" });
  }
  return res.send(exam);
};

exports.getexamdetails = async (req, res) => {
  let exam = await Exam.findById(req.params.id);
  if (!exam) {
    return res.status(400).json({ error: "exam not found" });
  }
  return res.send(exam);
};

exports.updateExam = async (req, res) => {
  let examToUpdate;
  if (req.file) {
    examToUpdate = await Exam.findById(req.params.id);
    if (examToUpdate.routine) {
      fs.unlink(examToUpdate.routine, () => {});
    }

    examToUpdate = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        classroom: req.body.classroom,
        date: req.body.date,
        routine: req.file.path,
      },
      { new: true }
    );
  } else {
    examToUpdate = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        classroom: req.body.classroom,
        date: req.body.date,
      },
      { new: true }
    );
  }

  if (!examToUpdate) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  res.send(examToUpdate);
};

exports.deleteExam = async(req, res) =>{
  Exam.findByIdAndDelete(req.params.id)
  .then((deleted)=>{
    if(!deleted){
      return res.status(400).json({error:"Doesn't exist"})
    }
    res.send("Successfully deleted")
  })
  .catch((error)=>res.status(400).json({error:error.message}))
}
