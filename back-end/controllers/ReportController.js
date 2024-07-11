import { ReportService, UserService, BookingService } from "../services/index.js";

const createReport = async (req, res) => {
    try {
        const { description, screenShot, reportReason, title, owner, storyId, accused } = req.body

        const data = {}
        if (description) data.description = description
        if (screenShot) data.screenShot = screenShot
        if (reportReason) data.reportReason = reportReason
        if (title) data.title = title
        if (owner) data.owner = owner
        if (storyId) data.storyId = storyId
        if (accused) data.accused = accused

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'Report empty?' });
        }

        const report = await ReportService.createReport(data);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await ReportService.getAllReports()
        res.status(200).json({ reports })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createReportPlayer = async (req, res) => {
    try {
        let screenShot = [];
        const userId = req.payload.id;
        console.log(req.files);
        if (req.files) {
            req.files.forEach((file) => {
                screenShot.push(file.path);
            })
        }
        const {
            type, title, description, playerId
        } = req.body;
        const report = await ReportService.createReportPlayer(userId, screenShot, type, title, description, playerId);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json(error)
    }
}

const getReportPlayer = async (req, res) => {
    try {
        const reports = await ReportService.getReportPlayer();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json(error)
    }
}
const getReportPlayerById = async (req, res) => {
    try {
        const id = req.params.id;
        const report = await ReportService.getReportBookingById(id);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json(error)
    }
}
const getReportBookingById = async (req, res) => {
    try {
        const id = req.params.id;
        const report = await ReportService.getReportBookingById(id);
        // const booking = await BookingService.getBookingByReport(report.bookingId);
        // report.booking = booking;
        // console.log(booking);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json(error)
    }
}

const processReportPlayer = async (req, res) => {
    try {
        const {
            reportId,
            complaint,
            reason,
            playerId
        } = req.body;
        console.log(complaint);
        const report = await ReportService.processReportPlayer(reportId, Number(complaint), reason, playerId);
        const player = await UserService.findByUserId(playerId);
        if (complaint == 1) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: "khaidqhe163770@fpt.edu.vn",
                    pass: "iyrdweksgcrjokhw",
                },
            });
            const handlebarOptions = {
                viewEngine: {
                    partialsDir: path.resolve('./templates/'),
                    defaultLayout: false,
                },
                viewPath: path.resolve('./templates/'),
            };
            transporter.use('compile', hbs(handlebarOptions))
            const mail = {
                from: '"Play Together" <khaidqhe163770@fpt.edu.vn>',
                to: `${player.email}`,
                subject: 'Report player',
                template: 'reportplayer',
                context: {
                    description: reason,
                },
                attachments: [{
                    filename: 'warning-email.png',
                    path: './public/warning-email.png',
                    cid: 'emailbackground' //same cid value as in the html img src
                }]
            }
            transporter.sendMail(mail);
            console.log("Send End");
        }
        res.status(200).json(report)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createReportBooking = async (req, res) => {
    try {
        let screenShot = [];
        const userId = req.payload.id;
        console.log(req.files);
        if (req.files) {
            req.files.forEach((file) => {
                screenShot.push(file.path);
            })
        }
        const {
            type, title, description, bookingId, playerId
        } = req.body;
        const report = await ReportService.createReportBooking(userId, screenShot, type, title, description, bookingId, playerId);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json(error)
    }
}

const getReportBooking = async (req, res) => {
    try {
        const reports = await ReportService.getReportBooking();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {
    createReport,
    getAllReports,
    createReportPlayer,
    getReportPlayer,
    getReportPlayerById,
    processReportPlayer,
    createReportBooking,
    getReportBooking,
    getReportBookingById
}