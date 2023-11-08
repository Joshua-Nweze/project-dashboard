import express from "express";
import projectsController from "../controllers/projects.controller.js";
import multer from "multer";
import generatePwd from "../utils/generateRandPwd.js";
import generateRandString from "../utils/generateRandString.js";

const fileFilter = (req, file, cb) => {
    // Check the file type using its MIME type or extension
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept the file
    } else {
        const error = new Error('File must be an image');
        error.status = 400;
        cb(error, false); // Reject the file with an error
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/projectThumbnail");
    },
    // This defines the file name for storing files
    filename: function (req, file, cb) {
        cb(null, generateRandString() + file.originalname);
    },
});

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 /* 5mb */ } 
})

let { addProject, getProject, getStaffProjects, delProject, editProject, getAllProjects, markProjectAsFinished, addProjectMilestone } = projectsController

let router = express.Router()

let uploadr = upload.single('image')

router.post('/add', function (req, res) {
    uploadr(req, res, function (err) {

        if (err) {
            return res.status(400).json({ message: err.message })
        }

        addProject(req, res)
    })
})
router.get('/get', getProject)
router.get('/get-staff-projects', getStaffProjects)
router.delete('/delete-project', delProject)
router.patch('/edit-project', editProject)
router.get('/get-all-projects', getAllProjects)
router.patch('/mark-project-as-finished', markProjectAsFinished)
router.patch('/project-milestone', addProjectMilestone)

export default router