import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        crim: 0.2,
        zn: 1.0,
		indus: 2.3,
		chas: 0,
		nox: 0.45,
		rm: 6.5,
		age: 45.1,
		dis: 4.3,
		rad: 2,
		tax: 230,
		ptratio: 15.3,
		b: 367.2,
		lstat: 4.3
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
	
	var crim_val = []
    for (var i = 0.2; i <= 3.2; i = +(i + 0.15).toFixed(1)) {
      crim_val.push(<option key = {i} value = {i}>{i}</option>);
    }
    var zn_val = []
    for (var i = 1.0; i <= 1.7; i = +(i + 0.1).toFixed(1)) {
      zn_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var indus_val = []
    for (var i = 2.3; i <= 7.3; i = +(i + 0.3).toFixed(1)) {
      indus_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var chas_val = []
    for (var i = 0; i <= 7; i = +(i + 1).toFixed(1)) {
      chas_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var nox_val = []
    for (var i = 0.45; i <= 5; i = +(i + 0.5).toFixed(1)) {
      nox_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var rm_val = []
    for (var i = 6.5; i <= 9; i = +(i + 0.1).toFixed(1)) {
      rm_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var age_val = []
    for (var i = 45.1; i <= 56; i = +(i + 0.7).toFixed(1)) {
      age_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var dis_val = []
    for (var i = 4.3; i <= 7; i = +(i + 0.12).toFixed(1)) {
      dis_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var rad_val = []
    for (var i = 2; i <= 7; i = +(i + 1).toFixed(1)) {
      rad_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var tax_val = []
    for (var i = 230; i <= 330; i = +(i + 10).toFixed(1)) {
      tax_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var ptratio_val = []
    for (var i = 15.3; i <= 20; i = +(i + 0.6).toFixed(1)) {
      ptratio_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var b_val = []
    for (var i = 367.2; i <= 400; i = +(i + 0.7).toFixed(1)) {
      b_val.push(<option key = {i} value = {i}>{i}</option>);
    }
	var lstat_val = []
    for (var i = 4.3; i <= 7; i = +(i + 0.2).toFixed(1)) {
      lstat_val.push(<option key = {i} value = {i}>{i}</option>);
    }

    return (
      <Container>
        <div>
          <h1 className="title">Boston Housing Price Prediction App</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Crim</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.crim}
                  name="crim"
                  onChange={this.handleChange}>
                  {crim_val}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Zn</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.zn}
                  name="zn"
                  onChange={this.handleChange}>
                  {zn_val}
                </Form.Control>
              </Form.Group>
			 <Form.Group as={Col}>
                <Form.Label>Indus</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.indus}
                  name="indus"
                  onChange={this.handleChange}>
                  {indus_val}
                </Form.Control>
             </Form.Group>
			 <Form.Group as={Col}>
                <Form.Label>Chas</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.chas}
                  name="chas"
                  onChange={this.handleChange}>
                  {chas_val}
                </Form.Control>
            </Form.Group>
			<Form.Group as={Col}>
                <Form.Label>Nox</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.nox}
                  name="nox"
                  onChange={this.handleChange}>
                  {nox_val}
                </Form.Control>
            </Form.Group>
			<Form.Group as={Col}>
                <Form.Label>Rm</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.rm}
                  name="rm"
                  onChange={this.handleChange}>
                  {rm_val}
                </Form.Control>
            </Form.Group>
			<Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.age}
                  name="age"
                  onChange={this.handleChange}>
                  {age_val}
                </Form.Control>
            </Form.Group>
            </Form.Row>
			<Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Dis</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.dis}
                  name="dis"
                  onChange={this.handleChange}>
                  {dis_val}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Rad</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.rad}
                  name="rad"
                  onChange={this.handleChange}>
                  {rad_val}
                </Form.Control>
              </Form.Group>
			 <Form.Group as={Col}>
                <Form.Label>Tax</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.tax}
                  name="tax"
                  onChange={this.handleChange}>
                  {tax_val}
                </Form.Control>
              </Form.Group>
			 <Form.Group as={Col}>
                <Form.Label>Ptratio</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.ptratio}
                  name="ptratio"
                  onChange={this.handleChange}>
                  {ptratio_val}
                </Form.Control>
              </Form.Group>
			 <Form.Group as={Col}>
                <Form.Label>B</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.b}
                  name="b"
                  onChange={this.handleChange}>
                  {b_val}
                </Form.Control>
              </Form.Group>
			 <Form.Group as={Col}>
                <Form.Label>Lstat</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.lstat}
                  name="lstat"
                  onChange={this.handleChange}>
                  {lstat_val}
                </Form.Control>
             </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;
