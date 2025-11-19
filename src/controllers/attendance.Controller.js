const Attendance = require("../models/attendance.model");

// Handles daily check-in logic for authenticated users
exports.checkIn = async (req, res) => {
    try {
        const userId = req.user._id;  // Extract user ID from verified JWT

        // Calculate today's start time
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        // Calculate today's end time
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Fetch attendance record for the current user for today
        let todayRecord = await Attendance.findOne({
            user: userId,
            date: { $gte: todayStart, $lte: todayEnd }
        });

        // If user has already checked in and not checked out
        if (todayRecord && !todayRecord.checkOut) {
            return res.status(400).json({
                success: false,
                message: "Already checked in today"
            });
        }

        // If user has already completed attendance for the day
        if (todayRecord && todayRecord.checkOut) {
            return res.status(400).json({
                success: false,
                message: "Attendance for today is already completed"
            });
        }

        // Create new attendance record for today's check-in
        await Attendance.create({
            user: userId,
            checkIn: new Date(),
            date: new Date()
        });

        return res.status(200).json({
            success: true,
            message: "Check-in successful"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Handles daily check-out logic for authenticated users
exports.checkOut = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from verified JWT

        // Calculate today's start time
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        // Calculate today's end time
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Find today's attendance entry
        let todayRecord = await Attendance.findOne({
            user: userId,
            date: { $gte: todayStart, $lte: todayEnd }
        });

        // If user has not checked in yet
        if (!todayRecord) {
            return res.status(400).json({
                success: false,
                message: "You haven't checked in today"
            });
        }

        // If the user has already checked out
        if (todayRecord.checkOut) {
            return res.status(400).json({
                success: false,
                message: "Already checked out today"
            });
        }

        // Update today's record with check-out time
        todayRecord.checkOut = new Date();
        await todayRecord.save();

        return res.status(200).json({
            success: true,
            message: "Check-out successful"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
