import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductCard({price, title, id, imageURL}) {
  const navigate = useNavigate()
  const handleClickProduct = ()=>{
    navigate(`/product/${id}`)
  }
  const handleAddToCart = (e)=>{
    e.stopPropagation();
    toast.success('Added to cart')
  }
  return (
    <div className='m-1 transition-hover box-shadow' onClick={handleClickProduct}>
     <Card style={{ width: '18rem', cursor: 'pointer' }}>
      <Card.Img variant="top" src={imageURL} />
      <Card.Body className='d-flex flex-column justify-content-between'>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Price: ${price}
        </Card.Text>
        <Button variant="warning" onClick={handleAddToCart}>Add to cart</Button>
      </Card.Body>
    </Card> 
    </div>
  )
}
