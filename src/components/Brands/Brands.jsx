import React, {useState, useEffect} from "react" 
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText } from "@mui/material";


export const styleBrandsTypes = {
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'flex-start' 
} 
const Brands = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [brands, setBrands] = useState([]);

  const handleListItemClick = (event, index, reqParam) => {
    setSelectedIndex(index);
    const request = fetch(`http://localhost:8000/products?brand_name=${reqParam}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data);
    })
  }; 
  
  useEffect(() => {
    request();
  }, [])
  const request = () => {
    const response =  fetch('http://localhost:8000/brands/', {
    method: 'GET',
      headers: {
      'Accept': 'application/json'
  }
  }).then((resp) => {
    return resp.json()}
  ).then((data) => {
    setBrands(data)
  } );
  }

  return (
    <>
    <List component="nav" aria-label="main mailbox folders" sx={styleBrandsTypes}>
      {brands.map((brand, index) => (
        
        <ListItemButton key={brand.id}
          selected={selectedIndex === index}
          onClick={(event) => handleListItemClick(event, index, brand.name)}
        >
          
          <ListItemText primary={brand.name} />
        </ListItemButton>
       
        
      ))}
        
        </List>
   
   </>
  )
}

export default Brands;