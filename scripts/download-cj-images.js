const https = require('https');
const fs = require('fs');
const path = require('path');

// Load API key and access token from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let CJ_ACCESS_TOKEN = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/CJ_ACCESS_TOKEN=(.+)/);
  if (match) CJ_ACCESS_TOKEN = match[1].trim();
} catch (e) {
  console.error('Error loading .env.local:', e.message);
  process.exit(1);
}

if (!CJ_ACCESS_TOKEN) {
  console.error('CJ_ACCESS_TOKEN not found in .env.local');
  console.error('Please run the authentication step first or check your .env.local file');
  process.exit(1);
}

const CJ_BASE_URL = 'developers.cjdropshipping.com';

// Product search mapping - simplified keywords for better results
const productSearches = [
  // Perros
  { category: 'dog', keyword: 'dog toy', sku: 'CJDOG001' },
  { category: 'dog', keyword: 'dog ball', sku: 'CJDOG002' },
  { category: 'dog', keyword: 'dog rope', sku: 'CJDOG003' },
  { category: 'dog', keyword: 'pet glove', sku: 'CJDOG004' },
  { category: 'dog', keyword: 'pet fountain', sku: 'CJDOG005' },
  { category: 'dog', keyword: 'dog bowl', sku: 'CJDOG006' },
  { category: 'dog', keyword: 'dog bed', sku: 'CJDOG007' },
  
  // Gatos
  { category: 'cat', keyword: 'cat scratcher', sku: 'CJCAT001' },
  { category: 'cat', keyword: 'cat toy', sku: 'CJCAT002' },
  { category: 'cat', keyword: 'cat fountain', sku: 'CJCAT003' },
  { category: 'cat', keyword: 'cat bed window', sku: 'CJCAT004' },
  { category: 'cat', keyword: 'cat litter', sku: 'CJCAT005' },
  { category: 'cat', keyword: 'cat brush', sku: 'CJCAT006' },
  { category: 'cat', keyword: 'cat tree', sku: 'CJCAT007' },
  
  // Aves
  { category: 'bird', keyword: 'bird cage', sku: 'CJBIRD001' },
  { category: 'bird', keyword: 'bird toy', sku: 'CJBIRD002' },
  { category: 'bird', keyword: 'bird feeder', sku: 'CJBIRD003' },
  { category: 'bird', keyword: 'bird bath', sku: 'CJBIRD004' },
  { category: 'bird', keyword: 'bird swing', sku: 'CJBIRD005' },
  
  // Roedores
  { category: 'rodent', keyword: 'hamster cage', sku: 'CJROD001' },
  { category: 'rodent', keyword: 'hamster wheel', sku: 'CJROD002' },
  { category: 'rodent', keyword: 'hamster bottle', sku: 'CJROD003' },
  { category: 'rodent', keyword: 'rabbit house', sku: 'CJROD004' },
  { category: 'rodent', keyword: 'hamster tunnel', sku: 'CJROD005' },
  
  // Peces
  { category: 'fish', keyword: 'fish tank', sku: 'CJFISH001' },
  { category: 'fish', keyword: 'aquarium filter', sku: 'CJFISH002' },
  { category: 'fish', keyword: 'aquarium light', sku: 'CJFISH003' },
  { category: 'fish', keyword: 'aquarium heater', sku: 'CJFISH004' },
  { category: 'fish', keyword: 'aquarium decor', sku: 'CJFISH005' },
  
  // Reptiles
  { category: 'reptile', keyword: 'reptile terrarium', sku: 'CJREP001' },
  { category: 'reptile', keyword: 'reptile lamp', sku: 'CJREP002' },
  { category: 'reptile', keyword: 'reptile bedding', sku: 'CJREP003' },
  { category: 'reptile', keyword: 'reptile hide', sku: 'CJREP004' },
];

// Make HTTPS request to CJ API
function makeRequest(path, method = 'GET', postData = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CJ_BASE_URL,
      path: path,
      method: method,
      headers: {
        'CJ-Access-Token': CJ_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      }
    };

    if (postData) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

