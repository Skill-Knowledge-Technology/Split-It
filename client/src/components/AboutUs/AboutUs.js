import React from 'react';
import './AboutUs.css'

export default class AboutUs extends React.Component {
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
            semi-automate the process by taking a picture of the receipt and assigning the cost of the item to each person.
          </p>
        </div>
        <hr/>
        <div className="row">
          <h2><u>What We Made</u></h2>
        </div>
        <div className = "row">
          <p>We created a web application that allows users to easily split their bills in social settings. 
          The overview of the web application included features such as splitting the receipt, authentication, transaction process, payments, history, friend feature and profile. 
          <br/>
          A User should login in order to take advantage of our application but it is not necessary if it wants to quickly split the bill. 
          The authentication system allows users to register and login in order to get full access to our features such as payments, history, friends and profile.
          <br/>
          Our web application allowed users the options to split their bills with manual input or camera functionality. 
          The camera functionality utilizes the tesseract OCR framework to scan the receipt and displays the name and price of each item in a table. 
          The user can input which person is associated with the item and make changes to the table before saving the transaction. 
          The manual input allows users to input the items and prices which will then be displayed on a table. 
          The user can input which person is associated with the item before saving the transaction. 
          There is also an EZ Split functionality which will split the bill equally for everyone in the group. 
          <br/>
          The transaction process works in conjunction with our bill-splitting feature and describes how a group payment process will work with other users. 
          The following is a step by step process of how the transaction process works. 
          <br/>
          <ol>
            <li>Users will be able to initiate a group payment process (we will refer to this as a “Transaction”) with at least one other user (creator will be known as an Owner).</li>
            <li>The Owner will be able to add other users to the Transaction.</li>
            <li>The Owner will be able to assign costs from data input (whether via camera or manual input) to each member of the current group.</li>
            <li>Once all costs have been accounted for, the Owner will be able to send requests to specific users for the dollar amount they have been assigned in the previous step.</li>
            <li>Users will be able to pay their billed amount to the Owner using money in their Split It account balance or directly with a linked credit/debit card/third party options (dummy money in this case).</li>
            <li>Tips can also be added to the bill manually and split amongst users.</li>
            <li>All payments will go to the Split It balance of the Owner.</li>
            <li>The Owner can save the location where the transaction process takes place.</li>
          </ol>
          Once a user has been listed as a participant in another user’s transactions, they will owe that User their share of their bill. 
          The Payments page was created to allow users to pay for their shares. 
          Any payments you owe will appear here along with some information about the transaction associated with the payment. 
          The user’s balance is displayed here as well. 
          If the User has sufficient funds, they can make the payment and transfer the amount to the Owner of the transaction. 
          If not, they can add “dummy money” to their account with the “Add Funds” tab. 
          <br/>
          Our app contains a simple Friendship system between users. All of a user’s friendship information can be viewed via the Friends page. 
          A user can search for other users via username and send them a friend request. 
          A user can respond to these requests by accepting them or rejecting them. 
          Users can also view who their current friends are and who they have sent friend requests to. 
          They can also cancel these requests. 
          <br/>
          The history component of our web application will display the locations in which the user has participated in a transaction. 
          The locations will be displayed in google maps if the user created or participated in the transaction process. 
          The history component is part of the social features we discussed in our design phase. 
          <br/>
          The profile component displays basic information about the User such as username, email and balance. 
          The profile component is part of the social features we discussed in our design phase. 
        </p>
      </div>
      <hr/>
      <div className = "row">
      <h2><u>Our Developers:</u></h2>
      </div>
      <div className = "row">
        <div className = "col s12 md4 l4">
          <img src={ require('../../public/People/Kev.jpg')}  alt = "Kevin" className = "responsive-img"/>
          <br/>
          <h4 className = "center">Kevin Chen</h4>
        </div>
        <div className = "col s12 md8 l8">
          <span className= "black-text">
            <h4><u>LinkedIn:</u></h4>
            <a href="https://www.linkedin.com/in/kevinchen07cd/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/kevinchen07cd/</a>
            <br/>
            <h4><u>GitHub:</u></h4>
            <a href="https://github.com/ChibiKev" rel="noopener noreferrer" target="_blank">https://github.com/ChibiKev</a>
            </span>
        </div>
      </div>
      <hr/>
      <div className = "row">
        <div className = "col s12 md4 l4">
          <img src={ require('../../public/People/YuBin.jpg')}  alt = "Yubin" className = "responsive-img"/>
          <br/>
          <h4 className = "center">Yu Bin Liu</h4>
        </div>
        <div className = "col s12 md8 l8">
          <h4><u>LinkedIn:</u></h4>
          <a href="https://www.linkedin.com/in/jacky-liu97/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/jacky-liu97/</a>
          <br/>
          <h4><u>GitHub:</u></h4>
          <a href="https://github.com/JackyLiu97" rel="noopener noreferrer" target="_blank">https://github.com/JackyLiu97</a>
        </div>
      </div>
      <hr/>
      <div className = "row">
        <div className = "col s12 md4 l4">
          <img src={ require('../../public/People/Chris.jpg')}  alt = "Chris" className = "responsive-img"/>
          <br/>
          <h4 className = "center">Christian Suleiman</h4>
        </div>
        <div className = "col s12 md8 l8">
          <h4><u>LinkedIn:</u></h4>
          <a href="https://www.linkedin.com/in/christian-suleiman/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/christian-suleiman/</a>
          <br/>
          <h4><u>GitHub:</u></h4>
          <a href="https://github.com/Cristo12345" rel="noopener noreferrer" target="_blank">https://github.com/Cristo12345</a>
        </div>
      </div>
      <hr/>
      <div className = "row">
        <div className = "col s12 md4 l4">
          <img src={ require('../../public/People/dummy.jpg')}  alt = "Jimmy" className = "responsive-img"/>
          <br/>
          <h4 className = "center">Jimmy Luy</h4>
        </div>
        <div className = "col s12 md8 l8">
          <h4><u>LinkedIn:</u></h4>
          <a href="https://www.linkedin.com/in/jimmy-luy-788a0a177/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/jimmy-luy-788a0a177/</a>
          <br/>
          <h4><u>GitHub:</u></h4>
          <a href="https://github.com/jimmyluy1" rel="noopener noreferrer" target="_blank">https://github.com/jimmyluy1</a>
        </div>
      </div>
      <hr/>
      <div className = "row">
        <div className = "col s12 md4 l4">
          <img src={ require('../../public/People/Alex.jpg')}  alt = "Alex" className = "responsive-img"/>
          <br/>
          <h4 className = "center">Jia Peng Zhen (Alex)</h4>
        </div>
        <div className = "col s12 md8 l8">
          <h4><u>LinkedIn:</u></h4>
          <a href="https://www.linkedin.com/in/jia-peng-zhen-6455a1170/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/jia-peng-zhen-6455a1170/</a>
          <br/>
          <h4><u>GitHub:</u></h4>
          <a href="https://github.com/alexzhen93" rel="noopener noreferrer" target="_blank">https://github.com/alexzhen93</a>
        </div>
      </div>
    </div>
    );
  }
}