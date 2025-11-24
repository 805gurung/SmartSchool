
const Event = require('../models/EventModel')
let Notice = require('../models/NoticeModel')

//add notice
exports.addNotice = async (req, res) => {
    try {
        let { title, date, description } = req.body
        let notice = await Notice.create({
            title, date, description
        })

        if (!notice) {
            res.status(400).json({ error: 'Something went wrong. Please try again.' })
        }
        res.status(200).json({ message: 'Notice added successfully!', notice })
    } catch (error) {
        res.status(500).json({ error: 'Server error.' })
    }
}
//edit notice
exports.editNotice = async (req, res) => {
    try {
        let { id } = req.params
        let { title, date, description } = req.body

        let updatedNotice = await Notice.findByIdAndUpdate(id, {
            title, date, description
        }, { new: true, runValidators: true })

        if (!updatedNotice) {
            return res.status(400).json({ error: 'Notice not found.' });
        }
        res.status(200).json({ message: 'Notice updated successfully', updatedNotice })

    } catch (error) {
        res.status(500).json({ error: 'Server error.' })
        console.error('Error:', error.message)
    }
}

//get all notices
exports.getAllNotices = async (req, res) => {
    try {
        let notices = await Notice.find()
        if (!notices) {
            return res.status(400).json({ error: 'Notice not found.' });
        }
        res.status(200).json(notices)
    } catch (error) {
        res.status(500).json({ error: 'Server error.' })
    }
}

//delete a notice
exports.deleteNotice = async (req, res) => {
    try {
        Notice.findByIdAndDelete(req.params.id)
            .then((deleted) => {
                if (!deleted) {
                    res.status(400).json({ error: 'Notice not found.' })
                }
                res.status(200).json({ message: 'Notice deleted sucessfully!' })
            })

    } catch (error) {
        res.status(500).json({ error: 'Server error.' })
    }
}

// Events
//add event
exports.addEvent = async (req, res) => {
    try {
        let { date, title, description } = req.body
        let event = await Event.create({
            date, title, description
        })
        if (!event) {
            res.status(400).json({ error: 'Something went wrong. Please try again.' })
        }
        res.status(200).json({ message: 'Event Added Successfully!', event })
    } catch (error) {
        res.status(500).json({ error: 'Server error.' })
    }
}

//get all events
exports.getAllEvents = async (req, res) => {
    try {
        let events = await Event.find()
        if (!events) {
            return res.status(400).json({ error: 'Events not found.' });
        }
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ error: 'Server error.' })
    }
}

//edit  event
exports.editEvent = async(req,res)=>{
try{
    let{id}=req.params
    let{date,title,description}=req.body
    let updatedEvent = await Event.findByIdAndUpdate(id,{
        date,title,description
    },{new:true, runValidators:true})
    
    if (!updatedEvent) {
        return res.status(400).json({ error: 'Notice not found.' });
    }
    res.status(200).json({ message: 'Event updated successfully', updatedEvent })
}catch(error){
    res.status(500).json({ error: 'Server error.' })
    console.error('Error:', error.message)
}
}

//delete event
exports.deleteEvent=async(req,res)=>{
   try{
    Event.findByIdAndDelete(req.params.id)
    .then((deleted)=>{
        if(!deleted){
            res.status(400).json({ error: 'Event not found.' })
        }
        res.status(200).json({ message: 'Event deleted sucessfully!' })
    })
   }catch(error){
    res.status(500).json({ error: 'Server error.' })
    console.error('Error:', error.message)
   }
}



