import { useRef, useState } from 'react';
import { Col, Row, Form, Button, InputGroup, Image } from 'react-bootstrap';
import CustomCard from '../../components/Card';
import defaultImage from '../../assets/default_image.jpg';
import axios from '../../service/api.js';
import { toast } from 'react-toastify';

import { drawRectangles } from '../../utils/drawRectangles.js';

const Painel = () => {
  const imgRef = useRef();
  const canvasRef = useRef();

  const [image, setImage] = useState(defaultImage);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.image.files[0]) {
      const formData = new FormData();
      formData.append('image', event.target.image.files[0]);
      try {
        const response = await axios.post(
          '/?option=OBJECT_LOCALIZATION',
          formData
        );

        drawRectangles(imgRef, canvasRef, response.data.result);
      } catch (err) {
        if (err.message === 'Network Error') {
          return toast.error(
            'Erro de conexão com o servidor. Tente novamente mais tarde!'
          );
        }
        console.error(err);
        toast.error(err.message);
      }
    }
  };

  return (
    <CustomCard borderColor='#fff'>
      <Row className='justify-content-center'>
        <Col md={5} className='mb-2'>
          <h2 className='text-center'>What's on the picture?</h2>
          <Image
            ref={imgRef}
            id='image'
            fluid
            width={500}
            height={430}
            src={image}
            alt='An image uploaded by the user'
            className='d-block mx-auto rounded'
            thumbnail
          />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={5} className='mb-2'>
          <Form
            onSubmit={handleSubmit}
            encType='multipart/form-data'
            className='text-center mt-4'
          >
            <InputGroup className='mb-3'>
              <Form.Control
                size='sm'
                type='file'
                name='image'
                accept='.png, .jpg, .jpeg'
                onChange={(e) => {
                  return setImage(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <Button
                className='text-nowrap'
                size='sm'
                variant='dark'
                type='submit'
              >
                Localizar
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <canvas
        ref={canvasRef}
        id='canvasOutput'
        style={{ display: 'none' }}
      ></canvas>
    </CustomCard>
  );
};
export default Painel;
