import Project from "../model/projects.model.js";
import Users from "../model/user.model.js";
import multer from "multer";
import fs from "fs"

async function addProject(req, res) {
    try {
        // img feild name is image
        let { name, location, lga, description, staffId } = req.body

        if (!req.file) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        if(!name || !location || !lga || !description || !staffId) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let newProject = new Project({
            staffId,
            name,
            location,
            lga,
            description,
            image: req.file.path
        })

        let addproject = await newProject.save()

        if(!addproject) {
            res.status(500).json({ message: 'Something went wrong, try again later' })
            return
        }

        res.status(200).json({ message: 'Project added', id: newProject._id })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}


async function getProject(req, res) {
    try {
        let { id } = req.query

        let project = await Project.findById(id)

        if (!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        const imagePath = project.image;
        const imageBuffer = fs.readFileSync(imagePath);

        // Encode the image buffer as a Base64 string
        const imageBase64 = imageBuffer.toString('base64');

        let message = { project, imageBase64 }

        res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function getStaffProjects(req, res) {
    try {
        let { staffId } = req.query

        if(!staffId) {
            res.status(403).json({ message: 'Staff is required' })
            return
        }

        let user = await Users.findById( staffId )

        if(!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        let projects = await Project.find({ staffId })

        if (!projects || projects.length < 1) {
            res.status(404).json({ message: 'No projects found' })
            return
        }

        res.status(200).json({ message: projects })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function delProject(req, res) {
    try {
        let { id, staffId } = req.body

        if(!id || !staffId) {
            res.status(403).json({ message: 'Staff is required' })
            return
        }

        let project = await Project.findById(id)
        let delproject = await Project.findOneAndDelete({ _id: id, staffId })

        if(!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        if(staffId != project.staffId) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }


        res.status(200).json({ message: 'Project successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function editProject(req, res) {
    try {
        let { staffId, id, projectName, lga, location, description, startDate } = req.body

        if(!staffId || !id || !projectName || !lga || !location || !description || !startDate) {
            res.status(403).json({ message: 'All inputs are required' })
            return
        }

        let project = await Project.findOne({ _id: id })

        if(!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        if(staffId != project.staffId) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let updateProject = await Project.findOneAndUpdate(
            { _id: id },
            {
                name: projectName,
                lga,
                description,
                location,
                startDate
            }
        )

        if(!updateProject) {
            res.status(500).json({ message: 'Something went wrong, try again later' })
            return
        }

        res.status(200).json({ message: 'Project successfully updated' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

export default {
    addProject,
    getProject,
    getStaffProjects,
    delProject,
    editProject
}