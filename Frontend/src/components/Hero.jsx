import React from 'react';


export default function Hero({title,imageUrl}) {
  return (
    <div className="hero container">
        <div className="banner">
            <h1>{title}</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam beatae aut doloremque fuga accusamus assumenda provident iusto, quasi praesentium veniam blanditiis totam! Perspiciatis quam debitis, doloribus laboriosam sapiente tempore quaerat dolorum in corporis quis eaque fuga, voluptatibus dolore consectetur laudantium reiciendis ab nobis assumenda doloremque neque? Eum molestiae impedit corporis!</p>

        </div>
        <div className="banner">
            <img src={imageUrl} alt="hero" className='animated-image' />
            <span>
                <img src="/Vector.png" alt="vector"  />
            </span>
        </div>
      
    </div>
  )
}
