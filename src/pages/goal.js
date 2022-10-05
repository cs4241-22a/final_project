import React from 'react';
const Goal = () => {
  return (
    <div
      style={{
        display: 'absolute',
        justifyContent: 'Right',
        alignItems: 'Right',
        height: '100vh',
        padding: '2%'
      }}
    >
      <h1>Goal</h1>
      <p> As STEM students, we often use applications to buy/sell/trade second-hand goods. 
        Currently, there exists a Facebook Private Group called “WPI Students: Wanted/For Sale/Trade” with over 3000 members to support such needs of the community. 
        However, we thought that having a WPI student-driven application would be beneficial for safety and data protection reasons. 
        Besides the private group, there is also Facebook Marketplace and eBay, however, they are not community focused and we would like to have a platform built with trust.
      </p>
      <p>This motivated us to create GoataShop, a WPI-accessible shopping web application that can be used as a marketplace to sell or buy products. 
        It will have features including login authentication, database storage of items currently being sold, and the ability to add items to your own cart.
      </p>
    </div>
  );
};
  
export default Goal;