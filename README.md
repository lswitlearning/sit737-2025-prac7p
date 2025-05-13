## Deploying a Simple Price Tracker - MongoDB + Kubernetes Deployment
---
This project is a minimal Node.js CRUD API for managing product names and prices, connected to MongoDB and fully deployed on Kubernetes. It demonstrates secure credential handling, persistent storage, database backup and recovery, and basic monitoring. 

### Features
- Create, Read, Update, and Delete (CRUD) products
- Store product data in MongoDB with persistent volume storage
- Secure credential management using Kubernetes Secrets
- Environment-based configuration via Kubernetes
- Fully containerized application using Docker
- Deployable on any Kubernetes cluster
- Tested using Postman for API validation

### Required tools
- Git
- Visual Studio code
- Node.js
- Docker
- Kubernetes
- Kubectl (Kubernetes CLI)
- Postman

### Tech Stack

| Layer         | Technology           |
|---------------|----------------------|
| Backend       | Node.js (Express)    |
| Database      | MongoDB (Single-node in Pod) |
| Deployment    | Kubernetes + Docker  |
| Security      | Kubernetes Secrets   |
| Storage       | PVC (PersistentVolumeClaim) |
| API Testing   | Postman / curl       |

### Installation
1. Clone the repository:
```
git clone https://github.com/lswitlearning/sit737-2025-prac7p.git
```

2. Install required dependencies:
```
npm install
```

### Setup & Deployment

1. Build and push the Docker image
```
docker build -t beatalam/supermarket-app:latest .
docker push beatalam/supermarket-app:latest
```

2. Apply Kubernetes manifests
```
kubectl apply -f k8s/mongo-secret.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/app-deployment.yaml
```

3. Expose the app (for local testing)
```
kubectl port-forward svc/supermarket-service 3000:3000
```
Then open: http://localhost:3000/products

### Test- perform CRUD operations
You can test the following API endpoints using **Postman** or **curl**.

### API Endpoints
| Method         | Endpoint           | Description      |
|---------------|----------------------|--------------------|
| POST       | /products    |Create a new product|
| GET      | /products |List all products|
| PUT    | /products/:id  |Update a product|
| DELETE     | /products/:id   |Delete a product|

### Backup
```
kubectl exec -it <mongo-pod-name> -- mongodump --out=/data/backup --username admin --password password --authenticationDatabase admin
My example:
kubectl exec -it mongo-65d79d6b44-rhcv4 -- mongodump --out=/data/backup --username admin --password password --authenticationDatabase admin
```

### Restore
```
kubectl cp ./mongo-backup <mongo-pod-name>:/data/backup
My example:
kubectl cp mongo-65d79d6b44-rhcv4:/data/backup ./mongo-backup

kubectl exec -it <mongo-pod-name> -- mongorestore /data/backup --username admin --password password --authenticationDatabase admin
My example:
kubectl exec -it mongo-65d79d6b44-rhcv4 -- mongorestore /data/backup --username admin --password password --authenticationDatabase admin
```

### Monitoring
```
kubectl logs -l app=supermarket-app
kubectl logs -l app=mongo
```
