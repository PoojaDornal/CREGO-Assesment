import React, {useState} from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap';


const ExpressionFrom = () =>
{
    const initialValue = {
        key:'age',
        output:{
            value:60,
            operator: '>=',
            score:50,
        },
    };

    const [values, setValues] = useState([initialValue]);
    const [combinator, setCombinator] = useState("and");
    const [data, setData] = useState(false);

    const handleAddExpression = () => {
        setValues([
            ...values,
            {
                key: 'age',
                output:{
                    value:0,
                    operator:'>=',
                    score:0,
                } ,
            },
        ]);

    };

    const handleDeleteExpression = (index) =>{
        if(values.length === 1)
        {
            alert("Cannot delete first rule");
            return;
        }
        const updatedValues = [...values];
        updatedValues.splice(index, 1);
        setValues(updatedValues);
    };

    const handleInputChange = (index, field , value) =>{
        const updatedValues = [...values];
        updatedValues[index][field] = value;
        setValues(updatedValues);
    };

    const handleOutputChange = (index, field, value) => {
        const updatedValues = [...values];
        updatedValues[index].output[field] = value;
        setValues(updatedValues);
    };

    const handleCombinatorChange = (value) =>{
        setCombinator(value);
    };

    const handleSubmit = () =>{
    const filteredValues = values.filter((value) => value.key !== "");

        if(filteredValues.length === 0)
        {
            alert("Please Add atleast one expression before submitting!");
            return;
        }

        const output = {
            values: filteredValues,
            combinator: combinator || 'and',
        };
        console.log(output);
        setData(true);
    };

    return(
      <Container className="bg-light border border-dark p-4 rounded text-dark">
        <Form>
            {values.map((value, index) =>(
                <Row key={index} className="d-flex align-item-center">
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Form.Group controlId={`ruleType-${index}`}>
                            <div className="mb-3">
                                <Form.Label className="fw-bold">
                                    Rule Type
                                </Form.Label>
                                <Form.Select 
                                  value={value.key}
                                  onChange={(e) =>
                                   handleInputChange(index,"key", e.target.value)}>
                                    <option disabled>Select Rule Type</option>
                                    <option value="age">Age</option>
                                    <option value="credit_score">Credit Score</option>
                                    <option value="account_balance">Account Balance</option>
                                   </Form.Select>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <Form.Group controlId={`operator-${index}`}>
                         <div className="mb-3">
                            <Form.Label className="fw-bold">Operator</Form.Label>
                            <Form.Select
                              value={value.output.operator}
                              onChange={(e) =>
                               handleOutputChange(index,"operator",e.target.value)}>
                                <option disabled>Select Operator</option>
                                <option value=">">{">"}</option>
                                <option value="<">{"<"}</option>
                                <option value=">=">{">="}</option>
                                <option value="<=">{"<="}</option>
                                <option value="=">{"="}</option>
                            </Form.Select>
                        </div>           
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                    <Form.Group controlId={`value-${index}`}>
                     <div className="mb-3">
                         <Form.Label className="fw-bold">Value</Form.Label>
                         <Form.Control type="number"
                          value={value.output.value}
                           onChange={(e) =>
                            handleOutputChange(index, "value", e.target.value)} />                        
                    </div>
                    </Form.Group>       
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                        <Button 
                          className="mt-4"
                          variant="danger"
                          onClick={() => handleDeleteExpression(index)}>
                            Delete
                        </Button>
                     </Col>
                </Row>
            ))}
            <Row className="mt-4 d-flex">
            <Col xs={12} sm={12} md={12} lg={8}>
            <Form.Group controlId="combinator">
              <Form.Label className="fw-bold">combinator</Form.Label>
              <Form.Select className="w-100 mb-3"
                value={combinator}
                onChange={(e) => handleCombinatorChange(e.target.value)}>
                 <option value="and">AND</option>  
                 <option value="or">OR</option> 
              </Form.Select>
              </Form.Group>
              </Col>
              <Col className="d-flex h-25 align-items-end"
              xs={12} sm={12} md={12}lg={8}>
                <Button variant="warning" 
                  className="me-2 me-md-4 text-light"
                  onClick={handleAddExpression}>
                    Add Expression
                  </Button>
                  <Button variant="success" onClick={handleSubmit}>
                    Submit
                  </Button>
            </Col> 
            </Row>
        </Form> 
        {data && (
            <div className="mt-4 mb-4">
                <h2 className="text-center">Output</h2>
                <div className="bg-light text-dark p-3 rounded shadow">
                    <pre>{JSON.stringify({values, combinator}, null,2)}</pre>
                </div>
            </div>
        )}
      </Container>  
    );
};

export default ExpressionFrom;
