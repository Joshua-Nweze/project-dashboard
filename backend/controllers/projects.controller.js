import Project from "../model/projects.model.js";
import Users from "../model/user.model.js";
import multer from "multer";
import fs from "fs"
import path from "path";

async function addProject(req, res) {
    try {
        // img feild name is image
        let { location, lga, description, staff, projectName } = req.body

        let user = await Users.findById(staff)

        if (!user) {
            res.status(400).json({ message: 'User not found' })
            return
        }

        if (!req.file) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        if(!location || !lga || !description || !staff || !projectName) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        const imagePath = req.file.path;
        const imageBuffer = fs.readFileSync(imagePath);

        // Encode the image buffer as a Base64 string
        const imageBase64 = imageBuffer.toString('base64');

        let newProject = new Project({
            staff,
            projectName,
            location,
            lga,
            description,
            image: {
                path: req.file.path,
                imageBase64
            }
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

async function getProject(req, res) {
    try {
        let { id } = req.query

        let project = await Project.findById(id)

        if (!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        res.status(200).json({ message: project })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

// for admin
async function getAllProjects(req, res) {
    try {
        let { id } = req.query

        let isAdmin = await Users.findById(id)

        if (isAdmin.userType != 'admin') {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let projects = await Project.find()

        if (!projects.length) {
            res.status(404).json({ message: 'No project available' })
            return
        }

        res.status(200).json({message: projects})
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

// for staff
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

        let projects = await Project.find({ staff: staffId })

        if (!projects || projects.length < 1) {
            res.status(200).json({ message: 'No projects found' })
            return
        }

        res.status(200).json({ message: projects })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function delProject(req, res) {
    try {
        let { id, staffId } = req.body

        if(!staffId) {
            res.status(403).json({ message: 'User not found' })
            return
        }
        if(!id) {
            res.status(403).json({ message: 'Project not found' })
            return
        }

        let project = await Project.findById(id)
        let delproject = await Project.findOneAndDelete({ _id: id, staff: staffId })

        if(!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        if(staffId != project.staff) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        if (delproject) {
            res.status(200).json({ message: 'Project successfully deleted' })
        } else {
            res.status(500).json({ message: 'iSomething went wrong, try again later' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function editProject(req, res) {
    try {
        let { staffId, id, projectName, lga, location, description, startDate } = req.body

        if(!staffId || !id || !projectName || !lga || !location || !description || !startDate) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let project = await Project.findOne({ _id: id })

        if(!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        if(staffId != project.staff) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }

        let updateProject = await Project.findOneAndUpdate(
            { _id: id },
            {
                projectName,
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
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function markProjectAsFinished(req, res) {
    try {
        let { project, staff } = req.body /* project id */

        if (!project) {
            res.status(400).json({ message: 'Project not found' })
            return
        }
        if (!staff) {
            res.status(400).json({ message: 'User not found' })
            return
        }

        let user = await Users.findById(staff)

        if(!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        let projectDetails = await Project.findById(project)

        if(staff != projectDetails.staff) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }
        
        let updateProject = await Project.findOneAndUpdate(
            { _id: project },
            { endDate: new Date() }
        )

        if (updateProject) {
            res.status(200).json({ message: 'Project marked as finished' })
        } else {
            res.status(500).json({ message: 'Something went wrong, try again later' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function unmarkProjectAsFinished(req, res) {
    try {
        let { project, staff } = req.body /* project id */

        if (!project) {
            res.status(400).json({ message: 'Project not found' })
            return
        }
        if (!staff) {
            res.status(400).json({ message: 'User not found' })
            return
        }

        let user = await Users.findById(staff)

        if(!user) {
            res.status(404).json({ message: "User not found" })
            return
        }

        let projectDetails = await Project.findById(project)

        if(staff != projectDetails.staff) {
            res.status(401).json({ message: 'You are not allowed to perform this action' })
            return
        }
        
        let updateProject = await Project.findOneAndUpdate(
            { _id: project },
            { endDate: null }
        )

        if (updateProject) {
            res.status(200).json({ message: 'Project unmarked as finished' })
        } else {
            res.status(500).json({ message: 'Something went wrong, try again later' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function addProjectMilestone(req, res) {
    try {
        let { id, staff, milestone, milestoneDescription } = req.body /* id: project id, staff: staff id */

        if (!id) {
            res.status(400).json({ message: 'Project ID is missing in the request body' })
            return
        }

        if (!staff) {
            res.status(400).json({ message: 'User ID is missing in the request body' })
            return
        }

        if (!id || !staff || !milestone || !milestoneDescription ) {
            res.status(400).json({ message: 'All inputs are required' })
            return
        }

        let project = await Project.findById(id)
        if (!project) {
            res.status(400).json({ message: 'Project not found' })
            return
        }

        let user = await Users.findById(staff)
        if (!user) {
            res.status(400).json({ message: 'User not found' })
            return
        }

        let images = req.files.map(file => {
            const imagePath = file.path;
            const imageBuffer = fs.readFileSync(imagePath);
            // Encode the image buffer as a Base64 string
            const imageBase64 = imageBuffer.toString('base64');

            return {
                path: imagePath,
                imageBase64
            }
        });

        let addMilestone = await Project.findOneAndUpdate(
            { _id: id },
            { $push: {
                milestone: {
                    milestone,
                    description: milestoneDescription,
                    date: new Date(),
                    images
                }
            } }
        )

        if(addMilestone) {
            res.status(200).json({ message: 'Milestone added' })
        } else {
            res.status(500).json({ message: 'Something went wrong, try again later' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong, try again later' })
    }
}

async function deleteMilestone(req, res) {
    try {
        let { projectId, milestoneId, staffId } = req.body

        if (!projectId || !milestoneId || !staffId) {
            res.status(400).json({ message: 'Required ID\'s missing in request body' })
            return
        }

        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId, staff: staffId },
            { $pull: { milestone: { _id: milestoneId } } }
          )

          if (updatedProject) {
            res.status(200).json({ message: 'Milestone deleted successfully' })
            return
          } else {
            res.status(500).json({ message: 'Something went wrong, try again later' })
            return
          }
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
    editProject,
    getAllProjects,
    markProjectAsFinished,
    unmarkProjectAsFinished,
    addProjectMilestone,
    deleteMilestone
}