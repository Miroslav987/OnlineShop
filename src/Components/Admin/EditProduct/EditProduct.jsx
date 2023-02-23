import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./EditProduct.css";
import { productContext } from "../../../context/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { productDetails, readOneProduct, editProduct } =
    useContext(productContext);
  const [inpValues, setInpValues] = useState(productDetails);

  const { id } = useParams();
  useEffect(() => {
    readOneProduct(id);
  }, [id]);

  function handleChange(e) {
    let obj = {
      ...inpValues,
      [e.target.name]: e.target.value,
    };
    setInpValues(obj);
  }
  console.log(inpValues);
  const navigate = useNavigate();

  function handleSave(e) {
    e.preventDefault(); // останавливает автообновление бразуреа при отправке данных через form
    if (
      !inpValues.category.trim() ||
      !inpValues.title.trim() ||
      !inpValues.model.trim() ||
      !inpValues.description.trim() ||
      !inpValues.color.trim() ||
      !inpValues.price ||
      !inpValues.img1.trim() ||
      !inpValues.img2.trim() ||
      !inpValues.img3.trim()
    ) {
      alert("Заполните все поля!");
      return;
    }
    editProduct(id, inpValues);
    navigate("/list");
  }

  return (
    <>
      <h2 id="add-title">Редактирование товара</h2>
      <form
        style={{
          position: "relative",
          borderRadius: "5px",
          background: " rgb(242 242 242 / 85%)",
          border: " 10px solid rgb(218 218 218 / 69%)",
        }}
        id="form-add"
        onSubmit={e => handleSave(e)}>
        <Box sx={{ display: "flex" }}>
          <select
            name="category"
            className="selInp"
            value={inpValues.category}
            onChange={e => handleChange(e)}>
            <option style={{ display: "none" }}>Category</option>
            <option value="home">Home</option>
            <option value="elecrtonic">Elecrtonic</option>
            <option value="car">Car</option>
          </select>
          <TextField
            className="outlined-basic"
            label="Название"
            variant="outlined"
            name="title"
            value={inpValues.title}
            onChange={e => handleChange(e)}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            className="outlined-basic"
            label="Модель"
            variant="outlined"
            name="model"
            value={inpValues.model}
            onChange={e => handleChange(e)}
          />

          <TextField
            className="outlined-basic"
            label="Цвет"
            variant="outlined"
            name="color"
            type="color"
            value={inpValues.color}
            onChange={e => handleChange(e)}
          />
        </Box>
        <TextField
          className="outlined-basic"
          label="Описание"
          variant="outlined"
          name="description"
          value={inpValues.description}
          onChange={e => handleChange(e)}
        />
        <Box sx={{ display: "flex" }}>
          <TextField
            type="number"
            className="outlined-basic"
            label="Цена"
            variant="outlined"
            name="price"
            value={+inpValues.price}
            onChange={e => handleChange(e)}
          />

          <TextField
            className="outlined-basic"
            label="Фото 1"
            variant="outlined"
            name="img1"
            value={inpValues.img1}
            onChange={e => handleChange(e)}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            className="outlined-basic"
            label="Фото 2"
            variant="outlined"
            name="img2"
            value={inpValues.img2}
            onChange={e => handleChange(e)}
          />

          <TextField
            className="outlined-basic"
            label="Фото 3"
            variant="outlined"
            name="img3"
            value={inpValues.img3}
            onChange={e => handleChange(e)}
          />
        </Box>
        <Button variant="contained" type="submit" sx={{ background: "black" }}>
          Сохранить
        </Button>
      </form>
    </>
  );
};

export default EditProduct;
