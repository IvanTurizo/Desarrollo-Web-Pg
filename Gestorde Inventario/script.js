// Inventory Management System - Main JavaScript File

$(document).ready(function() {
    // Initialize the application
    initializeApp();
    
    // Event listeners
    setupEventListeners();
    
    // Load initial data
    loadInitialData();
});

// Global variables
let products = [];
let categories = [];
let currentProductId = null;
let currentCategoryId = null;

// Initialize application
function initializeApp() {
    // Load data from localStorage
    loadDataFromStorage();
    
    // Setup navigation
    setupNavigation();
    
    // Initialize modals
    initializeModals();
    
    // Update dashboard
    updateDashboard();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const section = $(this).data('section');
        showSection(section);
    });
    
    // Product form
    $('#saveProduct').on('click', saveProduct);
    $('#productModal').on('hidden.bs.modal', resetProductForm);
    
    // Category form
    $('#saveCategory').on('click', saveCategory);
    $('#categoryModal').on('hidden.bs.modal', resetCategoryForm);
    
    // Search and filters
    $('#searchProduct').on('input', filterProducts);
    $('#categoryFilter').on('change', filterProducts);
    $('#stockFilter').on('change', filterProducts);
    
    // Export/Import
    $('#exportJSON').on('click', exportToJSON);
    $('#exportCSV').on('click', exportToCSV);
    $('#importData').on('click', importData);
    $('#importFile').on('change', function() {
        if (this.files.length > 0) {
            $('#importData').prop('disabled', false);
        }
    });
}

// Navigation functions
function setupNavigation() {
    // Show dashboard by default
    showSection('dashboard');
}

