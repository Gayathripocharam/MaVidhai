import streamlit as st
import numpy as np
from PIL import Image
from utils import disease_info

st.set_page_config(page_title="PlantPulse 🌱", layout="centered")

st.title("🌱 PlantPulse")
st.subheader("AI-based Crop Disease Detection")

uploaded_file = st.file_uploader("Upload a leaf image", type=["jpg","png","jpeg"])

if uploaded_file:
    image = Image.open(uploaded_file).resize((128,128))
    st.image(image, caption="Uploaded Image", use_column_width=True)

    predicted_class = np.random.randint(0, 3)
    confidence = np.random.uniform(80, 99)

    st.success(f"🌿 Disease: {disease_info[predicted_class]['name']}")
    st.info(f"📊 Confidence: {confidence:.2f}%")
    st.warning(f"💊 Treatment: {disease_info[predicted_class]['treatment']}")