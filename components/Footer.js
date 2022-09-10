import React from 'react'
import Image from 'next/image'

export const Footer = () => {
  return (
    <section>

        <div className="pcontainer flex flex-col h-[50vh] items-center justify-center">
            <h2 className="text-4xl">Pranit Patil</h2>

            <div className='flex py-4 items-center'>

              <a href="https://www.linkedin.com/in/programmerpranit" target="_blank" rel="noreferrer" className='mx-2'>
                <Image src={'/linkedin.png'} alt={'programmerpranit'} width={30} height={30} />
              </a>
              <a href="https://twitter.com/pro_pranit" target="_blank" rel="noreferrer" className='mx-2'>
                <Image src={'/twitter.png'} alt={'pro_pranit'} width={35} height={30} />
              </a>
              <a href="https://github.com/programmerpranit" target="_blank" rel="noreferrer" className='mx-2'>
                <Image src={'/github.png'} alt={'programmerpranit'} width={30} height={30} />
              </a>
              <a href="https://auth.geeksforgeeks.org/user/pranitpatil" target="_blank" rel="noreferrer" className='mx-2'>
                <Image src={'/gfgsq.png'} alt={'pranitpatil'} width={40} height={50} />
              </a>
              <a href="https://play.google.com/store/apps/developer?id=Pranit+Patil." target="_blank" rel="noreferrer" className='mx-2'>
                <Image src={'/googleplaystore.png'} alt={'Pranit Patil.'} width={35} height={35} />
              </a>


            </div>

            {/* <h4>Follow Me</h4> */}
        </div>

    </section>
  )
}
