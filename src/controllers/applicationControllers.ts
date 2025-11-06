import {Request,Response} from  'express'
import * as applicationService from '../service/applicationService'

export const addApplication = async (req:Request, res:Response)=>{

    try {
        
        const newApplication = await applicationService.createApplication(req.body,req.user!.id)
        res.status(201).json(newApplication)

    } catch (error) {
       res.status(500).json({message:"Error in creating application"})
    }
};

export const getAllApplications = async (req:Request , res:Response)=>{
    try {

        const applications = await applicationService.findAllApplications();
        res.status(200).json(applications);

        
    } catch (error) {

        res.status(500).json({message:"Error retriving applications"})
        
    }
}

export const getApplicationById = async(req:Request,res:Response)=>{
    try {

        const id = parseInt(req.params.id)

        const application = await applicationService.findApplicationById(id)
        if(!application){
            return res.status(404).json({
                message:"Application not found"
            })
        }

        return res.status(200).json(application)
    } catch (error) {

      res.status(500).json({message:"Error retriving message"})
        
    }
};

export const updateApplicationById = async(req:Request, res:Response) =>{
    try {

        const id = parseInt(req.params.id)
        const updatedApplication = await applicationService.updateApplication(id, req.body)
                if(!updateApplicationById){
            return res.status(404).json({
                message:"Application not found"
            })
        }
        res.status(200).json(updatedApplication)
    } catch (error) {
        res.status(500).json({message:"Error updating application"})
        
    }
};

export const deleteApplicationById = async(req:Request, res:Response)=>{
    try {
        const id = parseInt(req.params.id);
        const deletedApplication = await applicationService.deleteApplication(id);
           if(!deletedApplication){
            return res.status(404).json({
                message:"Application not found"
            })
        }
        res.status(200).json(deletedApplication);
    } catch (error) {
        res.status(500).json({message:"Error deleting application"})
    }
}