const app = {
    users: [],
    properties: [],
    currentUser: null,

    init: function() {
        document.getElementById('register-form').addEventListener('submit', this.register.bind(this));
        document.getElementById('property-form').addEventListener('submit', this.postProperty.bind(this));
    },

    register: function(event) {
        event.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const userType = document.getElementById('user-type').value;

        const user = {
            id: this.users.length + 1,
            firstName,
            lastName,
            email,
            phoneNumber,
            userType
        };

        this.users.push(user);
        this.currentUser = user;

        this.showDashboard(userType);
    },

    showDashboard: function(userType) {
        document.getElementById('login-register').style.display = 'none';

        if (userType === 'seller') {
            document.getElementById('seller-dashboard').style.display = 'block';
            this.renderSellerProperties();
        } else if (userType === 'buyer') {
            document.getElementById('buyer-dashboard').style.display = 'block';
            this.renderProperties();
        }
    },

    showPostPropertyForm: function() {
        document.getElementById('post-property-form').style.display = 'block';
    },

    postProperty: function(event) {
        event.preventDefault();

        const place = document.getElementById('place').value;
        const area = document.getElementById('area').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
        const nearby = document.getElementById('nearby').value;

        const property = {
            id: this.properties.length + 1,
            place,
            area,
            bedrooms,
            bathrooms,
            nearby,
            ownerId: this.currentUser.id
        };

        this.properties.push(property);
        this.renderSellerProperties();
    },

    renderSellerProperties: function() {
        const sellerPropertiesContainer = document.getElementById('seller-properties');
        sellerPropertiesContainer.innerHTML = '';

        const sellerProperties = this.properties.filter(property => property.ownerId === this.currentUser.id);

        sellerProperties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('property');
            propertyElement.innerHTML = `
                <p>Place: ${property.place}</p>
                <p>Area: ${property.area} sq ft</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Nearby: ${property.nearby}</p>
                <button onclick="app.deleteProperty(${property.id})">Delete</button>
            `;

            sellerPropertiesContainer.appendChild(propertyElement);
        });
    },

    deleteProperty: function(propertyId) {
        this.properties = this.properties.filter(property => property.id !== propertyId);
        this.renderSellerProperties();
    },

    renderProperties: function() {
        const propertiesContainer = document.getElementById('properties');
        propertiesContainer.innerHTML = '';

        this.properties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('property');
            propertyElement.innerHTML = `
                <p>Place: ${property.place}</p>
                <p>Area: ${property.area} sq ft</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Nearby: ${property.nearby}</p>
                <button onclick="app.showSellerDetails(${property.ownerId})">I'm Interested</button>
            `;

            propertiesContainer.appendChild(propertyElement);
        });
    },

    showSellerDetails: function(ownerId) {
        const seller = this.users.find(user => user.id === ownerId);
        alert(`Seller Details:\nName: ${seller.firstName} ${seller.lastName}\nEmail: ${seller.email}\nPhone: ${seller.phoneNumber}`);
    },

    applyFilters: function() {
        const place = document.getElementById('filter-place').value;
        const bedrooms = document.getElementById('filter-bedrooms').value;
        const bathrooms = document.getElementById('filter-bathrooms').value;

        const filteredProperties = this.properties.filter(property => {
            return (!place || property.place.includes(place)) &&
                   (!bedrooms || property.bedrooms == bedrooms) &&
                   (!bathrooms || property.bathrooms == bathrooms);
        });

        this.renderFilteredProperties(filteredProperties);
    },

    renderFilteredProperties: function(filteredProperties) {
        const propertiesContainer = document.getElementById('properties');
        propertiesContainer.innerHTML = '';

        filteredProperties.forEach(property => {
            const propertyElement = document.createElement('div');
            propertyElement.classList.add('property');
            propertyElement.innerHTML = `
                <p>Place: ${property.place}</p>
                <p>Area: ${property.area} sq ft</p>
                <p>Bedrooms: ${property.bedrooms}</p>
                <p>Bathrooms: ${property.bathrooms}</p>
                <p>Nearby: ${property.nearby}</p>
                <button onclick="app.showSellerDetails(${property.ownerId})">I'm Interested</button>
            `;

            propertiesContainer.appendChild(propertyElement);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
