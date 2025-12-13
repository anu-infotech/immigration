import React from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { connect } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import { Button, Col, Row, Table } from 'reactstrap';
import { updateEnquiryRemarks } from '../../../actions/assessment';
import ReactHtmlParser from 'react-html-parser';

class Remarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', running: false }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  onSave = async () => {
    const formvalues = {
      remarks: this.state.text,
    };
    this.setState({ running: true });
    await this.props.updateEnquiryRemarks(
      this.props.assessment.ref_no,
      formvalues
    );
    this.setState({ running: false });
  };

  render() {
    if (this.state.running) {
      return (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PacmanLoader size={30} color={'#29166F'} loading={true} />
        </div>
      );
    }
    return (
      <div>
        <Row style={{ marginBottom: '30px' }}>
          <Col lg={12} style={{ textAlign: 'right' }}>
            <Button onClick={this.onSave} color='success'>
              Save&rarr;
            </Button>
          </Col>
        </Row>
        <ReactQuill value={this.state.text} onChange={this.handleChange} />
        <Row style={{ marginTop: '30px' }}>
          <Col lg={12} style={{ textAlign: 'right' }}>
            <Button onClick={this.onSave} color='success'>
              Save&rarr;
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={12} style={{ marginTop: "30px" }}>
            <Table>
              <thead>
                <th>Sr. no</th>
                <th>Remark</th>
                <th>Name</th>
              </thead>
              <tbody>
                {
                  this.props.assessment.remarks.map((el, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td><p style={{textWrap: "wrap"}}>{ReactHtmlParser(el.remarks)}
                        </p></td>
                        <td>{new Date(el.date).toLocaleString()}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { assessment: state.singleAssessment };
};

const decoratedComponemt = connect(mapStateToProps, {
  updateEnquiryRemarks: updateEnquiryRemarks,
})(Remarks);

export default decoratedComponemt;
