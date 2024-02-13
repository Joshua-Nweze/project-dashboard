import { inject } from "vue"

const apihost = inject('apihost')

async function getUserDetails (email) {
    let req = await fetch(`${apihost}/api/user/get-details?email=${email}`, { credentials: 'include' })
    let res = await req.json()

    return res
}

async function getStaffProjects(id) {
    let req = await fetch(`${apihost}/api/projects/get-staff-projects?staffId=${id}`, { credentials: 'include' })
    let res = await req.json()

    let ongoingProjects;
    let finishedProjects;

    ongoingProjects = (res.message).filter(project => project.endDate == null)
    finishedProjects = (res.message).filter(project => project.endDate != null)

    return {
        projects: res.message,
        ongoingProjects,
        finishedProjects
    }
}

export {
    getUserDetails,
    getStaffProjects
 }