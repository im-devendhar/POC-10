# Use official lightweight Nginx image
FROM nginx:alpine

# Remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy your static website content into Nginx's web root
COPY . /usr/share/nginx/html
