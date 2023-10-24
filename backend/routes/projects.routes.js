import express from "express";
import projectsController from "../controllers/projects.controller.js";
import multer from "multer";
import generatePwd from "../utils/generateRandPwd.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    // This defines the file name for storing files
    filename: function (req, file, cb) {
        cb(null, generatePwd() + file.originalname);
    },
});

const upload = multer({ storage })

let { addProject, getProject, getStaffProjects, delProject, editProject } = projectsController

let router = express.Router()

router.post('/add', upload.single('image'), addProject)
router.get('/get', getProject)
router.get('/get-staff-projects', getStaffProjects)
router.delete('/delete-project', delProject)
router.patch('/edit-project', editProject)

export default router