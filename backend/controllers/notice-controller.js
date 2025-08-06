const Notice = require('../models/noticeSchema.js');

const noticeCreate = async (req, res) => {
    try {
        const notice = new Notice({
            title: req.body.title,
            details: req.body.details,
            date: new Date(),
            school: req.body.adminID // This is the school ID (admin's ID)
        });
        
        const result = await notice.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error creating notice", error: err.message });
    }
};

const noticeList = async (req, res) => {
    try {
        const notices = await Notice.find({ school: req.params.id })
            .sort({ date: -1 }); // Sort by date, newest first

        // Return empty array instead of error when no notices found
        res.status(200).json(notices);
    } catch (err) {
        res.status(500).json({ message: "Error fetching notices", error: err.message });
    }
};

const updateNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: req.body.title,
                    details: req.body.details,
                    date: new Date() // Update date when notice is modified
                }
            },
            { new: true }
        );
        
        if (!result) {
            return res.status(404).json({ message: "Notice not found" });
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error updating notice", error: error.message });
    }
};

const deleteNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndDelete(req.params.id);
        
        if (!result) {
            return res.status(404).json({ message: "Notice not found" });
        }
        
        res.status(200).json({ message: "Notice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notice", error: error.message });
    }
};

const deleteNotices = async (req, res) => {
    try {
        const result = await Notice.deleteMany({ school: req.params.id });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No notices found to delete" });
        }
        
        res.status(200).json({ 
            message: "Notices deleted successfully",
            deletedCount: result.deletedCount 
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notices", error: error.message });
    }
};

module.exports = { 
    noticeCreate, 
    noticeList, 
    updateNotice, 
    deleteNotice, 
    deleteNotices 
};