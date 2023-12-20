import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GEO_API_KEY;



const NavigateToActivities = ({ lat, long }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/activities', { state: { locationData: { lat, long } } });
  }, [lat, long]);

  return null; 
};



export default function Location() {

  const [location, setLocation] = useState('');
  const [fullLocation, setFullLocation] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);


  const handleLocation = async (e) => {
    e.preventDefault();
    try {
      const city = e.target.elements.locationForm.value;
      const response = await axios.get(`/location?city=${city}`);
      console.log(response);

      setLocation(response.data[0].display_name.split(',')[0]);
      setFullLocation(response.data[0].display_name);
      setLat(response.data[0].lat);
      setLong(response.data[0].lon);
      setFormSubmitted(true);

      navigateToActivities(lat, long);
    } catch (error) {
      console.error(error.message);
    }
  }

  const navigateToActivities = (lat, long) => {
    setFormSubmitted(false);
  }



  return (
    <>
      <Form className="location-form" onSubmit={handleLocation}>
        <Form.Group controlId='locationForm'>
          <Form.Label>Find a city</Form.Label>
          <Form.Control type='text' placeholder='Enter City Name' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Find
        </Button>
      </Form>
      {formSubmitted && (
        <>
          <Card
            style={{ width: '40vw' }}
            className='city-card'
          >
            <Card.Body>
              <div className='card-text-container'>
                <Card.Title>{fullLocation}</Card.Title>
                <Card.Text>
                  Lat: {lat}
                </Card.Text>
                <Card.Text>
                  Long: {long}
                </Card.Text>
              </div>
              <Card.Img
                variant='bottom'
                src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${long}&zoom=12`}
                style={{ width: '30vw', height: '30vw' }}
                className=''
              />
            </Card.Body>
          </Card>
          <NavigateToActivities lat={lat} long={long} />
        </>
      )}
    </>

  )
}