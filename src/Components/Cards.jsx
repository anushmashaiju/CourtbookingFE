import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BASE_URL } from '../Constants/Constants';
import { useNavigate } from 'react-router-dom';

function Cards({data}) {
  const navigate=useNavigate()
  return (
    <Card style={{ width: '18rem',height:'20rem'}} className='col-12 col-md-3 col-lg-4 col-xl-2 col-xxl-1' onClick={()=>navigate(`/courtUserViewPage/${data._id}`)}>
      <Card.Img variant="top" src={`${BASE_URL}/courts/${data.courtPicture}`} alt=""className='object-fit w-100 h-50 my-2 ' />
      <Card.Body>
        <Card.Title>{data?.courtName}</Card.Title>
        <Card.Subtitle>{data.type}</Card.Subtitle>
        <Card.Subtitle>{data.location}</Card.Subtitle>
        <Button variant="primary">click here</Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;