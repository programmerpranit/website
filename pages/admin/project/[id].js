import { data } from 'autoprefixer'
import React from 'react'
import dbConnect from '../../../middleware/mongo'
import Project from '../../../models/Project'


const EditProject = ({project}) => {
  return (
    <div>project {project._id} </div>
  )
}

export default EditProject


export async function getServerSideProps(context) {
    await dbConnect();
  
    const id = context.query.id;
  
    let project;
  
    try {
      const data = await Project.findById(id);
      project = JSON.parse(JSON.stringify(data));
    } catch (error) {
      const data = null;
      project = JSON.parse(JSON.stringify(data));
    }
  
    return {
      props: { project }, // will be passed to the page component as props
    };
  }
  