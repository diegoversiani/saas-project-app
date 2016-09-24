# Project Manager SaaS

This is the SaaS Project App from the Complete Ruby on Rails Developer course

# Functionalities

- Organization (tenant)
  - Organization is the tenant and has many users and projects
  - The organization can have the free or premium plan
  - For the premium plan the organization has to pay an amount via credit card (Stripe Payment Gateway)
  - Users can associated to many projects
  - Projects can have many users associated
- Authentication system
  - users are part of one organization
  - users can sign-up
  - log in / log out
- Projects
  - Users can se which projects they are part of
  - Projects have artifacts
- Artifacts
  - Users can add artifacts to projects
  - Artifacts are uploaded to Amazon S3 storage service
  - Artifacts can be deleted by users

# Model Associations

```
Tenant(Organization) **one_to_many** User
User **many_to_many** Project
Project **one_to_many** Artifact
```

# Technologies

- Ruby 2.2.3
- Rails 4.2.6
- Devise 3.5.10
- Milia (for multitenancy)
- Twitter Bootstrap (gem)
- Twitter Bootstrap for Devise (gem)
- Stripe Payment Gateway (gem)

# Demo

Running demo at: https://saas-project-app-diegoversiani.herokuapp.com/
