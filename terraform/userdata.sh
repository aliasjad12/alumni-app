#!/bin/bash
sudo apt update
sudo apt install -y docker.io docker-compose git
sudo systemctl enable docker
sudo systemctl start docker
cd /home/ubuntu
git clone https://github.com/aliasjad12/alumni-app.git
cd alumni-app
docker-compose up -d
