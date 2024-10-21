import React from 'react';

export default function Biography({imageUrl}) {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="image about"  />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea atque sequi quas corporis? Est enim autem, eius id facere maiores. Perferendis sapiente deserunt numquam eveniet aperiam iure! Tempora, esse nam, facilis repudiandae voluptate earum sint commodi ipsum, tenetur at optio!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, illum.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo similique hic unde eligendi dolor doloremque beatae eius placeat nulla qui.</p>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  )
}
