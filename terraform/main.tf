terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.36"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "alumni_sgg" {
  name        = "alumni-sgg"
  description = "Allow all traffic"

  ingress {
    from_port = 0
    to_port   = 65535
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "alumni" {
  ami               = "ami-0522ab6e1ddcc7055"
  instance_type     = "t2.medium"
  key_name          = "mykey"
  associate_public_ip_address = true

  vpc_security_group_ids = [aws_security_group.alumni_sgg.id]

  user_data = file("${path.module}/userdata.sh")

  tags = {
    Name = "alumni-app"
  }
}
