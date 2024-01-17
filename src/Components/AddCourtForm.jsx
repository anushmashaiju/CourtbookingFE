import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import AxiosInstance from '../Config/AxiosInstance';
import { toastError, toastSuccess } from '../Constants/plugins';
import { useNavigate } from 'react-router-dom';

function AddCourtForm() {
  const [validated, setValidated] = useState(false);     //const[formValue,setFormValue]

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
 
    setValidated(true);
  }
  const navigate = useNavigate()
  const [courtPicture, setCourtPicture] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  const onChange = (e) => {
    setValidated({ ...validated, [e.target.name]: e.target.value })
  }
  const addFileData = (e) => {
    setCourtPicture(e.target.files[0])
    e.target?.files[0] ?setSelectedImage(URL?.createObjectURL(e.target?.files[0]) ?? null):setSelectedImage(null)
  }

  const addCourtData = (e) => {
    e.preventDefault()
console.log(validated.courtPicture)
    let fileData = new FormData()
    fileData.append('image', courtPicture)
    AxiosInstance.post('/admin/addCourtData',fileData, {params: validated},{ headers:{"Content-Type":'multipart/form-data' } }).then((response) => {
      toastSuccess('new court added')
      navigate('/home')
    })
      .catch(err => {
        toastError('something went wrong')
      })
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-4 my-4 mx-4">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
          <Form.Label>Court name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control name='courtName' onChange={onChange} value={validated.courtName}
              type="text"
              placeholder="name"
              defaultValue=""
              required />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label>Location</Form.Label>
          <InputGroup hasValidation>
            <Form.Control name='location' onChange={onChange} value={validated.location}
              type="text"
              placeholder="place"
              defaultValue=""
              required />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Type</Form.Label>
          <InputGroup hasValidation>
            <Form.Control name='type' onChange={onChange} value={validated.type}
              type="text"
              placeholder="type"
              aria-describedby="inputGroupPrepend"
              required />
            <Form.Control.Feedback type="invalid">
              Please choose a Court type.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

      </Row>
      <Row className="mb-3 mx-4">
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <InputGroup hasValidation>
          <Form.Control name='address' onChange={onChange} value={validated.address} as="textarea" rows={3}
            type="text"
            placeholder="type"
            aria-describedby="inputGroupPrepend"
            required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Court pictures</Form.Label>
          <InputGroup hasValidation>
          <Form.Control type="file" name='courtPicture' onChange={addFileData} placeholder="image" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid image.
          </Form.Control.Feedback>
          </InputGroup>
          {selectedImage && <img src={selectedImage} alt="" className='object-fit w-50 my-2 ' />}
       
        </Form.Group>
        </Row>

      <Button className='w-10 mb-4 mx-4' onClick={addCourtData}>Submit form</Button>
      <Button className='w-10 mb-4 mx-3' type="reset">Reset</Button>

    </Form>
  );
}
export default AddCourtForm;