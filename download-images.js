const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2024/03/product-01.jpg',
    filename: 'product-1.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2024/03/product-02.jpg',
    filename: 'product-2.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2024/03/product-03.jpg',
    filename: 'product-3.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2024/03/product-04.jpg',
    filename: 'product-4.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/house-plant.jpg',
    filename: 'house-plant.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/outdoor-plant.jpg',
    filename: 'outdoor-plant.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/succulents.jpg',
    filename: 'succulents.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/dessert-bloom.jpg',
    filename: 'dessert-bloom.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/stats-count.jpg',
    filename: 'stats-count.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/team-01.jpg',
    filename: 'team-01.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/team-02.jpg',
    filename: 'team-02.jpg'
  },
  {
    url: 'https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/team-03.jpg',
    filename: 'team-03.jpg'
  }
];

const downloadImage = (url, filename) => {
  const file = fs.createWriteStream(path.join('public', 'images', filename));
  
  https.get(url, (response) => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`✅ Downloaded: ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(path.join('public', 'images', filename), () => {});
    console.error(`❌ Error downloading ${filename}:`, err.message);
  });
};

// Create images directory if it doesn't exist
if (!fs.existsSync(path.join('public', 'images'))) {
  fs.mkdirSync(path.join('public', 'images'), { recursive: true });
}

// Download all images
console.log('📥 Starting image downloads...\n');
images.forEach(image => {
  downloadImage(image.url, image.filename);
});