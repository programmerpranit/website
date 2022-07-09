import React, { useEffect, useState } from 'react'


const Projects = () => {

    const [works, setWorks] = useState([]);
    const [filterWork, setFilterWork] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');

    const handleWorkFilter = (item) => {
        
    }


  return (
    <section>
        <div className="pcontainer pt-40">
            <h2 className='mt-0 pt-0 leading-5'>QUALITY WORK</h2>
            <h2>RECENTLY DONE PROJECT</h2>

            <div className="project-filter">
                {['ALL', 'APP', 'Web', 'BlockChain', 'ML'].map((item, index) => (
                    <div 
                        className={`${activeFilter === item ? 'item-active': ''}`}
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                    >



                    </div>
                ))}

            </div>



        </div>

    </section>
  )
}

export default Projects