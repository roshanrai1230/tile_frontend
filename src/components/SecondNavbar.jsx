function SecondNavbar() {
  const items = [
    "All Tiles", "Floor", "Wall", "Bathroom", "Kitchen", 
    "Living Room", "Outdoor", "Parking", "Ceramic", "Stone"
  ];

  return (
    <div className="secondary-nav">
      <div className="container">
        <ul className="scroll-menu">
          {items.map((item, index) => (
            <li key={index}><a href="#">{item}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SecondNavbar;