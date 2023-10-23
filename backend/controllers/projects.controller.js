import Project from "../model/projects.model.js";
import multer from "multer";
import fs from "fs"

async function addProject(req, res) {
    try {
        let { name, location, lga, description, staffId } = req.body

        if (!req.file) {
            res.status(403).json({ message: 'All inputs are required' })
            return
        }

        if(!name || !location || !lga || !description || !staffId) {
            res.status(403).json({ message: 'All inputs are required' })
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
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

// NOTE: Not fully working
async function getProject(req, res) {
    try {
        let { id } = req.query

        let project = await Project.findById(id)

        if (!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        console.log(project.image)

        const imagePath = project.image;

        if (fs.statSync(imagePath)) {
            // Send the image as a response
            res.render(imagePath);
          }

        res.contentType(project.image);
        res.status(200).send(project.image)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

export default {
    addProject,
    getProject
}