function showSection(sectionName) {
    // Hide all sections
    $('.content-section').addClass('d-none');
    
    // Show selected section
    $(`#${sectionName}`).removeClass('d-none');
    
    // Update navigation
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-section="${sectionName}"]`).addClass('active');
    
    // Load section-specific data
    switch(sectionName) {
        case 'products':
            loadProducts();
            break;
        case 'categories':
            loadCategories();
            break;
        case 'reports':
            // Reports are loaded on demand
            break;
    }
}

// Data management functions
function loadDataFromStorage() {
    // Load products
    const storedProducts = localStorage.getItem('inventory_products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    }
    
    // Load categories
    const storedCategories = localStorage.getItem('inventory_categories');
    if (storedCategories) {
        categories = JSON.parse(storedCategories);
    } else {
        // Add default categories
        categories = [
            { id: 1, name: 'Electrónicos', description: 'Dispositivos electrónicos y accesorios' },
            { id: 2, name: 'Ropa', description: 'Vestimenta y accesorios de moda' },
            { id: 3, name: 'Hogar', description: 'Artículos para el hogar' },
            { id: 4, name: 'Deportes', description: 'Equipos y accesorios deportivos' }
        ];
        saveCategoriesToStorage();
    }
}

function saveProductsToStorage() {
    localStorage.setItem('inventory_products', JSON.stringify(products));
}

function saveCategoriesToStorage() {
    localStorage.setItem('inventory_categories', JSON.stringify(categories));
}

function loadInitialData() {
    updateDashboard();
    loadCategories();
}

// Product management functions
function loadProducts() {
    const tbody = $('#productsTableBody');
    tbody.empty();
    
    if (products.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="7" class="text-center text-muted">
                    No hay productos registrados
                </td>
            </tr>
        `);
        return;
    }
    
    products.forEach(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        const stockStatus = getStockStatus(product.stock, product.minStock);
        const stockClass = getStockClass(product.stock, product.minStock);
        
        tbody.append(`
            <tr>
                <td>${product.id}</td>
                <td>
                    ${product.image ? `<img src="${product.image}" class="product-image me-2" alt="${product.name}">` : ''}
                    ${product.name}
                </td>
                <td>${category ? category.name : 'Sin categoría'}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td class="${stockClass}">${product.stock}</td>
                <td>
                    <span class="badge bg-${stockStatus.color}">${stockStatus.text}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${product.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

function getStockStatus(stock, minStock) {
    if (stock === 0) {
        return { text: 'Sin Stock', color: 'danger' };
    } else if (stock <= minStock) {
        return { text: 'Stock Bajo', color: 'warning' };
    } else {
        return { text: 'En Stock', color: 'success' };
    }
}

function getStockClass(stock, minStock) {
    if (stock === 0) {
        return 'stock-out';
    } else if (stock <= minStock) {
        return 'stock-low';
    } else {
        return 'stock-ok';
    }
}

function filterProducts() {
    const searchTerm = $('#searchProduct').val().toLowerCase();
    const categoryFilter = $('#categoryFilter').val();
    const stockFilter = $('#stockFilter').val();
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.categoryId == categoryFilter;
        const matchesStock = !stockFilter || 
                           (stockFilter === 'low' && product.stock <= product.minStock && product.stock > 0) ||
                           (stockFilter === 'out' && product.stock === 0);
        
        return matchesSearch && matchesCategory && matchesStock;
    });
    
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const tbody = $('#productsTableBody');
    tbody.empty();
    
    if (filteredProducts.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="7" class="text-center text-muted">
                    No se encontraron productos
                </td>
            </tr>
        `);
        return;
    }
    
    filteredProducts.forEach(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        const stockStatus = getStockStatus(product.stock, product.minStock);
        const stockClass = getStockClass(product.stock, product.minStock);
        
        tbody.append(`
            <tr>
                <td>${product.id}</td>
                <td>
                    ${product.image ? `<img src="${product.image}" class="product-image me-2" alt="${product.name}">` : ''}
                    ${product.name}
                </td>
                <td>${category ? category.name : 'Sin categoría'}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td class="${stockClass}">${product.stock}</td>
                <td>
                    <span class="badge bg-${stockStatus.color}">${stockStatus.text}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${product.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

// Product CRUD operations
function saveProduct() {
    const form = $('#productForm')[0];
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const productData = {
        name: $('#productName').val(),
        categoryId: parseInt($('#productCategory').val()),
        price: parseFloat($('#productPrice').val()),
        stock: parseInt($('#productStock').val()),
        minStock: parseInt($('#productMinStock').val()) || 5,
        description: $('#productDescription').val(),
        image: $('#productImage').val()
    };
    
    if (currentProductId) {
        // Update existing product
        const index = products.findIndex(p => p.id === currentProductId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            showMessage('Producto actualizado correctamente', 'success');
        }
    } else {
        // Create new product
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({
            id: newId,
            ...productData,
            createdAt: new Date().toISOString()
        });
        showMessage('Producto creado correctamente', 'success');
    }
    
    saveProductsToStorage();
    updateDashboard();
    loadProducts();
    $('#productModal').modal('hide');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    currentProductId = id;
    $('#productModalTitle').text('Editar Producto');
    $('#productId').val(product.id);
    $('#productName').val(product.name);
    $('#productCategory').val(product.categoryId);
    $('#productPrice').val(product.price);
    $('#productStock').val(product.stock);
    $('#productMinStock').val(product.minStock);
    $('#productDescription').val(product.description);
    $('#productImage').val(product.image);
    
    $('#productModal').modal('show');
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        products = products.filter(p => p.id !== id);
        saveProductsToStorage();
        updateDashboard();
        loadProducts();
        showMessage('Producto eliminado correctamente', 'success');
    }
}

function resetProductForm() {
    currentProductId = null;
    $('#productModalTitle').text('Nuevo Producto');
    $('#productForm')[0].reset();
    $('#productId').val('');
}

// Category management functions
function loadCategories() {
    const tbody = $('#categoriesTableBody');
    tbody.empty();
    
    if (categories.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No hay categorías registradas
                </td>
            </tr>
        `);
        return;
    }
    
    categories.forEach(category => {
        const productCount = products.filter(p => p.categoryId === category.id).length;
        
        tbody.append(`
            <tr>
                <td>${category.id}</td>
                <td>${category.name}</td>
                <td>${category.description || 'Sin descripción'}</td>
                <td>
                    <span class="badge bg-primary">${productCount}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editCategory(${category.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteCategory(${category.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
    
    // Update category filter in product form
    updateCategoryFilter();
}

function updateCategoryFilter() {
    const select = $('#categoryFilter');
    const productSelect = $('#productCategory');
    
    select.empty();
    productSelect.empty();
    
    select.append('<option value="">Todas las categorías</option>');
    productSelect.append('<option value="">Seleccionar categoría</option>');
    
    categories.forEach(category => {
        select.append(`<option value="${category.id}">${category.name}</option>`);
        productSelect.append(`<option value="${category.id}">${category.name}</option>`);
    });
}

function saveCategory() {
    const form = $('#categoryForm')[0];
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const categoryData = {
        name: $('#categoryName').val(),
        description: $('#categoryDescription').val()
    };
    
    if (currentCategoryId) {
        // Update existing category
        const index = categories.findIndex(c => c.id === currentCategoryId);
        if (index !== -1) {
            categories[index] = { ...categories[index], ...categoryData };
            showMessage('Categoría actualizada correctamente', 'success');
        }
    } else {
        // Create new category
        const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
        categories.push({
            id: newId,
            ...categoryData,
            createdAt: new Date().toISOString()
        });
        showMessage('Categoría creada correctamente', 'success');
    }
    
    saveCategoriesToStorage();
    updateDashboard();
    loadCategories();
    $('#categoryModal').modal('hide');
}

function editCategory(id) {
    const category = categories.find(c => c.id === id);
    if (!category) return;
    
    currentCategoryId = id;
    $('#categoryModalTitle').text('Editar Categoría');
    $('#categoryId').val(category.id);
    $('#categoryName').val(category.name);
    $('#categoryDescription').val(category.description);
    
    $('#categoryModal').modal('show');
}

function deleteCategory(id) {
    const productCount = products.filter(p => p.categoryId === id).length;
    if (productCount > 0) {
        showMessage(`No se puede eliminar la categoría porque tiene ${productCount} productos asociados`, 'danger');
        return;
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
        categories = categories.filter(c => c.id !== id);
        saveCategoriesToStorage();
        updateDashboard();
        loadCategories();
        showMessage('Categoría eliminada correctamente', 'success');
    }
}

function resetCategoryForm() {
    currentCategoryId = null;
    $('#categoryModalTitle').text('Nueva Categoría');
    $('#categoryForm')[0].reset();
    $('#categoryId').val('');
}

// Dashboard functions
function updateDashboard() {
    updateStatistics();
    updateRecentProducts();
}

function updateStatistics() {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const lowStock = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
    const totalCategories = categories.length;
    
    $('#totalProducts').text(totalProducts);
    $('#totalValue').text('$' + totalValue.toFixed(2));
    $('#lowStock').text(lowStock);
    $('#totalCategories').text(totalCategories);
}

function updateRecentProducts() {
    const recentProducts = products
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    
    const container = $('#recentProducts');
    container.empty();
    
    if (recentProducts.length === 0) {
        container.append('<p class="text-muted">No hay productos registrados</p>');
        return;
    }
    
    recentProducts.forEach(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        const stockStatus = getStockStatus(product.stock, product.minStock);
        
        container.append(`
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                <div class="d-flex align-items-center">
                    ${product.image ? `<img src="${product.image}" class="product-image me-2" alt="${product.name}">` : ''}
                    <div>
                        <h6 class="mb-0">${product.name}</h6>
                        <small class="text-muted">${category ? category.name : 'Sin categoría'}</small>
                    </div>
                </div>
                <div class="text-end">
                    <div class="fw-bold">$${product.price.toFixed(2)}</div>
                    <span class="badge bg-${stockStatus.color}">${stockStatus.text}</span>
                </div>
            </div>
        `);
    });
}

// Modal initialization
function initializeModals() {
    // Product modal
    $('#productModal').on('show.bs.modal', function() {
        updateCategoryFilter();
    });
}

// Export/Import functions
function exportToJSON() {
    const data = {
        products: products,
        categories: categories,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Datos exportados correctamente', 'success');
}

function exportToCSV() {
    let csv = 'ID,Nombre,Categoría,Precio,Stock,Stock Mínimo,Descripción\n';
    
    products.forEach(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        csv += `${product.id},"${product.name}","${category ? category.name : 'Sin categoría'}",${product.price},${product.stock},${product.minStock},"${product.description || ''}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Datos exportados correctamente', 'success');
}

function importData() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showMessage('Por favor selecciona un archivo', 'warning');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.products && data.categories) {
                if (confirm('¿Estás seguro de que quieres importar estos datos? Esto reemplazará todos los datos actuales.')) {
                    products = data.products;
                    categories = data.categories;
                    saveProductsToStorage();
                    saveCategoriesToStorage();
                    updateDashboard();
                    loadProducts();
                    loadCategories();
                    showMessage('Datos importados correctamente', 'success');
                }
            } else {
                showMessage('El archivo no tiene el formato correcto', 'danger');
            }
        } catch (error) {
            showMessage('Error al leer el archivo: ' + error.message, 'danger');
        }
    };
    
    reader.readAsText(file);
    fileInput.value = '';
    $('#importData').prop('disabled', true);
}

// Utility functions
function showMessage(message, type) {
    const alertClass = `alert-${type}`;
    const messageHtml = `
        <div class="alert ${alertClass} alert-dismissible fade show message" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('body').append(messageHtml);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        $('.message').fadeOut(() => {
            $('.message').remove();
        });
    }, 5000);
}

// Global functions for onclick handlers
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
