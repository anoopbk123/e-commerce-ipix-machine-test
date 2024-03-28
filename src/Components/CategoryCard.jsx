import React from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CategoryCard({title, id, imageURL}) {
    const navigate = useNavigate()
    const handleClickCategory = ()=>{
      navigate(`/category/${id}/${title}`)
    }
    return (
      <div className='my-3' onClick={handleClickCategory}>
       <Card style={{ width: '18rem', cursor: 'pointer' }}>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body className='d-flex flex-column justify-content-between'>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card> 
      </div>
    )
  }
