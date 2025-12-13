import React from "react";
import "./invoice.css";

class Invoice extends React.Component {
  render() {
    return (
      <div className='invoice-box'>
        <table cellpadding='0' cellspacing='0'>
          <tbody>
            <tr className='top'>
              <td colSpan='2'>
                <table>
                  <tr>
                    <td className='title'>
                      <img
                        src={require("../../images/new.png")}
                        style={{ width: "50%", maxWidth: "200px" }}
                      />
                    </td>

                    <td>
                      Invoice #: {this.props.invoice.recieptNumber}
                      <br />
                      Created:{" "}
                      {new Date(this.props.invoice.date).toLocaleDateString()}
                      <br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className='information'>
              <td colSpan='2'>
                <table>
                  <tr>
                    <td>
                      <br />
                      {this.props.student.location.value === "gurdaspur" ? (
                        <p>
                          Right by K7 Restaurant | Best Fastfood Restaurant |
                          Gurdaspur <br /> Address: Sadar Bazar, Gurdaspur,
                          Punjab 143521
                        </p>
                      ) : (
                        <p>
                          Address: 106, 150, Shastri Nagar, Batala, Punjab
                          143505, Batala, Punjab 143521
                        </p>
                      )}
                      <br />
                    </td>

                    <td>
                      {this.props.student.first_name}{" "}
                      {this.props.student.surname}
                      <br />
                      +91 {this.props.student.mobile}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className='heading'>
              <td>Item</td>
              <td>Price</td>
            </tr>

            <tr className='item'>
              <td>{this.props.invoice.particulars}</td>

              <td>₹ {this.props.invoice.amount}</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: "70px", textAlign: "right" }}>
          Signature/ Stamp
        </p>
      </div>
    );
  }
}

export default Invoice;
