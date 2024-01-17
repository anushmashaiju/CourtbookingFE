import Card from 'react-bootstrap/Card';
import React from 'react';
import { BASE_URL } from '../Constants/Constants';



function MybookingCard({ bookingData }) {

  return (
    <>
      <Card  style={{ width:'50%',height:'30rem'}} className='col-3' >
        <Card.Img variant="top" style={{ width:'100%',height:'20rem'}}src={`${BASE_URL}/courts/${bookingData.courtData?.courtPicture}`} alt="Card image" />
        <Card.Body>
         
          <Card.Title>{bookingData.courtData?.name}</Card.Title>
                <Card.Text>
                    {bookingData.slot?.name}
                </Card.Text>
                <Card.Text>{bookingData.slot?.date}</Card.Text>
                <Card.Text>{bookingData.courtData?.location}</Card.Text>
                <Card.Text>{bookingData.courtData?.address}</Card.Text>
       
        </Card.Body>
      </Card>
      </>
      )
      }

export default MybookingCard;
