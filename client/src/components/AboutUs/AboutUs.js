import React from 'react';
import './AboutUs.css'

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container AboutUsBox">
            <h1> How It All Started </h1>
            <hr/>
            <div className="row">
                <h2><u>Our Motivation</u></h2>
            </div>
            <div className = "row">
                <p>Everyone has experienced the problem of having to split the bill between a group of friends. 
                  Split It intends to solve the headaches and pain of calculating the bill between a group of people without using cash to split the bill. 
                  One of the goals of Split It is to provide the user a pleasant and enjoyable experience while using our product. 
                  We will accomplish this goal by integrating online payment systems such as Venmo or Chase QuickPay, 
                  a social feed system that allows users to add captions to their payment. 
                  The core of the application, splitting the payment, will account for the tax and tip in relation to the bill. 
                  The user will have the option of manually assigning the name and cost of an item to each person in the group or 
                  semi-automate the process by taking a picture of the receipt and assigning the cost of the item to each person.  </p>
            </div>
            <hr/>
            <div className="row">
                <h2><u>What We Made</u></h2>
            </div>
            <div className = "row">
                <p>TBA </p>
            </div>
            <hr/>
            <div className = "row">
            <h2><u>Our Developers:</u></h2>
            </div>
            <div className = "row">
                <div className = "col s4">
                    <img src={ require('../../public/Kev.jpg')}  alt = "Kevin" className = "responsive-img"/>
                    <br/>
                    <h4 className = "center">Kevin Chen</h4>
                </div>
                <div className = "col s8">
                  <span class= "black-text">
                    <h4><u>LinkedIn:</u></h4>
                    <a href="https://www.linkedin.com/in/kevinchen07cd/" target="_blank">https://www.linkedin.com/in/kevinchen07cd/</a>
                    <br/>
                    <h4><u>GitHub:</u></h4>
                    <a href="https://github.com/ChibiKev" target="_blank">https://github.com/ChibiKev</a>
                    </span>
                </div>
            </div>
            <hr/>
            <div className = "row">
                <div className = "col s4">
                    <img src={ require('../../public/YuBin.jpg')}  alt = "Yubin" className = "responsive-img"/>
                    <br/>
                    <h4 className = "center">Yu Bin Liu</h4>
                </div>
                <div className = "col s8">
                    <h4><u>LinkedIn:</u></h4>
                    <a href="https://www.linkedin.com/in/jacky-liu97/" target="_blank">https://www.linkedin.com/in/jacky-liu97/</a>
                    <br/>
                    <h4><u>GitHub:</u></h4>
                    <a href="https://github.com/JackyLiu97" target="_blank">https://github.com/JackyLiu97</a>
                </div>
            </div>
            <hr/>
            <div className = "row">
                <div className = "col s4">
                    <img src={ require('../../public/Chris.jpg')}  alt = "Chris" className = "responsive-img"/>
                    <br/>
                    <h4 className = "center">Christian Suleiman</h4>
                </div>
                <div className = "col s8">
                    <h4><u>LinkedIn:</u></h4>
                    <a href="https://www.linkedin.com/in/christian-suleiman/" target="_blank">https://www.linkedin.com/in/christian-suleiman/</a>
                    <br/>
                    <h4><u>GitHub:</u></h4>
                    <a href="https://github.com/Cristo12345" target="_blank">https://github.com/Cristo12345</a>
                </div>
            </div>
            <hr/>
            <div className = "row">
                <div className = "col s4">
                    {/* <img src={ require('../../public/Jimmy.jpg')}  alt = "Jimmy" className = "responsive-img"/>
                    <br/> */}
                    <h4 className = "center">Jimmy Luy</h4>
                </div>
                <div className = "col s8">
                    <h4><u>LinkedIn:</u></h4>
                    <a href="https://www.linkedin.com/in/jimmy-luy-788a0a177/" target="_blank">https://www.linkedin.com/in/jimmy-luy-788a0a177/</a>
                    <br/>
                    <h4><u>GitHub:</u></h4>
                    <a href="https://github.com/jimmyluy1" target="_blank">https://github.com/jimmyluy1</a>
                </div>
            </div>
            <hr/>
            <div className = "row">
                <div className = "col s4">
                    {/* <img src={ require('../../public/Alex.jpg')}  alt = "Alex" className = "responsive-img"/>
                    <br/> */}
                    <h4 className = "center">Jia Peng Zhen</h4>
                </div>
                <div className = "col s8">
                    {/* <h4><u>LinkedIn:</u></h4>
                    <a href="https://www.linkedin.com/in//" target="_blank">https://www.linkedin.com/in//</a>
                    <br/> */}
                    <h4><u>GitHub:</u></h4>
                    <a href="https://github.com/alexzhen93" target="_blank">https://github.com/alexzhen93</a>
                </div>
                </div>
            </div>
    );
  }
}

export default AboutUs;