// Search products
async function searchProducts(keyword) {
  const postData = JSON.stringify({
    keyword: keyword,
    pageNum: 1,
    pageSize: 5
  });

  return await makeRequest('/api2.0/v1/product/list', 'POST', postData);
}

// Get product details
async function getProductDetails(pid) {
  return await makeRequest(`/api2.0/v1/product/query?pid=${pid}`);
}

// Download image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Ensure directory exists
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Main function
async function main() {
  console.log('🚀 Iniciando descarga de imágenes de CJ Dropshipping...\n');
  
  const results = {
    success: [],
    failed: []
  };

  for (const search of productSearches) {
    try {
      console.log(`🔍 Buscando: ${search.keyword} (${search.sku})`);
      
      // Search for products
      const searchResult = await searchProducts(search.keyword);
      
      if (!searchResult.result || !searchResult.data || !searchResult.data.list || searchResult.data.list.length === 0) {
        console.log(`  ⚠️ No se encontraron productos para: ${search.keyword}`);
        results.failed.push({ sku: search.sku, reason: 'No products found' });
        continue;
      }

      // Get first product
      const product = searchResult.data.list[0];
      console.log(`  ✓ Producto encontrado: ${product.productNameEn || product.productName}`);
      
      // Get detailed product info
      const detailsResult = await getProductDetails(product.pid);
      
      if (!detailsResult.result || !detailsResult.data) {
        console.log(`  ⚠️ No se pudieron obtener detalles del producto`);
        results.failed.push({ sku: search.sku, reason: 'No details available' });
        continue;
      }

      const productData = detailsResult.data;
      
      // Create product directory
      const productDir = path.join(__dirname, '..', 'public', 'products', search.sku);
      if (!fs.existsSync(productDir)) {
        fs.mkdirSync(productDir, { recursive: true });
      }

      // Download main image
      let mainImageUrl = productData.bigImage || productData.productImage;
      if (mainImageUrl) {
        const mainImagePath = path.join(productDir, 'main.jpg');
        await downloadImage(mainImageUrl, mainImagePath);
        console.log(`  ✓ Imagen principal descargada`);
      }

      // Download gallery images
      if (productData.productImageSet && Array.isArray(productData.productImageSet) && productData.productImageSet.length > 0) {
        const galleryDir = path.join(productDir, 'gallery');
        if (!fs.existsSync(galleryDir)) {
          fs.mkdirSync(galleryDir, { recursive: true });
        }

        const galleryImages = productData.productImageSet.slice(0, 4); // Max 4 gallery images
        for (let i = 0; i < galleryImages.length; i++) {
          const galleryPath = path.join(galleryDir, `${String(i + 1).padStart(2, '0')}.jpg`);
          await downloadImage(galleryImages[i], galleryPath);
          console.log(`  ✓ Imagen de galería ${i + 1} descargada`);
        }
      }

      // Save product data
      const dataPath = path.join(productDir, 'data.json');
      fs.writeFileSync(dataPath, JSON.stringify({
        pid: productData.pid,
        sku: search.sku,
        name: productData.productNameEn || productData.productName,
        price: productData.sellPrice,
        weight: productData.productWeight,
        category: productData.categoryName,
        cjSku: productData.productSku
      }, null, 2));

      results.success.push({
        sku: search.sku,
        name: productData.productNameEn || productData.productName,
        pid: productData.pid
      });

      console.log(`  ✓ Datos guardados\n`);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`  ✗ Error: ${error.message}\n`);
      results.failed.push({ sku: search.sku, reason: error.message });
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN');
  console.log('='.repeat(50));
  console.log(`✓ Exitosos: ${results.success.length}`);
  console.log(`✗ Fallidos: ${results.failed.length}`);
  
  if (results.success.length > 0) {
    console.log('\nProductos descargados:');
    results.success.forEach(p => console.log(`  ✓ ${p.sku}: ${p.name}`));
  }
  
  if (results.failed.length > 0) {
    console.log('\nProductos fallidos:');
    results.failed.forEach(p => console.log(`  ✗ ${p.sku}: ${p.reason}`));
  }

  // Save results to file
  const resultsPath = path.join(__dirname, 'download-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Resultados guardados en: ${resultsPath}`);
}

main().catch(console.error);
