import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const ImageUpload = ({ onIngredientsDetected }) => {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Load the MobileNet model
      const model = await mobilenet.load();

      // Detect objects in the image
      const img = document.createElement('img');
      img.src = imageUrl;
      img.onload = async () => {
        const predictions = await model.classify(img);
        const detectedIngredients = predictions.map(prediction => prediction.className);
        setIngredients(detectedIngredients);
        onIngredientsDetected(detectedIngredients);
      };
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" ref={imageRef} style={{ maxWidth: '100%', height: 'auto' }} />}
      {ingredients.length > 0 && (
        <div>
          <h3>Detected Ingredients:</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;